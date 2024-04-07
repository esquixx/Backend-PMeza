import fs from 'fs';

class FileManager {
    constructor(filename = './db.json') {
        this.filename = filename;
    }

    async get() {
        try {
            const data = await fs.promises.readFile(this.filename, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error("Error al leer el archivo:", error);
            return [];
        }
    }

    async getById(id) {
        const data = await this.get();
        return data.find(d => d._id === parseInt(id));
    }

    async add(data) {
        try {
            const list = await this.get();
            data._id = list.length + 1;
            list.push(data);
            await fs.promises.writeFile(this.filename, JSON.stringify(list));
            return data;
        } catch (error) {
            console.error("Error al agregar datos:", error);
            throw error;
        }
    }

    async update(id, data) {
        try {
            const list = await this.get();
            const idx = list.findIndex(a => a._id === id);
            if (idx !== -1) {
                list[idx] = { ...list[idx], cart: data };
                await fs.promises.writeFile(this.filename, JSON.stringify(list));
                return list[idx];
            } else {
                throw new Error('Usuario no encontrado');
            }
        } catch (error) {
            console.error("Error al actualizar datos:", error);
            throw error;
        }
    }

    async save(idcart, pid) {
        try {
            const data = await this.get();
            const cartIndex = data.findIndex(d => d._id === parseInt(idcart));
            if (cartIndex !== -1) {
                const updatedCart = { ...data[cartIndex] };
                const productIndex = updatedCart.products.findIndex(p => p.pid === parseInt(pid));
                if (productIndex !== -1) {
                    updatedCart.products[productIndex].quantity++;
                } else {
                    const lastPID = updatedCart.products.reduce((max, product) => Math.max(max, product.pid), 0);
                    const newPID = lastPID + 1;
                    updatedCart.products.push({ pid: newPID, quantity: 1 });
                }

                data[cartIndex] = updatedCart;

                await fs.promises.writeFile(this.filename, JSON.stringify(data));

                return data[cartIndex];
            } else {
                throw new Error("Carrito no encontrado");
            }
        } catch (error) {
            console.error("Error al guardar datos:", error);
            throw error;
        }
    }
}

export default FileManager;
