import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Nav.css";
import Logout from "../Logout/Logout";

function Nav() {
  // const navItems = [
  //   {
  //     name: "Home",
  //     auth: true,
  //   },
  //   {
  //     name: "PROFILE",
  //     auth: true,
  //   },
  //   {
  //     name: "BLOOD SEARCH",
  //     auth: true,
  //   },
  //   {
  //     name: "CONTACT",
  //     auth: true,
  //   },
  //   {
  //     name: "LOGIN",
  //     auth: false,
  //   },
  //   {
  //     name: "REGISTER",
  //     auth: false,
  //   },
  // ];
  return (
    <div className="navigation">
      <ul>
        {/* {navItems.map((item)=>item.auth ? <li>{item.name}</li> : null)} */}
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block py-2 pr-4 pl-3 duration-200 ${
                isActive ? "text-orange-700" : "text-gray-700"
              } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
            }
          >
            Home
          </NavLink>
          {/* <Link to="/">HOME</Link> */}
        </li>
        <li>
          <Link to="/profile">PROFILE</Link>
        </li>
        <li>
          <Link to="/bloodsearch">BLOOD SEARCH</Link>
        </li>
        <li>
          <Link to="/aboutus">ABOUT US</Link>
        </li>
        <li>
          <Link to="/login">LOGIN</Link>
        </li>
        <li>
          <Link to="/register">REGISTER</Link>
        </li>
        <Logout />
      </ul>
    </div>
  );
}

export default Nav;
