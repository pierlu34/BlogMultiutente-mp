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

  return (
    <header className={styles.header}>
      <div>
        {user?.username ? `Ciao ${user.username}` : "Non sei loggato"}
        {user?.avatar && <img src={user.avatar} alt="avatar" className={styles.avatar} />}
      </div>
      <div>
        {user ? (
          <button onClick={logout} className="button">
            Esci <FaArrowRightFromBracket />
          </button>
        ) : (
          <button onClick={() => navigate("/")} className="button">
            Accedi <FaArrowRightToBracket />
          </button>
          
        )}
      </div>
    </header>
  );
};

export default Header;
