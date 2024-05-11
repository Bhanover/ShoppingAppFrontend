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

const ClothesService = {
  getClothingItemNameAndId: async () => {
    try {
      const response = await axios.get(
        BASE_URL + "/api/auth/admin/name-id-product",
        getConfig()
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener la lista simple de prendas", error);
      throw error;
    }
  },

  deleteClothingItem: async (id) => {
    try {
      await axios.delete(
        `${BASE_URL}/api/auth/admin/product/${id}`,
        getConfig()
      );
    } catch (error) {
      console.error("Error al eliminar el artículo de ropa", error);
      throw error;
    }
  },

  addClothingItem: async (formData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/admin/product`,
        formData,
        getConfig()
      );
      return response.data;
    } catch (error) {
      console.error("Error al agregar el producto", error);
      throw error;
    }
  },
};

export default ClothesService;
