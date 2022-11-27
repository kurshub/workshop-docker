# Optimalisering av vårt image
En Dockerfile er et sett med kommandoer i rekkefølge som beskriver hvordan vi skal bygge opp filsystemet og metadataen til imaget vårt. Vi begynner med et base image, og så kopierer vi inn filene vi trenger og kjører kommandoene for å legge inn kildekoden og bibliotekene vi er avhengig av. Det Docker egentlig gjør, er å lage et nytt lag for hver kommando. Den siste kommandoen i fila lager laget som blir imaget. For å vise mellomlagene kan vi gjøre `docker image ls -a`. Imagene som har `<none>` som både `REPOSITORY`, og `TAG`, er slike mellomlag. Det vi også kan se i output til `docker image ls -a` er det som heter `IMAGE ID`. Dette er ikke en tilfeldig generert id, men en hash basert på innholdet i imaget, altså filsystem og metadata. Dette danner grunnlaget for Docker sin caching.

Når grunnlaget for et lag er det samme som når man bygde sist, trenger man ikke å utføre steget på nytt, man kan simpelthen bruke det laget som allerede er bygget. Det kan vi tjene mye på, for eksempel når det kommer til tidkrevende kommandoer som`npm install` som skal installere pakkene vi trenger for applikasjonen.


# Praktisk oppgave 4.1 - Cache-optimalisering
Kopier inn Dockerfile fra oppgave 4. Bruk den som ligger i `FASIT4.1.md` om du ikke ble ferdig. Kjør:
```
docker build -t docker-workshop-oppg4 .
```
Kjør kommandoen enda en gang. Da vil du se at det tar mye kortere tid å bygge imaget, og at det står mye `Using cache`. Det skjer altså fordi vi verken har gjort noen endringer i kildekode eller Dockerfile. Så kan du prøve å gjøre en endring i for eksempel `src/index.html` og bygge imaget på nytt.
- Hva skjer?
- Er det nødvendig å installere avhengigheter på nytt hver gang vi har gjort en endring i en av våre kildefiler?
- Hvordan kan vi endre vår Dockerfile for å utnytte cache bedre?

Når oppgaven er løst, skal du kunne gjøre en endring i filene i `src/` uten at Docker må installere avhengigheter på nytt. 

## Ressurser
- [Tips for bruk av COPY](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#add-or-copy)
- https://docs.docker.com/build/building/cache/

# Produksjonssetting
Dockerfilen vi har nå fungerer godt under utvikling, spesielt siden vi har fått satt opp volumer. Men den fungerer ikke like godt i produksjon. `Vite` er en webtjener som er ment for utvikling, for å være rask til å vise endringer, samt å kompilere TypeScript "on-the-fly". Dette er lite optimalt i produksjon. I produksjon er det mindre viktig å reagere raskt på endringer i filene, og mer viktig at vi kan levere filene raskt til mange klienter. En webtjener som er mer tjent til dette er `nginx`.

Siden vi bruker `npm`, kan vi kjøre `npm run build` for å lage optimalisert kode fra vår kildekode. De bygde filene legger seg i en mappe som heter `dist/`.

For å få til dette, kan vi utvide vår Dockerfile til å utnytte seg av en funksjonalitet kalt **multi-stage builds**.

`FROM` har vi brukt tidligere, for å si hvilket base image vi skal bruke for vårt image. I multi-stage builds bruker vi *flere* `FROM` kommandoer i samme Dockerfile, der hver `FROM` definerer et nytt steg (stage) i bygget vårt. Et nytt steg begynner fra "bunnen" av, slik at vi ikke får med oss ting vi ikke trenger fra det forrige steget.

Vi kan navngi stegene våre slik at de blir lettere å referere til, for eksempel `FROM node as dev`. Da blir `dev` navnet på steget.

En ting vi kan gjøre med navngitte steg er å bruke de som base images for senere steg i bygget vårt! Altså, om vi har et steg som heter `dev`, kan vi senere i Dockerfile gjøre `FROM dev`. Da vil vi få med oss alt vi har lagt inn i `dev` steget.

Da vi tidligere brukte `COPY` så kopierte det inn filer fra vår maskin. `COPY` har en innstilling slik at vi også kan kopiere inn filer fra et tidligere steg i vår multi-stage build. Det ser for eksempel slik ut: `COPY --from=build dist .` Da sier vi at vi skal kopiere over `dist` mappa fra `build` steget, inn i imaget vi bygger.

Når vi bygger en Dockerfile, kan vi spesifisere hvilket steg vi vil bygge frem til, ved å bruke instillingen `--target`. Så hvis vi vil bygge frem til `dev`-steget, kan vi spesifisere `--target dev`.

# Praktisk oppgave 4.2 - multi-stage builds
Nå skal vi bruke multi-stage builds for å sette opp en mer produksjonsklar webtjener med `nginx`, for å tjene den samme webapplikasjonen vi har jobbet med tidligere.

For dette trenger vi tre steg i Dockerfilen vår:
1. Det første steget er det vi allerede har, for utvikling. Det kan vi for eksempel kalle `dev`.
2. Det andre steget skal bygge kildefilene våre slik at vi får produksjonsklare JavaScript-filer ut. Dette steget kan ta utgangspunkt i `dev`-steget, slik at vi allerede har alle pakker vi trenger installert.
3. Det siste steget er `nginx`-serveren vår, som skal serve applikasjonen vår i produksjon.


## Tips
- I `nginx` skal filene som skal serves ligge i mappen `/usr/share/nginx/html`.

## Ressurser
- https://docs.docker.com/build/building/multi-stage/
- https://www.docker.com/blog/how-to-use-the-official-nginx-docker-image/
- https://hub.docker.com/_/nginx
