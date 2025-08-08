import styles from "./PostDetails.module.scss";
import Footer from "../authPage/Footer/Footer.jsx";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getPostById } from "../../service/post.service.js";
import PostModal from "../PostModal/PostModal.jsx";
import { createPortal } from "react-dom";
import useSocketEmit from "../../hooks/useSocketEmit.js";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../../reducers/user.Slice.js";
import { removePost } from "../../reducers/post.slice.js";


const PostDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState(null);
  const { editPost,deletePost } = useSocketEmit();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  const params = useParams();

  const cancelPost = async (post) => {
    const confirmDelete = window.confirm(
      "Sei sicuro di voler cancellare il post?"
    );
    if (!confirmDelete) return;
    try {
      console.log("CANCELLAZIONE IN CORSO", post);
      const data = await deletePost({ postId: post._id });
      dispatch(removePost(data));
    } catch (e) {
      console.error(e);
    }
  };

  const updatePost = async (payLoad) => {
    if (payLoad) {
      editPost(payLoad)
        .then((data) => setPost(data))
        .catch((error) => console.error(error));
    setIsModalOpen(false);
    }
  };

  const getThisPost = async (id) => {
    try {
      const data = await getPostById(id);
      setPost({...data, id:data._id}); // Assuming the service returns an object with _id
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
  if (!post) return <p>Post Inesistente o Cancellato!</p>;

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
      <div className={styles.container}>
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
                  src={post.image || io-avatar.jpg}
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
          {user.id === post.authorId && (
            <div>
              <button onClick={() => setIsModalOpen(true)}>Edit Detail</button>
              <button onClick={() => cancelPost(post)}>Delete Detail</button>
            </div>
          )}
        </div>
      </div>
      {isModalOpen &&
        createPortal(
          <PostModal
            isOpen={isModalOpen}
            existingPost={post}
            onClose={() => setIsModalOpen(false)}
            onConfirm={updatePost}
          />,
          document.body
        )}
      <Footer />
    </>
  );
};

export default PostDetails;
