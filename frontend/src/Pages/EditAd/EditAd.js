import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./EditAd.css";

const EditAd = () => {
  const { id } = useParams(); // Récupère l'ID de l'annonce depuis l'URL
  const [ad, setAd] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const token = localStorage.getItem("token"); // Récupère le token
        const response = await axios.get(`http://localhost:5000/api/ads/${id}`, {
          headers: { Authorization: `Bearer ${token}` }, // Ajoute le token dans les headers
        });
        const adData = response.data;
        console.log("Données récupérées :", adData);
        setAd(adData);
        setTitle(adData.title);
        setDescription(adData.description);
        setCategory(adData.category);
        setPrice(adData.price);
        setPhoto(adData.photo);
      } catch (err) {
        console.error("Erreur lors de la récupération de l'annonce :", err);
        alert("Erreur : Impossible de récupérer les données de l'annonce.");
        navigate("/home");
      }
    };
    fetchAd();
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/ads/${id}`,
        { title, description, category, price, photo },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Annonce modifiée avec succès !");
      navigate("/home"); // Redirige vers la page d'accueil
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err);
      alert("Erreur lors de la modification de l'annonce.");
    }
  };

  if (!ad) {
    return <div>Chargement des données...</div>;
  }

  return (
    <div className="edit-ad-container">
      <form className="edit-ad-form" onSubmit={handleUpdate}>
        <h2>Modifier l'annonce</h2>
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Catégorie"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Prix"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="URL de la photo"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
        />
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
};

export default EditAd;
