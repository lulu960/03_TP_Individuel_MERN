import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [ads, setAds] = useState([]); // Toutes les annonces
  const [filteredAds, setFilteredAds] = useState([]); // Annonces après filtrage
  const [categories, setCategories] = useState([]); // Liste des catégories uniques
  const [selectedCategory, setSelectedCategory] = useState(""); // Catégorie sélectionnée
  const [searchQuery, setSearchQuery] = useState(""); // Texte de recherche
  const [user, setUser] = useState(null); // Utilisateur connecté
  const [currentPage, setCurrentPage] = useState(1); // Page actuelle
  const itemsPerPage = 10; // Nombre d'articles par page

  // Récupérer toutes les annonces
  const fetchAds = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/ads");
      const adsData = response.data;
      setAds(adsData);
      setFilteredAds(adsData);

      // Extraire les catégories uniques
      const uniqueCategories = [...new Set(adsData.map((ad) => ad.category))];
      setCategories(uniqueCategories);
    } catch (err) {
      console.error("Erreur lors de la récupération des annonces :", err);
    }
  };

  // Récupérer l'utilisateur connecté
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (err) {
      console.error("Erreur lors de la récupération des informations utilisateur :", err);
    }
  };

  // Gérer la recherche
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    filterAds(query, selectedCategory);
  };

  // Gérer le filtre par catégorie
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    filterAds(searchQuery, category);
  };

  // Appliquer les filtres
  const filterAds = (query, category) => {
    let filtered = ads;

    if (category) {
      filtered = filtered.filter((ad) => ad.category === category);
    }

    if (query) {
      filtered = filtered.filter((ad) =>
        ad.title.toLowerCase().includes(query)
      );
    }

    setFilteredAds(filtered);
    setCurrentPage(1); // Réinitialiser à la première page après un filtre
  };

  // Calculer les annonces affichées pour la page actuelle
  const paginatedAds = filteredAds.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Changer de page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchAds();
    fetchUser();
  }, []);

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(filteredAds.length / itemsPerPage);

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

      {/* Filtre par catégorie */}
      <div className="filter-bar">
        <label>Filtrer par catégorie :</label>
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="">Toutes les catégories</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="ads-grid">
        {paginatedAds.map((ad) => (
          <div key={ad._id} className="ad-card">
            <img
              src={ad.photo || "https://placehold.co/600x400"}
              alt={ad.title}
            />
            <h3>{ad.title}</h3>
            <p className="category">{ad.category}</p>
            <p className="price">{ad.price} €</p>
            <p>{ad.description}</p>
            {user && ad.author === user.id && (
              <div className="buttons-container">
                <button
                  onClick={() => (window.location.href = `/edit-ad/${ad._id}`)}
                  className="edit-button"
                >
                  Modifier
                </button>
                <button
                  onClick={() => console.log("Supprimer", ad._id)}
                  className="delete-button"
                >
                  Supprimer
                </button>
              </div>
            )}
            <button
              onClick={() => (window.location.href = `/ad-details/${ad._id}`)}
              className="view-details-button"
            >
              Voir l'annonce
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
