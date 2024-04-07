import ProductModel from '../mongo/models/product.model.js'

export default class Product {
    getProducts = async () => {
        return ProductModel.find()
    }
    getProductOne = async (code) => {
        return ProductModel.findOne({ code: code })
    }
    getProductParams = async (search) => {
        return ProductModel.distinct(search)
    }
    getProductById = async id => {
        return ProductModel.findById(id)
    }
    createProduct = async product => {
        return ProductModel.create(product)
    }
    updateProduct = async (id,body) => {
        return ProductModel.findByIdAndUpdate(id,body , {
            new : true
        })
    }
    deleteProduct = async id => {
        return ProductModel.findByIdAndDelete(id)
    }
    paginate = async (search, page, limit, sortField, sortOrder) => {
        try {
            const paginate = await ProductModel.paginate(
                search
                , {
                    page,
                    limit,
                    sort: { [sortField]: sortOrder },
                    lean: true
                })
            return paginate
        } catch (error) {

        }
    }
}