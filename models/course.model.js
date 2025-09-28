const mongoose = require('mongoose');


const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {

        type: String,
        required: true

    }
})

const model = mongoose.model('course', courseSchema);

module.exports = model 