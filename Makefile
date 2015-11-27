init:
	pip install -r requirements.txt

start:
	./scripts/start.sh

publish:
	./scripts/stop.sh
	./scripts/start.sh

stop:
	./scripts/stop.sh
