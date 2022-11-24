# Oppgaver

## Run nginx
### Lag en container

```
docker run --name my-nginx-build -ti alpine sh
apk add nginx
apk add vim
# eller en annen editor.
# Du kan også bruke vi som allerede er installert
```

Endre på nginx til å logge til standard out slik at vi kan se loggene med \`docker logs\` \#+name /etc/nginx/nginx.conf

```nginx.conf
...
daemon off;
# error_log /var/lib .... ; # kommenter ut denne
error_log /dev/stdout info;

http {
...
# access_log /var/log/nginx/access.log main; # kommenter ut denne
  access_log /dev/stdout;
...
}
```

\#+name /etc/nginx/http.d/default.conf

```conf
server {
...
    root /var/www/localhost/htdocs/;

    location / {
       # Nothing here
    }
...
}
```

/var/www/localhost/htdocs/index.html

```html
<html>
<head><title>From Container</title></head>
<body>
<center><h1>This is my container</h1></center>
</body>
</html>
```

```sh
chgrp www-data /var/www/localhost/htdocs/index.html
```

```sh
docker commit -a "me@my-mail" \
    -c "EXPOSE 80" \
    -c 'CMD ["nginx"]' \
    -c "HEALTHCHECK --interval=5m --timeout=3s CMD curl -f http://localhost/ || exit 1" \
    my-nginx-build my-nginx-image
# Legg til healthcheck

docker run --name my-nginx-container -d -p 8089:80  my-nginx-image
docker logs my-nginx-container
```
