FROM alpine

LABEL maintainer Knut Olav Bøhmer <bohmer@gmail.com>
LABEL org.opencontainers.image.source https://github.com/kurshub/docker
LABEL org.opencontainers.image.description="My container image"
LABEL org.opencontainers.image.licenses=MIT
LABEL no.knobo.type almalinux


RUN groupadd -r appuser -g 433 && \
    useradd -u 431 -r -g appuser -s /bin/bash -c "Docker image user" appuser

USER appuser:appuser

WORKDIR /home/appuser

CMD [ "/bin/bash" ]
