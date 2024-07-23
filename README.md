# FIVLY-WEBSITE
## Description

Ce projet comprend le site web pour gérer votre association loi 1901, une fois combiné avec la fivly-api.

Il est basé sur le framework NextJS et utilise TailwindCSS pour le design.

## Installation

### Ajouter un fichier .env à la racine du projet
```dotenv
WEBSITE_PORT=3001 # Port du site web
API_URL[fivly-api](..%2Ffivly-api)=https://api.yourdomain.com # URL de l'API
JWT_SECRET=jwt_secret # Clé secrète pour les tokens JWT utilisé par l'API
```

### Lancer le projet avec Docker Compose

```bash
$ docker compose up --env-file .env -d
```[README.md](..%2Ffivly-api%2FREADME.md)

Et voilà, tout est prêt, vous pouvez maintenant accéder à votre site web à l'adresse http://localhost:${WEBSITE_PORT}.


