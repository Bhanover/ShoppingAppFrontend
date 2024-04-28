import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import axios from "axios";
import "react-lazy-load-image-component/src/effects/opacity.css";
import "./InfiniteStore.css";

const InfiniteStore = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadedItems, setLoadedItems] = useState([]);
  const pageSize = 8;

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/subcategories/1/products")
      .then((response) => {
        const processedItems = response.data.map((item) => ({
          ...item,
          mainImage: item.mainImageUrl,
          hoverImage: item.secondaryImageUrl,
        }));

        setLoadedItems(processedItems);
        setItems(processedItems.slice(0, pageSize));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setHasMore(false);
      });
  }, []);

  const fetchMoreData = () => {
    if (items.length >= loadedItems.length) {
      setHasMore(false);
      return;
    }
    const nextItems = loadedItems.slice(items.length, items.length + pageSize);
    setItems(items.concat(nextItems));
  };

  return (
    <div className="infiniteStore">
      <h1>Mostrando </h1>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        scrollThreshold={0.7}
      >
        <div className="infiniteStore-container">
          {items.map((item, index) => (
            <div key={index} className="infiniteStore-item-container">
              <Link to="/" className="infiteStore-item-link">
                <div className="infiniteStore-image-container">
                  <LazyLoadImage
                    alt={`${item.name} - principal`}
                    src={item.mainImage}
                    effect="opacity"
                    scrollPosition={0}
                    threshold={300}
                    className="infiniteStore-image-main"
                  />
                  <LazyLoadImage
                    alt={`${item.name} - secundaria`}
                    src={item.hoverImage || item.mainImage}
                    effect="opacity"
                    scrollPosition={0}
                    threshold={300}
                    className="infiniteStore-image-hover"
                  />
                </div>
                <div className="infiniteStore-details-container">
                  <p>{item.name}</p>
                  <p>{item.price}</p>
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
/*

export default InfiniteStore;
import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import "./InfiniteStore.css";

const InfiniteStore = ({ subCategoryId = 1 }) => {
  const [allItems, setAllItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 10; // Define cuántos productos quieres cargar por página

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/subcategories/${subCategoryId}/products`)
      .then((response) => {
        setAllItems(response.data);
        setVisibleItems(response.data.slice(0, itemsPerPage));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [subCategoryId]);

  const fetchMoreData = () => {
    if (visibleItems.length >= allItems.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setVisibleItems(
        visibleItems.concat(
          allItems.slice(
            visibleItems.length,
            visibleItems.length + itemsPerPage
          )
        )
      );
    }, 1500);
  };

  return (
    <div className="infiniteStore">
      <h1>Mostrando Productos</h1>
      <InfiniteScroll
        dataLength={visibleItems.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Cargando...</h4>}
        scrollThreshold={0.7}
      >
        <div className="infiniteStore-container">
          {visibleItems.map((item, index) => (
            <div key={index} className="infiniteStore-item-container">
              <Link
                to={`/product/${item.id}`}
                className="infiteStore-item-link"
              >
                <div className="infiniteStore-image-container">
                  <LazyLoadImage
                    alt={item.name}
                    src={
                      item.images[0]?.imageUrl ||
                      "https://via.placeholder.com/150"
                    }
                    effect="opacity"
                    className="infiniteStore-image-main"
                  />
                </div>
                <div className="infiniteStore-details-container">
                  <p>{item.name}</p>
                  <p>{item.price}</p>
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
*/
