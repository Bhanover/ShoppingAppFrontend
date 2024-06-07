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
  // Obtener nombres e IDs de los productos de ropa
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

  // Eliminar un artículo de ropa por ID
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

  // Agregar un nuevo artículo de ropa
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
