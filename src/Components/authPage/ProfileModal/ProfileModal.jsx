import React, { useState, useEffect } from "react";
import styles from "./ProfileModal.module.scss";
import { FaTimes } from "react-icons/fa";

const ProfileModal = ({ isOpen, onClose, user, onSave }) => {
  const [username, setUsername] = useState(user?.name || "");
  const [userAvatar, setUserAvatar] = useState(user?.avatar || "");

  useEffect(() => {
    setUsername(user?.name || "");
    setUserAvatar(user?.avatar || "");
  }, [user]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {};

    if (username.trim() !== "" && username.trim() !== user.username) {
      updatedData.username = username.trim();
    }

    if (userAvatar.trim() !== "") {
      if (userAvatar.trim() !== user.avatar) {
        updatedData.avatar = userAvatar.trim();
      }
    } else if (user.avatar) {
      // L'utente ha rimosso l'avatar
      updatedData.avatar = null;
    }

    if (Object.keys(updatedData).length > 0) {
      onSave(updatedData);
    }

    onClose();
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <FaTimes />
        </button>

        <h2>Modifica Profilo</h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="username">Nome Utente:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Inserisci il tuo nome"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="userAvatar">
              URL Avatar (Lascia vuoto per mantenere attuale o rimuovere):
            </label>
            <input
              type="text"
              id="userAvatar"
              value={userAvatar}
              onChange={(e) => setUserAvatar(e.target.value)}
              placeholder="Incolla qui l'URL del tuo nuovo avatar"
            />
            {userAvatar && isValidUrl(userAvatar) && (
              <div className={styles.avatarPreview}>
                <p>Anteprima:</p>
                <img src={userAvatar} alt="Anteprima Avatar" />
              </div>
            )}
            {/* Pulsante per rimuovere l'URL dell'avatar, se presente */}
            {userAvatar && (
              <button
                type="button"
                className={styles.clearAvatarButton}
                onClick={() => setUserAvatar("")} // Svuota l'input dell'avatar
              >
                Rimuovi Avatar
              </button>
            )}
          </div>

          <button type="submit" className={styles.saveButton}>
            Salva Modifiche
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
