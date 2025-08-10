import { FaHeart } from "react-icons/fa6"
import useSocketEmit from "../../../hooks/useSocketEmit.js"
import { useSelector } from "react-redux"
import { userSelector } from "../../../reducers/user.Slice.js"

const Like = ({id, renderAgain}) => {

    const user = useSelector(userSelector)

    const { toggleLike } = useSocketEmit();

    const toggle = (id) => {
        if (!user.accessToken) return
        const payload = {
        postId: id
        }
        toggleLike(payload).then(renderAgain)
    }

    return <>
    <button onClick={()=>toggle(id)}><FaHeart/></button>
    </>
}

export default Like
