const mongoose = require('mongoose');


const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {

        type: String,
        required: true

    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'user',
        require: true,
    },
    lessons: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'lesson'
        }
    ]

})

const model = mongoose.model('course', courseSchema);

module.exports = model 