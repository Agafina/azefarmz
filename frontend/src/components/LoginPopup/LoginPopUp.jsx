import React, { useContext, useState } from "react";
import "./LoginPopUp.css";
import { assets } from "../../assets/assets";
import { AuthContext } from "../../context/AuthContext"; // Import the AuthContext
function LoginPopUp({ setShowLogin }) {
  const { login, register, error } = useContext(AuthContext); // Get login and register from context
  const [currentState, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (currentState === "Login") {
      // Call the login function from the AuthContext
      await login(data.email, data.password);
    } else {
      // Call the register function from the AuthContext
      await register(data.name, data.email, data.password);
    }

    setShowLogin(false); // Close the login popup after login/register
  };

  return (
    <div className="login-popup">
      <form action="" onSubmit={onSubmit} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            onClick={() => {
              setShowLogin(false);
            }}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-input">
          {currentState === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              onChange={onChangeHandler}
              value={data.name}
              placeholder="Your name"
              name="name"
              required
            />
          )}
          <input
            onChange={onChangeHandler}
            value={data.email}
            name="email"
            type="email"
            placeholder="Your Email"
            required
          />
          <input
            onChange={onChangeHandler}
            value={data.password}
            name="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms and conditions</p>
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">
          {currentState === "Sign up" ? "Create Account" : "Login"}
        </button>
        {currentState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrentState("Sign up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
}

export default LoginPopUp;
