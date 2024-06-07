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
import ReactModal from "react-modal";

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
  const [loadingSubCategories, setLoadingSubCategories] = useState(false);

  useEffect(() => {
    loadCategories();
    loadSubCategories();
  }, []);
  // Cargar categorías desde el servicio
  const loadCategories = async () => {
    try {
      const res = await CategoryService.obtainSimpleCategories();
      const categoryOptions = res.map((cat) => ({
        value: cat.id,
        label: cat.name,
      }));
      setCategories(categoryOptions);
    } catch (error) {
      toast.error("Error cargando las categorías");
    }
  };
  // Cargar subcategorías desde el servicio
  const loadSubCategories = async () => {
    setLoadingSubCategories(true);
    try {
      const res = await SubCategoryService.obtainSubCategories();
      setSubCategories(res);
    } catch (error) {
      toast.error("Error cargando las categorías");
    } finally {
      setLoadingSubCategories(false);
    }
  };
  // Manejar la adición de una nueva subcategoría
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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteCandidateId, setDeleteCandidateId] = useState(null);
  // Solicitar confirmación para eliminar una subcategoría
  const requestDelete = (id) => {
    setModalIsOpen(true);
    setDeleteCandidateId(id);
  };
  // Manejar la eliminación de una subcategoría
  const handleDeleteSubCategory = async () => {
    if (deleteCandidateId) {
      try {
        await SubCategoryService.deleteSubCategory(deleteCandidateId);
        loadSubCategories();
        toast.success("Subcategoría eliminada con éxito.");
      } catch (error) {
        toast.error("Error al eliminar la subcategoría.");
      }
    }
    closeAndResetModal();
  };
  // Cerrar y resetear el modal de confirmación
  const closeAndResetModal = () => {
    setModalIsOpen(false);
    setDeleteCandidateId(null);
  };
  // Manejar el cambio de categoría seleccionada
  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
  };
  return (
    <div className="subCategoryManagement">
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
          <button onClick={handleDeleteSubCategory}>Eliminar</button>
          <button onClick={closeAndResetModal}>Cancelar</button>
        </div>
      </ReactModal>
      <h2 className="subCategoryManagement-title">Gestión de Sub Categorías</h2>
      <div className="subCategoryManagement-container">
        <input
          className="subCategoryManagement-inputField"
          type="text"
          placeholder="Nombre"
          value={newSubCategory.name}
          onChange={(e) =>
            setNewSubCategory({ ...newSubCategory, name: e.target.value })
          }
          disabled={loading}
        />
        <input
          className="subCategoryManagement-inputField"
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

        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          options={categories}
          classNamePrefix="sub-select"
          placeholder="Selecciona una categoría"
          isDisabled={loading}
        />

        <label className="subCategoryManagement-iconLabel">
          {subCategoryImage ? (
            <img src={URL.createObjectURL(subCategoryImage)} alt="Preview" />
          ) : (
            <FaUpload />
          )}
          <input
            className="subCategoryManagement-inputFile"
            type="file"
            onChange={(e) => setSubCategoryImage(e.target.files[0])}
            style={{ display: "none" }}
            disabled={loading}
          />
        </label>
        <button
          className="subCategoryManagement-button"
          onClick={handleAddSubCategory}
          disabled={loading}
        >
          {loading ? <Loader /> : "Añadir Sub-Categoría"}
        </button>
      </div>
      <div className="subtable-wrapper">
        {loadingSubCategories ? (
          <Loader />
        ) : (
          <table className="subCategoryManagement-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Imagen</th>
                <th>Categoria</th>
                <th className="subCategoryManagement-table-actions">
                  Acciones
                </th>
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
                    <td className="subCategoryManagement-table-actions">
                      <div>
                        <button
                        /*   onClick={() => handleUpdateCategory(subCategories.id)}*/
                        >
                          <FaEdit />
                          Editar
                        </button>
                        <button onClick={() => requestDelete(subCategories.id)}>
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

export default SubCategoryManagement;
