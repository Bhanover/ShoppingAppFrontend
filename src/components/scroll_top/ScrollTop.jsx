import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Uso de requestAnimationFrame para asegurarnos de que el scroll se hace
    // después de que todos los elementos se hayan renderizado correctamente
    const handleScrollToTop = () => {
      window.scrollTo(0, 0);
    };

    window.requestAnimationFrame(handleScrollToTop);
    return () => window.cancelAnimationFrame(handleScrollToTop);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
