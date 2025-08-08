import { useContext } from "react";
import { SocketContext } from "../contexts/SocketProvider.jsx";
import config from "../../config.js";

const useSocketEmit = () => {
  const { socket } = useContext(SocketContext);

  const createPost = (post) => {
    return new Promise((resolve, reject) => {
      socket.emit(config.socket.actions.CREATE_POST, post, (response) => {
        if (response.success) {
          resolve(response.data);
        } else {
          reject(response.error);
        }
      });
    });
  };

  const getTags = (payload) => {
    return new Promise((resolve, reject) => {
      socket.emit(config.socket.actions.GET_TAGS, payload, (response) => {
        if (response.success) {
          resolve(response.data);
          console.log("success");
        } else {
          reject(response.error);
          console.log("fail");
        }
      });
    });
  };

  const editPost = (post) => {
    return new Promise((resolve, reject) => {
      socket.emit(config.socket.actions.UPDATE_POST, post, (response) => {
        if (response.success) {
          resolve(response.data);
        } else {
          reject(response.error);
        }
      });
    });
  };
  const deletePost = (postId) => {
    return new Promise((resolve, reject) => {
      socket.emit(config.socket.actions.DELETE_POST, postId, (response) => {
        if (response.success) {
          resolve(response.data);
        } else {
          reject(response.error);
        }
      });
    });
  };

  return {
    createPost,
    getTags,
    editPost,
    deletePost,
  };
};

export default useSocketEmit;
