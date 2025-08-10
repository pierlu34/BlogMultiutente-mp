import { format } from "date-fns";
import styles from "./PostComponent.module.scss";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import { Eye } from "lucide-react";

const Post = ({ post }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.post_wrapper}>
      <div className={styles.post_header}>
        <div className="author">Autore: {post.authorId}</div>
        <div className="date">
          {format(new Date(post.publishDate), "dd/MM/yyyy")}
        </div>
        <div className="title">Titolo: {post.title}</div>
      </div>

      {post.image && typeof post.image === "string" && (
        <div className={styles.image}>
          <img src={post.image} alt="immagine del post" />
        </div>
      )}

      <div
        className={styles.text_area}
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>

      <div className={styles.tags}>
        {Array.isArray(post.tags) && post.tags.length > 0 ? (
          post.tags.map((tag) => <li key={tag}>#{tag}</li>)
        ) : (
          <p>Nessun tag</p>
        )}
      </div>
      <footer className={styles.footer}>
        <p>
          Ci sono {post.total_likes}{" "}
          {post.total_likes === 1 ? "like" : "like"}
        </p>
        <p>
          Ci sono {post.total_comments}{" "}
          {post.total_comments === 1 ? "commento" : "commenti"}
        </p>
      </footer>
      <button onClick={() => navigate(`posts/${post.id}`)}>
        {" "}
        <Eye />
      </button>
    </div>
  );
};

export default Post;
