// ProfilePage.jsx

import { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSelector, updateUser } from "../../../reducers/user.slice.js"; // Importa setUser
import { FaBars, FaTimes, FaUserEdit, FaImage } from "react-icons/fa";
import styles from "./ProfilePage.module.scss";
import List from "../List/List.jsx";
import { getPosts } from "../../../service/post.service.js";
import { setPosts, postSelector } from "../../../reducers/post.slice.js";
import { SocketContext } from "../../../contexts/SocketProvider.jsx";
import Header from "./../Header/Header.jsx";
import ProfileModal from "../ProfileModal/ProfileModal.jsx";

const ProfilePage = () => {
  const postsFromStore = useSelector(postSelector);
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  // Stato per controllare l'apertura/chiusura del modale
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { socket, socketReady } = useContext(SocketContext);

  const handleSave = (updatedData) => {
  dispatch(updateUser(updatedData));
  console.log("Modifiche salvate:", updatedData);
};
  return (
    <>
      <div className={styles.profileContainer}>
        <Header />

        <div className={styles.userInfo}>
          {/* Mostra l'avatar se disponibile, altrimenti un fallback */}
          {user?.avatar && (
            <img
              src={user.avatar}
              alt="Avatar Utente"
              className={styles.userAvatar}
            />
          )}
          <h2>Ciao, {user.username || "Utente"}</h2>
          {/* Icone per aprire il modale */}
          <FaUserEdit
            className={styles.editIcon}
            onClick={() => setIsModalOpen(true)} // Apre il modale
          />
          <FaImage
            className={styles.imageIcon}
            onClick={() => setIsModalOpen(true)} // Apre il modale
          />
        </div>
          
      </div>

      {/* Il modale, mostrato condizionalmente */}
      <ProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
        onSave={handleSave} // ✅ Aggiunto qui
      />
    </>
  );
};

export default ProfilePage;
