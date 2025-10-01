const express = require("express");
const enrollmentController = require("../controller/enrollment.controller");
const { verifyToken } = require("../middleware/verifyToken");
const { updateEnrollmentCourse } = require("../validation/validation");
const handelValidation = require("../middleware/handelValidation");


const route = express.Router();

route.get('/user/:id/courses', enrollmentController.getUserCoursesEnrollment);
route.get('/', enrollmentController.getAllEnrollment);
route.post('/course/:id',verifyToken, enrollmentController.enrollInCourse);
route.get('/course/:id/students',verifyToken, enrollmentController.getCourseUsers);
route.patch('/:id',verifyToken,updateEnrollmentCourse,handelValidation, enrollmentController.updateEnrollmentStatus);



module.exports = { route };