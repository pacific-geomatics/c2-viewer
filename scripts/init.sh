sudo apt-get install -y python-pip gunicorn
sudo pip install -r requirements.txt
mkdir -p ~/.stormpath
cp apiKey.properties ~/.stormpath/apiKey.properties