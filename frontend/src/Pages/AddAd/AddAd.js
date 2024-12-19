import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddAd.css";

const AddAd = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");

  const navigate = useNavigate(); // Hook pour rediriger l'utilisateur

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/ads",
        { title, description, category, price, photo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      const createdAdId = response.data._id; // Récupère l'ID de l'annonce créée
      navigate(`/ad-details/${createdAdId}`); // Redirige vers la page de détails
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="add-ad-container">
      <form className="add-ad-form" onSubmit={handleSubmit}>
        <h2>Créer une annonce</h2>
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
        <button type="submit">Créer l'annonce</button>
      </form>
    </div>
  );
};

export default AddAd;
