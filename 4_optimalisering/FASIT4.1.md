# Fasit for oppgave 4.1
Dockerfile kan se slik ut:
```Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN ["npm", "install"]

COPY . .

CMD ["npm", "start"]
```

For å bygge imaget:
```
docker build -t docker-workshop-oppg4 .
```

For å kjøre imaget:
```
docker run -it --rm -p 8080:8080 -v *stien til workshop-docker repoet*/4_optimalisering/src:/app/src docker-workshop-oppg4
```