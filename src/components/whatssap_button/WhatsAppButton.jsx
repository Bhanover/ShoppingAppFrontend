import React, { useState } from "react";
import QRCode from "qrcode.react";
import { FaWhatsapp, FaTimes } from "react-icons/fa";
import "./WhatsAppButton.css";

const WhatsAppButton = () => {
  const [showModal, setShowModal] = useState(false);
  const phoneNumber = "+34604098925";
  const defaultMessage = "Hola, estoy necesito informacion sobre los productos";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    defaultMessage
  )}`;

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="whatsappMain">
      <button onClick={handleOpenModal} className="whatsapp-button">
        <FaWhatsapp />
      </button>

      {showModal && (
        <>
          <div className="modal-backdrop" onClick={handleCloseModal}></div>
          <div className="whatsapp-modal">
            <button onClick={handleCloseModal} className="whatsapp-modal-close">
              <FaTimes />
            </button>
            <div className="whatsapp-modal-header">
              <h2>WhatsApp</h2>
            </div>
            <QRCode value={whatsappLink} />
            <p>Escanea este QR para acceder a WhatsApp desde tu móvil</p>
            <button
              onClick={() => window.open(whatsappLink, "_blank")}
              className="whatsapp-open"
            >
              Abrir WhatsApp en el escritorio
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default WhatsAppButton;
