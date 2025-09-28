const course = require('../models/course.model.js')

const { validationResult } = require('express-validator');
const statusHttpText = require('../utils/status_http.js');
const asyncWrapper = require('../middleware/validationSchema.js');
const appError = require('../utils/appError.js');

const getAllCourses = asyncWrapper(async (req, res) => {
    const query = req.query;

    const limit = query.limit | 10;
    const page = query.page | 1;
    const skip = (page - 1) * limit;

    const allCourses = await course.find().limit(limit).skip(skip);
    res.json({ status: statusHttpText.SUCCESS, data: { Courses: allCourses } });

})

const getCourseDetail = asyncWrapper(async (req, res, next) => {
    const courseId = req.params.id;

    const courseDetail = await course.findById(courseId);

    if (courseDetail == null) {
        const error = appError.create('not found ', 400, statusHttpText.FAIL);
        return next(error);

    }
    return res.status(200).json({ status: statusHttpText.SUCCESS, data: { course: courseDetail }, });

})


const createCourse = asyncWrapper(async (req, res, next) => {


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = appError.create({ data:errors.array(),message: errors.array()[0].path + ' ' + errors.array()[0].msg, statusText: statusHttpText.FAIL, statusCode: 400 });
        return next(error);
    }

    const newCourse = new course(req.body);
    await newCourse.save();


    return res.status(200).json({ status: statusHttpText.SUCCESS, data: { course: newCourse }, });


})

const updateCourse = asyncWrapper(async (req, res) => {

    console.log("1");
    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
        return res.status(400).json({ status: statusHttpText.FAIL, data: errors, });
    }

    const courseId = req.params.id;

    const result = await course.findOneAndUpdate({ "_id": courseId }, { $set: { ...req.body } });

    return res.status(200).json({ status: statusHttpText.SUCCESS, data: { course: result }, });


})

const deleteCourse = asyncWrapper(async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
        return res.status(400).json({ status: statusHttpText.FAIL, data: errors, });
    }

    const courseId = req.params.id;

    const result = await course.deleteOne({ _id: courseId });
    console.log(result);

    return res.status(200).json({ status: statusHttpText.SUCCESS, data: { course: result }, });

})

module.exports = { getAllCourses, getCourseDetail, updateCourse, createCourse, deleteCourse }