server {
    listen 443 ssl;
    listen [::]:443 ssl;

    ssl_certificate /etc/letsencrypt/live/addxy.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/addxy.com/privkey.pem;

    server_name addxy.com;

    location / {
        proxy_pass http://127.0.0.1:8000/;
    }
}


server {
    listen 443 ssl;
    listen [::]:443 ssl;

    ssl_certificate /etc/letsencrypt/live/addxy.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/addxy.com/privkey.pem;
 
    server_name tile.addxy.com;

    location / {
        proxy_pass http://127.0.0.1:8000/;
    }
}

server {
    listen 80;
    server_name addxy.com;
    return 301 https://addxy.com$request_uri;
}

server {
    server_name www.addxy.com
        www.c2-viewer.addxy.com c2-viewer.addxy.com;
    return 301 https://addxy.com$request_uri;
}

server {
    server_name www.tile.addxy.com
        www.a.tile.addxy.com a.tile.addxy.com
        www.b.tile.addxy.com b.tile.addxy.com
        www.c.tile.addxy.com c.tile.addxy.com;
    return 301 https://tile.addxy.com$request_uri;
}


