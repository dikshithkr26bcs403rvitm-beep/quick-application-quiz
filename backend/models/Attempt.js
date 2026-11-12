const mongoose = require("mongoose");
const schema = new mongoose.Schema({
 student:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
 quiz:{type:mongoose.Schema.Types.ObjectId,ref:"Quiz",required:true},
 score:Number,totalMarks:Number,percentage:Number,correctCount:Number,incorrectCount:Number,unansweredCount:Number,passed:Boolean,
 answers:[{questionIndex:Number,selectedOption:Number}],submittedAt:{type:Date,default:Date.now}
},{timestamps:true});
module.exports = mongoose.model("Attempt",schema);
