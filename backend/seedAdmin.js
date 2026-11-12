require("dotenv").config();
const mongoose=require("mongoose"),bcrypt=require("bcryptjs"),User=require("./models/User");
(async()=>{try{
 if(!process.env.MONGODB_URI||!process.env.ADMIN_EMAIL||!process.env.ADMIN_PASSWORD)throw new Error("Set MongoDB URI and admin details in .env");
 await mongoose.connect(process.env.MONGODB_URI);
 const email=process.env.ADMIN_EMAIL.toLowerCase().trim(),password=await bcrypt.hash(process.env.ADMIN_PASSWORD,12);
 const u=await User.findOneAndUpdate({email},{name:process.env.ADMIN_NAME||"College Admin",email,password,role:"admin"},{upsert:true,new:true});
 console.log("Admin ready:",u.email);
}catch(e){console.error(e.message);process.exitCode=1;}finally{await mongoose.disconnect();}})();
