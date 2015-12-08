C&#178; Viewer
=============

Here are some of my thoughts on C2Viewer. As discussed I really like to C2Viewer, and I think it will be a great service for PacGeo to offer our customers.

Deficiency
----------

- Currently our customer purchase GeoTiff and then use the data in software like ArcGIS. Most personnel in the company do not have access to the data.   (like mining companies)

- There are many users who have built applications on Google/ Bing ect, but the data does not meet their requirements. These companies are currently not our customers, due to the fact there is no easy way for them to use our data.  (company like Track 24)
Opportunity

- Offer our customer a secure web map with their data as a fee for service. The customer would view the data/map in his App like Track 24 or as simple standalone viewer. PacGeo may also use the C2Viewer as a way to show demo data.

Requirement
-----------

- Based on log in the customer would have a unique map
- Base Map would have 3 default layers
- Mapbox imagery with customer imagery overlay
- Topo Map
- Mapbox "street Map"
- Custom map based on customers requirement.
- Search function (at a later date)
- Customers would use imagery to map OSM
- Customers vector data added to maps (like CNL)
- Work on computer
- Operate on mobile
- Mobile should have caching. I think Track 24 would be very interested in this function.

Easy to set to use
------------------

- John must be able to link 3 Mapbox map to new customer log in
- No coding required to set up new customer with a basic map

Low cost
--------

As we develop business plan we need to weight the cost of the easy button versus developing that part of the App in house. Long term Cost of ownership.

- Mapbox $6 K per year
- Amazon S3 bucket
- Stormpath
- Integrated into the new PacGeo.com website


Pacgeo's Command &amp; Control Viewer.
--------------------------------------

Web accessible browser map will be able to run standalone laptop or sever behind CNL firewall

1st rule on this project is KISS! (Keep It Simple Stupid)

Edit from john.

## Milestones

### Friday 27th November

- 30 cm imagery
- Building outline, with names if possible (like you have now)
- Control Zones (that are on now)
- Future buildings. I have no data, we will just put a building in an open field
- Fake camera location and LOS overlay. We can talk about this.
- MapBox Topo map https://a.tiles.mapbox.com/v4/pacgeo.ngio6771/page.html?access_token=pk.eyJ1IjoicGFjZ2VvIiwiYSI6ImE2ZmE3YTQyNmRjNTVmYTAxMWE2YWZlNGFjZjMzZWVhIn0.wRU0txw3VIEOVtyc8PCYdQ#14/46.1000/-77.5043
- Any other layers is a bonus but not required.

### 1st Milestone

The imagery only on a WMS to allow the other security contractor to see the imagery/ basic analyst. (We could use PacGeo MapBox account if required)

- Secure log in (nice to have)
- 30 cm imagery
- 2 cm imagery

### 2nd Milestone

**Required 27 Nov 15.**

Unclass data /Beta version/ WMS on a laptop.

- Secure log in (nice to have)
- 30 cm imagery
- 30 cm imagery
- Roads from CNL or OSM
- Building outline if available from CNL
- List of the other layers we could offer: building names, camera view sheds, ect
- Based on feedback from CNL add additional layers on to the Tool.

 
### 3rd Milestone

**Deliver final version 15 Dec 2015.**

Gather feedback for addition scope for the next phase if required. Anything cool that we can offer CNL for under additional contracts


## How to build it?

### Geo Data

- Point, Line, Polygon (GeoJSON)

### Databases

