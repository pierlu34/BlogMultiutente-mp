export const signUp = async (signUpData) => {
  try {
    const response = await fetch("https://todo-pp.longwavestudio.dev/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signUpData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Errore durante la registrazione");
    }

    return await response.json();
  } catch (error) {
    console.error("Errore nella funzione signUp:", error);
    throw error; // Rilancia l'errore per gestirlo nel componente
  }
};

export const usernameAvailable = async (username) => {
    const endpoint = usernameValidationWithoutUsername + username;
    console.log("Validating username at:", endpoint);

    try {
        const response = await fetch(endpoint, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, available: data.available }; // adatta `data.available` al tuo backend
        } else {
            return { success: false, message: data.message || "Errore nella risposta del server" };
        }
    } catch (error) {
        console.error("Errore nel controllo username:", error);
        return { success: false, message: "Errore nella richiesta", error };
    }
};