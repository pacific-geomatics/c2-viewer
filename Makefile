init:
	sudo apt-get install python-pip
	sudo pip install -r requirements.txt
	mkdir -p ~/.stormpath
	cp apiKey.properties ~/.stormpath/apiKey.properties

start:
	./scripts/start.sh

publish:
	./scripts/stop.sh
	./scripts/start.sh

stop:
	./scripts/stop.sh

load:
	mongoimport --db pacgeo --drop --collection photos mongodb/photos.json

mongo:
	docker stop $$(docker ps -q) || true
	docker run -d -p 27017:27017 mongo /usr/bin/mongod --nojournal

serve:
	python ./runserver.py

dev:
	mongo load serve
