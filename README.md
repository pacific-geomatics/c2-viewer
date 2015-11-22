C&#178; Viewer
=============

Pacgeo's Command &amp; Control Viewer.

Web accessible browser map will be able to run standalone laptop or sever behind CNL firewall

1st rule on this project is KISS! (Keep It Simple Stupid)

Edit from john.

## Milestones

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
$ ./letsencrypt-auto \
  -d addxy.com 
  -d www.addxy.com 
  -d tile.addxy.com 
  --agree-dev-preview 
  --server https://acme-v01.api.letsencrypt.org/directory 
  auth
```
