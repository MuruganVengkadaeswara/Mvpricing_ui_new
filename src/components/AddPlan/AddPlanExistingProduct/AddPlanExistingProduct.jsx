import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import productDataService from "/home/mv/Desktop/onebillpricing_ui_new/src/components/Services/ProductDataService.js";
import PlanDataService from "/home/mv/Desktop/onebillpricing_ui_new/src/components/Services/PlanDataService.js";
const AddPlanExistingProduct = (props) => {
  const [plan, setPlan] = useState();
  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState();

  useEffect(() => {
    productDataService
      .getAllProducts()
      .then((res) => {
        setProducts(res.data.response);
      })
      .catch((res) => {
        setAlert(<Alert variant="danger">unable to connect</Alert>);
      });
  }, []);

  const addPlan = (e) => {
    e.preventDefault();
    console.log(plan);
    PlanDataService.addPlan(plan)
      .then((res) => {
        setAlert(<Alert variant="success">Plan Added Successfully</Alert>);
      })
      .catch((res) => {
        setAlert(<Alert variant="danger">Unable to add plan</Alert>);
      });
  };

  return (
    <div>
      <div className="col-md-10 offset-1 mt-5 card card-body">
        <Form onSubmit={addPlan} name="planForm">
          {alert}
          <Form.Group>
            <Form.Label>
              <h5>
                <strong>Plan Name</strong>
              </h5>
            </Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                const val = e.target.value;
                setPlan((prevState) => {
                  return { ...prevState, planName: val };
                });
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              <h5>
                <strong>Plan Type</strong>
              </h5>
            </Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => {
                const val = e.target.value;
                setPlan((prevState) => {
                  return { ...prevState, planType: val };
                });
              }}
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
              <option value="weekly">Weekly</option>
              <option value="daily">Daily</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              <h5>
                <strong>Choose Product</strong>
              </h5>
            </Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => {
                const val = e.target.value;
                setPlan((prevState) => {
                  return { ...prevState, productId: val };
                });
              }}
            >
              <option disabled>Select</option>
              {products.map((product) => {
                return (
                  <option value={product.productId}>
                    {product.productName}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
          <Button
            size="lg"
            variant="success"
            className="offset-md-5"
            type="submit"
          >
            <h5>
              <strong>Add</strong>
            </h5>
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddPlanExistingProduct;
