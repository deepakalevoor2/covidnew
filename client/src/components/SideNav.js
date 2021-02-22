import React from "react";
import "./sidenav.css";

const SideNav = () => {
  return (
    <div>
      <div class="ui visible sidebar inverted vertical menu">
        <a class="item">Insights</a>
        <a class="item">Entry</a>
        <a class="item">Patient Status</a>
        <a class="item">Exit</a>
      </div>
    </div>
  );
};

export default SideNav;
