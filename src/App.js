// css del componente
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
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
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

  if(authState === null) return <div>loading...</div>
  if(authState === "login") return <Login/>
  if(user != null) {
    setTimeout(() => {
      return navigate('/home')
    }, 1000);
  }
  
}

export default App;
