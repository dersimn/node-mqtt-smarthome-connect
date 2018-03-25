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

<a name="MqttSmarthome"></a>

## MqttSmarthome
**Kind**: global class  
**See**: https://github.com/mqttjs/MQTT.js#client for all available options  

* [MqttSmarthome](#MqttSmarthome)
    * [new MqttSmarthome([mqttUrl], [options])](#new_MqttSmarthome_new)
    * [.connect()](#MqttSmarthome+connect)
    * [.end([force], [callback])](#MqttSmarthome+end)
    * [.subscribe(topic, [callback])](#MqttSmarthome+subscribe) ⇒ <code>idSubscription</code>
    * [.unsubscribe(id)](#MqttSmarthome+unsubscribe) ⇒ <code>number</code>
    * [.publish(topic, payload, [options], [callback])](#MqttSmarthome+publish)
    * [.publishMulti(basetopic, data, [options])](#MqttSmarthome+publishMulti)

<a name="new_MqttSmarthome_new"></a>

### new MqttSmarthome([mqttUrl], [options])

| Param | Type | Default |
| --- | --- | --- |
| [mqttUrl] | <code>string</code> | <code>&quot;mqtt://localhost&quot;</code> | 
| [options] | <code>object</code> |  | 
| [options.logger] | <code>object</code> |  | 
| [options.clientId] | <code>string</code> | <code>&quot;mqttsmarthome-&lt;random&gt;&quot;</code> | 

<a name="MqttSmarthome+connect"></a>

### mqttSmarthome.connect()
**Kind**: instance method of [<code>MqttSmarthome</code>](#MqttSmarthome)  
<a name="MqttSmarthome+end"></a>

### mqttSmarthome.end([force], [callback])
**Kind**: instance method of [<code>MqttSmarthome</code>](#MqttSmarthome)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [force] | <code>boolean</code> | <code>false</code> | passing it to true will close the client right away, without waiting for the in-flight messages to be acked. |
| [callback] | <code>function</code> |  | will be called when the client is closed. |

<a name="MqttSmarthome+subscribe"></a>

### mqttSmarthome.subscribe(topic, [callback]) ⇒ <code>idSubscription</code>
**Kind**: instance method of [<code>MqttSmarthome</code>](#MqttSmarthome)  
**Returns**: <code>idSubscription</code> - id  

| Param | Type | Default |
| --- | --- | --- |
| topic | <code>string</code> |  | 
| [callback] | <code>function</code> | <code></code> | 

<a name="MqttSmarthome+unsubscribe"></a>

### mqttSmarthome.unsubscribe(id) ⇒ <code>number</code>
**Kind**: instance method of [<code>MqttSmarthome</code>](#MqttSmarthome)  
**Returns**: <code>number</code> - remaining number of subscription on that topic  

| Param | Type |
| --- | --- |
| id | <code>idSubscription</code> | 

<a name="MqttSmarthome+publish"></a>

### mqttSmarthome.publish(topic, payload, [options], [callback])
**Kind**: instance method of [<code>MqttSmarthome</code>](#MqttSmarthome)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| topic | <code>string</code> |  |  |
| payload | <code>\*</code> |  |  |
| [options] | <code>object</code> |  |  |
| [options.qos] | <code>number</code> | <code>0</code> | QoS level |
| [options.retain] | <code>boolean</code> | <code>false</code> | Retain Flag |
| [options.dup] | <code>boolean</code> | <code>false</code> | Mark as duplicate flag |
| [callback] | <code>function</code> |  | Fired when the QoS handling completes, or at the next tick if QoS 0. An error occurs if client is disconnecting. |

<a name="MqttSmarthome+publishMulti"></a>

### mqttSmarthome.publishMulti(basetopic, data, [options])
Publish multiple methods at once.

**Kind**: instance method of [<code>MqttSmarthome</code>](#MqttSmarthome)  

| Param | Type |
| --- | --- |
| basetopic | <code>string</code> | 
| data | <code>object</code> | 
| [options] | <code>object</code> | 


## License

MIT © Simon Christmann and Contributors

[mit-badge]: https://img.shields.io/badge/License-MIT-blue.svg?style=flat
[mit-url]: LICENSE
