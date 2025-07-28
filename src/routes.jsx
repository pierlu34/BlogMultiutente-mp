import App from "./App.jsx";
import LoginForm from "./Components/login/LoginForm";
import RegistrationForm from "./Components/registration/RegistrationForm";
import HomePage from "./Components/authPage/HomePage/homePage.jsx";
import ResetPasswordForm from "./Components/authPage/Password/Resetpassword/ResetpasswordForm.jsx";
import ForgotPasswordPage from "./Components/authPage/Password/ForgotPassword/ForgotPasswordPage.jsx"; 
import EmailPage from "./Components/authPage/Password/EmailPage/EmailPage.jsx";
import ProfilePage from "./Components/authPage/ProfilePage/ProfilePage.jsx";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <LoginForm />,
      },
      {
        path: "reset-password", 
        element: <ForgotPasswordPage />,
      },
      {
        path: "email-reset-password", 
        element: <EmailPage />,
      },
      {
        path: "register",
        element: <RegistrationForm />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
];
