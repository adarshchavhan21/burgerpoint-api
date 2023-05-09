const { placeOrder, myOrders, placeOrderOnline, paymentVerification, allOrders, orderDetails } = require('../contollers/orderController');
const { auth } = require('../middlewares/auth');

const router = require('express').Router();

router.post('/place', auth, placeOrder);
router.get('/me', auth, myOrders);
router.post('/place/order', auth, placeOrderOnline);
router.post('/payment/verification', auth, paymentVerification);

router.get('/razorpay/key', (req, res, next)=>{
    res.send({
        success: true,
        keyID: process.env.RAZORPAY_KEY_ID
    });
})

router.get('/order/:id', auth, orderDetails);

router.get('/', auth, allOrders);

module.exports = router;