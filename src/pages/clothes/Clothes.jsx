import Cart from "../../containers/cart/Cart";
import ClothesDetails from "../../containers/clothesDetails/ClothesDetails";

const Clothes = () => {
  return (
    <div className="clothes">
      <div>
        <ClothesDetails />
      </div>
      <div>
        <Cart />
      </div>
    </div>
  );
};
export default Clothes;
