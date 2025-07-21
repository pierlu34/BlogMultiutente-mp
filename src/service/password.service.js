 
export const requestNewPassword = async ({email}) => {
    try {
        const response = await fetch("https://todo-pp.longwavestudio.dev/user/forgot-password" , {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email})
        })
        const data = await response.json();
 
        if (response.ok) {
            return data
        }
    } catch(error){
        console.error("Errore nella richiesta di una nuova password", error);
    }
}
 
export const validateResetToken = async ({token}) => {
    console.log("Il token", {token})
try {
        const response = await fetch("https://todo-pp.longwavestudio.dev/user/validate-reset-token", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({token})
        })
        const data = await response.json();
 
        if (response.ok) {
            console.log("RISPOSTA", response, data)
            console.log("DATA", response)
            return data
}
    } catch(error){
        console.error(error);
    }
}
 
export const sendingANewPassword = async ({token, password}) => {
    try {
        const response = await fetch("https://todo-pp.longwavestudio.dev/user/reset-password", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ token, password })
        })
        const data = await response.json();
 
        if (response.ok) {
            return data
}
    } catch(error){
        console.error("Errore nella scelta della nuova password", error);
    }
}