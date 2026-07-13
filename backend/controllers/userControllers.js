const signupRegisterClass = require("../model/signupRegisterModel");
const genToken = require("../config/token");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// submit signup controller
async function submitSignupForm(req, res) {
  // step 1:get the signup data from the request body
  const { fullName, email, password, confirmPassword } = req.body;
  console.log("signup data from request body:", req.body);

  // step02  validate the data

  // 1) basic validation: check if all fields are filled

  if (!fullName || !email || !password || !confirmPassword) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  // 2) emai validation: check if the email is valid using regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email address expected format: user@domain.com",
    });
  }

  // 3) password validation: check if the password is at least 8 characters long and contains at least one uppercase letter, one lowercase letter, one number, and one special character
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      success: false,
      message:
        "Invalid password. It must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    });
  }

  // 4) confirm password validation: check if the password and confirm password match
  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ success: false, message: "Passwords do not match" });
  }

  try {
    // step 5: check if the email already exists in the database
    const existingUser = await signupRegisterClass.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "you have already signed up with this email, please login",
      });
    }

    // encrypt the password
    let hassPassword = await brcypt.hash(password, 10);

    //step-3 store the sign up data in mongodb  but make sure password should be hashed
    const userObject = new signupRegisterClass({
      name: fullName,
      email,
      password: hassPassword,
    });

    const user = await userObject.save();
    console.log("successfuly saved a signup data in mongodb atlas:", user);

    // genrate a tokern
    let token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure:process.env.node_environment === "production",
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({ success: true, message: user });
  } catch (error) {
    console.log("internal server error", error);
    return res.status(500).json({
      success: false,
      message: "some thing went wrong please try later",
    });
  }
}

// submit login controller
// submit login controller
async function submitLoginForm(req, res) {
  console.log(req.body);

  // Step 1: Get login data
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email address. Expected format: user@domain.com",
    });
  }

  // Password validation
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      success: false,
      message:
        "Password must be at least 8 characters long and contain one uppercase letter, one lowercase letter, one number, and one special character.",
    });
  }

  try {
    // Check if user exists
    const foundUser = await signupRegisterClass.findOne({ email });

    if (!foundUser) {
      return res.status(400).json({
        success: false,
        message: "User does not exist with this email.",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, foundUser.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password.",
      });
    }

    // Generate JWT token
    const token = await genToken(foundUser._id);
    console.log("token2:", token);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // false on localhost
      sameSite: "none", // use "lax" for localhost
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Internal server error:", error);

    return res.status(500).json({
      success: false,
      message: "Oops! Something went wrong. Please try again later.",
    });
  }
}
//logout controller
async function logoutUser(req, res) {
  res.clearCookie("token");
  return res.status(200).json({ success: true, message: "logout successful" });
}

//get current user
async function getCurrentUser(req, res) {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "user doesn't have token" });
    }

    let verifyToken = jwt.verify(token, process.env.JWT_SECRET); //Reads the Header,Reads the Payload.Uses the same Secret Key. Recalculates the signature using:

    if (!verifyToken) {
      return res
        .status(400)
        .json({ success: false, message: "user doesn't have valid token" });
    }

    const user = await signupRegisterClass
      .findById(verifyToken.userId)
      .select("-password");

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "user doesn't found" });
    }

    res.status(200).json({ success: true, user: user });
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ success: "false", message: "internal server error" });
  }
}

module.exports = {
  submitSignupForm,
  submitLoginForm,
  logoutUser,
  getCurrentUser,
};
