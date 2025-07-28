import { format } from "date-fns";
import styles from "./PostComponent.module.scss";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";

const Post = ({ post }) => {
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

      <div className="text-area">Contenuto: {post.content}</div>

      <div>
        {Array.isArray(post.tags) && post.tags.length > 0 ? (
          post.tags.map((tag) => <li key={tag}>#{tag}</li>)
        ) : (
          <p>Nessun tag</p>
        )}
      </div>
    </div>
  );
};

export default Post;
