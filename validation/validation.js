const { body, param } = require('express-validator');

const createCourse = [
    body('name')
        .notEmpty()
        .withMessage("titel is required")
        .isLength({ min: 2, max: 10 })
        .withMessage("min at leaset 2 char to 10 char "),
    body('price')
        .notEmpty()
        .withMessage("price is required")
        .isNumeric()
        .withMessage("price should be number ")

];
const updateCourse = [
    body('name')
        .notEmpty()
        .withMessage("titel is required")
        .isLength({ min: 2, max: 10 })
        .withMessage("min at leaset 2 char to 10 char ")
        .optional()
    ,
    body('price')
        .notEmpty()
        .withMessage("price is required")
        .optional()
];
const deleteCourse = [
    param('id')
   
    .optional()
];


module.exports = { createCourse, updateCourse, deleteCourse }