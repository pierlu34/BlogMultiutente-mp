import Post from '../PostComponent/PostComponent.jsx';
import styles from './List.module.scss';
const List = ({items}) => {
    return(
        <div className={styles.List}>
            {items?.length > 0 ?
               items.map(item => (
               <Post key={item.id} post={item}/>
            )) : <p>Nessun elemento in lista</p>}

        </div>
    )
}
export default List;