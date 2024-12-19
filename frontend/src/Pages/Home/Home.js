import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [ads, setAds] = useState([]);
  const [filteredAds, setFilteredAds] = useState([]);
  const [categories, setCategories] = useState([]); // Liste des catégories dynamiques
  const [category, setCategory] = useState(""); // Catégorie sélectionnée
  const [searchQuery, setSearchQuery] = useState(""); // Requête de recherche

  const fetchAds = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/ads");
      const adsData = response.data;
      setAds(adsData);
      setFilteredAds(adsData); // Par défaut, aucune catégorie n'est filtrée

      // Extraction des catégories uniques depuis les annonces
      const uniqueCategories = [
        ...new Set(adsData.map((ad) => ad.category)),
      ].filter((cat) => cat); // Élimine les catégories nulles ou indéfinies
      setCategories(uniqueCategories);
    } catch (err) {
      console.error("Failed to fetch ads:", err);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleFilter = (selectedCategory) => {
    setCategory(selectedCategory);
    let updatedAds = ads;

    if (selectedCategory) {
      updatedAds = ads.filter((ad) => ad.category === selectedCategory);
    }

    if (searchQuery) {
      updatedAds = updatedAds.filter((ad) =>
        ad.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredAds(updatedAds);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    let updatedAds = ads;

    if (category) {
      updatedAds = ads.filter((ad) => ad.category === category);
    }

    if (query) {
      updatedAds = updatedAds.filter((ad) =>
        ad.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredAds(updatedAds);
  };

  return (
    <div className="home-container">
      <h2>Liste des Annonces</h2>

      {/* Barre de recherche */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher une annonce..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {/* Menu de filtrage par catégorie */}
      <div className="filter-container">
        <label htmlFor="category">Filtrer par catégorie : </label>
        <select
          id="category"
          value={category}
          onChange={(e) => handleFilter(e.target.value)}
        >
          <option value="">Toutes les catégories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="ads-grid">
        {filteredAds.map((ad) => (
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
              onClick={() => (window.location.href = `/ad-details/${ad._id}`)}
              className="view-details-button"
            >
              Voir l'annonce
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
