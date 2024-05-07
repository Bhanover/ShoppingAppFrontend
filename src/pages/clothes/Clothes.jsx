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
  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <div className="clothes">
      <div className="clothes-container">
        <FontAwesomeIcon
          icon={faArrowLeftLong}
          onClick={handleBackClick}
          className="clothes-back-button"
        />
        <ClothesDetails />
      </div>
      <div>
        <InfiniteStore
          subCategoryNameWithId={subCategoryNameWithId}
          categoryNameWithId={categoryNameWithId}
        />
      </div>
    </div>
  );
};
export default Clothes;
