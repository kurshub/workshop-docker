# Fasit for oppgave 3.2
For å publisere riktig port:
```
docker run -it --rm -p 8080:8080 docker-workshop-oppg3
```

For å dele nettverk med vertsmaskinen:
```
docker run -it --rm --network host docker-workshop-oppg3
```

Med begge disse alternativene er nettsiden tilgjengelig på `localhost:8080`.

