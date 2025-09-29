
const express = require('express');
let coursesController = require('../controller/courses.controller.js')
let validation = require('../validation/validation.js')
let {verifyToken} = require('../middleware/verifyToken.js')
let userRole = require('../utils/userRoles.js')
let allowTo = require('../middleware/allowTo.js')

const router = express.Router();



router.route('/')
    .get(coursesController.getAllCourses)
    .post(verifyToken,validation.createCourse,allowTo(userRole.USER,userRole.ADMIN), coursesController.createCourse);

router.route('/:id')
    .get(coursesController.getCourseDetail)
    .patch(verifyToken,validation.updateCourse, coursesController.updateCourse)
    .delete(verifyToken,validation.deleteCourse, coursesController.deleteCourse);


module.exports = { router }

