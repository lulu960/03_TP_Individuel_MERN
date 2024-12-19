import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const [ads, setAds] = useState([]);
  const navigate = useNavigate();

  const fetchAds = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/ads");
      setAds(response.data);
    } catch (err) {
      console.error("Failed to fetch ads:", err);
    }
  };

  const deleteAd = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/ads/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Annonce supprimée avec succès !");
      setAds(ads.filter((ad) => ad._id !== id)); // Mise à jour locale des annonces
    } catch (err) {
      console.error("Failed to delete ad:", err);
      alert("Échec de la suppression de l'annonce.");
    }
  };

  const updateAd = (id) => {
    navigate(`/edit-ad/${id}`);
  };

  useEffect(() => {
    fetchAds();
  }, []);

  return (
    <div className="home-container">
      <h2>Liste des Annonces</h2>
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
            <div className="ad-actions">
              <button
                className="delete-button"
                onClick={() => deleteAd(ad._id)}
              >
                Supprimer
              </button>
              <button
                className="edit-button"
                onClick={() => updateAd(ad._id)}
              >
                Modifier
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
