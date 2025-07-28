import React from "react";
import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";
import { getPosts } from '../../../service/post.service.js';
//slice
//import { userSelector } from '../../../reducers/user.Slice.js'
import { postSelector, setPosts} from '../../../reducers/post.slice.js'
//hooks
import { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux'
//contexts
import { SocketContext } from "../../../contexts/SocketProvider";
//components
import List from '../List/List.jsx';

const HomePage = () => {
    //const user = useSelector(userSelector);
    const posts = useSelector(postSelector);
    const dispatch = useDispatch();

    const {socket, socketReady} = useContext(SocketContext)

        const retrievePosts = async () => {
        const data = await getPosts()

        if (data) {
                dispatch(setPosts(data))
            }
    }

    useEffect(()=>{
        console.log("LANCIO EFFECT")
        retrievePosts();
        console.log("I MIEI CAZZO DI POST", posts) //courtesy of Marco

    }, [socketReady, socket])


    return <>
    <div>
        <Header />
        <List items={posts} />
        <Footer />
    </div>
    </>
}

export default HomePage
