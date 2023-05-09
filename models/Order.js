const {Schema, model} = require('mongoose');

const orderSchema = new Schema({
    shippingInfo: {
        name: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true,
            default: 'IN'
        },
        pinCode: {
            type: Number,
            required: true
        },
        phoneNo: {
            type: Number,
            required: true
        },
    },
    orderItems: [{
        name: {
            type: String,
            required: true
        },
        photo: {
            type: String,
            required: true
        },
        quantity: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
    }],
    itemPrice: {
        type: Number,
        required: true
    },
    taxPrice: {
        type: Number,
        required: true
    },
    shippingPrice: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    paidAt: Date,
    paymentMethod: {
        type: String,
        enum: ['online', 'COD'],
        default: 'COD'
    },
    paymentInfo: {
        type: Schema.Types.ObjectId,
        ref: 'Payment'
    },
    orderStatus: {
        type: String,
        enum: ['preparing', 'shipped', 'delivered'],
        default: 'preparing'
    },
    deliverdAt: Date,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    
},{timestamps: true});

module.exports = model('Order', orderSchema);