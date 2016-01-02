# Install
sudo apt-get install -y python-pip gunicorn nginx
sudo pip install -r requirements.txt

# Stormpath Settings
mkdir -p ~/.stormpath
cp apiKey.properties ~/.stormpath/apiKey.properties

# Nginx Settings
sudo cp ./nginx/c2viewer.pacgeo.com /etc/nginx/sites-available/c2viewer.pacgeo.com
sudo cp ./nginx/nginx.conf /etc/nginx/nginx.conf
sudo ln -s /etc/nginx/sites-available/c2viewer.pacgeo.com /etc/nginx/sites-enabled/c2viewer.pacgeo.com
