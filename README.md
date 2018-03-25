# node-mqtt-smarthome

[![mqtt-smarthome](https://img.shields.io/badge/mqtt-smarthome-blue.svg)](https://github.com/mqtt-smarthome/mqtt-smarthome)
[![NPM version](https://badge.fury.io/js/mqtt-smarthome.svg)](http://badge.fury.io/js/mqtt-smarthome)
[![Dependency Status](https://img.shields.io/gemnasium/dersimn/mqtt-smarthome.svg?maxAge=2592000)](https://gemnasium.com/github.com/hobbyquaker/mqtt-smarthome)
[![Build Status](https://travis-ci.org/dersimn/node-mqtt-smarthome.svg?branch=master)](https://travis-ci.org/dersimn/node-mqtt-smarthome)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![License][mit-badge]][mit-url]

> Node module for MQTT-Smarthome

## Usage

`$ npm install mqtt-smarthome --save`

## API

## Classes

<dl>
<dt><a href="#MqttSmarthome">MqttSmarthome</a></dt>
<dd></dd>
<dt><a href="#MqttSmarthome">MqttSmarthome</a></dt>
<dd></dd>
</dl>

<a name="MqttSmarthome"></a>

## MqttSmarthome
**Kind**: global class  

* [MqttSmarthome](#MqttSmarthome)
    * [new MqttSmarthome(mqttUrl, options)](#new_MqttSmarthome_new)
    * [.subscribe(topic, callback)](#MqttSmarthome+subscribe) ⇒ <code>idSubscription</code>
    * [.unsubscribe(id)](#MqttSmarthome+unsubscribe) ⇒ <code>boolean</code>

<a name="new_MqttSmarthome_new"></a>

### new MqttSmarthome(mqttUrl, options)

| Param |
| --- |
| mqttUrl | 
| options | 

<a name="MqttSmarthome+subscribe"></a>

### mqttSmarthome.subscribe(topic, callback) ⇒ <code>idSubscription</code>
**Kind**: instance method of [<code>MqttSmarthome</code>](#MqttSmarthome)  
**Returns**: <code>idSubscription</code> - id  

| Param | Type | Default |
| --- | --- | --- |
| topic | <code>string</code> |  | 
| callback | <code>function</code> | <code></code> | 

<a name="MqttSmarthome+unsubscribe"></a>

### mqttSmarthome.unsubscribe(id) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>MqttSmarthome</code>](#MqttSmarthome)  
**Returns**: <code>boolean</code> - last - true if it was the last subscription on that topic  

| Param | Type |
| --- | --- |
| id | <code>idSubscription</code> | 

<a name="MqttSmarthome"></a>

## MqttSmarthome
**Kind**: global class  

* [MqttSmarthome](#MqttSmarthome)
    * [new MqttSmarthome(mqttUrl, options)](#new_MqttSmarthome_new)
    * [.subscribe(topic, callback)](#MqttSmarthome+subscribe) ⇒ <code>idSubscription</code>
    * [.unsubscribe(id)](#MqttSmarthome+unsubscribe) ⇒ <code>boolean</code>

<a name="new_MqttSmarthome_new"></a>

### new MqttSmarthome(mqttUrl, options)

| Param |
| --- |
| mqttUrl | 
| options | 

<a name="MqttSmarthome+subscribe"></a>

### mqttSmarthome.subscribe(topic, callback) ⇒ <code>idSubscription</code>
**Kind**: instance method of [<code>MqttSmarthome</code>](#MqttSmarthome)  
**Returns**: <code>idSubscription</code> - id  

| Param | Type | Default |
| --- | --- | --- |
| topic | <code>string</code> |  | 
| callback | <code>function</code> | <code></code> | 

<a name="MqttSmarthome+unsubscribe"></a>

### mqttSmarthome.unsubscribe(id) ⇒ <code>boolean</code>
**Kind**: instance method of [<code>MqttSmarthome</code>](#MqttSmarthome)  
**Returns**: <code>boolean</code> - last - true if it was the last subscription on that topic  

| Param | Type |
| --- | --- |
| id | <code>idSubscription</code> | 


## License

MIT © Simon Christmann and Contributors

[mit-badge]: https://img.shields.io/badge/License-MIT-blue.svg?style=flat
[mit-url]: LICENSE
