import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import AddPlanExistingProduct from "./AddPlanExistingProduct/AddPlanExistingProduct";
import AddPlanNew from "./AddPlanNewProd/AddPlanNew";

const AddPlan = props => {
  const [ele, setEle] = useState(
    <Alert
      variant="info"
      className="mt-5"
      style={{ fontSize: "larger", textAlign: "center" }}
    >
      Choose One
    </Alert>
  );

  return (
    <div className="card card-body col-md-8 offset-md-2 mt-5">
      <h2>
        <strong>Add Plan</strong>
      </h2>
      <hr></hr>
      <div>
        <Button
          variant="info"
          className="offset-md-2"
          onClick={() => {
            setEle(<AddPlanExistingProduct />);
          }}
        >
          Add Plan With existing product
        </Button>
        <Button
          variant="success"
          className="offset-md-2"
          onClick={() => {
            setEle(<AddPlanNew />);
          }}
        >
          Add Plan with new Product
        </Button>
      </div>
      <div>{ele}</div>
    </div>
  );
};

export default AddPlan;
