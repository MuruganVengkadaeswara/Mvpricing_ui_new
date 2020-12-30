import React, { useState, useEffect } from "react";
import productDataService from "/home/onebill/Desktop/onebill_pricing_ui_new/onebill_pricing_ui/src/components/Services/ProductDataService.js";
import serviceDataService from "/home/onebill/Desktop/onebill_pricing_ui_new/onebill_pricing_ui/src/components/Services/ServiceDataService.js";

import { Alert, Table, Button, Form, Col } from "react-bootstrap";
import ServiceDataService from "/home/onebill/Desktop/onebill_pricing_ui_new/onebill_pricing_ui/src/components/Services/ServiceDataService.js";

const UpdateProductService = props => {
  const [product, setProduct] = useState({
    services: []
  });
  const [alert, setAlert] = useState();

  const [bool, setBool] = useState(0);

  const [addserv, setAddServ] = useState();

  const [services, setServices] = useState([]);

  const [click, setClick] = useState(0);

  let id = props.location.id;

  useEffect(() => {
    productDataService
      .getProductById(id)
      .then(res => {
        setProduct(res.data.response);
        setBool(1);
        console.log(res.data.response);
        console.log(res.data.response.services);
      })
      .catch(res => {
        setAlert(<Alert variant="danger">Unable to fetch the product</Alert>);
      });

    serviceDataService
      .getAllServices(res => {
        console.log(res.data.response);

        setServices(res.data.response);
      })
      .catch(res => {
        console.log("Unable to fetch services");
      });
  }, []);

  const deleteService = id => {
    console.log(id);
  };

  let addServiceEle = (
    <Form>
      <h4>Add Service</h4>
      <hr></hr>
      <Form.Row>
        <Col>
          <Form.Group>
            <Form.Label>Select Service</Form.Label>
            <Form.Control as="select">
              <option>select</option>
              {services.map(serv => {
                return (
                  <option value={serv.serviceId}>{serv.serviceName}</option>
                );
              })}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Label>Service Price</Form.Label>
          <Form.Control type="tel"></Form.Control>
        </Col>
        <Col>
          <Form.Label>Free units</Form.Label>
          <Form.Control type="tel"></Form.Control>
        </Col>
        <Col>
          <Form.Label>Unit Type</Form.Label>
          <Form.Control type="text"></Form.Control>
        </Col>
      </Form.Row>
      <Form.Group></Form.Group>
      <Button variant="info" className="offset-md-11">
        Add
      </Button>
      <hr></hr>
    </Form>
  );

  return (
    <div className="col-md-8 offset-md-2 card card-body mt-5">
      <h2>Update Product Service</h2>
      <hr></hr>
      <h3>productName : {product.productName}</h3>
      <hr></hr>
      <Table responsive>
        <thead>
          <tr>
            <th>Product Service id</th>
            <th>Service Name</th>
            <th>Service Price</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {product.services.map(serv => {
            return (
              <tr>
                <td>{serv.psId}</td>
                <td>{serv.service.serviceName}</td>
                <td>
                  <Form.Control
                    type="tel"
                    defaultValue={serv.servicePrice}
                  ></Form.Control>
                </td>
                <td>
                  <Button variant="info">Update</Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => deleteService(serv.psId)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <hr></hr>
      {addserv}
      <Button
        variant="info"
        onClick={() => {
          setAddServ(addServiceEle);
          setClick(1);
        }}
        className="col-md-3 offset-md-9"
      >
        Add More Services
      </Button>
    </div>
  );
};

export default UpdateProductService;
