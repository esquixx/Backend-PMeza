import FileManager  from "./file.manager.js"

export default class Cart extends FileManager {
    constructor(filename = './db.cart.json'){
        super(filename)
    }

    getCart = async() => { return this.get()}
    getCartOne = async (params) => { 
        
        if (params.hasOwnProperty('closeBuy')) {
            params = false
        } 
        
        const data = await this.getCart()
        const search = data.find(d => d.closeBuy === params)
        console.log("ESTOY PARAMS " + search )
        return search
    }
    getCartById = async id => { return this.getById(id)}
    createCart = async cart => {  
        const newCart = await this.add(cart)
        return newCart
    }
    saveCart = async (idcart, pid) => {
        console.log("PID FILE " + pid)
        const cartUpdate = await this.save(idcart, pid)
        return cartUpdate
    }
    getCartByPid = async (id,data) => {
       const  dataFile = this.getCartById(id)
       console.log("dataFile by pid " + JSON.stringify(dataFile))
        const products = data.products.find(d=> d.pid === dataFile.products.pid)
         console.log("cart by pid " + JSON.stringify(products))
        return products 
    }

    
}