import { useNavigate, useParams } from "react-router-dom/dist";
import "./Contact.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import ContactDetails from "../../containers/contactDetails/ContactDetails";
const Contact = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <div className="contact">
      <div className="contact-container">
        <FontAwesomeIcon
          icon={faArrowLeftLong}
          onClick={handleBackClick}
          className="contact-back-button"
        />
        <ContactDetails />
      </div>
    </div>
  );
};
export default Contact;
