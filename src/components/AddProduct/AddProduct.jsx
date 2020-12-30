import React, { useState, useEffect } from "react";
import { Form, Button, Col, Alert, Table } from "react-bootstrap";
import "./addproduct.css";
import productDataService from "../Services/ProductDataService";
import serviceDataService from "../Services/ServiceDataService";

const AddProduct = props => {
  const [product, setProduct] = useState({
    productName: "",
    price: {
      price: ""
    },
    additionalPrices: [],
    services: []
  });
  const [services, setServices] = useState([]);
  const [serv, setServ] = useState({});
  const [addl, setAddl] = useState({});
  const [alert, setAlert] = useState();

  const Servi = (
    <Form name="serviceForm">
      <Form.Group className="card servicesblk">
        <Form.Label>
          <h3>Services</h3>
          <hr></hr>
        </Form.Label>
        <Form.Row>
          <Col>
            <Form.Group>
              <Form.Label>
                <h5>Select service</h5>
              </Form.Label>
              <Form.Control
                as="select"
                onChange={e => {
                  const val = e.target.value;
                  setServ(prevState => {
                    return { ...prevState, serviceId: val };
                  });
                }}
              >
                {services.map(service => {
                  return (
                    <option key={service.serviceId} value={service.serviceId}>
                      {service.serviceName}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <h5>service price</h5>
              </Form.Label>
              <Form.Control
                type="number"
                onChange={e => {
                  const val = e.target.value;
                  setServ(prevState => {
                    return { ...prevState, servicePrice: val };
                  });
                }}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>
                <h5>Free Units</h5>
              </Form.Label>
              <Form.Control
                type="number"
                onChange={e => {
                  const val = e.target.value;
                  setServ(prevState => {
                    return { ...prevState, freeUnits: val };
                  });
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <h5>Unit Type</h5>
              </Form.Label>
              <Form.Control
                type="text"
                onChange={e => {
                  const val = e.target.value;
                  setServ(prevState => {
                    return { ...prevState, unitType: val };
                  });
                }}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Form.Row>
      </Form.Group>
      <Alert
        style={{
          backgroundColor: "#FF9B714C",
          color: "#2E2F2F",
          fontWeight: "bold"
        }}
      >
        Please Add as many services as you want
      </Alert>
    </Form>
  );

  const addlp = (
    <Form name="addlPriceForm">
      <Form.Group className="card servicesblk">
        <Form.Label>
          <h3>Additional Prices</h3>
        </Form.Label>
        <hr></hr>
        <Form.Row>
          <Col>
            <Form.Group>
              <Form.Label>
                <h5>price</h5>
              </Form.Label>
              <Form.Control
                type="number"
                onChange={e => {
                  const val = e.target.value;
                  setAddl(prevState => {
                    return { ...prevState, price: val };
                  });
                }}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Label>
              <h5>Description</h5>
            </Form.Label>
            <Form.Control
              type="text"
              onChange={e => {
                const val = e.target.value;
                setAddl(prevState => {
                  return { ...prevState, description: val };
                });
              }}
            ></Form.Control>
          </Col>
        </Form.Row>
      </Form.Group>
      <Alert
        style={{
          backgroundColor: "#FF9B714C",
          color: "#2E2F2F",
          fontWeight: "bold"
        }}
      >
        Please Add as many Additional Prices as you want
      </Alert>
    </Form>
  );

  useEffect(() => {
    serviceDataService.getAllServices().then(res => {
      console.log(res.data);
      setServices(res.data.response);
    });
  }, []);

  const addProduct = e => {
    e.preventDefault();
    console.log(product);
    productDataService
      .addProduct(product)
      .then(res => {
        if (res.data.error) {
          setAlert(<Alert variant="danger">{res.data.response}</Alert>);
        } else {
          setAlert(<Alert variant="success">Product Added successfully</Alert>);
          window.prodForm.reset();
          window.scrollTo({
            behavior: "smooth",
            top: 0
          });
        }
      })
      .catch(res => {
        setAlert(<Alert variant="danger">{res.response.data.response}</Alert>);
        window.scrollTo({
          behavior: "smooth",
          top: 0
        });
      });
  };

  return (
    <div>
      <div className="col-md-6 offset-md-3 mt-5 card card-body">
        {alert}
        <h2>
          <strong>Add Product</strong>
        </h2>
        <hr></hr>
        <Form onSubmit={addProduct} name="prodForm">
          <Form.Group>
            <Form.Label>
              <h3>Product Name</h3>
            </Form.Label>
            <Form.Control
              type="text"
              onChange={e => {
                const val = e.target.value;
                setProduct(prevState => {
                  return { ...prevState, productName: val };
                });
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              <h3>Product Price</h3>
            </Form.Label>
            <Form.Control
              type="number"
              onChange={e => {
                const val = e.target.value;
                setProduct(prevState => {
                  return { ...prevState, price: { price: val } };
                });
              }}
            ></Form.Control>
          </Form.Group>
          <div>{Servi}</div>
          {product.services.map(service => {
            let name;
            if (
              services.find(o => o.serviceId == service.serviceId) != undefined
            ) {
              name = services.find(o => o.serviceId == service.serviceId)
                .serviceName;
            }

            return (
              <div className="card card-body mb-3">
                <Alert variant="info">
                  {name} @ {service.servicePrice} &#8377; with{" "}
                  {service.freeUnits} {service.unitType} free &emsp;
                </Alert>
              </div>
            );
          })}
          <Button
            className="offset-md-10"
            variant="info"
            onClick={() => {
              if (
                serv.serviceId != null &&
                serv.servicePrice != null &&
                serv.freeUnits != null &&
                serv.unitType
              ) {
                setProduct(prevState => {
                  return {
                    ...prevState,
                    services: [...prevState.services, serv]
                  };
                });
                setServ([]);
                document.serviceForm.reset();
                console.log(product);
              }
            }}
          >
            <strong>Add Service</strong>
          </Button>
          <hr></hr>
          <div>{addlp}</div>
          {product.additionalPrices.map(price => {
            return (
              <div className="card card-body mb-3">
                <Alert variant="info">
                  {price.description} @ {price.price} &#8377;
                </Alert>
              </div>
            );
          })}
          <Button
            className="offset-md-9"
            variant="info"
            onClick={() => {
              if (addl.description != null && addl.price != null) {
                setProduct(prevState => {
                  return {
                    ...prevState,
                    additionalPrices: [...prevState.additionalPrices, addl]
                  };
                });
                document.addlPriceForm.reset();
                setAddl([]);
                console.log(product);
              }
            }}
          >
            <strong>Add additional price</strong>
          </Button>
          <hr></hr>
          <Button
            className="offset-5"
            size="lg"
            variant="success"
            type="submit"
            onClick={addProduct}
          >
            <strong>Add</strong>
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddProduct;
