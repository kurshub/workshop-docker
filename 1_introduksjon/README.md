# Docker
- Kommandolinjeverktøy for å bygge images (`docker build`), kjøre containere (`docker run`), og administrere (`docker ps`, `docker images`, `docker logs` +++). `docker --help`.
- "Daemon", tjenesten som faktisk kjører docker. Kommandolinjeverktøyene kommuniserer med denne tjenesten.
- Registry for å finne images (https://hub.docker.com/search)
- Docker Inc: En bedrift som skal tjene penger

# Praktisk oppgave 2.1: Start en docker container fra et image

```
docker run -it ubuntu
```

### Isolert filsystem
```
ls
```
Vi har et helt eget filsystem inne i containeren!

### Isolert nettverk
```
apt update
apt install iproute2
ip address show eth0
```

Legg merke til at containeren har en annen IP-adresse en din maskin.

### Isolerte prosesser
```
ps aux
```

Legg merke til at det kun er to prosesser, `bash` og `ps`.

## Tips
- Gå ut av en container med Ctrl-D i terminalen.
- For hjelpetekst om en `docker`-kommando kan du bruke `--help`. For eksempel `docker run --help`. Eller generell hjelp, `docker --help`.
- Når du skal spesifisere flere "en-bokstavs"-innstillinger (flagg) til `docker`-kommandoer, som for eksempel `-i` og `-t`, kan du kombinere dem til en, altså `-it`. `--rm` derimot er en "fler-bokstavs"-innstilling. Den bruker to bindestreker, og kan ikke kombineres med andre. Også `-i` og `-t` har tilsvarende fler-bokstavs-varianter, henholdsvis `--interactive` og `--tty`. En oversikt over innstillinger finnes i `--help`.
- Det har ikke noe å si hvilken rekkefølge innstillingene kommer i, men de må spesifiseres *før* hvilket image man skal gjøre. Man kan for eksempel ikke gjøre: `docker run -it ubuntu --rm`. `--rm` må før `ubuntu`.

## Andre oppgaver
- Bruk andre images fra [Docker Hub](https://hub.docker.com/search) og se hvordan de er annerledes.
  - Bruk `docker pull` for å laste ned et image uten å kjøre det.
  - Bruk `docker images` for å liste imagene du har lokalt.
  - Kan du finne et image du kan bruke for å kjøre `python`?
- Start containeren i bakgrunnen med: `docker run -itd ubuntu`.
  - Finn den kjørende containeren med: `docker ps`
    - Siden vi ikke spesifiserte noe navn på containeren vår med `--name` får den et tilfeldig navn. Hvilket navn har containeren fått?
  - Få et shell i containeren med `docker exec -it *navnet på containeren* bash`
  - Gå ut av containeren og kjør `docker ps`. Hva er tilstanden til containeren din?
  - Stopp containeren med `docker stop *navnet på containeren*`
- Gi containeren din et eget navn med `--name`.
  - Om du åpner en ny terminal, eventuelt kjører i bakgrunnen med `-d`, kan du finne igjen containeren med ditt eget navn med `docker ps`. Det gjør det litt enklere å holde oversikten!
  - Hva skjer om du prøver å starte en ny container med samme navn? Hva skal til for å løse det? Hint: `docker stop` og `docker rm`.
- Legg til flagget `--rm`. Hva skjer da?
  - Hint: Vis også containere som ikke kjører med `docker ps -a`
- Kjør `docker inspect ubuntu`
  - Henter metadaten til et image
  - Se for eksempel på `Config.Cmd`. Det er derfor vi får opp et shell!

