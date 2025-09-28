
const asyncWrapper = require('../middleware/validationSchema');
const lessonModel = require('../models/lesson.model');

const getAllLesson = asyncWrapper(async (req, res, next) => {
    const allLesson = await lessonModel.find();
    res.json(allLesson);
});


const addLesson = asyncWrapper(async (req, res, next) => {
        console.log("body is ","req.body");

    const title = req.body.title;
    const courseId = req.body.courseId;
    console.log("body is ",req.body);
    console.log("title is ",req.body.title);
    const allLesson = new lessonModel({ title: title, courseId: courseId });
    const result = await allLesson.save();
    res.json(result);
});




module.exports = { getAllLesson, addLesson }