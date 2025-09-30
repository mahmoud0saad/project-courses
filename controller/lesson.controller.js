
const asyncWrapper = require('../middleware/validationSchema');
const lessonModel = require('../models/lesson.model');
const courseModel = require('../models/course.model');
const { statusText } = require('../utils/appError');
const { SUCCESS, FAIL, ERROR } = require('../utils/status_http');
const appError = require('../utils/appError');

const getAllLesson = asyncWrapper(async (req, res, next) => {
    const allLesson = await lessonModel.find();
    res.json(allLesson);
});


const addLesson = asyncWrapper(async (req, res, next) => {
    console.log("body is ", req.body);
    const courseId = req.params.id;

    const courseResult = await courseModel.findById(courseId);
    if (!courseResult) {
        const error = appError.create({ message: "course id is not found", statusCode: 422, statusText: FAIL });
        return next(error)
    }

    const { title, duration } = req.body;
    const allLesson = new lessonModel({ title: title, duration: duration, courseId: courseId });
    const result = await allLesson.save();

    await courseModel.findByIdAndUpdate(courseId, {
        $push: { lessons: result._id }
    });

    res.json(result);
});


const deleteLesson = asyncWrapper(async (req, res, next) => {
    console.log("delete lesson", req.params.id);
    const result = await lessonModel.deleteOne({ _id: req.params.id });
    res.status(result.deletedCount ? 200 : 400).json({ data: result, statusText: result.deletedCount ? SUCCESS : FAIL });


}
)


const updateLesson = asyncWrapper(async (req, res, next) => {
    const lessonId = req.params.id;
    const { title, duration } = req.body;

    const updateResult = await lessonModel.findByIdAndUpdate(lessonId, { title: title, duration: duration });
    res.status(updateResult ? 200 : 400).json({ data: updateResult, statusText: updateResult ? SUCCESS : FAIL });

});













module.exports = { getAllLesson, addLesson, deleteLesson, updateLesson }