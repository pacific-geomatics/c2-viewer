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
	mongoimport --db pacgeo --drop --collection users mongodb/users.json
	mongoimport --db pacgeo --drop --collection photos mongodb/photos.json