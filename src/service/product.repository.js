export default class ProductRepository {
     constructor(dao){
        this.dao = dao
     }

     getProducts = async () => {
        return this.dao.getProduct()
    }
    getProductOne = async (code) => {
        return this.dao.getProductOne(code)
    }
    getProductById = async id => {
        return this.dao.getProductById(id)
    }
    addProduct = async product => {
        return  this.dao.createProduct(product)
    }
    updateProduct = async (id,body) => {
       return  this.dao.updateProduct(id,body) 
    }
    deleteProduct = async id => {
        return  this.dao.deleteProduct(id)
    }
    getProductParams = async (search) => {
        return this.dao.distinct(search)
    }
    paginate = async (search, page, limit, sortField, sortOrder) => {
        try {   
            const paginate = await this.dao.paginate(search, page, limit, sortField, sortOrder)
            return paginate
        } catch (error) {

        }
    }
    searchCategory = async (category) => {
        try {
            return await this.dao.getProductParams(category)
        } catch (error) {
            throw error
        }

    }

}