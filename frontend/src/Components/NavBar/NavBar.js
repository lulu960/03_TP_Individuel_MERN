import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token"); // Vérifie si un token est présent

  const handleLogout = () => {
    localStorage.removeItem("token"); // Supprime le token
    navigate("/"); // Redirige vers la page de connexion
  };

  if (!isLoggedIn) {
    return null; // Ne montre rien si l'utilisateur n'est pas connecté
  }

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <Link to="/Home">Accueil</Link>
        </li>
        <li>
          <Link to="/add-ad">Ajouter une annonce</Link>
        </li>
        <li>
          <Link to="/profile">Modifier le profil</Link>
        </li>
        <li>
          <Link to="/my-products">Mes annonces </Link>
        </li>
      </ul>
      <button onClick={handleLogout} className="logout-button">
        Déconnexion
      </button>
    </nav>
  );
};

export default NavBar;
