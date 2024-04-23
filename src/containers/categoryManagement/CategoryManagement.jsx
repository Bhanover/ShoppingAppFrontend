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

const CategoryManagement = () => {
  const [categories, setCategories] = useState([
    {
      id: "1",
      imageUrl:
        "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
      name: "asda",
      description: "sdasd",
      subCategories: [
        {
          id: "1",
          name: "dasd",
        },
      ],
    },
    {
      id: "2",
      imageUrl:
        "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
      name: "asda",
      description: "sdasd",
      subCategories: [
        {
          id: "1",
          name: "dasd",
        },
      ],
    },
    {
      id: "3",
      imageUrl:
        "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
      name: "asda",
      description: "sdasd",
      subCategories: [
        {
          id: "1",
          name: "dasd",
        },
      ],
    },
    {
      id: "1",
      imageUrl:
        "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
      name: "asda",
      description: "sdasd",
      subCategories: [
        {
          id: "1",
          name: "dasd",
        },
      ],
    },
    {
      id: "2",
      imageUrl:
        "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
      name: "asda",
      description: "sdasd",
      subCategories: [
        {
          id: "1",
          name: "dasd",
        },
      ],
    },
    {
      id: "3",
      imageUrl:
        "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
      name: "asda",
      description: "sdasd",
      subCategories: [
        {
          id: "1",
          name: "dasd",
        },
      ],
    },
    {
      id: "1",
      imageUrl:
        "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
      name: "asda",
      description: "sdasd",
      subCategories: [
        {
          id: "1",
          name: "dasd",
        },
      ],
    },
    {
      id: "2",
      imageUrl:
        "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
      name: "asda",
      description: "sdasd",
      subCategories: [
        {
          id: "1",
          name: "dasd",
        },
      ],
    },
    {
      id: "3",
      imageUrl:
        "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
      name: "asda",
      description: "sdasd",
      subCategories: [
        {
          id: "1",
          name: "dasd",
        },
      ],
    },
    {
      id: "1",
      imageUrl:
        "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
      name: "asda",
      description: "sdasd",
      subCategories: [
        {
          id: "1",
          name: "dasd",
        },
      ],
    },
    {
      id: "2",
      imageUrl:
        "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
      name: "asda",
      description: "sdasd",
      subCategories: [
        {
          id: "1",
          name: "dasd",
        },
      ],
    },
    {
      id: "3",
      imageUrl:
        "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
      name: "asda",
      description: "sdasd",
      subCategories: [
        {
          id: "1",
          name: "dasd",
        },
      ],
    },
    {
      id: "1",
      imageUrl:
        "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
      name: "asda",
      description: "sdasd",
      subCategories: [
        {
          id: "1",
          name: "dasd",
        },
      ],
    },
    {
      id: "2",
      imageUrl:
        "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
      name: "asda",
      description: "sdasd",
      subCategories: [
        {
          id: "1",
          name: "dasd",
        },
      ],
    },
    {
      id: "3",
      imageUrl:
        "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
      name: "asda",
      description: "sdasd",
      subCategories: [
        {
          id: "1",
          name: "dasd",
        },
      ],
    },
    {
      id: "1",
      imageUrl:
        "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
      name: "asda",
      description: "sdasd",
      subCategories: [
        {
          id: "1",
          name: "dasd",
        },
      ],
    },
    {
      id: "2",
      imageUrl:
        "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
      name: "asda",
      description: "sdasd",
      subCategories: [
        {
          id: "1",
          name: "dasd",
        },
      ],
    },
    {
      id: "3",
      imageUrl:
        "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
      name: "asda",
      description: "sdasd",
      subCategories: [
        {
          id: "1",
          name: "dasd",
        },
      ],
    },

    {
      id: "1",
      imageUrl:
        "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
      name: "asda",
      description: "sdasd",
      subCategories: [
        {
          id: "1",
          name: "dasd",
        },
      ],
    },
    {
      id: "2",
      imageUrl:
        "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
      name: "asda",
      description: "sdasd",
      subCategories: [
        {
          id: "1",
          name: "dasd",
        },
      ],
    },
    {
      id: "3",
      imageUrl:
        "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
      name: "asda",
      description: "sdasd",
      subCategories: [
        {
          id: "1",
          name: "dasd",
        },
      ],
    },
    {
      id: "1",
      imageUrl:
        "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
      name: "asda",
      description: "sdasd",
      subCategories: [
        {
          id: "1",
          name: "dasd",
        },
      ],
    },
    {
      id: "2",
      imageUrl:
        "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
      name: "asda",
      description: "sdasd",
      subCategories: [
        {
          id: "1",
          name: "dasd",
        },
      ],
    },
    {
      id: "3",
      imageUrl:
        "https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg",
      name: "asda",
      description: "sdasd",
      subCategories: [
        {
          id: "1",
          name: "dasd",
        },
      ],
    },
  ]);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [categoryImage, setCategoryImage] = useState(null);
  const [visibleMenu, setVisibleMenu] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  // Cargar las categorías cuando el componente se monta
  useEffect(() => {
    loadCategories();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const loadCategories = async () => {
    try {
      const res = await ClothesService.fetchAdminCategories(currentPage);
      setCategories(res.content); // Asume que la respuesta incluye un campo 'content'
      // Aquí podrías también configurar la paginación (total de páginas, etc.)
    } catch (error) {
      toast.error("Error cargando las categorías");
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
      await ClothesService.addCategoryWithImageNew(
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

  const handleDeleteCategory = async (id) => {
    try {
      await CategoryService.deleteCategory(id);
      loadCategories();
      toast.success("Categoría eliminada con éxito.");
    } catch (error) {
      toast.error("Error al eliminar la categoría.");
    }
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
          disabled={loading} // Deshabilita el botón mientras se carga
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
            {categories.map((category) => (
              <React.Fragment key={category.id}>
                <tr>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>
                    <img src={category.imageUrl} alt={category.name} />
                  </td>
                  <td>
                    {category.subCategories.map((subCategory) => (
                      <p key={subCategory.id}>{subCategory.name}</p>
                    ))}
                  </td>
                  <td className="categoryManagement-table-actions">
                    <div>
                      <button onClick={() => handleUpdateCategory(category.id)}>
                        <FaEdit />
                        Editar
                      </button>
                      <button onClick={() => handleDeleteCategory(category.id)}>
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
      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={currentPage === 0}>
          Anterior
        </button>
        <span>Página {currentPage + 1}</span>
        <button onClick={handleNextPage}>Siguiente</button>
      </div>
    </div>
  );
};

export default CategoryManagement;
/*     */
