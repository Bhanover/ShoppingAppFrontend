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

const SizeService = {
  fetchAdminSizes: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/auth/admin/sizes`,
        getConfig()
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener los tamaños", error);
      throw error;
    }
  },
};
export default SizeService;
