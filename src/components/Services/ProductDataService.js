import axios from "axios";

const BASE_URL = `http://localhost:8080/pricing`;

class ProductDataService {
  addProduct = product => {
    return axios.post(`${BASE_URL}/product`, product);
  };

  getAllProducts = () => {
    return axios.get(`${BASE_URL}/products`);
  };

  getProductById = id => {
    return axios.get(`${BASE_URL}/product/${id}`);
  };

  searchProductByName = name => {
    return axios.get(`${BASE_URL}/product?name=${name}`);
  };

  deleteProductById = id => {
    return axios.delete(`${BASE_URL}/product/${id}`);
  };

  updateProduct = product => {
    return axios.put(`${BASE_URL}/product`, product);
  };

  updateProductPrice = price => {
    return axios.put(`${BASE_URL}/product/price`, price);
  };
}

export default new ProductDataService();
