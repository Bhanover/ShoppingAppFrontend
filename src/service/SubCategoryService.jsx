import axios from "axios";
import BASE_URL from "../Enviroment";

const getConfig = () => {
  const jwtToken = localStorage.getItem("JwtToken");
  return {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };
};

const SubCategoryService = {
  addSubCategory: async (name, description, imageFile, categoryId) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("file", imageFile);
    formData.append("categoryId", categoryId);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/subcategories`,
        formData
        // getConfig()
      );
      return response.data;
    } catch (error) {
      console.error("Error al añadir la subcategoría con imagen", error);
      throw error;
    }
  },

  obtainSubCategories: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/subcategories`
        // getConfig()
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener categorías", error);
      throw error;
    }
  },

  deleteSubCategory: async (id) => {
    try {
      await axios.delete(
        `${BASE_URL}/api/subcategories/${id}`
        //   , getConfig()
      );
    } catch (error) {
      console.error("Error al borrar la categoría", error);
      throw error;
    }
  },
};
export default SubCategoryService;
