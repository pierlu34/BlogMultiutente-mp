import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import footer from "./Components/authPage/footer/footer.jsx"; // Importa il componente footer

function App() {
  const user = useSelector((state) => state.user);
  const isLoggedIn = user?.email; // o qualsiasi condizione che conferma l'autenticazione

  return (
    <main className="main_content">
      <Outlet />
      {isLoggedIn && <footer />}
    </main>
  );
}

export default App;
