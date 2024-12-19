const { exec } = require("child_process");
const path = require("path");

// Chemins vers les dossiers backend et frontend
const backendPath = path.join(__dirname, "backend");
const frontendPath = path.join(__dirname, "frontend");

// Commande pour initialiser et démarrer le backend
const startBackend = () => {
  console.log("📦 Initialisation du backend...");
  exec("npm install", { cwd: backendPath }, (err, stdout, stderr) => {
    if (err) {
      console.error("❌ Erreur lors de l'installation des dépendances backend :", err);
      return;
    }
    console.log(stdout);
    console.error(stderr);

    console.log("🚀 Démarrage du backend...");
    exec("npx nodemon server.js", { cwd: backendPath }, (err, stdout, stderr) => {
      if (err) {
        console.error("❌ Erreur lors du démarrage du backend :", err);
      } else {
        console.log("✅ Backend lancé avec succès !");
      }
      console.log(stdout);
      console.error(stderr);
    });
  });
};

// Commande pour initialiser et démarrer le frontend
const startFrontend = () => {
  console.log("📦 Initialisation du frontend...");
  exec("npm install", { cwd: frontendPath }, (err, stdout, stderr) => {
    if (err) {
      console.error("❌ Erreur lors de l'installation des dépendances frontend :", err);
      return;
    }
    console.log(stdout);
    console.error(stderr);

    console.log("🚀 Démarrage du frontend...");
    exec("npm start", { cwd: frontendPath }, (err, stdout, stderr) => {
      if (err) {
        console.error("❌ Erreur lors du démarrage du frontend :", err);
      } else {
        console.log("✅ Frontend lancé avec succès !");
      }
      console.log(stdout);
      console.error(stderr);
    });
  });
};

// Exécute les deux fonctions
startBackend();
startFrontend();
