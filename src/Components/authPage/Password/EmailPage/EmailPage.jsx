import { useState } from 'react';
import { Link } from "react-router-dom";
import { isNotEmpty, isEmail } from "../../../../validators/validators.js";
import { requestNewPassword } from '../../../../service/password.service.js';
import styles from "../../../login/loginForm.module.scss"; // usa lo stesso SCSS del login

function ResetPasswordEmailForm() {
  const [email, setEmail] = useState('');

  const isEmailValid = isNotEmpty(email) && isEmail(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEmailValid) {
      alert('Inserisci un indirizzo email valido.');
      return;
    }

    try {
      const response = await requestNewPassword({ email });

      if (response) {
        alert('Email di reset inviata! Controlla la tua casella di posta.');
      } else {
        alert("Errore nell'invio dell'email. Riprova più tardi.");
      }
    } catch (error) {
      alert("Errore nell'invio dell'email di reset:", error);
    }
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <h2 className={styles.formTitle}>Recupera password</h2>

      <div className={styles.formGroup}>
        <input
          required
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button type="submit">Invia email</button>

      <Link to="/">
        <p>Ricordi la password? Torna al login</p>
      </Link>
    </form>
  );
}

export default ResetPasswordEmailForm;
