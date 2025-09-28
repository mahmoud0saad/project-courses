
const mongoose =require('mongoose')


const lessonSchema = new mongoose.Schema({
    title:{
        require : true,
        type:String
    },
    courseId:{
        type:String,
        require :true,
    }

});

const model=  mongoose.model('lesson',lessonSchema);

module.exports=model