import React, { useState, useContext, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightDots,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { CSSTransition } from "react-transition-group";
import CartContext from "../../context/cartContext/CartContext";
import Cart from "../../containers/cart/Cart";
import "./CartMenu.css";

const CartMenu = () => {
  const { cartCount } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleClickOutside = (event) => {
    if (
      cartRef.current &&
      !cartRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsCartOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="cartMenu">
      <button ref={buttonRef} onClick={toggleCart} className="cart-icon-button">
        <FontAwesomeIcon icon={faShoppingCart} />
        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
      </button>
      <CSSTransition
        in={isCartOpen}
        timeout={300}
        classNames="cartMenu-animation"
        unmountOnExit
        nodeRef={cartRef}
      >
        <div className="cartMenu-modal" ref={cartRef}>
          <Link to="/cart">
            <FontAwesomeIcon icon={faArrowUpRightDots} />
          </Link>
          <Cart />
        </div>
      </CSSTransition>
    </div>
  );
};

export default CartMenu;
