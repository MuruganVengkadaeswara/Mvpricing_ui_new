import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./customsidenav.css";
import { Link, NavLink } from "react-router-dom";

const CustomSideNav = props => {
  const [sidenavstyle, setSidenavstyle] = useState({
    style: "sidenav active",
    status: "open"
  });

  const navColor = {
    backgroundColor: props.navProps.color
  };

  return (
    <div>
      <Navbar className="nav" style={navColor}>
        <div
          onClick={() => {
            if (sidenavstyle.status == "open") {
              setSidenavstyle(prevState => {
                return { ...prevState, style: "sidenav", status: "closed" };
              });
            } else if (sidenavstyle.status == "closed") {
              setSidenavstyle(prevState => {
                return {
                  ...prevState,
                  style: "sidenav active",
                  status: "open"
                };
              });
            }
          }}
        >
          <div className="icon"></div>
          <div className="icon"></div>
          <div className="icon"></div>
        </div>
        <Navbar.Brand>
          <div>{props.navProps.brandName}</div>
        </Navbar.Brand>
      </Navbar>
      <div className={sidenavstyle.style} style={navColor}>
        <ul>
          {props.navProps.links.map(link => {
            return <Link to={link.url}>{link.name}</Link>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default CustomSideNav;
