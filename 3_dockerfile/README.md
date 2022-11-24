# Dockerfile
En "Dockerfile" er en fil som beskriver stegene som skal utføres for å bygge et image. Opprett en slik fil i denne mappen.

## `FROM`
## `WORKDIR`
## `COPY`
## `RUN`
## `CMD`

## Mer om base images
Base images brukes slik at applikasjonsutviklere kan fokusere på det som gjør vår applikasjon unik, fremfor å beskrive steg som er standard. For eksempel gi oss alt som er til stede på en `ubuntu`-server, eller installere programmeringsspråk eller vanlige pakker.

### Versjonering
Navn på docker images består av to deler. Først en id og så en "tag", eller versjon. Når vi sier `ubuntu` bruker vi egentlig den implisitte versjonen `latest`. Altså den nyeste versjonen som finnes når vi laster ned imaget. Om vi ønsker en mer spesifikk versjon, kan vi isteden bruke for eksempel `ubuntu:22.10`. Hva kan være årsaken til at vi ønsker å spesifisere versjon?


```Dockerfile
FROM ubuntu
CMD ["echo", "Hello world"]
```

## Bygge et image
```
docker build -t docker-workshop .
```

## Tips
- Om du bruker Visual Studio Code kan du installere utvidelsen som heter Docker, fra Microsoft. Da kan du blant annet få automatiske forslag på base images, samt Ctrl-klikke på dem for å gå til kilden i Docker Hub.