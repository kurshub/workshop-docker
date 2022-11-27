## Lag en docker-compose.yml fil
Multi-container applikasjonen skal inneholde to tjenester (services)
1. web
   - Web tjenesten skal bygges av dockerfilen som ligger under web
   - Web tjenesten skal eksportere porten som er tilgjengelig i web tjenesten
2. redis
   - Tjenesten skal starte et redis image. Bruk gjerne redis:alpine
   

