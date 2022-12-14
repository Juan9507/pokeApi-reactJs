// componentes y css
import "./App.css";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
// Pages
import Login from "./auth/login/Login";
// estados
import { useEffect, useState } from "react";
//auth
import { auth } from "./config/fire";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const [authState, setAuthState] = useState(null);

  useEffect(() => {
    const unSubcribeAuth = onAuthStateChanged(
      auth,
      async (authenticatedUser) => {
        if (authenticatedUser) {
          setUser(authenticatedUser.email);
          setAuthState("home");
        } else {
          setUser(null);
          setAuthState("login");
        }
      }
    );

    return unSubcribeAuth;
  }, [user]);

  if (authState === null) return <div>loading...</div>;
  if (authState === "login") return <Login />;
  if (user != null) return window.location.href = "/home";
}

export default App;
