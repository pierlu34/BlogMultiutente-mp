import React from "react";
import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";
import { getPosts } from "../../../service/post.service.js";
import { userSelector } from "../../../reducers/user.slice.js";
import { postSelector, setPosts } from "../../../reducers/post.slice.js";
import { useEffect, useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostModal from "../../PostModal/PostModal.jsx";
import { createPortal } from "react-dom";
import useSocketEmit from "../../../hooks/useSocketEmit.js";
import { SocketContext } from "../../../contexts/SocketProvider";
import List from "../List/List.jsx";
import styles from "./homePage.module.scss";
import { Link } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlinePlusCircle,
  AiOutlineUser,
} from "react-icons/ai";

const HomePage = () => {
  const posts = useSelector(postSelector);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { createPost } = useSocketEmit();
  const [lazyState, setLazyState] = useState({
    cursor: null,
    direction: "prev",
    limit: 100,
  });

  const { socket, socketReady } = useContext(SocketContext);
  const user = useSelector(userSelector);
  const isLoggedIn = user?.accessToken; // ✅ più leggibile

  const retrievePosts = async () => {
    const data = await getPosts(lazyState);
    if (data) {
      dispatch(setPosts(data));
    }
  };

  const onConfirm = (payLoad) => {
    setIsModalOpen(false);
    if (payLoad) {
      createPost(payLoad)
        .then(() => retrievePosts())
        .catch((error) =>
          console.error("Errore durante la creazione del post:", error)
        );
    }
  };

  useEffect(() => {
    retrievePosts();
  }, [socketReady, socket]);

  return (
    <>
      <div>
        <Header />
        <h1 className={styles.h1}>Benvenuto nella Home</h1>
        <List items={posts} />
      </div>

      {isLoggedIn && (
        <footer className={styles.footer}>
          <div className={styles.container}>
            <Link to="/" className={styles["icon-button"]}>
              <AiOutlineHome />
            </Link>
            <button
              className={styles["icon-button"]}
              onClick={() => setIsModalOpen(true)}
            >
              <AiOutlinePlusCircle />
            </button>
            <Link to="/profile" className={styles["icon-button"]}>
              <AiOutlineUser />
            </Link>
          </div>
        </footer>
      )}

      {isModalOpen &&
        createPortal(
          <PostModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={onConfirm}
          />,
          document.body
        )}
    </>
  );
};

export default HomePage;
