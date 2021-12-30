const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect Mongoose successfully!!!');
    } catch (error) {
        console.log(error);
    }
}

module.exports = { connect };