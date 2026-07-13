import "./loginPage.css";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    const formObj = new FormData(e.target);
    const email = formObj.get("email");
    const password = formObj.get("password");

    const formData = {
      email,
      password,
    };
    const api = "https://airbnb-w9jq.onrender.com/login";
    try {
      const port = "localhost:3000/login";
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include", // <-- IMPORTANT
        body: JSON.stringify(formData),
      });
      const data = await response.json(); //it collect the all chunks of data comming from the server and concatenate them and then parse the data into js object format and return it

      console.log("data", data);

      if (data.success) {
        return navigate("/");
      }

      setError(data.message);
      console.log(data.message);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-left">
          <h1>AirStay</h1>
          <p>
            Welcome back! Sign in and continue exploring amazing stays around
            the world.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <p style={{ color: "red" }}>{error}</p>
          <h2>Welcome Back</h2>
          <p className="subtitle">Login to your account</p>

          <input type="email" placeholder="Email Address" name="email" />

          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
            />

            {showPassword ?
              <FaEye
                className="eye-icon"
                onClick={() => setShowPassword(false)}
              />
            : <FaEyeSlash
                className="eye-icon"
                onClick={() => setShowPassword(true)}
              />
            }
          </div>

          <div className="login-options">
            <label>
              <input name="rem" type="checkbox" />
              Remember me
            </label>

            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit">Login</button>

          <p className="signup-text">
            Don't have an account?
            <Link to="/signup"> Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
export default LoginPage;
