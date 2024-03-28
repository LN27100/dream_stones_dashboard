# Utilisez l'image officielle Node.js comme base
FROM node:latest

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez les fichiers nécessaires de votre projet dans le conteneur
COPY . .

# Installez les dépendances du projet
RUN npm install

# Exposez le port sur lequel votre application Vue.js s'exécute (par défaut, c'est le port 8080)
EXPOSE 8080

# Commande pour démarrer votre application
CMD ["npm", "run", "serve"]

