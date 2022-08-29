import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createBrowserHistory } from 'history';
import Profile from './components/card-profile/Profile'

const history = createBrowserHistory();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <Router history = {history}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/profile/:id" element={<Profile/>} />
      </Routes>
    </Router>
  // </React.StrictMode>
);

reportWebVitals();
