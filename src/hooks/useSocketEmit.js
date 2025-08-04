import { useContext } from 'react';
import { SocketContext } from '../contexts/SocketProvider.jsx';
import config from '../../config.js';

const useSocketEmit = () => {

    const { socket } = useContext(SocketContext);

    const createPost = (post) => {
        return new Promise((resolve, reject) => {
            socket.emit(config.socket.actions.CREATE_POST, post, (response) => {
                if(response.success) {
                    resolve(response.data);
                } else {
                    reject(response.error);
                }
            })
        })
    }

    const getTags = (payload) => {
        return new Promise((resolve, reject) => {
            socket.emit(config.socket.actions.GET_TAGS, payload, (response) => {
                if(response.success) {
                    resolve(response.data);
                    console.log("success")
                } else {
                    reject(response.error);
                    console.log("fail")
                }
            })
        })
    }


    return {
        createPost,
        getTags,
    }
}

export default useSocketEmit;