import React, { useState, useEffect } from "react";
import ClothesService from "../../service/ClothesService";
import "./CategoryManagement.css";
import { FaEllipsisV } from "react-icons/fa";
import { FaUpload, FaImage } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../loaders/Loader";
import CategoryService from "../../service/CategoryService";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import ReactModal from "react-modal";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [categoryImage, setCategoryImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  // Cargar las categorías cuando el componente se monta
  useEffect(() => {
    loadCategories();
  }, [currentPage]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteCandidateId, setDeleteCandidateId] = useState(null);

  const loadCategories = async () => {
    setLoadingCategories(true);
    try {
      const res = await CategoryService.fetchAdminCategories();
      setCategories(res);
    } catch (error) {
      toast.error("Error cargando las categorías");
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleAddCategory = async () => {
    setLoading(true);
    if (!newCategory.name || !newCategory.description || !categoryImage) {
      toast.error(
        "Por favor, completa todos los campos y selecciona una imagen."
      );
      setLoading(false);
      return;
    }

    try {
      // Utiliza el nuevo método para añadir la categoría con la imagen
      await CategoryService.addCategoryWithImageNew(
        newCategory.name,
        newCategory.description,
        categoryImage
      );

      loadCategories();
      setNewCategory({ name: "", description: "" }); // Resetear el formulario
      setCategoryImage(null); // Resetear la imagen
      toast.success("Categoría añadida con éxito!");
    } catch (error) {
      toast.error("Error al añadir la categoría.");
    } finally {
      setLoading(false);
    }
  };

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
      loadCategories();
      setNewCategory({ name: "", description: "" }); // Resetear el formulario
      setCategoryImage(null); // Resetear la imagen
      toast.success("Categoría actualizada con éxito!");
    } catch (error) {
      toast.error("Error al actualizar la categoría.");
    } finally {
      setLoading(false);
    }
  };

  const requestDelete = (id) => {
    setModalIsOpen(true);
    setDeleteCandidateId(id);
  };
  const handleDeleteCategory = async () => {
    if (deleteCandidateId) {
      try {
        await CategoryService.deleteCategory(deleteCandidateId);
        loadCategories();
        toast.success("Categoría eliminada con éxito.");
      } catch (error) {
        toast.error("Error al eliminar la categoría.");
      }
    }
    closeAndResetModal();
  };

  const closeAndResetModal = () => {
    setModalIsOpen(false);
    setDeleteCandidateId(null);
  };
  return (
    <div className="categoryManagement">
      <ToastContainer />
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeAndResetModal}
        contentLabel="Confirmación de Eliminación"
        className="subcategoryManagement-modal"
        overlayClassName="subcategoryManagement-modal-overlay"
      >
        <h2>Confirmación</h2>
        <p>¿Estás seguro de que deseas eliminar esta subcategoría?</p>
        <div>
          <button onClick={handleDeleteCategory}>Eliminar</button>
          <button onClick={closeAndResetModal}>Cancelar</button>
        </div>
      </ReactModal>
      <h2 className="categoryManagement-title">Gestión de Categorías</h2>
      <div className="categoryManagement-container">
        <input
          className="categoryManagement-inputField"
          type="text"
          placeholder="Nombre"
          value={newCategory.name}
          onChange={(e) =>
            setNewCategory({ ...newCategory, name: e.target.value })
          }
          disabled={loading}
        />
        <input
          className="categoryManagement-inputField"
          type="text"
          placeholder="Descripción"
          value={newCategory.description}
          onChange={(e) =>
            setNewCategory({ ...newCategory, description: e.target.value })
          }
          disabled={loading}
        />
        <label className="categoryManagement-iconLabel">
          {categoryImage ? (
            <img src={URL.createObjectURL(categoryImage)} alt="Preview" />
          ) : (
            <FaUpload />
          )}
          <input
            className="categoryManagement-inputFile"
            type="file"
            onChange={(e) => setCategoryImage(e.target.files[0])}
            style={{ display: "none" }}
            disabled={loading}
          />
        </label>
        <button
          className="categoryManagement-button"
          onClick={handleAddCategory}
          disabled={loading}
        >
          {loading ? <Loader /> : "Añadir Categoría"}
        </button>
      </div>
      <div className="table-wrapper">
        {loadingCategories ? (
          <Loader />
        ) : (
          <table className="categoryManagement-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Imagen</th>
                <th>Sub-Categorias</th>
                <th className="categoryManagement-table-actions">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category) => (
                <React.Fragment key={category.id}>
                  <tr>
                    <td>{category.name}</td>
                    <td>{category.description}</td>
                    <td>
                      <img src={category.categoryImage} alt={category.name} />
                    </td>
                    <td className="categoryManagement-table-subcategories">
                      {category.subCategories.map((subCategory) => (
                        <li key={subCategory.id}>{subCategory.name}</li>
                      ))}
                    </td>
                    <td className="categoryManagement-table-actions">
                      <div>
                        <button
                          onClick={() => handleUpdateCategory(category.id)}
                        >
                          <FaEdit />
                          Editar
                        </button>
                        <button onClick={() => requestDelete(category.id)}>
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
        )}
      </div>
    </div>
  );
};

export default CategoryManagement;
