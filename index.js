const express = require('express');
const cors = require('cors');
const socketUtils = require('./utils/socketUtils.js');
const http = require('http');
const path = require('path');
const mongoose = require('mongoose');

require('dotenv').config();

const coursesRoute = require('./routes/course.route.js');
const userRoute = require('./routes/user.route.js');
const lessonsRoute = require('./routes/lesson.route.js');
const enrollmentRout = require('./routes/enrollmentCourse.route.js');
const statusHttpText = require('./utils/status_http.js');


const url = process.env.MONGO_URL;

mongoose.connect(url, { dbName: "learn_node" }).then(() => {
    console.log("mano coneect success mongoos");
});
const app = express();

const myServer = http.createServer(app);

socketUtils.initSocketIO(myServer);



app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//for convert body 
app.use(express.json());

app.use((req, res, next) => {
    console.log('req url : ', req.url, ' method : ', req.method);
    next();
});

//routes
app.use('/api/courses', coursesRoute.router);
app.use('/api/user', userRoute.route);
app.use('/api/lessons', lessonsRoute.route);
app.use('/api/enrollment', enrollmentRout.route);

app.all('{*splat}', (req, res, next) => {
    return res.status(404).json({ status: statusHttpText.ERROR, data: null, message: 'Page not found' });
});

//issue in code 
app.use((error, req, res, next) => {
    res.status(error.statusCode || 400).json({ status: error.statusText || statusHttpText.ERROR, data: error.data, message: error.message });

});


myServer.listen(process.env.PORT | 3001, () => {
    console.log('listen on port : 3001');
});