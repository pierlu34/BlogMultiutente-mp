import styles from "./Header.module.scss";
import {
  FaArrowRightFromBracket,
  FaArrowRightToBracket,
} from "react-icons/fa6";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, userSelector } from "../../../reducers/user.slice.js";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(clearUser());
    navigate("/");
  };
 const avatarPic = user?.avatar || "default-avatar.jpg";
  return (
    <header className={styles.header}>
      <div className={styles.userInfo}>
  {user?.accessToken ? (
    <>
      <span>{user.username}</span>
     <img
  src={avatarPic}
  alt="avatar"
  className={styles.avatar}
  onError={(e) => {
    e.target.onerror = null; // evita loop infinito
    e.target.src = "/img/io-avatar.jpg";
  }}
/>
    </>
  ) : (
    <span>Non sei loggato</span>
  )}
</div>

      <div>
        {user.accessToken ? (
          <button onClick={logout} className="button">
            Esci <FaArrowRightFromBracket />
          </button>
        ) : (
          <button onClick={() => navigate("/login")} className="button">
            Accedi <FaArrowRightToBracket />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
