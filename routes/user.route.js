const express = require('express');
const userController = require('../controller/user.controller');
const { verifyToken } = require('../middleware/verifyToken');
const multer = require('multer');
const appError = require('../utils/appError');

const route = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        cb(null, "uploads")
    },
    filename: (req, file, cb) => {
        console.log(file);

        const ext = file.mimetype.split('/')[1];
        const name = `image_${file.originalname.split('.')[0]}_${Date.now()}.${ext}`;
        cb(null, name);
    }
});

const fileFilter = (req, file, cb) => {
    console.log(file);

    const type = file.mimetype.split('/')[0];
    if (type == 'image') {
        cb(null, true);
    } else {
        cb(appError.create({ statusCode: 400, message: "file must be an image " }), false);
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

route.get('/', verifyToken, userController.getAllUser);
route.post('/register', upload.single('avatar'), userController.register);
route.post('/login', userController.login);

route.route('/courses')
    .get(verifyToken, userController.getMyCourses);
route.route('/:id/courses')
    .get(verifyToken, userController.getCoursesForUserCreated);


module.exports = { route };