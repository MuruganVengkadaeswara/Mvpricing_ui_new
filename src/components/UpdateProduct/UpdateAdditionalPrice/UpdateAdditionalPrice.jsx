import React, { useState, useEffect } from "react";
import productDataService from "/home/onebill/Desktop/onebill_pricing_ui_new/onebill_pricing_ui/src/components/Services/ProductDataService.js";
import { Alert, Table, Button } from "react-bootstrap";

const UpdateAdditionalPrice = props => {
  const [product, setProduct] = useState({
    productId: "",
    productName: "",
    additionalPrices: []
  });

  const [alert, setAlert] = useState();

  let id = props.location.id;

  useEffect(() => {
    productDataService
      .getProductById(id)
      .then(res => {
        setProduct(res.data.response);
      })
      .catch(res => {
        setAlert(<Alert variant="danger">Unable to fetch product</Alert>);
      });
  }, []);

  return (
    <div className="card card-body offset-md-2 col-md-8 mt-5">
      <h2>Update Additional Price</h2>
      <hr></hr>
      <h4>Product Name : {product.productName}</h4>
      <Table responsive>
        <thead>
          <tr>
            <th>Additional Price Id</th>
            <th>Price</th>
            <th>Description</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {product.additionalPrices.map(price => {
            return (
              <tr>
                <td>{price.addlPriceId}</td>
                <td>{price.price}</td>
                <td>{price.description}</td>
                <td>
                  <Button variant="info">Update</Button>
                </td>
                <td>
                  <Button variant="danger">Delete</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <hr></hr>
      <Button variant="info" className="col-md-3 offset-md-9">
        Add Additional Price
      </Button>
    </div>
  );
};

export default UpdateAdditionalPrice;
