import React, { useState, useEffect } from "react";
import ClothesService from "../../service/ClothesService";
import Loader from "../../loaders/Loader";
import { FaTrashAlt, FaEye, FaEyeSlash } from "react-icons/fa"; // Agregando iconos para mostrar/ocultar
import "./DeleteClothingItem.css";

const DeleteClothingItem = () => {
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showList, setShowList] = useState(false);
  const loadClothingItems = async () => {
    setIsLoading(true);
    try {
      const items = await ClothesService.fetchSimpleClothingItemList();
      setClothingItems(items);
    } catch (error) {
      console.error("Error al cargar los artículos de ropa:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadClothingItems();
  }, []);

  const handleDelete = async (id) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este artículo?")
    ) {
      setIsLoading(true);
      try {
        await ClothesService.deleteClothingItem(id);
        loadClothingItems(); // Recargar la lista después de eliminar
      } catch (error) {
        console.error("Error al eliminar el artículo de ropa:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="clothing-management-container">
      <h2>Borrado de Ropa</h2>
      <button
        onClick={() => setShowList(!showList)}
        className="show-list-button"
      >
        {showList ? <FaEyeSlash /> : <FaEye />}
        {showList ? "Ocultar" : "Mostrar"} Lista
      </button>

      {isLoading ? (
        <Loader />
      ) : (
        showList && (
          <ul className="clothing-list">
            {Array.isArray(clothingItems) ? (
              clothingItems.map((item) => (
                <li key={item.id} className="clothing-item">
                  <span>{item.name} </span>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="delete-button"
                  >
                    <FaTrashAlt /> Eliminar
                  </button>
                </li>
              ))
            ) : (
              <p>No se encontraron artículos de ropa.</p>
            )}
          </ul>
        )
      )}
    </div>
  );
};

export default DeleteClothingItem;
