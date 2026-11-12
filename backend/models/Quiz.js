const mongoose = require("mongoose");
const question = new mongoose.Schema({
  questionText:{type:String,required:true},
  options:{type:[String],validate:v=>v.length===4 && v.every(x=>String(x).trim())},
  correctAnswer:{type:Number,required:true,min:0,max:3},
  marks:{type:Number,default:1,min:0.25},
  negativeMarks:{type:Number,default:0,min:0}
});
const schema = new mongoose.Schema({
  title:{type:String,required:true},
  subject:{type:String,enum:["OOPS","DSA","PDS","DDCO"],required:true},
  description:{type:String,default:""},
  instructions:{type:String,default:"Read carefully. You can navigate and submit when finished."},
  durationMinutes:{type:Number,default:30,min:1,max:180},
  passPercentage:{type:Number,default:40,min:0,max:100},
  isPublished:{type:Boolean,default:false},
  questions:{type:[question],validate:v=>v.length>0}
},{timestamps:true});
module.exports = mongoose.model("Quiz",schema);
