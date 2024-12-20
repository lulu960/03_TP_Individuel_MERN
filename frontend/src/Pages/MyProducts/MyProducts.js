import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MyProducts.css";

const MyProducts = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchMyAds = async () => {
      try {
        const token = localStorage.getItem("token");
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const userId = decodedToken.id;
        console.log(userId);
        const response = await axios.get(`http://localhost:5000/api/ads/my-ads/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAds(response.data);
      } catch (err) {
        console.error("Erreur lors de la récupération de vos annonces :", err);
      }
    };
    fetchMyAds();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/ads/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAds(ads.filter((ad) => ad._id !== id)); // Mettre à jour l'état après suppression
    } catch (err) {
      console.error("Erreur lors de la suppression de l'annonce :", err);
    }
  };

  return (
    <div className="my-products-container">
      <h2>Mes Produits</h2>
      {ads.length === 0 ? (
        <p>Vous n'avez créé aucune annonce.</p>
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
              <div className="buttons-container">
                <button
                  onClick={() => (window.location.href = `/edit-ad/${ad._id}`)}
                  className="edit-button"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(ad._id)}
                  className="delete-button"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;
