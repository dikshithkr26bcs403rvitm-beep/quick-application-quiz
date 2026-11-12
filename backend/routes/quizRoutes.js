const router=require("express").Router(), Quiz=require("../models/Quiz"), {protect,adminOnly}=require("../middleware/auth");
router.get("/",protect,async(req,res)=>{
 const qs=await Quiz.find(req.user.role==="admin"?{}:{isPublished:true}).sort({createdAt:-1});
 res.json(qs.map(q=>({_id:q._id,title:q.title,subject:q.subject,description:q.description,durationMinutes:q.durationMinutes,passPercentage:q.passPercentage,isPublished:q.isPublished,questionCount:q.questions.length,totalMarks:q.questions.reduce((s,x)=>s+x.marks,0)})));
});
router.get("/:id",protect,async(req,res)=>{
 const q=await Quiz.findById(req.params.id);if(!q)return res.status(404).json({message:"Exam not found."});
 if(!q.isPublished&&req.user.role!=="admin")return res.status(403).json({message:"Exam not published."});
 const out=q.toObject();if(req.user.role!=="admin")out.questions=out.questions.map(({correctAnswer,...x})=>x);res.json(out);
});
router.post("/",protect,adminOnly,async(req,res)=>{
 try{const q=await Quiz.create(req.body);res.status(201).json(q);}
 catch(e){res.status(400).json({message:"Check title, subject and at least one complete question.",detail:e.message});}
});
router.put("/:id",protect,adminOnly,async(req,res)=>{
 try{const q=await Quiz.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});if(!q)return res.status(404).json({message:"Exam not found."});res.json(q);}
 catch(e){res.status(400).json({message:e.message});}
});
router.delete("/:id",protect,adminOnly,async(req,res)=>{const q=await Quiz.findByIdAndDelete(req.params.id);if(!q)return res.status(404).json({message:"Exam not found."});res.json({message:"Deleted."});});
module.exports=router;
