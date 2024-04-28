import React, { useState } from "react";
function ImageMagnifier({ src, alt }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    handleHover(e.clientX, e.clientY, e.currentTarget);
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches.length === 1) {
      // Asegura que sea un solo dedo
      const touch = e.touches[0];
      handleHover(touch.clientX, touch.clientY, e.currentTarget);
    }
  };

  const handleHover = (clientX, clientY, currentTarget) => {
    const bounds = currentTarget.getBoundingClientRect();
    const x = ((clientX - bounds.left) / bounds.width) * 100;
    const y = ((clientY - bounds.top) / bounds.height) * 100;
    setPosition({ x, y });
    setCursorPosition({
      x: clientX - bounds.left,
      y: clientY - bounds.top,
    });
  };

  return (
    <div
      className="img-magnifier-container"
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={handleMouseMove}
      onTouchStart={() => setShowMagnifier(true)}
      onTouchEnd={() => setShowMagnifier(false)}
      onTouchMove={handleTouchMove}
    >
      <img className="magnifier-img" src={src} alt={alt} />

      {showMagnifier && (
        <div
          className="magnifier-glass"
          style={{
            position: "absolute",
            left: `${cursorPosition.x - 50}px`,
            top: `${cursorPosition.y - 50}px`,
            width: "150px",
            height: "150px",
            overflow: "hidden",
            border: "3px solid white",
            pointerEvents: "none",
            background: `url(${src}) no-repeat`,
            backgroundPosition: `${position.x}% ${position.y}%`,
            backgroundSize: "700%",
          }}
        />
      )}
    </div>
  );
}

export default ImageMagnifier;
/*import React, { useState } from "react";

function ImageMagnifier({ src, alt }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseHover = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - bounds.left) / bounds.width) * 100;
    const y = ((e.clientY - bounds.top) / bounds.height) * 100;
    setPosition({ x, y });
    setCursorPosition({
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
    });
  };

  return (
    <div
      className="img-magnifier-container"
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={handleMouseHover}
    >
      <img className="magnifier-img" src={src} alt={alt} />

      {showMagnifier && (
        <div
          className="magnifier-glass"
          style={{
            position: "absolute",
            left: `${cursorPosition.x - 50}px`,
            top: `${cursorPosition.y - 50}px`,
            width: "150px",
            height: "150px",
            overflow: "hidden",
            border: "3px solid white",
            pointerEvents: "none",
            background: `url(${src}) no-repeat`,
            backgroundPosition: `${position.x}% ${position.y}%`,
            backgroundSize: "700%",
          }}
        />
      )}
    </div>
  );
}

export default ImageMagnifier;
*/
