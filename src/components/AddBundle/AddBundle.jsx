import React, { useEffect, useState } from "react";
import { Form, Col, Button, Alert } from "react-bootstrap";
import productDataService from "../Services/ProductDataService";
import bundleDataService from "../Services/BundleDataService";

const AddBundle = (props) => {
  const [products, Setproducts] = useState([]);
  const [bundle, setBundle] = useState({
    bundleName: "",
    bundleType: "",
    bundleProducts: [],
  });
  const [alert, setAlert] = useState();
  const [prod, setProd] = useState(0);

  useEffect(() => {
    productDataService
      .getAllProducts()
      .then((res) => {
        console.log(products);
        Setproducts(res.data.response);
      })
      .catch((res) => {
        setAlert(<Alert variant="danger">unable to connect</Alert>);
      });
  }, []);

  const addBundle = (e) => {
    e.preventDefault();
    console.log(bundle);
    bundleDataService
      .addBundle(bundle)
      .then((res) => {
        if (res.data.error) {
          setAlert(<Alert variant="danger">Unable to add Bundle</Alert>);
        } else {
          setAlert(<Alert variant="success">Bundle Added Successfully</Alert>);
          document.bundleForm.reset();
        }
      })
      .catch((res) => {
        setAlert(<Alert variant="danger">{res.response.data.response}</Alert>);
      });
  };

  return (
    <div className="col-md-8 card card-body offset-md-2 mt-5">
      <h1>
        <strong>Add Bundle</strong>
      </h1>
      {alert}
      <hr></hr>
      <Form onSubmit={addBundle} name="bundleForm">
        <Form.Row>
          <Col>
            <Form.Group>
              <Form.Label>
                <h3>Bundle Name</h3>
              </Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  const val = e.target.value;
                  setBundle((prevState) => {
                    return { ...prevState, bundleName: val };
                  });
                }}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Label>
              <h3>Bundle Type</h3>
            </Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => {
                const val = e.target.value;
                setBundle((prevState) => {
                  return { ...prevState, bundleType: val };
                });
              }}
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
              <option value="weekly">Weekly</option>
              <option value="daily">Daily</option>
            </Form.Control>
          </Col>
        </Form.Row>
        <Form.Group>
          <Form.Label>
            <h2>Add Product</h2>
          </Form.Label>
          <Form.Control
            as="select"
            onChange={(e) => {
              const val = e.target.value;
              setProd(val);
            }}
          >
            {products.map((product) => {
              return (
                <option key={product.productId} value={product.productId}>
                  {product.productName}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
        <div>
          <Button
            variant="info"
            className="offset-md-10 mb-2"
            onClick={() => {
              setBundle((prevState) => {
                return {
                  ...prevState,
                  bundleProducts: [
                    ...prevState.bundleProducts,
                    { productId: prod },
                  ],
                };
              });
              console.log(bundle);
            }}
          >
            <strong>Add Product</strong>
          </Button>
          {bundle.bundleProducts.map((bp) => {
            let name;
            if (
              products.find((o) => o.productId == bp.productId) != undefined
            ) {
              name = products.find((o) => o.productId == bp.productId)
                .productName;
            }
            return <Alert variant="info">Product : {name}</Alert>;
          })}
        </div>
        <Button variant="success" className="offset-md-5" type="submit">
          <strong>Make Bundle</strong>
        </Button>
      </Form>
    </div>
  );
};

export default AddBundle;
