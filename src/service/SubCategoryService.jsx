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

const SubCategoryService = {
  // Añadir una nueva subcategoría con imagen
  addSubCategory: async (name, description, imageFile, categoryId) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("file", imageFile);
    formData.append("categoryId", categoryId);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/admin/subcategories`,
        formData,
        getConfig()
      );
      return response.data;
    } catch (error) {
      console.error("Error al añadir la subcategoría con imagen", error);
      throw error;
    }
  },

  // Obtener todas las subcategorías
  obtainSubCategories: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/auth/admin/subcategories`,
        getConfig()
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener sub-categorías", error);
      throw error;
    }
  },

  // Borrar una subcategoría por ID
  deleteSubCategory: async (id) => {
    try {
      await axios.delete(
        `${BASE_URL}/api/auth/admin/subcategories/${id}`,
        getConfig()
      );
    } catch (error) {
      console.error("Error al borrar la categoría", error);
      throw error;
    }
  },
};

export default SubCategoryService;
