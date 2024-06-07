import React, { useState } from "react";
import "./NewsletterSignUp.css";

const NewsletterSignUp = () => {
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("todos");
  const [privacyPolicyChecked, setPrivacyPolicyChecked] = useState(false);
  const [formExpanded, setFormExpanded] = useState(false);
  const [unSubscribe, setUnSubscribe] = useState(false);

  // Manejar el cambio de valor del email
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Expander el formulario al hacer clic en el campo de email
  const handleEmailClick = () => {
    setFormExpanded(true);
  };

  // Manejar el cambio de género
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  // Manejar el cambio en la aceptación de las políticas de privacidad
  const handlePrivacyPolicyChange = (event) => {
    setPrivacyPolicyChecked(event.target.checked);
  };

  // Manejar la suscripción
  const handleSubscribe = (event) => {
    event.preventDefault();
    // Aquí iría el código para manejar la suscripción
  };

  // Alternar el estado de baja de la suscripción
  const handleUnsubscribeClick = () => {
    setUnSubscribe(!unSubscribe);
  };

  // Manejar la baja de la suscripción
  const handleUnsubscribe = (event) => {
    event.preventDefault();
    setEmail("");
    setUnSubscribe(false);
    setFormExpanded(false);
  };

  return (
    <div className="newsletter-sign-up">
      <div className="newsletter-sign-up-in">
        {!unSubscribe ? (
          <div className="newsletter-sign-up-container">
            <h2>
              EL COMBO PERFECTO:
              <br />A LA ÚLTIMA Y CON UN 10% DE DESCUENTO
            </h2>
            <h3>ÚNETE A NUESTRA NEWSLETTER</h3>
            <form
              onSubmit={handleSubscribe}
              className="newsletter-sign-up-form"
            >
              <input
                type="email"
                className="input-email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                onClick={handleEmailClick}
              />
              {formExpanded && (
                <div>
                  <div className="newsletter-sign-up-form-expanded-gender-options">
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="boys"
                        checked={gender === "boys"}
                        onChange={handleGenderChange}
                      />
                      Boys
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="girls"
                        checked={gender === "girls"}
                        onChange={handleGenderChange}
                      />
                      Girls
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="todos"
                        checked={gender === "todos"}
                        onChange={handleGenderChange}
                      />
                      Todos
                    </label>
                  </div>
                  <label className="newsletter-sign-up-check">
                    <input
                      type="checkbox"
                      checked={privacyPolicyChecked}
                      onChange={handlePrivacyPolicyChange}
                    />
                    He leído las políticas de privacidad
                  </label>
                </div>
              )}

              <button type="submit" className="subscribe-button">
                Unirse
              </button>
              <div
                className="newsletter-sign-up-unsubscribe"
                onClick={() => handleUnsubscribeClick()}
              >
                Quiero darme de baja
              </div>
            </form>
          </div>
        ) : (
          <div className="newsletter-sign-up-container">
            <h2>¿Quieres darte de baja?</h2>
            <form onSubmit={handleUnsubscribe}>
              <input
                type="email"
                className="input-email"
                placeholder="E-mail"
                value={email}
                onChange={handleEmailChange}
              />
              <button type="submit" className="unsubscribe-button">
                Confirmar baja
              </button>
              <button
                className="back-to-form-button"
                onClick={() => handleUnsubscribeClick()}
              >
                Volver
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterSignUp;
