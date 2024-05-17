import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./DeleteClothingItem.css";
import ClothesService from "../../service/ClothesService";
import BASE_URL from "../../Enviroment";

const DeleteClothingItem = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const items = await ClothesService.getClothingItemNameAndId();
        setProducts(items);
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await ClothesService.deleteClothingItem(id);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
      alert("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  return (
    <div className="delete-product-list">
      {products.map((product) => (
        <div key={product.id} className="delete-product-item">
          <span>
            {product.id} - {product.name}
          </span>
          <button
            onClick={() => handleDelete(product.id)}
            className="delete-button"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default DeleteClothingItem;
