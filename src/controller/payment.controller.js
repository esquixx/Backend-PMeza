import { paymentService, CartService , ProductService} from '../service/index.js'
export const paymentIntents = async (req, res) => {
    try {
    const { cartId } = req.body
    const cart = await CartService.getCartById(cartId)
    console.log("carrito: " + JSON.stringify(cart))
    if (!cart) return res.status(404).send("Product not found")


    let totalAmount = 0;
    for (const item of cart.products) {
        const product = await ProductService.getProductById(item.pid);
        if (product) {
            totalAmount += product.price * item.quantity;
        }
    }
    
    if (totalAmount < 0.5) {
        return res.status(400).send("El monto total del carrito debe ser al menos de $0.50 USD");
    }

    const paymentItentsInfo = {
        amount: totalAmount * 100,
        currency: 'usd',
        payment_method_types: ["card"]

    }
   
        const result = await paymentService.createPaymentIntent(paymentItentsInfo);
        console.log(result);
   
        res.json({ status: "success", payload: result })
    } catch (error) {
        console.error('Error al crear el intento de pago:', error);
        res.status(500).send('Error interno del servidor');
    }
}
export const paymentView = async (req, res) => { 
    res.render('payment'  , {} )
}