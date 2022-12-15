FROM node:18-alpine as dev

WORKDIR /app

# Hvilke filer trenger vi
# for npm install?
COPY package.json package-lock.json ./
# Hva skal vi gjøre
# for å få inn avhengighetene våre
RUN npm ci

# Kopier inn resten av filene
COPY . .

# Hva er kommandoen
# for å kjøre applikasjonen vår
CMD ["npm", "start"]
