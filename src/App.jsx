import { Outlet, Link } from "react-router";
import loginForm from "./Components/login/loginForm.jsx";
import registration from "./Components/registration/registrationForm.jsx";


function App() {
  return (
    <main className="main_content">
      <Outlet />
    </main>
  );
}

export default App;