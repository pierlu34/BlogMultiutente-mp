import { Link } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlinePlusCircle,
  AiOutlineUser,
} from "react-icons/ai";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Link to="/" className={styles["icon-button"]}>
          <AiOutlineHome />
        </Link>
        

        <Link to="/profile" className={styles["icon-button"]}>
          <AiOutlineUser />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
