import React, { useEffect, useState } from "react";
import "./TopNavbarStyles.css";
import { MuviLogo } from "..";

function TopNavbar() {
  const [hideNavbar, setHideNavbar] = useState(false);

  const getScrollValue = () => {
    var y = window.scrollY;
    setHideNavbar(y > 40);
  };

  useEffect(() => {
    document.addEventListener("scroll", getScrollValue);
    return function cleanup() {
      document.removeEventListener("scroll", getScrollValue);
    };
  }, []);

  return (
    <div
      style={{ top: hideNavbar ? "-100px" : 0 }}
      className={"top-navbar-container flex-row "}
    >
      <span className={"flex-row flex-center"}>
        <MuviLogo width={100} />
        <h4 style={{ marginLeft: 10 }}>Blocks of joy</h4>
      </span>
    </div>
  );
}

export default TopNavbar;
