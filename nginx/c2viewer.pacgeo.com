server {
    listen 443 ssl;
    listen [::]:443 ssl;

    server_name c2viewer.pacgeo.com;

    ssl on;
    ssl_certificate /etc/letsencrypt/live/c2viewer.pacgeo.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/c2viewer.pacgeo.com/privkey.pem;

    # For HSTS (Only HTTPS connections will be valid)
    add_header Strict-Transport-Security "max-age=63072000; includeSubdomains; preload";

    # Prevent website from being in X-Frame
    add_header X-Frame-Options "DENY";

    location / {
        proxy_pass http://127.0.0.1:8000/;
    }
}

server {
    server_name www.c2viewer.pacgeo.com;
    return 301 https://c2viewer.pacgeo.com$request_uri;
}
