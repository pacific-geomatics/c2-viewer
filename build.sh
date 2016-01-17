#!/usr/bin/env bash

git pull
sudo docker build -t pacgeo/c2viewer .
sudo docker stop c2viewer
sudo docker rm c2viewer
sudo docker run -d -p 3000:3000 --name c2viewer pacgeo/c2viewer
