const { body, param } = require('express-validator');
const courseStatus = require('../utils/courseStatus');

const createCourse = [
    body('name')
        .notEmpty().withMessage("title is required") ,
    body('price')
        .notEmpty().withMessage("price is required")
        .isNumeric().withMessage("price should be number ")

];
const updateCourse = [
    body('name')
        .notEmpty().withMessage("title is required")
        .isLength({ min: 2, max: 10 }).withMessage("min at least 2 char to 10 char ")
        .optional()
    ,
    body('price')
        .notEmpty().withMessage("price is required")
        .optional()
];
const deleteCourse = [
    param('id')
        .optional()
];

const deleteLesson = [
    param('id')
        .notEmpty().withMessage("lesson id is required")


];
const updateEnrollmentCourse = [
   
    body('status')
        .isIn(Object.values(courseStatus)).withMessage(`value is should be value of [${Object.values(courseStatus).join(',')}]`)
       
];

module.exports = { createCourse, updateCourse, deleteCourse, deleteLesson ,updateEnrollmentCourse}