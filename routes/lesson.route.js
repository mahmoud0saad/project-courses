const express = require('express');
const lessonController = require('../controller/lesson.controller');
const { verifyToken } = require('../middleware/verifyToken');
const allowTo = require('../middleware/allowTo');
const { USER, ADMIN } = require('../utils/userRoles');
const { deleteLesson } = require('../validation/validation');


const route = express.Router();


route.route('/')
    .get(lessonController.getAllLesson);

route.route('/:id')
    .delete(verifyToken, deleteLesson, allowTo(USER, ADMIN), lessonController.deleteLesson)
    .patch(verifyToken, lessonController.updateLesson)
    .post(verifyToken, lessonController.addLesson);








module.exports = { route };