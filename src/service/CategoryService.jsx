import axios from "axios";
import BASE_URL from "../Enviroment";

// Función para obtener la configuración actualizada con el JWT más reciente
const getConfig = () => {
  const jwtToken = localStorage.getItem("JwtToken");
  return {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };
};

const CategoryService = {
  updateCategoryWithImage: async (id, formData) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/admin/categories/${id}`,
        formData,
        getConfig()
      );
      return response.data;
    } catch (error) {
      console.error("Error al actualizar la categoría con imagen", error);
      throw error;
    }
  },

  deleteCategory: async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/admin/categories/${id}`, getConfig());
    } catch (error) {
      console.error("Error al borrar la categoría", error);
      throw error;
    }
  },
};
export default CategoryService;
