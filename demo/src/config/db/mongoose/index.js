const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/demoTMA', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect Mongoose successfully!!!');
    } catch (error) {
        console.log(error);
    }
}

module.exports = { connect };


