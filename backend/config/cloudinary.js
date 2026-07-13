// Require the cloudinary library
const cloudinary = require('cloudinary').v2;

const fs=require("fs")

// Return "https" URLs by setting secure: true
cloudinary.config({secure: true});

// Log the configuration
console.log(cloudinary.config());

