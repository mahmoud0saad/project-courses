
const mongoose = require('mongoose')


const lessonSchema = new mongoose.Schema({
    title: {
        require: true,
        type: String
    },
    createAt: { type: Date, default: Date.now },
    duration: { type: String, require: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'course' }

});

const model = mongoose.model('lesson', lessonSchema);

module.exports = model