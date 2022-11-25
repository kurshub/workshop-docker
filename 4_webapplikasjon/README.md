
# Enkel webapplikasjon med npm og vite

## `WORKDIR`: Finn vår egen plass
Når vi skal jobbe med filsystemet i en docker container er det fint å legge ting et annet sted enn i rot-mappa `/`, siden det kan komme i konflikt med systemfiler. Det kan for eksempel være `WORKDIR /app`. Alle påfølgende kommandoer i Dockerfilen vil kjøres fra inne i denne mappen. Derfor er det lurt å ha `WORKDIR` så tidlig som mulig.

## `COPY`: Inn med vår egen kildekode
`COPY` kopierer filer fra vertsmaskinen inn i containeren. Det første argumentet er hvilke filer vi skal kopiere over, og det andre argumentet er hvor de skal havne. For eksempel `COPY . .` kopierer alle filer og mapper over til containeren.

### `.dockerignore`
Det kan være noen filer vi aldri har lyst til å kopiere over til containeren. Da kan vi opprette en `.dockerignore`-fil. Formatet på denne fila tilsvarer `.gitignore` for filer som ikke skal være i Git.

## `RUN`: Utfør kommandoer når vi bygger
`RUN` brukes for å kjøre kommandoer inne i containeren i byggeprosessen. En vanlig bruk for dette er å installere pakker vi ønsker at containeren skal inneholde. For eksempel, i introduksjonen gjorde vi `apt update` og `apt install iproute2` i containeren for å se på nettverksinfo. Om vi ønsker at dette er noe man skal kunne gjøre lett i containeren kan vi legge inn en kommando `RUN apt update && apt install iproute2` i Dockerfile.

# Praktisk oppgave 4.1: Enkel webapplikasjon med npm og vite
I denne mappen er det filer for å sette opp en enkel webapplikasjon. Her er en rask forklaring av filene:
```
package.json
package-lock.json
```
Dise filene beskriver metadataen til applikasjonen vår, som hvilke avhengigheter den har, samt hvilke kommandoer man kan gjøre i den. For å installere avhengigheter, kjører man `npm install`, og for å starte applikasjonen, kjører man `npm start`. `npm` (står for Node Package Manager) er en kommando som følger med når man installerer `node`, det mest populære kjøretidsmiljøet for JavaScript utenom nettleseren.

```
vite.config.js
```
Denne fila er konfigurasjon for webtjeneren (Vite) vi bruker i utvikling. Den lager en tjener som er tilgjengelig på `localhost:8080` der vi kan se vår kjørende applikasjon. Den gjør også om TypeScript-koden vår til vanlig JavaScript-kode, som nettleseren skjønner. Vite er en avhengighet av vår applikasjon, som blir tilgjengelig etter vi har gjort `npm install`.

```
src/index.html
src/index.ts
```
Disse filene er kildekoden til applikasjonen. `index.html` er startpunktet for det som blir vist i applikasjonen, mens `index.ts` legger inn en smule interaktivitet.

Oppgaven er å lage en Dockerfile slik at vi kan kjøre applikasjonen vår inne i en container.

- Hva slags base image bør vi bruke?
- Hvordan får vi filene våre inn i en egen mappe i containeren?
- Hvordan får vi installert avhengighetene vi trenger?
- Hvordan får vi kjørt applikasjonen vår?

For å bygge og kjøre applikasjonen, bruker du `docker build` og `docker run` slik vi har lært tidligere. Når du har løst oppgaven, skal containeren gi output som likner på:
```
VITE v3.2.4  ready in 174 ms

  ➜  Local:   http://localhost:8080/
  ➜  Network: http://172.17.0.2:8080/
```

Om du kjører applikasjonen med `-d` for å legge den i bakgrunnen, kan du finne outputen ved å kjøre `docker logs *navnet på containeren*`.

Er det nå mulig å gå inn i nettleseren og åpne applikasjonen på adressen den sier? Hvorfor ikke?

## Tips
- 

# Praktisk oppgave 4.2: Hvordan nå applikasjonen vår?


