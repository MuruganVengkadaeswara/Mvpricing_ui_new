import React, { useState, useEffect } from "react";
import { Table, Button, Alert } from "react-bootstrap";
import ProductDataService from "../Services/ProductDataService";

const AllProducts = props => {
  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState();

  useEffect(() => {
    ProductDataService.getAllProducts()
      .then(res => {
        console.log(res.data);
        setProducts(res.data.response);
      })
      .catch(res => {
        if (res.response != undefined) {
          setAlert(
            <Alert variant="danger">{res.response.data.response}</Alert>
          );
        } else {
          setAlert(<Alert variant="danger">Unable to Connect</Alert>);
        }
      });
  }, [alert]);

  const deleteProduct = id => {
    ProductDataService.deleteProductById(id)
      .then(res => {
        if (!res.data.error) {
          setAlert(
            <Alert variant="success">Product Deleted Successfully</Alert>
          );
        }
      })
      .catch(res => {
        setAlert(<Alert variant="danger">{res.response.data.response}</Alert>);
      });
  };

  return (
    <div className="col-md-8 offset-md-2 mt-5 card card-body">
      <h1>
        <strong>All Products</strong>
      </h1>
      {alert}
      <hr></hr>
      <Table responsive striped bordered>
        <thead>
          <tr>
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Product Services</th>
            <th>Additional Prices</th>
            <th>Action</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => {
            return (
              <tr key={product.productId}>
                <td>{product.productId}</td>
                <td>{product.productName}</td>
                <td>&#8377; {product.price.price} </td>
                <td>
                  {product.services.map(s => {
                    return (
                      <h6 key={s.serviceId}>
                        {s.service.serviceName} @ {s.servicePrice} &#8377; /{" "}
                        {s.unitType}
                        &emsp; ( {s.freeUnits} {s.unitType} free)
                      </h6>
                    );
                  })}
                </td>
                <td>
                  {product.additionalPrices.map(price => {
                    return (
                      <h6>
                        {price.description} @ {price.price} &#8377;
                      </h6>
                    );
                  })}
                </td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => {
                      props.history.push({
                        pathname: "/updateproduct",
                        id: product.productId
                      });
                    }}
                  >
                    Update
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => deleteProduct(product.productId)}
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

export default AllProducts;
