import React, { useEffect, useState } from "react";
import PlanDataService from "../Services/PlanDataService";
import { Alert, Table, Button } from "react-bootstrap";

const AllPlans = props => {
  const [plans, setPlans] = useState([]);
  const [alert, setAlert] = useState();

  useEffect(() => {
    PlanDataService.getAllPlans()
      .then(res => {
        if (!res.data.error) {
          setPlans(res.data.response);
          console.log(plans);
        }
      })
      .catch(res => {
        if (res.response != undefined) {
          setAlert(
            <Alert variant="danger">{res.response.data.response}</Alert>
          );
        } else {
          setAlert(<Alert variant="danger">Unable to connect</Alert>);
        }
      });
  }, [alert]);

  const deletePlan = id => {
    PlanDataService.deletePlanById(id)
      .then(res => {
        if (!res.data.error) {
          setAlert(<Alert variant="success">Plan Deleted Successfully</Alert>);
        }
      })
      .catch(res => {
        if (res.response != undefined) {
          setAlert(
            <Alert variant="danger">{res.response.data.response}</Alert>
          );
        } else {
          setAlert(<Alert variant="danger">Unable to connect</Alert>);
        }
      });
  };

  return (
    <div className="col-md-8 offset-md-2 card card-body mt-5">
      <h1>
        <strong>All Plans</strong>
      </h1>

      {alert}
      <hr></hr>
      <Table responsive bordered striped>
        <thead>
          <tr>
            <th>Plan Id</th>
            <th>Plan Name</th>
            <th>Plan Type</th>
            <th>plan Product</th>
            <th>Action</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {plans.map(plan => {
            return (
              <tr key={plan.planId}>
                <td>{plan.planId}</td>
                <td>{plan.planName}</td>
                <td>{plan.planType}</td>
                <td>
                  {plan.product.productName} @ Rs.{plan.product.price.price}
                </td>
                <td>
                  <Button variant="info">Update</Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deletePlan(plan.planId);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default AllPlans;
