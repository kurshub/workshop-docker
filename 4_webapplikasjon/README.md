
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
# Nettverk i Docker
En docker-container har et nettverk som er isolert fra vertsmaskinen. For å få tilgang til en port inne i containeren på vertsmaskinen er vi nødt til å publisere porten når vi starter containeren. Det gjør vi med `-p` (`--publish`) som en instilling til `docker run`. Til `-p` så spesifiserer vi to porter separert med `:`. Den første er porten vi ønsker å binde til på vertsmaskinen, mens den andre er porten inne i containeren.

Et annet alternativ til å publisere porter, er å fjerne isoleringen fra vertsmaskinen. Da bruker vi innstillingen `--network host`. Hvorfor er ikke dette lurt?

# Praktisk oppgave 4.2: Hvordan nå applikasjonen vår?
Bruk det samme imaget som du gjorde i forrige oppgave, men utvid `docker run` slik at porten webapplikasjonen kjører på blir publisert til webapplikasjonen. Prøv også den alternative måten, med å fjerne isoleringen av nettverket.

## Tips

## Andre oppgaver
- Noe med user defined networks

## Ressurser
- https://docs.docker.com/network/

# Volumer i Docker
En docker container har i utganspunktet ikke noe persistent tilstand. Altså, hvis man gjør endringer på filer i en kjørende container, eksisterer de endringene bare inne i den containeren og blir borte hvis containeren blir fjernet. For å få til tilstand i Docker som persisteres bruker vi derfor noe som kalles volumer. Volumer er persistente holdere av data, lever på utsiden av containere, og "monteres" inn i containere når man starter de. Volumer i docker administreres med `docker volume`. Et lite eksempel:

```
docker volume create my-vol
docker run -it --rm -v my-vol:/my-folder alpine
> touch my-file1.txt # Oppretter en tom fil utenfor volumet
> cd /my-folder
> touch my-file2.txt # Oppretter en tom fil inne i volumet
> Ctrl-D # Går ut av containeren, som gjør at den stoppes og fjernes
docker run -it --rm -v my-vol:/my-folder alpine
> ls
> ls /my-folder
```
Når du skriver ut filene som ligger i rot-mappa, ser du ikke lenger `my-file1.txt`, men i mappa `my-folder` kan du fremdeles se `my-file2.txt`. Det er fordi `my-folder` er montert i volumet `my-vol`. 

Du kan vise volumer som finnes med `docker volume ls`, og slette et volum med `docker volume rm *navn*`.

Vi kan også, isteden for å lage et volum med et navn (som `my-vol`), montere opp en mappe på vår vertsmaskin, som om det var et volum. Da gjør vi:
```
docker run -it --rm -v $HOME/my-local-folder:/my-folder alpine
> cd /my-folder
> touch my-file.txt
> Ctrl-D
ls $HOME/my-local-folder
```

Da ser vi faktisk at vi har opprettet en mappe på vår maskin, som inneholder fila vi lagde inne i containeren.

Du kan også montere opp et volum i flere forskjellige docker containere på en gang, hvis de deler noen filer.

# Praktisk oppgave 4.3 - Bruk av Docker i utvikling
Vi går tilbake til vår webapplikasjon. Sånn vi har satt det opp til nå, er ikke dette veldig brukbart for utvikling. Hver gang vi vil gjøre en endring i kildekoden vår, må vi bygge og starte imaget vårt på nytt. Ikke særlig bra utvikleropplevelse! Prøv dette en gang for å se.

Hvordan kan vi bruke volumer for å gjøre dette bedre?

Når du har klart oppgaven, skal du kunne gjøre endringer i for eksempel `src/index.html` og se endringen med en gang i nettleseren din.

## Tips
- Når man bruker `-v`, *må* alle stiene, både den på vertsmaskinen og inne i containeren, være absolutte, altså at de begynner i rotmappa `/`. Du kan ikke bruke stier relativt til den mappen du står i, som `./`. Du kan riktignok bruke `$HOME`, en variabel som refererer til hjemmemappen til din bruker.
- For å utforske filsystemet i containeren din, kan du åpne en ny terminal og bruke `docker exec -it *navn_på_container* bash`.
- For å skrive ut stien du står i nå, kan du bruke `pwd`.
- Husk å ta med deg videre `-p` instillingen fra forrige steg, slik at du kan nå webapplikasjonen.
## Ressurser
- https://docs.docker.com/storage/volumes/
- `docker volume --help`