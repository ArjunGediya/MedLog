import React from "react";
import "./Admin.css";
import Profile from "../../assets/Profile.png";
import { useRef } from "react";

function Admin() {
  const emailRef = useRef();

  const sendOTP = async () => {
    const email = emailRef.current.value;
    console.log(email);

    try {
      let response;
      fetch(`/api/v1/Patient-Tracker/Admin/sendOTPHospital`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
        });
    } catch (error) {
      console.log("OTP Validation Error: ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    try {
      // let response;
      fetch("/api/v1/Patient-Tracker/Admin/signUpHospital", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
        });
    } catch (error) {
      console.log("Registration Error: ", error);
    }
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <div id="profile">
            <img src={Profile} alt="profile" />
          </div>
        </div>
        <div className="info">ADMIN</div>
        <ul className="sidebar-list ">
          <li className="sidebar-list-item">
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-home"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span>Dashboard</span>
            </a>
          </li>
          <li className="sidebar-list-item active">
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-door-open-fill"
                viewBox="0 0 16 16"
              >
                <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15zM11 2h.5a.5.5 0 0 1 .5.5V15h-1zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1" />
              </svg>
              <span>Hospital Registration</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="app-content">
        <div className="heading">Hospital Registration</div>
        <form id="hospitalregister" onSubmit={handleSubmit}>
          <div className="input_field">
            <input
              type="text"
              name="licenseNumber"
              id="ln"
              placeholder="License Number"
              required
            />
          </div>
          <div className="input_field">
            <input
              type="text"
              name="name"
              id="hn"
              placeholder="Hospital Name"
              required
            />
          </div>
          <div className="input_field">
            <input
              id="p"
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          <div className="input_field">
            <input
              id="cp"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
            />
          </div>
          <div className="input_field">
            <input
              id="cn"
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              required
            />
          </div>
          <div className="generateotp">
            <div id="email" className="input_field">
              <input
                id="e"
                ref={emailRef}
                type="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <button id="otpbt" type="button" onClick={sendOTP}>
              Send OTP
            </button>
          </div>
          <div className="input_field">
            <input id="o" type="text" name="otp" placeholder="OTP" required />
          </div>
          <div className="input_field">
            <input
              id="t"
              type="text"
              name="taluka"
              placeholder="Taluka"
              required
            />
          </div>
          <div className="input_field">
            <input
              id="d"
              type="text"
              name="district"
              placeholder="District"
              required
            />
          </div>
          <div className="input_field">
            <input
              id="s"
              type="text"
              name="state"
              placeholder="State"
              required
            />
          </div>
          <input className="button" type="submit" value="Register" />
        </form>
      </div>
    </div>
  );
}

export default Admin;
