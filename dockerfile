# Étape 1 : Installer Git et cloner le projet
FROM node:16 AS build

# Installer Git pour cloner le dépôt
RUN apt-get update && apt-get install -y git

# Cloner le projet depuis GitHub
RUN git clone https://github.com/lulu960/03_TP_Individuel_MERN.git /app

WORKDIR /app/03_TP_Individuel_MERN

# Installer les dépendances du backend
RUN npm install

# Commande pour démarrer le backend
CMD ["node", "server.js"]
