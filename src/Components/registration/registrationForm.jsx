import { useState } from "react";
import styles from "./registrationForm.module.scss";
import { Link } from "react-router-dom";
import { signUp} from "./registration.service.js";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [error, setError] = useState("");

  async function handleSubmit (e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    // ✅ Validazioni
    /*if (formData.password.length < 6) {
      setError("La password deve contenere almeno 6 caratteri.");
      return;
    }*/

    if (formData.password !== formData.confirmPassword) {
      setError("Le password non coincidono.");
      return;
    }
    const payload = {
      username: formJson.username,
      email: formJson.email,
      password: formJson.password,
    };

    try {
      const response = await signUp(payload);
      console.log("REGISTRAZIONE AVVENUTA", response);
      // eventualmente fai un redirect o pulisci il form
    } catch (error) {
      console.error("Errore nella registrazione:", error);
      setError("Registrazione fallita. Riprova.");
    }
  }

  return (
    <form className={styles.registrationForm} onSubmit={handleSubmit}>
      <h2 className={styles.formTitle}>Registrazione</h2>

      <div className={styles.formGroup}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="confirmPassword">Conferma Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Registrati</button>

      <Link to="/register">
        <button type="button">Già registrato? Logga qui!</button>
      </Link>
    </form>
  );
}

export default RegistrationForm;
