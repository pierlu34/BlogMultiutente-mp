import App from "./App.jsx";
//import AuthLayout from "./components/AuthLayout/AuthLayout";
import LoginForm from "./Components/login/LoginForm";
import RegistrationForm from "./Components/registration/RegistrationForm";

export const routes = [
  {
    path: "/",
    element: <App />,
     errorElement: <errorPage/>,
    children: [
      {
        /*element: <homePage />,*/
        children: [
          {
            index: true,
           element: <LoginForm />,
          },
          {
            path: "register",
            element: <RegistrationForm />,
          },
        ],
      },
    ],
  },
];