- [SQLite3](https://github.com/mapbox/node-sqlite3)

### Imagery

- Tile Map Service ([GDAL2Tiles.py](https://hub.docker.com/r/geodata/gdal/))
- MBTiles ([GDAL2Tiles.py](https://github.com/developmentseed/gdal2mb))
- WMS ([Mapbox Atlas](mapbox.com/atlas))
 
### Elevation

- 2m lidar +2 cm

### Basemaps

- Topographic (Mapbox)
- Grey (Mapbox)

### Extra Features

- Geocoder ([Mapbox's Carmen](https://github.com/mapbox/carmen))
- Line of sight cameras (GeoJSON)

### Web Server

- NodeJS

### Javascript Libraries

- Turf
- Mapbox Web GL
- Leaflet
- jQuery
- Bootstrap

### Web Mapping Applications

- [Leaflet](http://leafletjs.com/) + [Mapbox.js](https://github.com/mapbox/mapbox.js)
- HTML5 & CSS3
- [Mabox WebGL](https://github.com/mapbox/mapbox-gl-js)

### Tile Mapping Service

#### Chalk River

**JOSM**

- tms[20]:http://{switch:a,b,c}.tile.addxy.com/chalkriver/{zoom}/{x}/{y}.png?api_key=123
- tms[20]:http://{switch:a,b,c}.tile.addxy.com/chalkriver-drape2014/{zoom}/{x}/{y}.png?api_key=123

**Leaflet (Javascript)**

- http://{s}.tile.addxy.com/chalkriver/{z}/{x}/{y}.png?api_key=123
- http://{s}.tile.addxy.com/chalkriver-drape2014/{z}/{x}/{y}.png?api_key=123

**OpenStreetMap iD**

- http://tile.addxy.com/chalkriver/{zoom}/{x}/{y}.png?api_key=123
- http://tile.addxy.com/chalkriver-drape2014/{zoom}/{x}/{y}.png?api_key=123

**Example**

Pacgeo

![PacGeo](http://tile.addxy.com/chalkriver/19/149474/186416.png?api_key=123)

Drape 2014

![Drape](http://tile.addxy.com/chalkriver-drape2014/19/149474/186416.png?api_key=123)


**JOSM**

- tms[20]:http://{switch:a,b,c}.tile.addxy.com/chalkriver/{zoom}/{x}/{y}.png?api_key=123
- tms[20]:http://{switch:a,b,c}.tile.addxy.com/chalkriver-drape2014/{zoom}/{x}/{y}.png?api_key=123
 

#### Brockville Airport

**JOSM**

- tms[22]:http://{switch:a,b,c}.tile.addxy.com/brockville/{zoom}/{x}/{y}.png?api_key=123

**iD Editor**

- http://{switch:a,b,c}.tile.addxy.com/brockville/{zoom}/{x}/{y}.png?api_key=123


**Good tile**

- http://tile.addxy.com/brockville/18/75910/94669.png?api_key=123

**Bad credentials**

- http://tile.addxy.com/brockville/18/75910/94669.png?api_key=321

**Missing tile**

- http://a.tile.addxy.com/brockville/24/0/0.png?api_key=123

### Layers
 
- Old imagery DRAPE (we could drop if required)

- 30 cm WV-3 imagery May 15 (now that we have the ground control we should have the final version in a few days.)

- 2 cm imagery 31 Oct (still waiting for it)

- Buildings (from the data CNL gave us)

 
There may be other layers but have to see what data CNL gave us. I know Reticle / CNL wants some type of view shed with the 2 cm DEMs. Not sure how/what that would that would look like. Any ideas????
 
 
### CNL FTP info

Please note: The user shall observe the following expectations and requirements: The DRAPE imagery we have is licensed to us by the province of Ontario through the Ministry of Natural Resources.  So when the DRAPE imagery is used, by the contractor, in any product it needs to give copyright credit to the province of Ontario.  I have placed a simple text file 'QUEENS_PRINTER.txt' that provides the wording to be used in a label that needs to be part of any product (e.g. hardcopy, softcopy map such as a PDF) that uses the
 
- Imagery.server:  https://sftp.cnl.ca/thinclient/Login.aspx
- Username: Reticle
- Password: reticle_dec6

### Lets Encrypt

SSL Certified

```bash
./letsencrypt-auto \
  -d addxy.com \
  -d www.addxy.com \
  --agree-dev-preview \
  --server https://acme-v01.api.letsencrypt.org/directory \
  auth
```

### PacGeo Content

Images from [WeTransfer](https://pacgeo.wetransfer.com/).


### Server Deployments

Connect to the server by SSH, your Public key must be added to the server first for this to work.

```bash
$ ssh ubuntu@addxy.com
```

#### Gunicorn

Gunicorn is a pre-forking application server (it uses fork to create a bunch of
worker processes at startup) that uses [unix
signals](http://docs.gunicorn.org/en/latest/signals.html#master-process) to do
its thing.

##### Starting Gunicorn

```bash
> cd c2viewer
> gunicorn --pid run/gunicorn/pid -w 4 c2viewer:app &
[2015-11-25 21:22:37 +0000] [23977] [INFO] Starting gunicorn 19.3.0
[2015-11-25 21:22:37 +0000] [23977] [INFO] Listening at: http://127.0.0.1:8000 (23977)
[2015-11-25 21:22:37 +0000] [23977] [INFO] Using worker: sync
[2015-11-25 21:22:37 +0000] [23982] [INFO] Booting worker with pid: 23982
[2015-11-25 21:22:38 +0000] [23985] [INFO] Booting worker with pid: 23985
[2015-11-25 21:22:38 +0000] [23988] [INFO] Booting worker with pid: 23988
[2015-11-25 21:22:38 +0000] [23991] [INFO] Booting worker with pid: 23991
```
This creates a master process with process id 23977 and 4 worker processes.
Since Gunicorn is listening on a port > 1000 root privileges are not needed.

##### Stopping Gunicorn

Unix signals are used to stop the server when its running. Launching Gunicorn
with the --pid option means we don't need to go fishing to find the master
process pid. Without the --pid option we have to figure out the master process
ourselves with "ps aux" or something. Usually the lowest number process id is
the master process. Sending the TERM signal to it initiates a gracefull
shutdown.

```bash
> cat run/gunicorn/pid
23977
> kill -TERM 23977
```

##### Deploying new code

###### TLDR

```bash
git pull origin master && kill -HUP `cat run/gunicorn/pid`
```

##### WAT?

Gunicorn allows you to do what is known as a "zero downtime deploy" by
signalling the master process to launch a new set of workers serving the new
code.

Once new code is pulled, find the process id of the master process by looking
in the pid file. After that send the HUP signal.

```bash
> cd c2-viewer
> git pull origin master
... updating...
> cat run/gunicorn/pid
23977
> kill -HUP 23977
```

The HUP signal prompts Gunicorn to reload its config and launch new workers
that have loaded the new code.

Mapbox Login
------------

- Account: Matt@pacgeo.com
- Password: Mb3334Mapp!