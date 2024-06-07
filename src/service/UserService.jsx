import axios from "axios";
import BASE_URL from "../Enviroment";

// Función para obtener la configuración actualizada con el JWT más reciente
const getConfig = () => {
  const jwtToken = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };
};

const UseService = {
  // Cerrar sesión del usuario
  logout: async () => {
    return axios.delete(`${BASE_URL}/api/session`, getConfig());
  },
};

export default UseService;
