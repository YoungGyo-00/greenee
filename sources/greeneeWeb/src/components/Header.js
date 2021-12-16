import React from "react";
import logo from "../styles/img/logo.png";

const Header = () => {
  return (
    <header>
      <div className="header">
        <img src={logo} alt="GREENEE_logo" />
      </div>
    </header>
  );
};

export default Header;
