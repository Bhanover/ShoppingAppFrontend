import React, { useState, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom"; // Update import statement
import { LazyLoadImage } from "react-lazy-load-image-component";
import axios from "axios";
import "react-lazy-load-image-component/src/effects/opacity.css";
import "./InfiniteStore.css";
import LoaderPage from "../../loaders/LoaderPage";
import Loader from "../../loaders/Loader";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import LoaderInfinite from "../../loaders/LoaderInfinite";
import BASE_URL from "../../Enviroment";
const InfiniteStore = ({ categoryNameWithId, subCategoryNameWithId }) => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadedItems, setLoadedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageSize = 8;
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  const subCategoryName = subCategoryNameWithId
    ? subCategoryNameWithId.split("-")[0]
    : null;
  const subCategoryId = subCategoryNameWithId
    ? subCategoryNameWithId.split("-")[1]
    : null;
  const categoryName = categoryNameWithId
    ? categoryNameWithId.split("-")[0]
    : null;
  const categoryId = categoryNameWithId
    ? categoryNameWithId.split("-")[1]
    : null;
  useEffect(() => {
    let url = "";

    if (categoryNameWithId === "novedades") {
      url = `${BASE_URL}/api/products`;
    } else if (subCategoryId) {
      url = `${BASE_URL}/api/subcategories/${subCategoryId}/products`;
    } else {
      url = `${BASE_URL}/api/categories/${categoryId}/products`;
    }

    timeoutRef.current = setTimeout(() => {
      if (loading) {
        setLoading(false);
        setError("Tiempo de espera excedido. Intente recargar la página.");
      }
    }, 10000);

    axios
      .get(url)
      .then((response) => {
        clearTimeout(timeoutRef.current);
        const processedItems = response.data.map((item) => ({
          ...item,
          mainImage: item.mainImageUrl,
          hoverImage: item.secondaryImageUrl,
        }));
        setLoadedItems(processedItems);
        setItems(processedItems.slice(0, pageSize));
        setLoading(false);
        setHasMore(processedItems.length > pageSize);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error al cargar los datos.");
        setHasMore(false);
        setLoading(false);
      });

    return () => clearTimeout(timeoutRef.current);
  }, [categoryNameWithId, subCategoryNameWithId]);
  const fetchMoreData = () => {
    if (items.length >= loadedItems.length) {
      setHasMore(false);
      return;
    }
    const nextIndex = items.length;
    const nextItems = loadedItems.slice(nextIndex, nextIndex + pageSize);
    setItems(items.concat(nextItems));

    if (nextIndex + pageSize >= loadedItems.length) {
      setHasMore(false);
    }
  };

  if (loading) return <LoaderPage />;
  if (error) return <p className="infiniteStore-error">{error}</p>;

  return (
    <div className="infiniteStore">
      <h1>Mostrando {subCategoryId ? subCategoryName : categoryName}</h1>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<LoaderInfinite />}
        scrollThreshold={0.7}
      >
        <div className="infiniteStore-container">
          {items.map((item) => (
            <div key={item.id} className="infiniteStore-item-container">
              <Link
                to={`/store/${item.categoryName}-${item.categoryId}/${item.subCategoryName}-${item.subCategoryId}/${item.name}-${item.id}`}
                className="infiniteStore-item-link"
              >
                <div className="infiniteStore-image-container">
                  <LazyLoadImage
                    alt={`${item.name} - main`}
                    src={item.mainImage}
                    effect="opacity"
                    scrollPosition={0}
                    threshold={300}
                    className="infiniteStore-image-main"
                  />
                  <LazyLoadImage
                    alt={`${item.name} - hover`}
                    src={item.hoverImage || item.mainImage}
                    effect="opacity"
                    scrollPosition={0}
                    threshold={300}
                    className="infiniteStore-image-hover"
                  />
                </div>
                <div className="infiniteStore-details-container">
                  <p>{item.name}</p>
                  <p>{item.price}€</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default InfiniteStore;
