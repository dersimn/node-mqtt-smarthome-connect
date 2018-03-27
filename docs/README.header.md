# node-mqtt-smarthome

[![mqtt-smarthome](https://img.shields.io/badge/mqtt-smarthome-blue.svg)](https://github.com/mqtt-smarthome/mqtt-smarthome)
[![NPM version](https://badge.fury.io/js/mqtt-smarthome-connect.svg)](http://badge.fury.io/js/mqtt-smarthome-connect)
[![Dependency Status](https://img.shields.io/gemnasium/dersimn/mqtt-smarthome-connect.svg?maxAge=2592000)](https://gemnasium.com/github.com/dersimn/mqtt-smarthome)
[![Build Status](https://travis-ci.org/dersimn/node-mqtt-smarthome.svg?branch=master)](https://travis-ci.org/dersimn/node-mqtt-smarthome)
[![Coverage Status](https://coveralls.io/repos/github/dersimn/node-mqtt-smarthome/badge.svg?branch=master)](https://coveralls.io/github/dersimn/node-mqtt-smarthome?branch=master)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![License][mit-badge]][mit-url]

> Node module for MQTT-Smarthome

This Module is a wrapper around [MQTT.js](https://github.com/mqtt.js/mqtt.js) adding extra functionality to ease the 
handling of topics and payloads following the 
[mqtt-smarthome architecture proposal](https://github.com/mqtt-smarthome/mqtt-smarthome). 


## Usage

`$ npm install mqtt-smarthome-connect --save`

```javascript
const mqsh = require('mqtt-smarthome-connect');
mqsh.connect();
mqsh.subscribe('test/1', (topic, val) => {
    console.log(val); // foo
});
mqsh.publish('test/1', 'foo');
```


## API

