import React, { useEffect, useState } from "react";
import { Table, Button, Alert } from "react-bootstrap";
import serviceDataService from "../Services/ServiceDataService";

const AllServices = (props) => {
  const [services, SetServices] = useState([]);
  const [alert, setAlert] = useState();

  useEffect(() => {
    serviceDataService
      .getAllServices()
      .then((res) => {
        if (!res.data.error) {
          SetServices(res.data.response);
        }
        else{
          setAlert(<Alert variant="danger">unable to connect</Alert>)
        }
      })
      .catch((res) => {
        if (res.response != undefined) {
          setAlert(
            <Alert variant="danger">{res.response.data.response}</Alert>
          );
        }
      });
  }, [alert]);

  const deleteService = (id) => {
    serviceDataService
      .deleteServiceById(id)
      .then((res) => {
        console.log(res.data);
        setAlert(<Alert variant="success">Deleted successfully</Alert>);
      })
      .catch((res) => {
        setAlert(<Alert variant="danger">{res.response.data.response}</Alert>);
      });
  };

  return (
    <div className="col-md-6 offset-md-3 mt-5 card card-body">
      {alert}
      <Table responsive striped bordered data-testid="tablemain">
        <thead>
          <tr>
            <th>
              <h3>Service Id</h3>
            </th>
            <th>
              <h3>Service Name</h3>
            </th>
            <th>
              <h3>Action</h3>
            </th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => {
            return (
              <tr key={service.serviceId}>
                <td>
                  <h5>
                    <strong>{service.serviceId}</strong>
                  </h5>
                </td>
                <td>
                  <h5>
                    <strong>{service.serviceName}</strong>
                  </h5>
                </td>
                <td>
                  <Button
                    variant="danger"
                    id={service.serviceId}
                    onClick={() => deleteService(service.serviceId)}
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

export default AllServices;
