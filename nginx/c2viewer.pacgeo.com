server {
    listen 443 ssl default_server;
    listen [::]:443 ssl default_server;

    server_name c2viewer.pacgeo.com;

    ssl_certificate /etc/letsencrypt/live/c2viewer.pacgeo.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/c2viewer.pacgeo.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:8000/;
    }
}

server {
    server_name www.c2viewer.pacgeo.com;
    return 301 https://c2viewer.pacgeo.com$request_uri;
}