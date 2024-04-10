import React, { useRef } from "react";
import "./RegistrationForm.css";
import { useState } from "react";

function RegistrationForm() {
  const [user, setUser] = useState({
    aadharNumber: "",
    password: "",
    confirmPassword: "",
    bloodGroup: "",
    otp: "",
  });

  const aadharNo = useRef();

  const validateOTP = async () => {
    const aadharNumber = aadharNo.current.value;
    console.log(aadharNumber);

    try {
      let response;
      fetch(`/api/v1/Patient-Tracker/sendOTPPatient`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ aadharNumber }),
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
    // console.log(data);
    try {
      let response;
      fetch("/api/v1/Patient-Tracker/signUpPatient", {
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
    <>
      <section className="details">
        <header id="box">Registration Form</header>

        <form id="infoform" onSubmit={handleSubmit} className="form">
          <div className="input-box">
            <label htmlFor="aadharNumber">Aadhar Number</label>
            <input
              ref={aadharNo}
              type="text"
              id="aadharNumber"
              name="aadharNumber"
              placeholder="Enter Aadhar Number"
              required
            />
          </div>
          <button id="generatebtn" type="button" onClick={validateOTP}>
            Generate OTP
          </button>

          <div className="column">
            <div className="input-box">
              <label htmlFor="password">Enter Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                required
              />
            </div>
            <div className="input-box">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm password"
                required
              />
            </div>
          </div>

          <div className="input-box">
            <label htmlFor="bloodGroup">Blood Group</label>
            <input
              type="text"
              id="bloodGroup"
              name="bloodGroup"
              placeholder="Enter Blood group"
              required
            />
          </div>
          <div className="input-box">
            <label htmlFor="otp">OTP</label>
            <input
              type="text"
              id="otp"
              name="otp"
              placeholder="Enter OTP"
              required
            />
          </div>

          <button id="formbtn" type="submit">
            Submit
          </button>
        </form>
      </section>
    </>
  );
}

export default RegistrationForm;
