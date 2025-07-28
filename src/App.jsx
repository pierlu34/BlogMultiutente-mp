import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import Footer from "./Components/authPage/Footer/Footer.jsx"; // Importa il componente footer

function App() {
  const user = useSelector((state) => state.user);
  const isLoggedIn = user?.email; // o qualsiasi condizione che conferma l'autenticazione

  return (
      <> 
    <main className="main_content" style={{ flex: 1 }}>
        <Outlet />
      </main>
      {isLoggedIn && <Footer />}
      </>
  );
}

export default App;
