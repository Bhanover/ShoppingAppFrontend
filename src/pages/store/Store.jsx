import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CarruselCategoriesStore from "../../containers/carruselCategoriesStore/CarruselCategoriesStore";
import InfiniteStore from "../../containers/infiniteStore/InfiniteStore";
import "./Store.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

const Store = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { categoryNameWithId, subCategoryNameWithId } = useParams();

  useEffect(() => {
    if (location.pathname === "/home/store") {
      navigate("/home/store/novedades", { replace: true });
    }
  }, [location.pathname, navigate]);

  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <div className="store">
      {categoryNameWithId !== "novedades" && (
        <div className="store-categories">
          <CarruselCategoriesStore categoryNameWithId={categoryNameWithId} />
        </div>
      )}

      <div className="store-container">
        <FontAwesomeIcon
          icon={faArrowLeftLong}
          onClick={handleBackClick}
          className="back-button"
        />

        <InfiniteStore
          subCategoryNameWithId={subCategoryNameWithId}
          categoryNameWithId={categoryNameWithId}
        />
      </div>
    </div>
  );
};

export default Store;
