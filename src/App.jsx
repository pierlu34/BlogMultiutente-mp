import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import Footer from "./Components/authPage/Footer/Footer.jsx";
import Header from "./Components/authPage/Header/Header.jsx";
import { userSelector } from "./reducers/user.slice.js";

function App() {
  const user = useSelector(userSelector);
  const savedUser = JSON.parse(localStorage.getItem("user"));
  const initialState = {
  user: savedUser || null,
  
};
  return (
    <>
      <main className="main_content" style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Header />
    </>
  );
}

export default App;
