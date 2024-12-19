# 03_TP_Individuel_MERN

# Application MERN inspirée de "Le Bon Coin"

Cette application MERN (MongoDB, Express, React, Node.js) est une plateforme de petites annonces inspirée de "Le Bon Coin". Elle permet aux utilisateurs de s'inscrire, de publier des annonces, de les consulter et de les gérer.

---

## **Prérequis**

Avant de commencer, assurez-vous d'avoir installé les outils suivants :

- [Node.js](https://nodejs.org/) (version 14 ou plus récente)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local ou hébergé)

---

## **Installation**

### 1. Clonez le projet et le lancer

```bash
git clone https://github.com/lulu960/03_TP_Individuel_MERN.git
cd 03_TP_Individuel_MERN
npm install
node start.js
```

### 2. Lancement manuelle
Démarrage manuel
Si vous préférez démarrer les serveurs manuellement, suivez ces étapes :

1. Backend
Naviguez dans le dossier backend, installez les dépendances et démarrez le serveur :
```bash
cd backend
npm install
npx nodemon server.js
```
Le backend sera disponible à l'adresse : http://localhost:5000

2. Frontend
Naviguez dans le dossier frontend, installez les dépendances et démarrez le client React :
```bash
cd frontend
npm install
npm start
```
Le frontend sera disponible à l'adresse : http://localhost:3000

