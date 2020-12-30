import axios from "axios";

const BASE_URL = `http://localhost:8080/pricing`;

class PlanDataService {
  getAllPlans = () => {
    return axios.get(`${BASE_URL}/plans`);
  };

  getPlanById = id => {
    return axios.get(`${BASE_URL}/plan/${id}`);
  };

  deletePlanById = id => {
    return axios.delete(`${BASE_URL}/plan/${id}`);
  };

  updatePlan = plan => {
    return axios.put(`${BASE_URL}/plan`, plan);
  };

  addPlan = plan => {
    return axios.post(`${BASE_URL}/plan`, plan);
  };
}

export default new PlanDataService();
