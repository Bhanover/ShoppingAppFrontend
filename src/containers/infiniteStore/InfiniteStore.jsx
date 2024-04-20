import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css"; // Importa el efecto de opacidad
import "./InfiniteStore.css";

const InfiniteStore = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchMoreData();
  }, []);

  const fetchMoreData = () => {
    if (items.length >= 50) {
      setHasMore(false);
      return;
    }
    const startId = items.length + 1;
    const newItems = Array.from({ length: 8 }, (_, i) => ({
      id: startId + i,
      name: `Item ${startId + i}`,
      image: "https://via.placeholder.com/150",
      hoverImage: "https://via.placeholder.com/150/ff0000/FFFFFF",
    }));

    setItems(items.concat(newItems));
  };

  return (
    <div className="infiniteStore">
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        scrollThreshold={0.7}
      >
        <div className="infiniteStore-container">
          {items.map((item) => (
            <div key={item.id} className="infiniteStore-item-container">
              <Link to="/" className="infiteStore-item-link">
                <div className="infiniteStore-image-container">
                  <LazyLoadImage
                    alt={item.name}
                    src={item.image}
                    effect="opacity"
                    scrollPosition={0}
                    threshold={300}
                    className="infiniteStore-image-main"
                  />
                  <LazyLoadImage
                    alt={item.name}
                    src={item.hoverImage}
                    effect="opacity"
                    scrollPosition={0}
                    threshold={300}
                    className="infiniteStore-image-hover"
                  />
                </div>
                <div className="infiniteStore-details-container">
                  <p>{item.name}</p>
                  <p>1212</p>
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
