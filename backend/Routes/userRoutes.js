const express=require("express")
const {submitSignupForm,submitLoginForm,logoutUser, getCurrentUser} = require("../controllers/userControllers")
const isAuth=require("../middleware/isAuth")
const userRoute=express.Router()

// signup routes
userRoute.post("/signUp",submitSignupForm)

// login routes
userRoute.post("/login",submitLoginForm)

// logout route
userRoute.get("/logout",logoutUser)

//current user Routes
// userRoute.get("/currentUser",isAuth,getCurrentUser)

// current user 

userRoute.get("/currentUser",getCurrentUser)

module.exports=userRoute

