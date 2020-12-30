import axios from "axios";

const BASE_URL = `http://localhost:8080/pricing`;

class ServiceDataService {
  addService = service => {
    return axios.post(`${BASE_URL}/service`, service);
  };

  updateService = service => {
    return axios.put(`${BASE_URL}/service`, service);
  };

  deleteServiceById = id => {
    return axios.delete(`${BASE_URL}/service/${id}`);
  };

  getServiceByName = name => {
    return axios.get(`${BASE_URL}/services?serviceName=${name}`);
  };

  getAllServices() {
    return axios.get(`${BASE_URL}/services`);
  }

  getServiceById = id => {
    return axios.get(`${BASE_URL}/service/${id}`);
  };
}

export default new ServiceDataService();
