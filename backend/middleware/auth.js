const jwt=require("jsonwebtoken"), User=require("../models/User");
async function protect(req,res,next){
 try{
  const h=req.headers.authorization||"", token=h.startsWith("Bearer ")?h.slice(7):null;
  if(!token)return res.status(401).json({message:"Please log in."});
  const d=jwt.verify(token,process.env.JWT_SECRET), u=await User.findById(d.id).select("-password");
  if(!u)return res.status(401).json({message:"Account not found."});
  req.user=u;next();
 }catch(e){return res.status(401).json({message:"Session expired. Log in again."});}
}
function adminOnly(req,res,next){if(req.user?.role!=="admin")return res.status(403).json({message:"Admin only."});next();}
module.exports={protect,adminOnly};
