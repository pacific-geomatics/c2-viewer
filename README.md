C&#178; Viewer
=============

Pacgeo's Command &amp; Control Viewer.

Web accessible browser map will be able to run standalone laptop or sever behind CNL firewall

# 1 rule on this project is KISS! (Keep It Simple Stupid)

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

### Web Mapping Applications

- [Leaflet](http://leafletjs.com/) + [Mapbox.js](https://github.com/mapbox/mapbox.js)
- HTML5 & CSS3
- [Mabox WebGL](https://github.com/mapbox/mapbox-gl-js)
