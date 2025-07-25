import { useState } from "react";
import { login } from "../../service/login.service.js";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./loginForm.module.scss";
import { setUser } from "../../reducers/user.slice.js";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  const submitForm = async (event) => {
    event.preventDefault();

    try {
      const user = await login({
        email: input.email,
        password: input.password,
      });

      if (user) {
        dispatch(setUser(user));
        navigate("/Home");
      } else {
        alert("Login fallito. Credenziali errate?");
      }
    } catch (error) {
      alert("Errore durante il login. Riprova.");
      console.error(error);
    }
  };

  return (
  <form className={styles.loginForm} onSubmit={submitForm}>
  <h2 className={styles.formTitle}>Login</h2>

  <div className={styles.formGroup}>
    <label htmlFor="email" className={styles.label}>Email</label>
    <input
      required
      id="email"
      value={input.email}
      name="email"
      onChange={handleChange}
      type="email"
      placeholder="Email"
    />
  </div>

  <div className={styles.formGroup}>
    <label htmlFor="password"className={styles.label}>Password</label>
    <input
      required
      id="password"
      value={input.password}
      name="password"
      onChange={handleChange}
      type="password"
      placeholder="Password"
    />
  </div>

  <button type="submit">Accedi</button>

  <Link to="/email-reset-password">
    <p>Hai dimenticato la password?</p>
  </Link>

  <Link to="/register">
    <button type="button">Sei nuovo? Registrati qui!</button>
  </Link>
</form>
  );
};

export default LoginForm;
