import axios from "axios";
import BASE_URL from "../Enviroment";

const getConfig = () => {
  const jwtToken = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };
};

const UseService = {
  logout: async () => {
    return axios.delete(`${BASE_URL}/api/session`, getConfig());
  },
};
export default UseService;
