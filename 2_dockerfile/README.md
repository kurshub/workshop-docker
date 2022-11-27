# Dockerfile
En "Dockerfile" er en fil som beskriver stegene som skal utføres for å bygge et image. Den er strukturert som en rekke kommandoer som er formatert i STORE BOKSTAVER etterfulgt av argumenter til kommandoen. Dockerfiler pleier vanligvis å ligge i en fil som heter "Dockerfile", men det er ikke nødvendig at den heter det. 

- FROM
- CMD
- COPY
- WORKDIR
- RUN
- USER
- LABEL
- ENV
- ARG

## `FROM`: Mer om base images
`FROM` deklarerer hvilket base image vi vil bruke. Base images brukes slik at applikasjonsutviklere kan fokusere på det som gjør vår applikasjon unik, fremfor å beskrive steg som er standard. For eksempel gi oss alt som er til stede på en `ubuntu`-server, eller installere programmeringsspråk eller vanlige pakker.

### Versjonering
Navn på docker images består av to deler. Først en navn og så en "tag", eller versjon. Når vi sier `ubuntu` bruker vi egentlig den implisitte versjonen `latest`. Altså den nyeste versjonen som finnes når vi laster ned imaget. Om vi ønsker en mer spesifikk versjon, kan vi isteden bruke for eksempel `ubuntu:22.10`. Hva kan være årsaken til at vi ønsker å spesifisere versjon?


## `CMD`: Hva skal applikasjonen din gjøre?
Når vi bygger en applikasjon er det til syvende og sist en eller annen kommando som skal sparke den i gang. Det kan være
- `npm run server`
- `python src/manage.py`
- `rails server`
- `./start.sh`
- `mvn run` 
- +++

Det er lurt å spesifisere kommandoen din som en liste av parametere. Det gjør at Docker slipper å starte kommandoen din inne i et shell som tolker kommandoen. Altså
- `["npm", "run", "server"]`
- `["python", "src/manage.py"]`
- `["rails", "server"]`
- `["./start.sh"]`
- `["mvn", "run"]` 

# Praktisk oppgave 2: Bygge et image
Opprett en fil med navn Dockerfile i denne mappen og legg inn innholdet under:
```Dockerfile
FROM ubuntu
CMD ["echo", "Hello world"]
```

For å bygge et docker image er det kommandoen `docker build` som gjelder. For å spesifisere navnet på imaget du bygger bruker du `-t` etterfulgt av navnet. Det fungerer på samme måte som for henting av base images, at det er implisitt versjon `latest`, om man ikke spesifiserer en versjon etter `:` i navnet. Punktummet i enden av kommandoen indikerer at det er mappen vi står i nå vi skal bruke som utgangspunkt. Docker vil da lete etter en `Dockerfile` i mappen vi står i nå.
```
docker build -t docker-workshop-oppg2 .
```

Finn imaget du har bygd med `docker images`, og kjør det på samme måte som tidligere.

## Tips
- Om du bruker Visual Studio Code kan du installere utvidelsen som heter Docker, fra Microsoft. Da kan du blant annet få automatiske forslag på base images, samt Ctrl-klikke på dem for å gå til kilden i Docker Hub.

## Andre oppgaver
- Kan du finne Dockerfilen som brukes for å bygge `ubuntu` på DockerHub? Hvordan ser den ut?
- Prøv å bygge imaget med samme navn, men med forskjellig versjon, for eksempel `docker-workshop-oppg2:1`. Hvordan ser det ut i `docker images`? Hva er likt, og hva er forskjellig? Hint: Se på `IMAGE ID`.
## Ressurser
- [Offisiell dokumentasjon for kommandoer i Dockerfile](https://docs.docker.com/engine/reference/builder)