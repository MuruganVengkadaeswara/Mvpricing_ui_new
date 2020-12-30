import React, { useState } from "react";
import { Navbar, Nav, NavLink } from "react-bootstrap";
import brand from "./icons/price-tag.svg";
import menuicon from "./icons/menu.svg";
import "./navbar.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
  Switch
} from "react-router-dom";
import AddService from "../AddService/AddService";
import AddProduct from "../AddProduct/AddProduct";
import AllServices from "../AllServices/AllServices";
import AddPlan from "../AddPlan/AddPlan";
import AddBundle from "../AddBundle/AddBundle";
import AllProducts from "../AllProducts/AllProducts";
import AllBundles from "../AllBundles/AllBundles";
import AllPlans from "../AllPlans/AllPlans";
import UpdateProduct from "../UpdateProduct/UpdateProduct";
import HomeContents from "../HomeContents/HomeContents";

const navs = [
  {
    url: "/services",
    name: "services"
  },
  {
    url: "/addproduct",
    name: "Add Product"
  },
  {
    url: "/products",
    name: "Products"
  },
  {
    url: "/plans",
    name: "Add plan"
  },
  {
    url: "/allplans",
    name: "All plans"
  },
  {
    url: "/bundles",
    name: "Make Bundle"
  },
  {
    url: "/allbundles",
    name: "All Bundles"
  }
];

const MainNavbar = props => {
  const [sidenavstate, setsidenavstate] = useState({
    menuStatus: "open",
    style: "menu active"
  });

  const handleclick = () => {
    switch (sidenavstate.menuStatus) {
      case "closed":
        setsidenavstate({
          menuStatus: "open",
          style: "menu active"
        });
        break;
      case "open":
        setsidenavstate({
          menuStatus: "closed",
          style: "menu "
        });
        break;
      default:
    }
  };

  return (
    <Router>
      <div>
        <Navbar variant="dark" expand="lg" className="nbar">
          <div className="row">
            <div className="ml-4 mt-2">
              <img
                src={menuicon}
                className="brandlogo"
                alt=""
                onClick={handleclick}
              ></img>
            </div>
            <div>
              <div className="offset-md-3">
                <Link to="/">
                  <Navbar.Brand>
                    <strong className="maint">Onebill</strong>
                    &nbsp;
                    <span className="subt d-none d-sm-block">
                      (pricing solutions)
                    </span>
                  </Navbar.Brand>
                </Link>
              </div>
            </div>
          </div>
          <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
          <Nav className="mr-auto"></Nav>
        </Navbar>
        <div className={sidenavstate.style}>
          <ul>
            {navs.map(({ url, name }) => (
              <li key={name} >
                <Link className="nli" to={url}>
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Route exact path="/" component={HomeContents}></Route>
      <Route path="/services" component={AddService}></Route>
      <Route path="/services" component={AllServices}></Route>
      <Route path="/addproduct" component={AddProduct}></Route>
      <Route path="/products" component={AllProducts}></Route>
      <Route path="/plans" component={AddPlan}></Route>
      <Route path="/bundles" component={AddBundle}></Route>
      <Route path="/Allbundles" component={AllBundles}></Route>
      <Route path="/allplans" component={AllPlans}></Route>
      <Route path="/updateproduct" component={UpdateProduct}></Route>
    </Router>
  );
};

export default MainNavbar;
