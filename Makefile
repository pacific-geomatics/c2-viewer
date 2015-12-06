init:
	pip install -r requirements.txt

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
	docker stop $$(docker ps -q)
	docker run -d -p 27017:27017 mongo /usr/bin/mongod --nojournal

serve:
	python ./runserver.py

dev: mongo load serve
