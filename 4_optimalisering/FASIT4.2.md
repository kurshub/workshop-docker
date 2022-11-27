# Fasit for oppgave 4.2
Dockerfile kan se slik ut:
```Dockerfile
FROM node:18-alpine as dev

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN ["npm", "install"]

COPY . .

CMD ["npm", "start"]

FROM dev as build

RUN ["npm", "run", "build"]

FROM nginx

COPY --from=build /app/dist /usr/share/nginx/html
```

For å bygge imaget for produksjon:
```
docker build -t docker-workshop-oppg5 .
```

For å bygge imaget for utvikling:
```
docker build --target dev -t docker-workshop-oppg5-dev . 
```

For å kjøre imaget:
```
docker run -it --rm docker-workshop-oppg5
```