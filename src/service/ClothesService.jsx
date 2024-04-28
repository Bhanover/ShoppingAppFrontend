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

const ClothesService = {
  fetchSimpleClothingItemList: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/admin/clothing/simple-list`,
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
      await axios.delete(`${BASE_URL}/api/admin/clothing/${id}`, getConfig());
    } catch (error) {
      console.error("Error al eliminar el artículo de ropa", error);
      throw error;
    }
  },
};

export default ClothesService;
/*
fetchClothingItems: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/products/clothing`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener clothing items", error);
      throw error;
    }
  },
fetchClothingItemsByCategory: async (idCategory) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/products/clothing/by-category/${idCategory}`
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener clothing items por categoría", error);
      throw error;
    }
  },
 addCategory: async (category) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/admin/categories`,
        category,
        getConfig()
      );
      return response.data;
    } catch (error) {
      console.error("Error al añadir la categoría", error);
      throw error;
    }
  },
  uploadCategoryImage: async (file, categoryId) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    formData.append("categoryId", categoryId);

    const configMultipart = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/api/admin/category/uploadImage`,
        formData,
        configMultipart
      );
      return response.data;
    } catch (error) {
      console.error("Error al subir la imagen de la categoría", error);
      throw error;
    }
  },*/
