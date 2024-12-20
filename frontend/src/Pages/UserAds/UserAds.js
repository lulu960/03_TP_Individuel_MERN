import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./UserAds.css";

const UserAds = () => {
  const { id } = useParams(); // Récupère l'ID de l'utilisateur depuis l'URL
  const [ads, setAds] = useState([]);
  const [username, setUsername] = useState(""); // Stocke le nom d'utilisateur
  const navigate = useNavigate(); // Permet de naviguer vers une autre page

  useEffect(() => {
    const fetchUserAds = async () => {
      try {
        const token = localStorage.getItem("token");

        // Récupère le nom d'utilisateur
        const userResponse = await axios.get(`http://localhost:5000/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsername(userResponse.data.username);

        // Récupère les annonces de cet utilisateur
        const adsResponse = await axios.get(`http://localhost:5000/api/ads/my-ads/${id}`);
        setAds(adsResponse.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des annonces de l'utilisateur :", err);
      }
    };

    fetchUserAds();
  }, [id]);

  return (
    <div className="user-ads-container">
      <h2>Annonces publiées par {username}</h2>
      {ads.length === 0 ? (
        <p>Aucune annonce trouvée.</p>
      ) : (
        <div className="ads-grid">
          {ads.map((ad) => (
            <div key={ad._id} className="ad-card">
              <img
                src={ad.photo || "https://via.placeholder.com/150"}
                alt={ad.title}
              />
              <h3>{ad.title}</h3>
              <p className="category">{ad.category}</p>
              <p className="price">{ad.price} €</p>
              <p>{ad.description}</p>
              <button
                onClick={() => navigate(`/ad-details/${ad._id}`)}
                className="view-details-button"
              >
                Voir l'annonce
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserAds;
