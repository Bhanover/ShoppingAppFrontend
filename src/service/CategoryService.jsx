import axios from "axios";
import BASE_URL from "../Enviroment";

// Función para obtener la configuración actualizada con el JWT más reciente
const getConfig = () => {
  const jwtToken = localStorage.getItem("jwtToken");
  console.log(jwtToken);
  return {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };
};

const CategoryService = {
  // Añadir una categoría con imagen
  addCategoryWithImageNew: async (name, description, imageFile) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("file", imageFile);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/admin/categories`,
        formData,
        getConfig()
      );
      return response.data;
    } catch (error) {
      console.error("Error al añadir la categoría con imagen", error);
      throw error;
    }
  },

  // Obtener todas las categorías para el administrador
  fetchAdminCategories: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/auth/admin/categories`,
        getConfig()
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener categorías", error);
      throw error;
    }
  },

  // Actualizar una categoría con imagen
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

  // Borrar una categoría
  deleteCategory: async (id) => {
    try {
      await axios.delete(
        `${BASE_URL}/api/auth/admin/categories/${id}`,
        getConfig()
      );
    } catch (error) {
      console.error("Error al borrar la categoría", error);
      throw error;
    }
  },

  // Obtener categorías simples
  obtainSimpleCategories: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/auth/admin/simple-categories`,
        getConfig()
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener categorías", error);
      throw error;
    }
  },

  // Obtener nombres de categorías
  fetchCategoriesName: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/auth/admin/name-categories`,
        getConfig()
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener categorías", error);
      throw error;
    }
  },
};

export default CategoryService;
