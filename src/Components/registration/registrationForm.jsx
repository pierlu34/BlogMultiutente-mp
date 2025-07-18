import { useState } from "react";
import styles from "./registrationForm.module.scss";
import { Link } from "react-router-dom";

export default function RegistrationForm() {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Validazioni
    if (formData.password.length < 6) {
      setError("La password deve contenere almeno 6 caratteri.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Le password non coincidono.");
      return;
    }

    setError("");
    console.log("Dati registrazione:", formData);

    // Per ora: solo log dei dati
    console.log("Dati registrazione:", formData);

    // Reset form (opzionale)
    setFormData({ username: "", email: "", password: "", confirmPassword: "" });
  };

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
