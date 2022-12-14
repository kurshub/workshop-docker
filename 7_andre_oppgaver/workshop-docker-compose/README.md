# Docker Compose
`docker-compose` er et verktøy som ligger oppå Docker, som kan "komponere" sammen forskjellige Docker images og containere. Man merker fort at det begynner å bli komplisert å holde styr på hvilke innstillinger man skal ha med inn til `docker run`, passe på at images er bygd til enhver tid, nettverk, volumer, og så videre.

`docker-compose` hjelper til med dette ved å la deg definere alle containerne du trenger i en tekstfil kalt `docker-compose.yml`. I den kan du spesifisere hvilke containere du vil ha, hvilke innstillinger de skal kjøres med og hvordan de skal kommunisere.

I eksempelet i denne mappen har vi satt opp en utvidelse av vår applikasjon fra tidligere, hvor antall klikk lagres i en SQL database. For å få applikasjonen opp å kjøre, kjør først

```
docker-compose up
```
Så, for å få ting til å fungere første gangen, må vi opprette databaseskjemaet. Gjør det i en ny terminal med:

```
docker exec workshop-docker-compose-server-1 node src/setupDatabase.js
```

## Tips
- Du kan få en SQL-terminal med `docker-compose exec -it database psql -U postgres -d testdb`
## Ressurser
- https://docs.docker.com/compose/compose-file/

## Oppgaver
- Hvilke containere kjører? (`docker ps`)
- Hvile volumer finnes? (`docker volume ls`)
- Hvilke nettverk har blitt opprettet? (`docker network ls`)
