const mongoose=require("mongoose")

const signupRegisterSchema=mongoose.Schema({
    name:{
      type:String,
      require:true
    },

    email:{
      type:String,
      require:true
    },

    password:{
      type:String,
      require:true
    }
    
},{timestamps:true})

const signupRegisterClass=mongoose.model("signupRegisterCollection",signupRegisterSchema)

module.exports=signupRegisterClass