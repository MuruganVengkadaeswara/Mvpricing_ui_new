import React, { useEffect, useState } from "react";
import ProductDataService from "../Services/ProductDataService";
import { Tab, Table, Form, Button } from "react-bootstrap";

const UpdateProduct = props => {
  const [product, setProduct] = useState([]);
  const [bool, setBool] = useState(0);
  const [price, setPrice] = useState({
    productId: "",
    price: ""
  });

  let id = props.location.id;
  useEffect(() => {
    console.log(props.location.id);
    ProductDataService.getProductById(id)
      .then(res => {
        if (!res.data.error) {
          console.log(res.data.response);

          setProduct(res.data.response);
          setPrice(prevState => {
            return { ...prevState, productId: res.data.response.productId };
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
  };

  return (
    <div className="card card-body offset-md-2 col-md-8 mt-5">
      <h1>Update Product</h1>
      <hr></hr>
      <Form>
        <Form.Group>
          <Form.Label>Product id : {product.productId}</Form.Label>
        </Form.Group>
        <Form.Group>
          <Form.Label>Product Name : {product.productName}</Form.Label>
        </Form.Group>
        <Form.Group>
          <Form.Label>Product Price :</Form.Label>
          <Form.Control
            // defaultValue={product.price.price}
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
