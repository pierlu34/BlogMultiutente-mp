import styles from "./PostDetails.module.scss";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getPostById } from "../../service/post.service.js";

const PostDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState(null);

  const params = useParams();

  const getThisPost = async (id) => {
    try {
      const data = await getPostById(id);
      setPost(data);
    } catch (error) {
      console.error("Errore nel recupero del post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      setIsLoading(true);
      getThisPost(params.id);
    }
  }, [params.id]);

  if (isLoading) return <p>Caricamento...</p>;
  if (!post) return <p>Nessun post trovato.</p>;

  const date = new Date(post.publishDate).toLocaleString("it-IT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const hour = new Date(post.publishDate).toLocaleString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <>
      <div className={styles.body}>
        <div className={styles.detail}>
          <header className={styles.header}>
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.meta}>
              <span>
                Pubblicato il: <strong>{date}</strong> alle{" "}
                <strong>{hour}</strong>
              </span>
              <span>
                Autore: <strong>{post.authorId}</strong>
              </span>
            </div>
          </header>

          {post.image && (
            <div className={styles.imageWrapper}>
              <Image
                src={post.image}
                alt={`Immagine di copertina per ${post.title}`}
              />
            </div>
          )}

          <section
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></section>

          <section className={styles.tags}>
            <h4>Tag:</h4>
            {post.tags?.length > 0 ? (
              <ul>
                {post.tags.map((tag) => (
                  <li key={tag}>#{tag}</li>
                ))}
              </ul>
            ) : (
              <p>Nessun tag presente</p>
            )}
          </section>

          <footer className={styles.footer}>
            {post.total_comments > 0 ? (
              <p>Ci sono {post.total_comments} commenti</p>
            ) : (
              <p>Nessun commento</p>
            )}
          </footer>
        </div>
      </div>
    </>
  );
};

export default PostDetails;
