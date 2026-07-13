const multer=require("multer")

let storage=multer.diskStorage({
  destination:(req,file,cb)=>{
       cb(null,"./public")
  },
  filename:(req,file,cb)=>{
     cb(null,file.file.originalname)

  }
})//it will return the  storage object

const upload=multer({storage}) //returns a Multer middleware object.

module.exports=upload