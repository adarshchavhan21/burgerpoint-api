const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const { passportSetup } = require('./utils/passportSetup');
const {connectDb} = require('./config/db');
const { error } = require('./middlewares/error');
const Razorpay = require('razorpay');

require('https').globalAgent.options.rejectUnauthorized = false;

const app = express();
dotenv.config({
    path: './config/.env'
});
connectDb();

exports.instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

const clientURL = process.env.CLIENT_URL;
app.use(cors({
    origin: 'https://timely-cra.netlify.app',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


app.use(session({
    name: 'access_token',
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 7*24*60*60*1000,
        httpOnly: false,
        secure: false
    }
}));
app.use(passport.authenticate('session'));
app.use(passport.initialize());
app.use(passport.session());
app.enable('trust proxy')

passportSetup();



// ROUTES
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

app.use(error);
// app listen
const port = process.env.PORT|| 4000;
app.listen(port, ()=>{
    console.log('app is running on port: '+port)
})
