const {connect, set} = require('mongoose');

exports.connectDb = async () => {
    try {
        set('strictQuery',false);
        const {connection: {host}} = await connect(process.env.MONGO_URL);
        console.log('mongoose connected with host: '+host);

    } catch (error) {
        console.log(error);
    }
}