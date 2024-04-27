/*import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddClothingItem.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import CategoryService from "../../service/CategoryService";
import SizeService from "../../service/SizeService";
import ImageUploader from "../../components/ImageUploader";

const AddClothingItem = () => {
  const animatedComponents = makeAnimated();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [allSizes, setAllSizes] = useState([]);
  const [clothingData, setClothingData] = useState({
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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const jwtToken = localStorage.getItem("JwtToken");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await CategoryService.fetchCategoriesName();
        setCategories(
          fetchedCategories.map((cat) => ({
            value: cat.id,
            label: cat.name,
            subCategories: cat.subCategories.map((sub) => ({
              value: sub.id,
              label: sub.name,
            })),
          }))
        );
      } catch (error) {
        console.error("Error al cargar categorías: ", error);
      }
    };

    const fetchSizes = async () => {
      const response = await SizeService.fetchAdminSizes();
      setAllSizes(response);
    };

    loadCategories();
    fetchSizes();
  }, []);

  const handleCategoryChange = (option) => {
    setSelectedCategory(option);
    setSelectedSubCategories([]);
    if (option) {
      setClothingData((prev) => ({ ...prev, categoryId: option.value }));
    } else {
      setClothingData((prev) => ({ ...prev, categoryId: "" }));
    }
  };

  
  const handleTypeChange = (selectedOption) => {
    if (selectedOption) {
      // Actualizar el tipo de prenda seleccionado en clothingData
      setClothingData((prevState) => ({
        ...prevState,
        type: selectedOption.value,
      }));

      // Filtrar las tallas correspondientes al tipo de prenda seleccionado
      const filteredSizes = allSizes
        .filter((size) => size.sizeType === selectedOption.value)
        .map((size) => ({
          value: size.id,
          label: size.label,
        }));

      // Actualizar las tallas disponibles
      setSizes(filteredSizes);

      // Limpiar las variantes al cambiar el tipo de prenda
      setClothingData((prevState) => ({
        ...prevState,
        variants: [],
      }));
    } else {
      // Si no se selecciona ninguna opción, limpiar el tipo de prenda y las tallas
      setClothingData((prevState) => ({
        ...prevState,
        type: "",
        variants: [],
      }));
      setSizes([]);
    }
  };

  const handleClothingChange = (e) => {
    const { name, value } = e.target;

    // Manejar el cambio en el stock cuando se selecciona una talla
    if (name.startsWith("stock_")) {
      const sizeId = name.split("_")[1];
      const updatedVariants = clothingData.variants.map((variant) => {
        if (variant.sizeId === parseInt(sizeId)) {
          return { ...variant, stock: parseInt(value) };
        }
        return variant;
      });
      setClothingData((prevState) => ({
        ...prevState,
        variants: updatedVariants,
      }));
    } else {
      setClothingData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.keys(clothingData).forEach((key) => {
      if (key === "images") {
        clothingData.images.forEach((image, index) => {
          formData.append(`images[${index}].name`, image.name);
          formData.append(`images[${index}].file`, image.file);
        });
      } else if (key === "variants") {
        clothingData.variants.forEach((variant, index) => {
          formData.append(`variants[${index}].sizeId`, variant.sizeId);
          formData.append(`variants[${index}].stock`, variant.stock);
        });
      } else {
        formData.append(key, clothingData[key]);
      }
    });

    formData.append(
      "categoryId",
      selectedCategory ? selectedCategory.value : ""
    );
    selectedSubCategories.forEach((sub) => {
      formData.append("subCategoryIds", sub.value);
    });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/product`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Producto añadido con éxito");
      navigate("/");
    } catch (error) {
      toast.error(
        "Error al añadir producto: " +
          (error.response?.data.error || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (images) => {
    setClothingData({ ...clothingData, images });
  };

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
              placeholder="Nombre del producto"
              required
            />

            <Select
              components={animatedComponents}
              options={categories}
              onChange={handleCategoryChange}
              value={selectedCategory}
              placeholder="Seleccione la categoría"
              isClearable
            />
            <Select
              components={animatedComponents}
              options={selectedCategory ? selectedCategory.subCategories : []}
              onChange={(selectedOption) =>
                setSelectedSubCategories(selectedOption ? [selectedOption] : [])
              }
              // ^^^ Modificación aquí ^^^
              value={selectedSubCategories}
              placeholder="Seleccione subcategorías"
            />

            <Select
              components={animatedComponents}
              options={[
                { value: "CLOTHING", label: "Ropa" },
                { value: "SHOES", label: "Zapatos" },
              ]}
              onChange={handleTypeChange}
              placeholder="Seleccione el tipo de prenda"
              isClearable
              value={
                clothingData.type
                  ? { value: clothingData.type, label: clothingData.type }
                  : null
              }
            />
            <Select
              components={animatedComponents}
              options={sizes}
              onChange={(selectedOption) =>
                setClothingData({
                  ...clothingData,
                  sizeId: selectedOption.value,
                })
              }
              // ^^^ Modificación aquí ^^^
              value={clothingData.sizeId}
              placeholder="Seleccione la talla"
              isClearable
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
              placeholder="Precio"
            />

            <textarea
              id="description"
              name="description"
              value={clothingData.description}
              onChange={handleClothingChange}
              placeholder="Descripción"
            />
          </div>

          <div className="addClothingItemFile">
            <ImageUploader onImageChange={handleImageChange} />
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Añadir producto"}
        </button>
      </form>
    </div>
  );
};

export default AddClothingItem;
*/
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
  const resetImages = () => {
    setFormData({ ...formData, images: [] });
  };

  const removeImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };
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
        filterSizes(sizeType); // Filtra inicialmente por ropa
      } catch (error) {
        console.error("Error al obtener los tamaños", error);
        toast.error("Error al cargar los tamaños");
      }
    };

    fetchCategories();
    fetchSizes();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (selectedOption) => {
    setFormData({ ...formData, categoryId: selectedOption.value });
    const selectedCategory = categories.find(
      (cat) => cat.id === selectedOption.value
    );
    setSubCategories(selectedCategory?.subCategories || []);
  };

  const handleSubCategoryChange = (selectedOption) => {
    setFormData({ ...formData, subCategoryId: selectedOption.value });
  };

  const handleSizeTypeChange = (selectedOption) => {
    setSizeType(selectedOption.value);
    filterSizes(selectedOption.value);
    setSelectedSize("");
    setSelectedStock(0);
  };

  const filterSizes = (type) => {
    const filtered = sizes.filter((size) => size.sizeType === type);
    setFilteredSizes(filtered);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log("JSON enviado:", JSON.stringify(formData, null, 2));
    console.log(formData);
    try {
      const response = await axios.post(BASE_URL + "/api/product", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Respuesta del servidor:", response.data);
      toast.success("Producto agregado con éxito");
    } catch (error) {
      console.error(
        "Error al agregar el producto",
        error.response ? error.response.data : error
      );
      toast.error(
        "Error al agregar el producto: " +
          (error.response ? error.response.data.error : error.message)
      );
    } finally {
      setLoading(false);
    }
  };

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
  const updateImageOrder = (index, order) => {
    const updatedImages = formData.images.map((img, i) => {
      if (i === index) {
        return { ...img, orderIndex: order };
      }
      return img;
    });

    setFormData({ ...formData, images: updatedImages });
  };
  const removeVariant = (sizeIdToRemove) => {
    setFormData({
      ...formData,
      variants: formData.variants.filter(
        (variant) => variant.sizeId !== sizeIdToRemove
      ),
    });
  };

  const addVariant = () => {
    if (selectedSize) {
      const newVariant = {
        sizeId: selectedSize.value,
        label: selectedSize.label,
        stock: selectedStock,
      };
      setFormData({
        ...formData,
        variants: [...formData.variants, newVariant],
      });
      // Reset selected size and stock for the next entry
      setSelectedSize("");
      setSelectedStock(0);
    } else {
      toast.error("Please select a size before adding");
    }
  };
  const handleSizeSelect = (selectedOption) => {
    setSelectedSize(selectedOption);
    setSelectedStock(0); // Esto reseteará el stock cada vez que cambies el tamaño
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
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Ej. Camisa Vintage" // Ejemplo concreto
            />
            <label>Tipo:</label>
            <input
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              placeholder="Ej. Camiseta, Pantalón" // Ejemplo de tipos de ropa
            />
            <label>Precio:</label>
            <input
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              type="number"
              placeholder="Ej. 19.99" // Ejemplo de formato de precio
            />
            <label>Stock:</label>
            <input
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              type="number"
              placeholder="Cantidad disponible" // Instrucción clara
            />

            <label>Descripción:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Detalles del producto..." // Inicio de descripción sugerida
            />
          </div>
          <div className="addClothingItemFile">
            <div className="file-info">
              <FileBase64 multiple={true} onDone={getFiles} />
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
                    type="number"
                    placeholder="Orden" // Clarificación del propósito del campo
                    value={img.orderIndex}
                    onChange={(e) => updateImageOrder(index, e.target.value)}
                  />
                </div>
              ))}
            </div>

            <label>Categoría:</label>
            <Select
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
              classNamePrefix="custom-select"
              components={animatedComponents}
              options={[
                {
                  value: "",
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
                value={selectedStock}
                onChange={(e) => setSelectedStock(e.target.value)}
                disabled={!selectedSize}
                placeholder="Stock por tamaño" // Aclaración adicional
              />
              <button
                type="button"
                onClick={addVariant}
                disabled={!selectedSize}
              >
                Add
              </button>
            </div>
            <div className="detail-stock-size">
              {formData.variants.map((variant) => (
                <div key={variant.sizeId}>
                  <span>
                    {variant.label}: {variant.stock}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeVariant(variant.sizeId)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? <Loader /> : "Añadir producto"}
        </button>
      </form>
    </div>
  );
};

export default AddClothingItem;
