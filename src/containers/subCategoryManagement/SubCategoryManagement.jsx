import React, { useState, useEffect } from "react";
import SubCategoryService from "../../service/SubCategoryService";
import "./SubCategoryManagement.css";
import { FaEllipsisV } from "react-icons/fa";
import { FaUpload, FaImage } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../loaders/Loader";
import CategoryService from "../../service/CategoryService";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Select from "react-select";

const SubCategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [newSubCategory, setNewSubCategory] = useState({
    name: "",
    description: "",
  });
  const [subCategoryImage, setSubCategoryImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    loadCategories();
    loadSubCategories();
  }, []);
  const loadCategories = async () => {
    try {
      const res = await CategoryService.obtainSimpleCategories(); // Asegúrate de que este método esté implementado
      const categoryOptions = res.map((cat) => ({
        value: cat.id,
        label: cat.name,
      }));
      setCategories(categoryOptions);
    } catch (error) {
      toast.error("Error cargando las categorías");
    }
  };
  const loadSubCategories = async () => {
    try {
      const res = await SubCategoryService.obtainSubCategories();
      setSubCategories(res);
    } catch (error) {
      toast.error("Error cargando las categorías");
    }
  };

  const handleAddSubCategory = async () => {
    setLoading(true);
    if (
      !newSubCategory.name ||
      !newSubCategory.description ||
      !subCategoryImage ||
      !selectedCategory
    ) {
      toast.error(
        "Por favor, completa todos los campos, selecciona una imagen y una categoría."
      );
      setLoading(false);
      return;
    }

    try {
      await SubCategoryService.addSubCategory(
        newSubCategory.name,
        newSubCategory.description,
        subCategoryImage,
        selectedCategory.value
      );

      loadSubCategories();
      setNewSubCategory({ name: "", description: "" });
      setSubCategoryImage(null);
      setSelectedCategory(null);
      toast.success("Subcategoría añadida con éxito!");
    } catch (error) {
      toast.error("Error al añadir la subcategoría.");
    } finally {
      setLoading(false);
    }
  };
  /*
  const handleUpdateCategory = async (id) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", newCategory.name);
    formData.append("description", newCategory.description);
    if (categoryImage) {
      formData.append("file", categoryImage);
    }

    try {
      await CategoryService.updateCategoryWithImage(id, formData);
      loadSubCategories();
      setNewCategory({ name: "", description: "" }); // Resetear el formulario
      setCategoryImage(null); // Resetear la imagen
      toast.success("Categoría actualizada con éxito!");
    } catch (error) {
      toast.error("Error al actualizar la categoría.");
    } finally {
      setLoading(false);
    }
  };
*/
  const handleDeleteCategory = async (id) => {
    try {
      await SubCategoryService.deleteSubCategory(id);
      loadSubCategories();
      toast.success("Categoría eliminada con éxito.");
    } catch (error) {
      toast.error("Error al eliminar la categoría.");
    }
  };
  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
  };
  return (
    <div className="categoryManagement">
      <ToastContainer />
      <h2 className="categoryManagement-title">Gestión de Categorías</h2>
      <div className="categoryManagement-container">
        <input
          className="categoryManagement-inputField"
          type="text"
          placeholder="Nombre"
          value={newSubCategory.name}
          onChange={(e) =>
            setNewSubCategory({ ...newSubCategory, name: e.target.value })
          }
          disabled={loading}
        />
        <input
          className="categoryManagement-inputField"
          type="text"
          placeholder="Descripción"
          value={newSubCategory.description}
          onChange={(e) =>
            setNewSubCategory({
              ...newSubCategory,
              description: e.target.value,
            })
          }
          disabled={loading}
        />
        <div>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            options={categories}
            className="categoryManagement-select"
            placeholder="Selecciona una categoría"
            isDisabled={loading}
          />
        </div>
        <label className="categoryManagement-iconLabel">
          {subCategoryImage ? (
            <img src={URL.createObjectURL(subCategoryImage)} alt="Preview" />
          ) : (
            <FaUpload />
          )}
          <input
            className="categoryManagement-inputFile"
            type="file"
            onChange={(e) => setSubCategoryImage(e.target.files[0])}
            style={{ display: "none" }}
            disabled={loading}
          />
        </label>
        <button
          className="categoryManagement-button"
          onClick={handleAddSubCategory}
          disabled={loading}
        >
          {loading ? <Loader /> : "Añadir Categoría"}
        </button>
      </div>
      <div className="table-wrapper">
        <table className="categoryManagement-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Imagen</th>
              <th>Acciones</th>
              <th className="categoryManagement-table-actions">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {subCategories.map((subCategories) => (
              <React.Fragment key={subCategories.id}>
                <tr>
                  <td>{subCategories.name}</td>
                  <td>{subCategories.description}</td>
                  <td>
                    <img
                      src={subCategories.subCategoryImage}
                      alt={subCategories.name}
                    />
                  </td>
                  <td>{subCategories.categoryName}</td>
                  <td className="categoryManagement-table-actions">
                    <div>
                      <button
                      /*   onClick={() => handleUpdateCategory(subCategories.id)}*/
                      >
                        <FaEdit />
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(subCategories.id)}
                      >
                        <FaTrashAlt />
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-controls"></div>
    </div>
  );
};

export default SubCategoryManagement;
