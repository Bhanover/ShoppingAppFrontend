import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import CategoryService from "../../service/CategoryService";
import SizeService from "../../service/SizeService";
import ImageUploader from "../../components/ImageUploader";
import BASE_URL from "../../Enviroment";
import FileBase64 from "react-file-base64";
import Loader from "../../loaders/Loader";
import "./AddClothingItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import ClothesService from "../../service/ClothesService";
const AddClothingItem = () => {
  const navigate = useNavigate();
  const animatedComponents = makeAnimated();
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [filteredSizes, setFilteredSizes] = useState([]);
  const [sizeType, setSizeType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    price: "",
    stock: "",
    description: "",
    categoryId: "",
    subCategoryId: "",
    images: [],
    variants: [],
  });
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedStock, setSelectedStock] = useState("");
  // Función para reiniciar las imágenes
  const resetImages = () => {
    setFormData({ ...formData, images: [] });
    const inputs = document.querySelectorAll('input[type="file"]');
    inputs.forEach((input) => (input.value = ""));
  };
  // Función para eliminar una imagen específica
  const removeImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };
  // Efecto para obtener categorías y tamaños al montar el componente
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await CategoryService.fetchCategoriesName();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error al obtener las categorías", error);
        toast.error("Error al cargar las categorías");
      }
    };

    const fetchSizes = async () => {
      try {
        const fetchedSizes = await SizeService.fetchAdminSizes();
        setSizes(fetchedSizes);
        filterSizes(sizeType);
      } catch (error) {
        console.error("Error al obtener los tamaños", error);
        toast.error("Error al cargar los tamaños");
      }
    };

    fetchCategories();
    fetchSizes();
  }, []);
  // Manejar cambios en los inputs del formulario
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // Manejar selección de categoría
  const handleCategoryChange = (selectedOption) => {
    if (selectedOption) {
      setFormData({ ...formData, categoryId: selectedOption.value });
      const selectedCategory = categories.find(
        (cat) => cat.id === selectedOption.value
      );

      setSubCategories(selectedCategory?.subCategories || []);
    }
  };
  // Manejar selección de subcategoría
  const handleSubCategoryChange = (selectedOption) => {
    if (selectedOption) {
      setFormData({ ...formData, subCategoryId: selectedOption.value });
    }
  };
  // Manejar selección del tipo de tamaño
  const handleSizeTypeChange = (selectedOption) => {
    if (selectedOption) {
      setSizeType(selectedOption.value);
      filterSizes(selectedOption.value);
      setSelectedSize("");
      setSelectedStock(0);
    }
  };
  // Filtrar tamaños según el tipo seleccionado
  const filterSizes = (type) => {
    const filtered = sizes.filter((size) => size.sizeType === type);
    setFilteredSizes(filtered);
  };
  // Manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.images.length === 0) {
      toast.error("Debe cargar al menos una imagen");
      return;
    }
    setLoading(true);

    try {
      await ClothesService.addClothingItem(formData);
      toast.success("Producto agregado con éxito");
      setFormData({
        name: "",
        type: "",
        price: "",
        stock: "",
        description: "",
        categoryId: "",
        subCategoryId: "",
        images: [],
        variants: [],
      });
      setSelectedSize(null);
      setSelectedStock("");
      const inputs = document.querySelectorAll('input[type="file"]');
      inputs.forEach((input) => (input.value = ""));
    } catch (error) {
      console.error("Error al agregar el producto", error);
      toast.error(
        "Error al agregar el producto: " + (error.message || "Unknown error")
      );
    } finally {
      setLoading(false);
    }
  };
  // Opciones para los selectores
  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));
  const subCategoryOptions = subCategories.map((sub) => ({
    value: sub.id,
    label: sub.name,
  }));
  const sizeOptions = filteredSizes.map((size) => ({
    value: size.id,
    label: size.label,
  }));
  const sizeTypeOptions = [
    { value: "CLOTHING", label: "Ropa" },
    { value: "SHOES", label: "Zapatos" },
  ];
  const imageTypeOptions = [
    { value: "main", label: "Principal" },
    { value: "secondary", label: "Secundario" },
    { value: "additional", label: "Adicional" },
  ];
  // Manejar archivos seleccionados
  const getFiles = (files) => {
    const images = files.map((file, index) => ({
      name: file.name,
      imageUrl: file.base64,
      orderIndex: "",
      type: file.type.split("/")[1],
    }));

    setFormData((prevFormData) => ({
      ...prevFormData,
      images: [...prevFormData.images, ...images],
    }));
  };
  // Actualizar el orden de las imágenes
  const updateImageOrder = (index, order) => {
    const updatedImages = formData.images.map((img, i) => {
      if (i === index) {
        return { ...img, orderIndex: order };
      }
      return img;
    });

    setFormData({ ...formData, images: updatedImages });
  };
  // Eliminar una variante de tamaño
  const removeVariant = (sizeIdToRemove) => {
    setFormData({
      ...formData,
      variants: formData.variants.filter(
        (variant) => variant.sizeId !== sizeIdToRemove
      ),
    });
  };
  // Agregar una variante de tamaño
  const addVariant = () => {
    if (!selectedSize) {
      toast.error("Por favor, seleccione un tamaño antes de agregar.");
      return;
    }

    if (selectedStock <= 0) {
      toast.error("El stock debe ser mayor que 0.");
      return;
    }

    const sizeAlreadyAdded = formData.variants.some(
      (variant) => variant.sizeId === selectedSize.value
    );
    if (sizeAlreadyAdded) {
      toast.error("Este tamaño ya ha sido agregado.");
      return;
    }

    const newVariant = {
      sizeId: selectedSize.value,
      label: selectedSize.label,
      stock: selectedStock,
    };
    setFormData({
      ...formData,
      variants: [...formData.variants, newVariant],
    });

    setSelectedSize(null);
    setSelectedStock(0);
  };
  // Actualizar el tipo de imagen
  const updateImageType = (index, newType) => {
    const updatedImages = formData.images.map((img, i) => {
      if (i === index) {
        return { ...img, type: newType };
      }
      return img;
    });

    setFormData({ ...formData, images: updatedImages });
  };
  // Manejar selección de tamaño
  const handleSizeSelect = (selectedOption) => {
    setSelectedSize(selectedOption);
    setSelectedStock("");
  };
  return (
    <div className="addClothingItemMain">
      <ToastContainer />
      <h2>Gestión de Ropa</h2>
      <form onSubmit={handleSubmit}>
        <div className="addClothingItemForm">
          <div className="addClothingItemInfo">
            <label>Nombre:</label>
            <input
              required
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Ej. Camisa Vintage"
            />
            <label>Tipo:</label>
            <input
              required
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              placeholder="Ej. Camiseta, Pantalón"
            />
            <label>Precio:</label>
            <input
              required
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              type="number"
              placeholder="Ej. 19.99"
              min="0"
              step="0.01"
            />
            <label>Stock:</label>
            <input
              required
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              type="number"
              placeholder="Cantidad disponible"
              min="0"
            />

            <label>Descripción:</label>
            <textarea
              required
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Detalles del producto..."
            />
          </div>
          <div className="addClothingItemFile">
            <div className="file-info">
              <FileBase64 required multiple={true} onDone={getFiles} />
              <button type="button" onClick={resetImages}>
                Resetear Imágenes
              </button>
            </div>
            <div className="image-info">
              {formData.images.map((img, index) => (
                <div key={index} className="image-details">
                  <div className="image-container">
                    <img src={img.imageUrl} alt={`Imagen ${index + 1}`} />
                    <button type="button" onClick={() => removeImage(index)}>
                      <span>&times;</span>
                    </button>
                  </div>
                  <input
                    required
                    type="number"
                    min="1"
                    placeholder="Orden"
                    value={img.orderIndex}
                    onChange={(e) => updateImageOrder(index, e.target.value)}
                  />
                  <Select
                    required
                    isClearable
                    classNamePrefix="custom-select-image-type"
                    options={imageTypeOptions}
                    value={imageTypeOptions.find(
                      (option) => option.value === img.type
                    )}
                    onChange={(option) => updateImageType(index, option.value)}
                    placeholder="Tipo de imagen"
                  />
                </div>
              ))}
            </div>

            <label>Categoría:</label>
            <Select
              required
              isClearable
              classNamePrefix="custom-select"
              components={animatedComponents}
              options={[
                {
                  value: "",
                  label: "Seleccione una categoría...",
                  isDisabled: true,
                },
                ...categoryOptions,
              ]}
              onChange={handleCategoryChange}
              placeholder="Seleccione una categoría..."
            />
            <label>Subcategoría:</label>
            <Select
              required
              isClearable
              classNamePrefix="custom-select"
              components={animatedComponents}
              options={[
                {
                  value: "",
                  label: "Seleccione una subcategoría...",
                  isDisabled: true,
                },
                ...subCategoryOptions,
              ]}
              onChange={handleSubCategoryChange}
              isDisabled={!formData.categoryId}
              placeholder="Seleccione una subcategoría..."
            />
            <label>Tipo de Tamaño:</label>
            <Select
              required
              isClearable
              classNamePrefix="custom-select"
              components={animatedComponents}
              options={[
                {
                  value: null,
                  label: "Seleccione un tipo de tamaño...",
                  isDisabled: true,
                },
                ...sizeTypeOptions,
              ]}
              onChange={handleSizeTypeChange}
              placeholder="Seleccione un tipo de tamaño..."
            />
            <label>Tamaño:</label>
            <Select
              isClearable
              classNamePrefix="custom-select"
              components={animatedComponents}
              options={[
                {
                  value: "",
                  label: "Seleccione un tamaño...",
                  isDisabled: true,
                },
                ...sizeOptions,
              ]}
              value={selectedSize}
              onChange={handleSizeSelect}
              isDisabled={!sizeType}
              placeholder="Seleccione un tamaño..."
            />
            <label>Stock por tamaño</label>

            <div className="stock-size">
              <input
                type="number"
                min="0"
                value={selectedStock}
                onChange={(e) => setSelectedStock(e.target.value)}
                disabled={!selectedSize}
                placeholder="Stock por tamaño"
              />
              <button
                type="button"
                onClick={addVariant}
                disabled={!selectedSize}
              >
                Agregar
              </button>
            </div>
            <div className="detail-stock-size">
              {formData.variants.map((variant) => (
                <div
                  key={variant.sizeId}
                  className="detail-stock-size-container"
                >
                  <span>
                    Tamaño : {variant.label} - Stock por Tamaño: {variant.stock}
                  </span>

                  <FontAwesomeIcon
                    onClick={() => removeVariant(variant.sizeId)}
                    icon={faTrash}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="addClothingItem-add-product-button"
        >
          {loading ? <Loader /> : "Añadir producto"}
        </button>
      </form>
    </div>
  );
};

export default AddClothingItem;
