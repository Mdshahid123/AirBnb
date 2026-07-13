const mongoose=require("mongoose")
const listingSchema=new mongoose.Schema({
     title:{
        type:String,
        required:true,
     },
     description:{
        type:String,
        required:true
     },
     host:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
     },
     image1:{
        type:String,
        required:true
     },
     image2:{
        type:String,
        required:true
     },
     image3:{
        type:String,
        required:true
     },
     rent:{
        type:Number,
        required:true
     },
     city:{

     },
     landMark:{
        type:String,
        require:True
     },
     category:{
         type:String,
         required:true
     },
     isBooked:{
      type:Boolean,
      default:false
     }
},{timestamps:true})

const listingClass=mongoose.model("Listing",listingSchema)
module.exports=listingClass