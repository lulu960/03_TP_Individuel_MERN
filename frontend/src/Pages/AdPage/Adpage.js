import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./Adpage.css";

const AdDetails = () => {
  const { id } = useParams(); // Récupère l'ID de l'annonce depuis l'URL
  const [ad, setAd] = useState(null); // État pour stocker les détails de l'annonce
  const [author, setAuthor] = useState(null); // État pour stocker les détails de l'auteur
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/ads/${id}`);
        setAd(response.data);

        if (response.data.author) {
          const token = localStorage.getItem("token");
          const authorResponse = await axios.get(
            `http://localhost:5000/api/users/${response.data.author}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setAuthor(authorResponse.data);
        }
      } catch (err) {
        console.error("Erreur lors de la récupération des détails de l'annonce :", err);
      }
    };
    fetchAd();
  }, [id]);

  if (!ad) {
    return <div>Chargement des détails de l'annonce...</div>;
  }

  return (
    <div className="ad-details-container">
      <h2>{ad.title}</h2>
      <img
        src={ad.photo || "https://placehold.co/600x400"}
        alt={ad.title}
        className="ad-photo"
      />
      <p>
        <strong>Catégorie :</strong> {ad.category}
      </p>
      <p>
        <strong>Prix :</strong> {ad.price} €
      </p>
      <p>
        <strong>Description :</strong> {ad.description}
      </p>
      <p>
        <strong>Posté par :</strong>{" "}
        {author ? (
          <span
            className="author-link"
            onClick={() => navigate(`/user-ads/${author._id}`)}
          >
            {author.username}
          </span>
        ) : (
          "Utilisateur inconnu"
        )}
      </p>
      <p>
        <strong>Email de contact :</strong> {author ? author.email : "Email inconnu"}
      </p>
    </div>
  );
};

export default AdDetails;
