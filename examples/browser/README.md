1) Start Mosquitto with websocket support. For e.g. with Docker and the provided `.conf` file:

```
docker run -d --rm -p 1883:1883 -p 9001:9001 -v "$(pwd)/mosquitto.conf":/mosquitto/config/mosquitto.conf:ro eclipse-mosquitto
```

2) Install dependencies and build with Browserify.

```
npm install
browserify -r mqtt-smarthome-connect -o bundle.js
```

3) Then start a small webserver providing our example files:

```
docker run -d --rm -p 80:80 -v "$(pwd)":/usr/share/nginx/html:ro nginx
```

4) Go to <http://localhost> and open a JavaScript console (for e.g. ⌥⌘C in Safari).


For further examples about the usage of Browserify and Grunt, see [this source](https://github.com/dersimn/sandbox-browserify).