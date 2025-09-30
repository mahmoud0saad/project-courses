const asyncWrapper = require("../middleware/validationSchema");
const courseModel = require("../models/course.model");
const enrollmentModel = require("../models/enrollment.model");
const appError = require("../utils/appError");
const { PENDING } = require("../utils/courseStatus");
const { SUCCESS } = require("../utils/status_http");


const getUserCoursesEnrollment = asyncWrapper(async (req, res, next) => {
    const userId = req.params.id;

    const courses = await enrollmentModel.find({ user: userId }).populate('course');

    res.status(200).json({ data: courses, statusText: SUCCESS });
});

const getAllEnrollment = asyncWrapper(async (req, res, next) => {
    const filter = {};
    const status = req.query.status;

    if (status) {
        filter.status = status;
    }
    const allEnrollment = await enrollmentModel.find(filter);

    res.status(200).json({ data: allEnrollment, statusText: SUCCESS });

});




const enrollInCourse = asyncWrapper(async (req, res, next) => {
    const userId = req.currentUser.userId;
    const courseId = req.params.id;
    const enrollIn = new enrollmentModel({ course: courseId, user: userId, status: PENDING });
    const result = enrollIn.save();

    res.status(200).json({ data: result, statusText: SUCCESS });

});


const updateEnrollmentStatus = asyncWrapper(async (req, res, next) => {
    const enrollmentId = req.params.id;
     
    const status = req.body.status;
    
    const enrollIn = await enrollmentModel.findByIdAndUpdate(enrollmentId, { status: status });
    res.status(200).json({ data: enrollIn, statusText: SUCCESS });

})


module.exports = { getUserCoursesEnrollment, getAllEnrollment, enrollInCourse, updateEnrollmentStatus };