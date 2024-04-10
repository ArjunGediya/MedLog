import React from "react";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="copyright">
      <p>&copy; 2024 Patient Tracker. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;
