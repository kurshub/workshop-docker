# Hva er Docker?
- Bygging av container images
- Kjøring av container images
- Distribusjon av container images

# Hva er containers?
- Reproduserbarhet
- Portabilitet
- Utvikleropplevelse
- Isolering

# Hva er et container image?
- "Filesystem bundle"
- Tarball
- Manifest/config

# Hva er en container runtime
- Til forskjell fra en virtuell maskin, så deler en container operativsystemet, ikke bare hardware. Skalerer bedre.
- Virtualisering og isolering av prosesser, filsystem, nettverk inne i et operativsystem
- Linux namespaces

# Container image distribution
Hvordan lagre og distribuere images mellom maskiner? 

# Container image orchestration
Hvordan holde kontrollen når man begynner å få mange containere å holde styr på? docker-compose, Kubernetes ++

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

### Isolert nettverk
```
apt update
apt install iproute2
ip address show
```

### Isolerte prosesser
```
top
```

## Tips
- Gå ut av en container med Ctrl-D i terminalen.
- For hjelpetekst om en `docker`-kommando kan du bruke `--help`. For eksempel `docker run --help`. Eller generell hjelp, `docker --help`.
- Når du skal spesifisere flere "en-bokstavs"-innstillinger (flagg) til `docker`-kommandoer, som for eksempel `-i` og `-t`, kan du kombinere dem til en, altså `-it`. `--rm` derimot er en "fler-bokstavs"-innstilling. Den bruker to bindestreker, og kan ikke kombineres med andre. Også `-i` og `-t` har tilsvarende fler-bokstavs-varianter, henholdsvis `--interactive` og `--tty`. En oversikt over innstillinger finnes i `--help`.

## Andre oppgaver
- Bruk andre images fra [Docker Hub](https://hub.docker.com/search) og se hvordan de er annerledes.
  - Bruk `docker pull` for å laste ned et image uten å kjøre det.
  - Bruk `docker images` for å liste imagene du har lokalt.
  - Kan du finne et image du kan bruke for å kjøre `python`?
- Start containeren i bakgrunnen med: `docker run -itd ubuntu`.
  - Finn den kjørende containeren med: `docker ps`
    - Siden vi ikke spesifiserte noe navn på containeren vår med `--name` får den et tilfeldig navn. Hvilket navn har containeren fått?
  - Få et shell i containeren med `docker exec -it *navnet på containeren*`
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
## Ressurser
- 