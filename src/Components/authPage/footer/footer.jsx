import { Link } from "react-router-dom";
import "./footer.module.scss"; // o footer.module.scss se preferisci

const footer = () => {
  return (
    <footer className="footer">
      <nav className="footer-nav">
        {/*<Link to="/home">🏠 Home</Link>
        <Link to="/add-post">➕ Aggiungi Post</Link>
        <Link to="/profile">👤 Profilo</Link>*/}
      </nav>
    </footer>
  );
};

export default footer;
