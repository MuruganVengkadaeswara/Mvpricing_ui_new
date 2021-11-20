import React, { useState, useEffect } from "react";
import { Form, Button, Col, Alert } from "react-bootstrap";
import serviceDataService from "../../Services/ServiceDataService.js";
import planDataService from "../../Services/PlanDataService.js";

const AddPlanNew = props => {
  const [services, setServices] = useState([]);
  const [product, setProduct] = useState({
    productName: "",
    price: {
      price: ""
    },
    additionalPrices: [],
    services: []
  });
  const [plan, setPlan] = useState({
    planName: "",
    planType: "",
    product: {}
  });
  const [serv, setServ] = useState({});
  const [addl, setAddl] = useState({});
  const [alert, setAlert] = useState();

  useEffect(() => {
    serviceDataService
      .getAllServices()
      .then(res => {
        setServices(res.data.response);
      })
      .catch(res => {
        setAlert(<Alert variant="danger">unable to connect</Alert>);
      });
  }, []);

  const addPlan = e => {
    e.preventDefault();
    setPlan(prevState => {
      return { ...prevState, product: product };
    });
    planDataService
      .addPlan(plan)
      .then(res => {
        if (!res.data.error) {
          setAlert(<Alert variant="success">Plan Added successfully</Alert>);
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
          document.planform.reset();
        }
      })
      .catch(res => {
        setAlert(<Alert variant="danger">{res.response.data.response}</Alert>);
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      });
  };

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
                    <option value={service.serviceId}>
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
        Please Add as many additional prices as you want
      </Alert>
    </Form>
  );

  return (
    <div>
      <Form
        className="col-md-10 offset-1 mt-5 card card-body"
        onSubmit={addPlan}
        name="planform"
      >
        {alert}
        <Form.Group>
          <Form.Label>
            <h3>Plan Name</h3>
          </Form.Label>
          <Form.Control
            type="text"
            onChange={e => {
              const val = e.target.value;
              setPlan(prevState => {
                return { ...prevState, planName: val };
              });
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>
            <h3>Plan Type</h3>
          </Form.Label>
          <Form.Control
            as="select"
            defaultValue="select"
            onChange={e => {
              const val = e.target.value;
              setPlan(prevState => {
                return { ...prevState, planType: val };
              });
            }}
          >
            <option value="select" disabled>
              select
            </option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            <option value="weekly">Weekly</option>
            <option value="daily">Daily</option>
          </Form.Control>
        </Form.Group>
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
        {Servi}
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
                {name} @ {service.servicePrice} &#8377; with {service.freeUnits}{" "}
                {service.unitType} free &emsp;
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
        {addlp}
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
          <strong>Add Additional Price</strong>
        </Button>
        <hr></hr>
        <Button
          className="col-md-4 offset-md-4"
          variant="success"
          type="submit"
          onClick={() => {
            setPlan(prevState => {
              return { ...prevState, product: product };
            });
          }}
        >
          <strong>Add</strong>
        </Button>
      </Form>
    </div>
  );
};

export default AddPlanNew;
