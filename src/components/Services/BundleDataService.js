import axios from "axios";

const BASE_URL = `http://localhost:8080/pricing`;

class BundleDataService {
  getAllBundles = () => {
    return axios.get(`${BASE_URL}/bundles`);
  };

  getBundleById = (id) => {
    return axios.get(`${BASE_URL}/bundle/${id}`);
  };

  addBundle = (bundle) => {
    return axios.post(`${BASE_URL}/bundle`, bundle);
  };

  updateBundle = (bundle) => {
    return axios.put(`${BASE_URL}/bundle`, bundle);
  };

  deleteBundleById = (id) => {
    return axios.delete(`${BASE_URL}/bundle/${id}`);
  };
}

export default new BundleDataService();
