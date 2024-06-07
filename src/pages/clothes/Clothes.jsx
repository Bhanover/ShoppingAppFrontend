import Cart from "../../containers/cart/Cart";
import ClothesDetails from "../../containers/clothesDetails/ClothesDetails";
import { useNavigate, useParams } from "react-router-dom/dist";
import "./Clothes.css";
import InfiniteStore from "../../containers/infiniteStore/InfiniteStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
const Clothes = () => {
  const { categoryNameWithId, subCategoryNameWithId } = useParams();
  const navigate = useNavigate();

  // Manejar el clic del botón para ir hacia atrás en el historial
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="clothes">
      <div className="clothes-container">
        {/* Botón de retroceso */}
        <FontAwesomeIcon
          icon={faArrowLeftLong}
          onClick={handleBackClick}
          className="clothes-back-button"
        />
        {/* Detalles de ropa */}
        <ClothesDetails />
      </div>
      <div>
        {/* Componente de tienda infinita */}
        <InfiniteStore
          subCategoryNameWithId={subCategoryNameWithId}
          categoryNameWithId={categoryNameWithId}
        />
      </div>
    </div>
  );
};

export default Clothes;
