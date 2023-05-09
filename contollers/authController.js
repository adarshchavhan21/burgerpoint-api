const { catchAsync } = require("../middlewares/catchAync");
const User = require("../models/User");
const { createError } = require("../utils/createError");

exports.myProfile = (req, res) => {
    res.send({
        sccess:  true,
        user: req.user
    });
}

exports.logout = (req, res) => {
    res.clearCookie('access_token').send({
        success: true,
        message: 'Logout successfully'
    })
}

exports.setAddress = catchAsync(async(req, res, next) => {
    const user = await User.findOne({id: req.user?.id})
    if(!user){
        return next(createError(404, 'User not found'))
    }

    user.address = {...req.body}
    await user.save();

    res.send({
        success: true,
        message: 'Default address set successfully'
    })
})

exports.getAllUsers = catchAsync(async(req, res, next) => {
    if(!req.user){
        return bext(createError(403, 'user not logged'))
    }

    if(!req.user.isAdmin){
        return bext(createError(403, 'access deined'))
    }

    const users = await User.find().sort({createdAt: -1});

    res.send({
        success: true,
        users
    })
});
