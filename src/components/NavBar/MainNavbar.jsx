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
import UpdateProductService from "../UpdateProduct/UpdateProductService/UpdateProductService";
import UpdateAdditionalPrice from "../UpdateProduct/UpdateAdditionalPrice/UpdateAdditionalPrice";

//icons
import UpdatePlan from "../UpdatePlan/UpdatePlan";
import UpdateBundle from "../UpdateBundle/UpdateBundle";
import serviceIcon from "../NavBar/icons/maintenance.svg";
import productIcon from "../NavBar/icons/delivery-box.svg";
import bundleIcon from "../NavBar/icons/hosting.svg";
import planIcon from "../NavBar/icons/planning.svg";
import productsIcon from "../NavBar/icons/stack.svg";
import addIcon from "../NavBar/icons/add.svg";
import putIcon from "../NavBar/icons/put-in-box.svg";

const navs = [
  {
    url: "/services",
    name: "services",
    icon: serviceIcon
  },
  {
    url: "/addproduct",
    name: "Add Product",
    icon: productIcon
  },
  {
    url: "/products",
    name: "Products",
    icon: productsIcon
  },
  {
    url: "/plans",
    name: "Add plan",
    icon: putIcon
  },
  {
    url: "/allplans",
    name: "All plans",
    icon: planIcon
  },
  {
    url: "/bundles",
    name: "Make Bundle",
    icon: putIcon
  },
  {
    url: "/allbundles",
    name: "All Bundles",
    icon: bundleIcon
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
            {navs.map(({ url, name, icon }) => (
              <li key={name}>
                <Link className="nli" to={url}>
                  <img className="menuicons" src={icon}></img>
                  &emsp;
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
      <Route path="/updateproduct" component={UpdateProductService}></Route>
      <Route path="/updateproduct" component={UpdateAdditionalPrice}></Route>
      <Route path="/updateplan" component={UpdatePlan}></Route>
      <Route path="/updatebundle" component={UpdateBundle}></Route>
    </Router>
  );
};

export default MainNavbar;
