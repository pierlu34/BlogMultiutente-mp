import { useEffect, useState } from "react";
import styles from "./registrationForm.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "./registration.service.js";


const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(formErrors);
  }, [formErrors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormErrorsChange = (key, value) => {
    setFormErrors((prevState) => ({ ...prevState, [key]: value }));
  };

  // ✅ Validatori base (funzioni semplici)
  const isNotEmpty = (value) => value.trim() !== "";
  const isMinLength = (value, min) => value.length >= min;
  const isMaxLength = (value, max) => value.length <= max;
  const isEmailValid = (email) => /\S+@\S+\.\S+/.test(email);
  const isEqualToOtherValue = (a, b) => a === b;

  const submitForm = async (event) => {
    event.preventDefault();
    setError("");
    setFormErrors({});

    const { username, email, password, confirmPassword } = formData;

    const isNameValid = isNotEmpty(username);
    const isEmailValidFlag = isNotEmpty(email) && isEmailValid(email);
    const isPasswordValid = isMinLength(password, 8) && isMaxLength(password, 60);
    const passwordMatch = isEqualToOtherValue(password, confirmPassword);

    if (!isNameValid) {
      handleFormErrorsChange("username", "Il nome non può essere vuoto");
    }

    if (!isNotEmpty(email)) {
      handleFormErrorsChange("email", "L'email non può essere vuota");
    } else if (!isEmailValid(email)) {
      handleFormErrorsChange("email", "L'email non è valida");
    }

    if (!isPasswordValid) {
      handleFormErrorsChange("password", "La password deve avere tra 8 e 60 caratteri");
    }

    if (!passwordMatch) {
      handleFormErrorsChange("confirmPassword", "Le password non corrispondono");
    }

    if (!isNameValid || !isEmailValidFlag || !isPasswordValid || !passwordMatch) {
      return;
    }

    try {
      const usernameCheck = await usernameAvailable(username);
      if (!usernameCheck.available) {
        handleFormErrorsChange("username", "Username non disponibile");
        return;
      }

      const payload = {
        username,
        email,
        password,
      };

      const response = await signUp(payload);
      console.log("REGISTRAZIONE AVVENUTA", response);
      navigate("/login");
    } catch (err) {
      console.error("Errore nella registrazione:", err);
      setError("Registrazione fallita. Riprova.");
    }
  };

  return (
    <form className={styles.registrationForm} onSubmit={submitForm}>
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
        {formErrors.username && <p style={{ color: "red" }}>{formErrors.username}</p>}
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
        {formErrors.email && <p style={{ color: "red" }}>{formErrors.email}</p>}
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
        {formErrors.password && <p style={{ color: "red" }}>{formErrors.password}</p>}
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
        {formErrors.confirmPassword && <p style={{ color: "red" }}>{formErrors.confirmPassword}</p>}
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Registrati</button>

      <Link to="/">
        <button type="button">Già registrato? Logga qui!</button>
      </Link>
    </form>
  );
};

export default RegistrationForm;
