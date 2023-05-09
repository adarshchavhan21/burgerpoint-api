const Order = require('../models/Order');
const User = require('../models/User');
const Payment = require('../models/Payment');
const { catchAsync } = require('../middlewares/catchAync');
const { createError } = require('../utils/createError');
const { instance } = require('../app');
const crypto = require('crypto');

exports.placeOrder = catchAsync(async(req, res, next) => {

    if(!req.user){
        return bext(createError(403, 'user not logged'))
    }

    const order = await Order.create({...req.body, user: req.user?._id});

    res.send({
        success: true,
        message: 'Order placed successfully',
        order
    })

});

exports.placeOrderOnline = catchAsync(async(req, res, next)=>{
    const options = {
        amount: Number(req.body.totalPrice) * 100,
        currency: 'INR'
    }

    const order = await instance.orders.create(options);

    res.send({
        success: true,
        message: 'Order successfully via COD',
        order
    })
});

exports.paymentVerification = catchAsync(async(req, res, next)=>{
    const {
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
        orderOptions
    } = req.body;

    const body = razorpay_order_id + '|' + razorpay_payment_id;

        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(String(body)).digest('hex');

        if (expectedSignature === razorpay_signature) {
            
            const payment = await Payment.create({
                razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature
            });

            const order = await Order.create({ ...orderOptions, paidAt: new Date(Date.now()), paymentInfo: payment._id, user:req.user._id });

            res.send({
                success: true,
                message: 'Order placed successfully via Online'
            });
        } else {
            next(createError(400, 'Payment failed'))
        }
});

exports.myOrders = catchAsync(async(req, res, next) => {
    if(!req.user){
        return bext(createError(403, 'user not logged'))
    }

    const orders = await Order.find({user: req.user._id}).sort({createdAt: -1});

    res.send({
        success: true,
        orders
    })
});

exports.orderDetails = catchAsync(async(req, res, next) => {
    if(!req.user){
        return next(createError(403, 'user not logged'))
    }
    const order = await Order.findById(req.params.id);
    if(String(order.user) !== String(req.user._id)){
        return next(createError(403, 'access deined'))
    }

    res.send({
        success: true,
        order:order
    })
});

exports.allOrders = catchAsync(async(req, res, next) => {
    if(!req.user){
        return bext(createError(403, 'user not logged'))
    }

    if(!req.user.isAdmin){
        return bext(createError(403, 'access deined'))
    }

    const orders = await Order.find({}).sort({createdAt: -1});

    res.send({
        success: true,
        orders
    })
});
