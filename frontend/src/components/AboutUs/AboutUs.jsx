import React from "react";
import "./AboutUs.css";

function AboutUs() {
  return (
    <div className="about-us-container">
      <h2>About Us</h2>
      <p>
        Welcome to Patient Tracker - your trusted platform for managing patient
        medical records and finding blood availability in your local community.
      </p>

      <h3>Our Mission</h3>
      <p>
        At Patient Tracker, our mission is to provide a seamless experience for
        healthcare professionals and patients alike, ensuring efficient
        management of medical records and facilitating access to life-saving
        blood supplies.
      </p>

      <h3>What We Offer</h3>
      <p>
        Patient Tracker offers a user-friendly interface for healthcare
        providers to securely store and access patient records. Additionally,
        our blood availability feature allows users to search for blood donors
        and blood banks in specific talukas or districts, making it easier to
        find blood in times of need.
      </p>

      <h3>Contact Us</h3>
      <p>
        For inquiries or assistance, please feel free to contact us:
        <br />
        Email: contact@patienttracker.com
        <br />
        Phone: +1 (123) 456-7890
        <br />
        Address: Samras Boys Hostel, Bhavnagar, India
      </p>
    </div>
  );
}

export default AboutUs;
