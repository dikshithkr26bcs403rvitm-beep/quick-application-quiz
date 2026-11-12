const router=require("express").Router(), Attempt=require("../models/Attempt"), Quiz=require("../models/Quiz"), {protect,adminOnly}=require("../middleware/auth");
router.post("/:quizId/submit",protect,async(req,res)=>{
 try{
  const q=await Quiz.findById(req.params.quizId);if(!q||(!q.isPublished&&req.user.role!=="admin"))return res.status(404).json({message:"Exam not found."});
  const answers=Array.isArray(req.body.answers)?req.body.answers:[];let score=0,correct=0,wrong=0,blank=0;
  const saved=q.questions.map((item,i)=>{
   const a=answers.find(x=>Number(x.questionIndex)===i), n=a?Number(a.selectedOption):-1;
   if(!Number.isInteger(n)||n<0||n>3){blank++;return {questionIndex:i,selectedOption:-1};}
   if(n===item.correctAnswer){score+=item.marks;correct++;}else{score-=item.negativeMarks;wrong++;}
   return {questionIndex:i,selectedOption:n};
  });
  const total=q.questions.reduce((s,x)=>s+x.marks,0);score=Math.max(0,Math.round(score*100)/100);
  const percentage=total?Math.round(score/total*10000)/100:0,passed=percentage>=q.passPercentage;
  const attempt=await Attempt.create({student:req.user._id,quiz:q._id,answers:saved,score,totalMarks:total,percentage,correctCount:correct,incorrectCount:wrong,unansweredCount:blank,passed});
  res.status(201).json({attemptId:attempt._id,score,totalMarks:total,percentage,correctCount:correct,incorrectCount:wrong,unansweredCount:blank,passed});
 }catch(e){res.status(500).json({message:e.message});}
});
router.get("/mine",protect,async(req,res)=>res.json(await Attempt.find({student:req.user._id}).populate("quiz","title subject").sort({submittedAt:-1})));
router.get("/all",protect,adminOnly,async(req,res)=>res.json(await Attempt.find().populate("student","name email").populate("quiz","title subject").sort({submittedAt:-1})));
router.get("/leaderboard",protect,async(req,res)=>{
 const data=await Attempt.aggregate([
 {$group:{_id:"$student",attempts:{$sum:1},average:{$avg:"$percentage"},best:{$max:"$percentage"}}},{$sort:{best:-1,average:-1}},{$limit:20},
 {$lookup:{from:"users",localField:"_id",foreignField:"_id",as:"u"}},{$unwind:"$u"},
 {$project:{name:"$u.name",attempts:1,average:{$round:["$average",1]},best:{$round:["$best",1]}}}
 ]);res.json(data);
});
module.exports=router;
