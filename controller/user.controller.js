const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const asyncWrapper = require('../middleware/validationSchema')
const user = require('../models/user.model');
const courseMode = require('../models/course.model');
const appError = require('../utils/appError');
const statusHttpText = require('../utils/status_http')
const generateJWT = require('../utils/generate_jwt')

const getAllUser = asyncWrapper(async (req, res, next) => {
    const query = req.query;

    const limit = query.limit | 10;
    const page = query.page | 1;
    const skip = (page - 1) * limit;

    const allUser = await user.find({}, { "__v": false, "password": false }).limit(limit).skip(skip);

    res.json({ status: statusHttpText.SUCCESS, data: { users: allUser } });

})

const register = asyncWrapper(async (req, res, next) => {
    const { name, email, password, role } = req.body;
    console.log(req.file);

    const oldUser = await user.findOne({ email: email });
    if (oldUser) {
        const error = appError.create({ message: "email is exist already", statusCode: 400 });
        return next(error);
    }
    const passwordHashed = await bcrypt.hash(password, 8);
    const newUser = new user({ name: name, email: email, password: passwordHashed, role: role, avatar: req.file.filename });
    const token = await generateJWT({ userId: newUser._id, email: newUser.email, role: role });
    newUser.token = token;

    await newUser.save();

    return res.json({ status: statusHttpText.SUCCESS, data: { user: newUser } });

})


const login = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;
    const userResult = await user.findOne({ email: email });
    console.log(userResult);
    if (!userResult) {
        return next(appError.create({ message: "email is not correct", statusCode: 400 }));
    }
    const match = await bcrypt.compare(password, userResult.password);

    if (match) {
        const token = await generateJWT({ userId: userResult._id, email: userResult.email, role: userResult.role });
        userResult.token = token;

        return res.json({ status: statusHttpText.SUCCESS, data: { user: userResult } });

    } else {
        return next(appError.create({ message: "password is not correct", statusCode: 400 }));

    }

})

const getMyCourses = asyncWrapper(async (req, res, next) => {

    const userId = req.currentUser.userId;

    const courses = await courseMode.find({ createdBy: userId }).populate('lessons');

    res.status(200).json({ data: courses, statusText: statusHttpText.SUCCESS });

});

const getCoursesForUserCreated = asyncWrapper(async (req, res, next) => {

    const userId = req.params.id;

    const courses = await courseMode.find({ createdBy: userId }).populate('lessons');

    res.status(200).json({ data: courses, statusText: statusHttpText.SUCCESS });

});


module.exports = { getAllUser, register, login ,getCoursesForUserCreated,getMyCourses}