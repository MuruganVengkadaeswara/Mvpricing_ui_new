import React, { useEffect, useState } from "react";
import BundleDataService from "../Services/BundleDataService";
import { Alert, Form, Button, Table, Col } from "react-bootstrap";
import ProductDataService from "../Services/ProductDataService";

const UpdateBundle = props => {
  let id = props.location.id;

  const [bundle, setBundle] = useState({
    bundleName: "",
    bundleType: "",
    bundleProducts: []
  });

  const [alert, setAlert] = useState();

  const [addEle, setAddEle] = useState();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    BundleDataService.getBundleById(id)
      .then(res => {
        setBundle(res.data.response);
      })
      .catch(res => {
        setAlert(<Alert variant="danger">unable to fetch bundle</Alert>);
      });

    ProductDataService.getAllProducts()
      .then(res => {
        setProducts(res.data.response);
        console.log(products);
      })
      .catch(res => {
        console.log(res.response.data.response);
      });
  }, []);

  let ele = (
    <Form>
      <Form.Row>
        <Col>
          <Form.Group>
            <Form.Control as="select">
              <option disabled>select</option>
              {products.map(prod => {
                return <option>{prod.productName}</option>;
              })}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Button variant="info">Add</Button>
        </Col>
      </Form.Row>
    </Form>
  );

  return (
    <div className="col-md-8 offset-md-2 card card-body mt-5">
      <h2>Update Bundle</h2>
      <hr></hr>
      <h4>Bundle id : {bundle.bundleId}</h4>
      <Form.Group>
        <Form.Label>
          <h4>Bundle Name : </h4>
        </Form.Label>
        <Form.Control
          type="text"
          defaultValue={bundle.bundleName}
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>
          <h4>Bundle Type : </h4>
        </Form.Label>
        <Form.Control as="select">
          <option value="" disabled>
            select
          </option>
          <option value="monthly">monthly</option>
          <option value="yearly">yearly</option>
          <option value="weekly">weekly</option>
          <option value="daily">daily</option>
        </Form.Control>
      </Form.Group>
      <Button className="offset-10" variant="info">
        Update Bundle
      </Button>
      <hr></hr>
      <h3>Bundle Products </h3>
      <Table responsive>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        {bundle.bundleProducts.map(prod => {
          return (
            <tr>
              <td>{prod.product.productName}</td>
              <td>{prod.product.price.price} &#8377;</td>
              <td>
                <Button
                  variant="info"
                  onClick={() => {
                    props.history.push({
                      pathname: "/updateproduct",
                      id: prod.product.productId
                    });
                  }}
                >
                  Update
                </Button>
              </td>
              <td>
                <Button variant="danger">Delete</Button>
              </td>
            </tr>
          );
        })}
      </Table>
      <hr></hr>
      {addEle}
      <Button
        className="offset-md-10"
        variant="info"
        onClick={() => {
          setAddEle(ele);
        }}
      >
        Add Product
      </Button>
    </div>
  );
};

export default UpdateBundle;
