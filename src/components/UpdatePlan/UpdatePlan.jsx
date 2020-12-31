import React, { useEffect, useState } from "react";
import PlanDataService from "../Services/PlanDataService";
import { Alert, Form, Button } from "react-bootstrap";
import axios from "axios";

const UpdatePlan = props => {
  let id = props.location.id;

  const [plan, setPlan] = useState({
    planName: "",
    planType: "",
    product: "",
    planId: ""
  });

  const [upPlan, setUpPlan] = useState({
    planName: "",
    planType: "",
    planId: "",
    productId: ""
  });

  const [alert, setAlert] = useState();

  const updatePlan = () => {
    console.log(upPlan);
    PlanDataService.updatePlan(upPlan)
      .then(res => {
        setAlert(<Alert variant="success">Plan Updated Successfully</Alert>);
        setTimeout(() => {
            props.history.push({
                pathname:"/allplans"
            })
        }, 1000);
      })
      .catch(res => {
        setAlert(<Alert variant="danger">{res.response.data.response}</Alert>);
      });
  };

  useEffect(() => {
    PlanDataService.getPlanById(id)
      .then(res => {
        console.log(res.data.response);
        setPlan(res.data.response);
        setUpPlan(prevState => {
          return {
            ...prevState,
            planId: res.data.response.planId,
            productId: res.data.response.productId
          };
        });
      })
      .catch(res => {
        setAlert(<Alert variant="danger">unable to fetch plan</Alert>);
      });
  }, []);

  return (
    <div className="col-md-8 offset-md-2 card card-body mt-5">
      <h2>Update Plan</h2>
      {alert}
      <hr></hr>
      <h4>Plan Id : {plan.planId}</h4>
      <div>
        <h4>Plan Product : {plan.product.productName} </h4>
        <Button
          className="offset-md-10"
          variant="info"
          onClick={() => {
            props.history.push({
              pathname: "/updateproduct",
              id: plan.productId
            });
          }}
        >
          Update Plan Product
        </Button>
      </div>

      <hr></hr>
      <Form.Group>
        <Form.Label>Plan Name</Form.Label>
        <Form.Control
          type="text"
          defaultValue={plan.planName}
          onChange={e => {
            const val = e.target.value;
            setUpPlan(prevState => {
              return { ...prevState, planName: val };
            });
          }}
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>
          <h4>Plan Type : </h4>
        </Form.Label>
        <Form.Control
          as="select"
          onChange={e => {
            const val = e.target.value;
            setUpPlan(prevState => {
              return { ...prevState, planType: val };
            });
          }}
        >
          <option disabled>select</option>
          <option value="monthly">monthly</option>
          <option value="yearly">yearly</option>
          <option value="weekly">weekly</option>
          <option value="daily">daily</option>
        </Form.Control>
      </Form.Group>
      <Button className="offset-md-10" variant="success" onClick={updatePlan}>
        Update Plan
      </Button>
    </div>
  );
};

export default UpdatePlan;
