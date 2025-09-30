const mongoose = require('mongoose');
const courseStatus = require('../utils/courseStatus');

const enrollmentSchema = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'course', require: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', require: true },
    joinAt: { type: Date, default: Date.now },
    status: { type: String, enum: [courseStatus.ACTIVE,courseStatus.PENDING, courseStatus.CANCEL], default: courseStatus.ACTIVE }
});

const enrollmentModel = mongoose.model('enrollment', enrollmentSchema);

module.exports = enrollmentModel;