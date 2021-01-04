import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import MainNavBar from "./components/NavBar/MainNavbar";
import CustomForm from "./components/CustomForm/CustomForm";
import CustomSideNav from "./components/CustomSideNav/CustomSideNav";
import { BrowserRouter as Router } from "react-router-dom";
function App() {
  let formProps = {
    title: "Add Product",
    fields: [
      {
        label: "Product Name",
        type: "text",
        changeAction: () => {
          console.log("Product Names change Action");
        }
      },
      {
        label: "Product Price",
        type: "tel",
        changeAction: () => {
          console.log("Price's change Action");
        }
      },
      {
        label: "Product Type",
        type: "select"
      },
      {
        label: "Options",
        type: "radio"
      }
    ]
  };

  let navProps = {
    color: "#985277",
    brandName: "Generic",
    links: [
      {
        name: "Link 1",
        url: "/home"
      },
      {
        name: "Link 2",
        url: "/login"
      },
      {
        name: "Link 3",
        url: "/about"
      }
    ]
  };

  return (
    <div>
      {/* <MainNavBar /> */}
      <Router>
        <CustomSideNav navProps={navProps} />
      </Router>
    </div>
  );
}

export default App;
