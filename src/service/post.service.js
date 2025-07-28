export const getPosts = async () => { //potrebbe servire un parametro quando implementeremo la paginazione

    try {
        const response = await fetch("https://todo-pp.longwavestudio.dev/posts", {
            method: "GET",
            headers: {'Content-Type': 'application/json'},
        })
        const data = await response.json();
        if (response.ok) {
            return data
        }
    } catch(error){
        console.error(error);
    }
}