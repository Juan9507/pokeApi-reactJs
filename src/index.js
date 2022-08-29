import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { createBrowserHistory } from 'history';
import Profile from './pages/card-profile/Profile'
import Home from './pages/home/Home'

const unSubcribe = () => {
  const email = localStorage.getItem('email');
  if(email){
    return true
  }
  return false
}

const history = createBrowserHistory();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
    <Router history = {history}>
      <Routes>
        <Route path="/" element={ <App/>} />
        <Route path="/home" element={ unSubcribe() ? <Home /> : <Navigate to="/" />} />
        <Route path="/profile/:id" element={ unSubcribe() ? <Profile/> : <Navigate to="/" />} />
      </Routes>
    </Router>
  //</React.StrictMode>
);

reportWebVitals();
