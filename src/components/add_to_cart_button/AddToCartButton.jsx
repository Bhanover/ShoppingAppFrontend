import "./AddToCartButton.css";
const AddToCartButton = ({ productId, onAdd }) => {
  return (
    <button className="add-to-cart-button" onClick={() => onAdd(productId)}>
      AÑADIR A MI CESTA
    </button>
  );
};
export default AddToCartButton;
