import { useNavigate, useParams } from "react-router-dom/dist";
import "./Contact.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import ContactDetails from "../../containers/contactDetails/ContactDetails";
const Contact = () => {
  const navigate = useNavigate();

  // Manejar el clic del botón para ir hacia atrás en el historial
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="contact">
      <div className="contact-container">
        {/* Botón de retroceso */}
        <FontAwesomeIcon
          icon={faArrowLeftLong}
          onClick={handleBackClick}
          className="contact-back-button"
        />
        {/* Detalles de contacto */}
        <ContactDetails />
      </div>
    </div>
  );
};

export default Contact;
