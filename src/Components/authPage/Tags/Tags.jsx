//hooks
import { useContext, useState, useEffect } from "react";
import useInput from "../../../hooks/useInput.js";
import useSocketEmit from "../../../hooks/useSocketEmit.js";

//components
import Input from "../../Input/Input.jsx";

//contexts
import { SocketContext } from "../../../contexts/SocketProvider.jsx";

import styles from "./Tags.module.scss";

const TagFinder = ({ addTag, tagsAlreadyAdded }) => {
  const [tags, setTags] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const {
    value: checkNewTag,
    setValue: resetValue,
    handleChange: checkNewTagChange,
  } = useInput("");

  const { socketReady } = useContext(SocketContext);
  const { getTags } = useSocketEmit();

  const tagsRetriever = async (payload) => {
    try {
      const tagList = await getTags(payload);
      tagList.tags.sort((a, b) => a.localeCompare(b));

      setTags(tagList.tags);
    } catch (error) {
      console.error("Errore durante il caricamento tag:", error);
    }
  };

  const millisecondsToWait = 1000;

  useEffect(() => {
    if (!socketReady) return;

    const payload = {
      name: checkNewTag || "",
      cursor: null,
      direction: "next",
      limit: 5,
    };

    if (checkNewTag !== "") {
      const timer = setTimeout(() => {
        console.log("debounce...");
        tagsRetriever(payload);
      }, millisecondsToWait);

      return () => clearTimeout(timer);
    }
    tagsRetriever(payload);
  }, [socketReady, checkNewTag]);

  const filteredTags = tags.filter((tag) => !tagsAlreadyAdded.includes(tag));
return (
    <>
    <div className={styles.input_box}>
      <Input
        id="tagFilter"
        label="Tag:"
        value={checkNewTag}
        placeholder="cerca un tag o creane uno nuovo"
        onChange={checkNewTagChange}
        onEnter={() => {
          addTag(checkNewTag), resetValue("");
        }}
        onFocus={() => setIsOpen(true)}   // <--- apre il dropdown
        onBlur={() => setIsOpen(false)}
      />

      {isOpen && <div className={`${styles.tag_list} ${isOpen ? styles.open : ""}`}>
        {filteredTags.length > 0 ? (
          filteredTags.map((tag) => (
            <button
              key={tag}
              id={`checkbox-${tag}`}
              type="button"
              placeholder="scegli un tag"
              defaultChecked={false}
              onMouseDown={() => {
                addTag(tag);
              }}
            >
              #{tag}
            </button>
          ))
        ) : (
          <>
            <p>Nuovo tag</p>
            <button
              key={checkNewTag}
              id={`checkbox-${checkNewTag}`} 
              type="button"
              defaultChecked={false}
              onMouseDown={() => addTag(checkNewTag)}
            >
              #{checkNewTag}
            </button>
          </>
        )}
      </div>}
      </div>
    </>
  );
};

export default TagFinder; 