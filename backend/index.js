const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoute = require("./Routes/userRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv.config();
const app = express();

// middle are registration
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
); //it will allow the cross origin request from the frontend to the backend
app.use(cookieParser());
app.use(express.json());
app.use(userRoute);
const port = process.env.port || 3000;
//connecting with mongo db atlas
async function connect_with_mogodb() {
  try {
    const promise = await mongoose.connect(process.env.mongodb_cloud_server);
    console.log("connected with mongodb server ");
    app.listen(port, () => {
      console.log(`server is listning at http://localhost:${port}`);
    });
  } catch (error) {
    console.log("error while connecting with mongo db server:", error);
  }
}

connect_with_mogodb();
