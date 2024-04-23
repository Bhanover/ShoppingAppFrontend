import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../Enviroment";
import ClothesService from "../../service/ClothesService";
import "./AddClothingItem.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEllipsisV } from "react-icons/fa";
import { FaUpload, FaImage } from "react-icons/fa";
import Loader from "../../loaders/Loader";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import DeleteClothingItem from "../deleteClothingItem/DeleteClothingItem";
const AddClothingItem = () => {
  const animatedComponents = makeAnimated();
  const [imageDetails, setImageDetails] = useState([]);
  const [categories, setCategories] = useState([]);
  const [clothingData, setClothingData] = useState({
    name: "",
    type: "",
    size: "",
    price: "",
    stock: "",
    description: "",
    categoryIds: [],
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem("JwtToken");
  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleClothingChange = (e) => {
    setClothingData({
      ...clothingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files.length === 0) {
      return;
    }

    const newImageDetails = Array.from(e.target.files).map((file) => ({
      file: file,
      imageName: file.name,
      imageUrl: URL.createObjectURL(file),
    }));

    setImageDetails((prevImages) => [...prevImages, ...newImageDetails]);
  };

  useEffect(() => {
    return () => {
      imageDetails.forEach((detail) => {
        URL.revokeObjectURL(detail.imageUrl);
      });
    };
  }, [imageDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const clothingResponse = await axios.post(
        `${BASE_URL}/api/admin/clothing`,
        clothingData,
        {
          headers: { Authorization: `Bearer ${jwtToken}` },
        }
      );

      if (imageDetails.length > 0 && clothingResponse.data.id) {
        await uploadImages(clothingResponse.data.id);
      }

      toast.success("Artículo de ropa subido con éxito");
      // Resetear los campos del formulario y la lista de imágenes
    } catch (error) {
      // Manejar errores específicos devueltos por el servidor
      if (error.response && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error(
          "Error al procesar el artículo de ropa o subir las imágenes"
        );
      }
    } finally {
      resetForm();
      setLoading(false);
    }
  };

  const uploadImages = async (clothingItemId) => {
    const formData = new FormData();
    imageDetails.forEach((detail) => {
      formData.append("files", detail.file);
      formData.append("fileNames", detail.imageName);
    });

    formData.append("clothingItemId", clothingItemId);

    try {
      await axios.post(`${BASE_URL}/api/admin/file/uploadImages`, formData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      toast.error("Error al subir las imágenes");
    }
  };

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions || []);

    // Actualizar los ID de categorías en clothingData
    const categoryIds = selectedOptions.map((option) => option.value);
    setClothingData((prevData) => ({
      ...prevData,
      categoryIds: categoryIds,
    }));
  };

  const resetForm = () => {
    // Función para resetear el formulario y el input de archivo
    setClothingData({
      name: "",
      type: "",
      size: "",
      price: "",
      stock: "",
      description: "",
      categoryIds: [],
    });
    setImageDetails([]);
    setSelectedCategories([]);
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await ClothesService.fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error al cargar categorías", error);
      }
    };

    loadCategories();
  }, []);

  return (
    <div className="addClothingItemMain">
      <ToastContainer />
      <h2>Gestión de Ropa</h2>
      <form onSubmit={handleSubmit}>
        <div className="addClothingItemForm">
          <div className="addClothingItemInfo">
            <input
              type="text"
              id="name"
              name="name"
              value={clothingData.name}
              onChange={handleClothingChange}
              placeholder="Name"
              required
            />

            <input
              type="text"
              id="type"
              name="type"
              value={clothingData.type}
              onChange={handleClothingChange}
              required
              placeholder="Type"
            />

            <input
              type="text"
              id="size"
              name="size"
              value={clothingData.size}
              onChange={handleClothingChange}
              placeholder="Size"
            />

            <input
              type="number"
              id="price"
              name="price"
              value={clothingData.price}
              onChange={handleClothingChange}
              min="0"
              step="0.01"
              required
              placeholder="Price"
            />

            <input
              type="number"
              id="stock"
              name="stock"
              value={clothingData.stock}
              onChange={handleClothingChange}
              min="0"
              required
              placeholder="Stock"
            />

            <textarea
              id="description"
              name="description"
              value={clothingData.description}
              onChange={handleClothingChange}
              placeholder="Description"
            />
          </div>
          <div className="addClothingItemFile">
            <input
              type="file"
              name="files"
              onChange={handleImageChange}
              multiple
            />
            <div className="AddItemImage">
              {imageDetails.map((detail, index) => (
                <div key={index}>
                  <img src={detail.imageUrl} alt="Preview" />
                </div>
              ))}
            </div>
            <div className="addClothingItemSelect">
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                value={selectedCategories}
                onChange={handleCategoryChange}
                isMulti
                options={categoryOptions}
              />
            </div>
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? <Loader /> : "Añadir ropa"}
        </button>
      </form>
      <DeleteClothingItem />
    </div>
  );
};

export default AddClothingItem;
