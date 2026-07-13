const jwt=require("jsonwebtoken") 
async function genToken(userId)
{

         try {
           let token= await jwt.sign({userId},process.env.jwt_secret,{expiresIn:"7d"})
           return token
          }catch(error) {
                console.log("error while generating a token",error) 
                throw new Error(error)
          }

 }

 module.exports=genToken