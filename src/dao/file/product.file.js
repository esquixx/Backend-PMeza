import FileManager  from "./file.manager.js"

export default class Product extends FileManager {
    constructor(filename = './db.products.json'){
        super(filename)
    }

    getProduct = async() => { return this.get()}
    getProductById = async id => { return this.getById(id)}
    getProductOne = async code => {
        const data = await this.get()
        const search = data.find(d => d.code == parseInt(code))
        return search
    }
    createProduct = async (product) => {  return this.add(product)}
}