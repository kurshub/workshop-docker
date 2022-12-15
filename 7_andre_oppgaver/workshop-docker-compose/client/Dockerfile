# Hvilket base image skal vi bruke
FROM node:18-alpine as dev

WORKDIR /app

RUN apk add vim

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

# Byggesteg
FROM dev as build

RUN npm run build

# Produksjon
FROM nginx:alpine

LABEL org.opencontainers.image.source https://github.com/egrimstad/docker-workshop
# Kopier inn filene vi trenger
# Til riktig mappe
COPY --from=build /app/dist /usr/share/nginx/html
