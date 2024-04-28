import CarruselCategoriesStore from "../../containers/carruselCategoriesStore/CarruselCategoriesStore";
import InfiniteStore from "../../containers/infiniteStore/InfiniteStore";

const Store = () => {
  return (
    <div className="store">
      <div>
        <CarruselCategoriesStore />
      </div>
      <div>
        <InfiniteStore />
      </div>
    </div>
  );
};
export default Store;
