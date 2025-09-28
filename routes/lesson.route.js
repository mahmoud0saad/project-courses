const express = require('express');
const lessonController = require('../controller/lesson.controller');


const route = express.Router();


route.get('/', lessonController.getAllLesson);
route.post('/', lessonController.addLesson);







module.exports = {route};