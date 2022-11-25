# Fasit for oppgave 4.1
Dockerfile kan se slik ut:
```Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY . .

RUN ["npm", "install"]
CMD ["npm", "start"]
```

For å bygge imaget:
```
docker build -t docker-workshop-oppg4 .
```

For å kjøre imaget:
```
docker run -it --rm docker-workshop-oppg4
```