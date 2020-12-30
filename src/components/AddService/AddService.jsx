import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import serviceDataService from "../Services/ServiceDataService";

const AddService = props => {
  const [serviceName, setServiceName] = useState({});

  const [alert, setAlert] = useState();

  const addService = e => {
    e.preventDefault();
    console.log(serviceName);
    serviceDataService
      .addService(serviceName)
      .then(res => {
        setAlert(<Alert variant="success">service added successfully</Alert>);
        document.servForm.reset();
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch(res => {
        setAlert(<Alert variant="danger">{res.response.data.response}</Alert>);
      });
  };

  return (
    <div>
      <div className="col-md-4 offset-md-4 mt-5 card card-body">
        {alert}
        <Form onSubmit={addService} name="servForm">
          <Form.Group>
            <Form.Label>
              <h2>
                <strong>Service Name</strong>
              </h2>
            </Form.Label>
            <Form.Control
              type="text"
              onChange={e => {
                const val = e.target.value;
                setServiceName(prevState => {
                  return { ...prevState, serviceName: val };
                });
              }}
            ></Form.Control>
          </Form.Group>

          <Button
            className="offset-5"
            variant="success"
            type="submit"
            onClick={addService}
          >
            Add
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddService;
