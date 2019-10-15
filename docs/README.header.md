# node-mqtt-smarthome-connect

[![mqtt-smarthome](https://img.shields.io/badge/mqtt-smarthome-blue.svg)](https://github.com/mqtt-smarthome/mqtt-smarthome)
[![NPM version](https://badge.fury.io/js/mqtt-smarthome-connect.svg)](http://badge.fury.io/js/mqtt-smarthome-connect)
[![Build Status](https://travis-ci.org/dersimn/node-mqtt-smarthome-connect.svg?branch=master)](https://travis-ci.org/dersimn/node-mqtt-smarthome-connect)
[![Coverage Status](https://coveralls.io/repos/github/dersimn/node-mqtt-smarthome-connect/badge.svg?branch=master)](https://coveralls.io/github/dersimn/node-mqtt-smarthome-connect?branch=master)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![License][mit-badge]][mit-url]

> Node module for MQTT-Smarthome

This Module is a wrapper around [MQTT.js](https://github.com/mqtt.js/mqtt.js) adding extra functionality to ease the 
handling of topics and payloads following the 
[mqtt-smarthome architecture proposal](https://github.com/mqtt-smarthome/mqtt-smarthome). 


## Usage

`$ npm install mqtt-smarthome-connect --save`

```javascript
const mqsh = new MqttSmarthome('mqtt://localhost', {
    will: {topic: 'foo/maintenance/online', payload: 'false', retain: true}
});

mqsh.on('connect', () => {
    mqsh.publish('foo/maintenance/online', true, {retain: true});
});
mqsh.connect();

mqsh.subscribe('foo/+/bar', (topic, message, wildcardMatch, rawPacket) => {
    console.log('received', wildcardMatch[0], message)
});

mqsh.publish('foo/boolean/bar', true);
mqsh.publish('foo/intNumber/bar', 42);
mqsh.publish('foo/floatNumber/bar', 3.1415);
mqsh.publish('foo/string/bar', 'A string.');
mqsh.publish('foo/array/bar', [1, 2, 3]);
mqsh.publish('foo/object/bar', {val: 42, ts: Date.now()});
```

See [examples](/examples) for more.

## API

