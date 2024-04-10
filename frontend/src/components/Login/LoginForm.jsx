import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import LoginIcon from "../../assets/LoginIcon.jpg";
import OTPForm from "../Otp/OTPForm";
import RegistrationForm from "../Register/RegistrationForm";
// import { useHistory } from "react-router-dom";

let role;
let user;

const LoginForm = () => {
  const email = useRef(); // Define email ref here
  const password = useRef();
  const navigate = useNavigate();
  // const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const emailValue = email.current.value;
      const passwordValue = password.current.value;
      // const response = await fetch(
      //   `http://localhost:1805/api/v1/Patient-Tracker/login`,
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ email: emailValue, password: passwordValue }),
      //     credentials: "include",
      //   }
      // );
      let response;
      fetch("/api/v1/Patient-Tracker/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailValue, password: passwordValue }),
        credentials: "include",
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("Result:", res);
          user = res.user;
          role = res.user.role;
          console.log(role);
          if (role === "Admin") {
            navigate("/adminprofile");
          } else if (role === "Patient") {
            navigate("/patientprofile");
          } else {
            navigate("/hospitalprofile");
          }
          // navigate("/profile");
        });
      // navigate("/profile");
      console.log("Logged in successfully");
      // console.log(await response.json());
    } catch (error) {
      console.log("Login Error: ", error);
    }
  };

  return (
    <section id="login">
      <form name="form-login" onSubmit={handleSubmit}>
        <img src={LoginIcon} id="icon" alt="User Icon" />
        <span className="fontawesome-user">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-envelope"
            viewBox="0 0 16 16"
          >
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
          </svg>
        </span>
        <input
          ref={email}
          type="text"
          id="email"
          placeholder="Email"
          required
        />

        <span className="fontawesome-lock">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-person-lock"
            viewBox="0 0 16 16"
          >
            <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m0 5.996V14H3s-1 0-1-1 1-4 6-4q.845.002 1.544.107a4.5 4.5 0 0 0-.803.918A11 11 0 0 0 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664zM9 13a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1" />
          </svg>
        </span>
        <input
          ref={password}
          type="password"
          id="pass"
          placeholder="Password"
          required
        />

        <input type="submit" value="Login" />

        <div id="registerhere">
          <Link to="/register" style={{ color: "purple" }}>
            {/* style={{ color: 'blue', textDecoration: 'none' }} */}
            Register Here
          </Link>
        </div>
      </form>
    </section>
  );
};

export { user };
export default LoginForm;
