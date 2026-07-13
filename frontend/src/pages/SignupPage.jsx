import "./signupPage.css";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();
  const [showEye, setshowEye] = useState(false);
  const [error, setError] = useState(""); // state variable to store the error message comming from the server

  // toggle password visibility
  function togglePassword() {
    setshowEye(!showEye);
  }

  // handle form submission
  async function handleSubmit(event) {
    event.preventDefault();
    // Add your form submission logic here

    const formDataObj = new FormData(event.target);
    const fullName = formDataObj.get("fullName");
    const email = formDataObj.get("email");
    const password = formDataObj.get("password");
    const confirmPassword = formDataObj.get("confirmPassword");

    const formData = {
      fullName,
      email,
      password,
      confirmPassword,
    };

    console.log("formData", formData);

    // sending a post request to the server with the form data

    try {
      const response = await fetch("https://airbnb-w9jq.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // <-- IMPORTANT
        body: JSON.stringify(formData),
      });

      const data = await response.json(); //it collect the all chunks of data comming from the server and concatenate them and then parse the data into js object format and return it
      console.log("data", data);
      if (data.success) {
        return navigate("/login"); // if the signup is successful then navigate to the login page
      }
      setError(data.message); // set the response comming from the server in the state variable
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // now we have show the response comming from the server in the UI, for that we will use a state variable to store the response and then show it in the UI
  return (
    <div className="signup-page">
      <div className="signup-box">
        <div className="logo-section">
          <h1>AirStay</h1>
          <p>Find your perfect stay anywhere in the world.</p>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          <p style={{ color: "red" }} className="error-message">
            {error}
          </p>
          <h2>Create Account</h2>

          <input type="text" placeholder="Full Name" name="fullName" />

          <input type="text" placeholder="Email Address" name="email" />

          <input
            type={showEye ? "text" : "password"}
            placeholder="Password"
            name="password"
          />
          <input
            type={showEye ? "text" : "password"}
            placeholder="Confirm Password"
            name="confirmPassword"
          />

          {showEye ?
            <FaEye
              onClick={togglePassword}
              className="eye-icon"
              style={{ position: "absolute", top: "340px", left: "1050px" }}
            />
          : <FaEyeSlash
              onClick={togglePassword}
              className="eye-icon"
              style={{ position: "absolute", top: "340px", left: "1050px" }}
            />
          }

          <button type="submit">Sign Up</button>

          <p className="login-text">
            Already have an account?
            <Link to="/login"> Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
