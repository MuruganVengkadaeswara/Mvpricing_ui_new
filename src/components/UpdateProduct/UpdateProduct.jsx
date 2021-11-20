import React, { useEffect, useState } from "react";
import ProductDataService from "../Services/ProductDataService.js";
import { Tab, Table, Form, Button, Alert } from "react-bootstrap";

const UpdateProduct = props => {
  const [product, setProduct] = useState({
    price: { price: "" }
  });
  const [bool, setBool] = useState(0);
  const [price, setPrice] = useState({
    productId: "",
    price: "",
    prodPriceId: ""
  });
  const [alert, setAlert] = useState();

  let id = props.location.id;
  useEffect(() => {
    console.log(props.location.id);
    ProductDataService.getProductById(id)
      .then(res => {
        if (!res.data.error) {
          console.log(res.data.response);

          setProduct(res.data.response);
          setPrice(prevState => {
            return {
              ...prevState,
              productId: res.data.response.productId,
              prodPriceId: res.data.response.price.prodPriceId
            };
          });
          console.log(product);
          setBool(1);
        }
      })
      .catch(res => {
        console.log("Product Not found");
      });
  }, [bool]);

  const updatePrice = () => {
    console.log(price);

    ProductDataService.updateProductPrice(price)
      .then(res => {
        if (res.data.error) {
          setAlert(<Alert variant="danger">Unable to update price</Alert>);
        } else {
          setAlert(<Alert variant="success">Price updated successfully</Alert>);
          console.log(res.data);

          setTimeout(() => {
            props.history.push("/products");
          }, 1000);
        }
      })
      .catch(res => {
        setAlert(<Alert variant="danger">{res.response.data.response}</Alert>);
      });
  };

  return (
    <div className="card card-body offset-md-2 col-md-8 mt-5">
      <h2>Update Product</h2>
      <hr></hr>
      {alert}
      <h4>Product id : {product.productId}</h4>
      <br></br>
      <br></br>
      <h4>Product Name : {product.productName}</h4>
      <hr></hr>
      <Form>
        <Form.Group>
          <Form.Label>Product Price :</Form.Label>
          <Form.Control
            defaultValue={product.price.price}
            type="number"
            onChange={e => {
              const val = e.target.value;
              setPrice(prevState => {
                return { ...prevState, price: val };
              });
            }}
          ></Form.Control>
        </Form.Group>
        <Button
          variant="success"
          className="offset-md-10"
          onClick={updatePrice}
        >
          Update Price
        </Button>
      </Form>
    </div>
  );
};

export default UpdateProduct;
