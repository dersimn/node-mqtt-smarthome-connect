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

## Classes

<dl>
<dt><a href="#MqttSmarthome">MqttSmarthome</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#messageCallback">messageCallback</a> : <code>function</code></dt>
<dd></dd>
</dl>

<a name="MqttSmarthome"></a>

## MqttSmarthome
**Kind**: global class  

* [MqttSmarthome](#MqttSmarthome)
    * [new MqttSmarthome([mqttUrl], [options])](#new_MqttSmarthome_new)
    * [.sub](#MqttSmarthome+sub) : <code>MqttSmarthome.subscribe</code>
    * [.pub](#MqttSmarthome+pub) : <code>MqttSmarthome.publish</code>
    * [.connect()](#MqttSmarthome+connect)
    * [.end([force], [callback])](#MqttSmarthome+end)
    * [.reconnect()](#MqttSmarthome+reconnect)
    * [.subscribe(topic, [callback])](#MqttSmarthome+subscribe) ⇒ <code>idSubscription</code>
    * [.unregisterCallback(id)](#MqttSmarthome+unregisterCallback) ⇒ <code>number</code>
    * [.unsubscribe(topic, [callback])](#MqttSmarthome+unsubscribe)
    * [.publish(topic, payload, [options], [callback])](#MqttSmarthome+publish)
    * [.publishMulti(basetopic, data, [options], splitLevel)](#MqttSmarthome+publishMulti)
    * [.publishSet(topic, val, [options], [callback])](#MqttSmarthome+publishSet)
    * [.publishStatus(topic, val, [options], [callback])](#MqttSmarthome+publishStatus)
    * ["connect"](#MqttSmarthome+event_connect)
    * ["close"](#MqttSmarthome+event_close)
    * ["error"](#MqttSmarthome+event_error)
    * ["offline"](#MqttSmarthome+event_offline)
    * ["reconnect"](#MqttSmarthome+event_reconnect)
    * ["message" (topic, payload, packet,)](#MqttSmarthome+event_message)

<a name="new_MqttSmarthome_new"></a>

### new MqttSmarthome([mqttUrl], [options])
**Params**

- [mqttUrl] <code>string</code> <code> = &quot;mqtt://localhost&quot;</code>
- [options] <code>object</code> - see all available options in the [MQTT.js docs](https://github.com/mqttjs/MQTT.js#client)
    - [.logger] <code>object</code>
    - [.globalOptions] <code>object</code> - that'll overwrite options given in [publish(topic, payload, options, callback)](#MqttSmarthome+publish)
    - [.clientId] <code>string</code> <code> = &quot;mqttsmarthome-&lt;random&gt;&quot;</code>

<a name="MqttSmarthome+sub"></a>

### mqttSmarthome.sub : <code>MqttSmarthome.subscribe</code>
Just a convenience alias to [subscribe](#MqttSmarthome+subscribe)

**Kind**: instance property of [<code>MqttSmarthome</code>](#MqttSmarthome)  
<a name="MqttSmarthome+pub"></a>

### mqttSmarthome.pub : <code>MqttSmarthome.publish</code>
Just a convenience alias to [publish](#MqttSmarthome+publish)

**Kind**: instance property of [<code>MqttSmarthome</code>](#MqttSmarthome)  
<a name="MqttSmarthome+connect"></a>

### mqttSmarthome.connect()
**Kind**: instance method of [<code>MqttSmarthome</code>](#MqttSmarthome)  
<a name="MqttSmarthome+end"></a>

### mqttSmarthome.end([force], [callback])
Disconnect from the MQTT broker.

**Kind**: instance method of [<code>MqttSmarthome</code>](#MqttSmarthome)  
**Params**

- [force] <code>boolean</code> <code> = false</code> - passing it to true will close the client right away, without waiting for the in-flight messages to be acked.
- [callback] <code>function</code> - will be called when the client is closed.

<a name="MqttSmarthome+reconnect"></a>

### mqttSmarthome.reconnect()
Reconnect to the MQTT broker.

**Kind**: instance method of [<code>MqttSmarthome</code>](#MqttSmarthome)  
<a name="MqttSmarthome+subscribe"></a>

### mqttSmarthome.subscribe(topic, [callback]) ⇒ <code>idSubscription</code>
**Kind**: instance method of [<code>MqttSmarthome</code>](#MqttSmarthome)  
**Returns**: <code>idSubscription</code> - id  
**Params**

- topic <code>string</code>
- [callback] [<code>messageCallback</code>](#messageCallback) <code> = </code>

<a name="MqttSmarthome+unregisterCallback"></a>

### mqttSmarthome.unregisterCallback(id) ⇒ <code>number</code>
Unregister a callback. If no registered callback on the corresponding topic is left a MQTT unsubscribe will be
done.

**Kind**: instance method of [<code>MqttSmarthome</code>](#MqttSmarthome)  
**Returns**: <code>number</code> - remaining number of subscription on that topic  
**Params**

- id <code>idSubscription</code> - an id that was returned by the [subscribe()](#MqttSmarthome+subscribe) method.

<a name="MqttSmarthome+unsubscribe"></a>

### mqttSmarthome.unsubscribe(topic, [callback])
Unsubscribe a whole topic with all its callbacks.

**Kind**: instance method of [<code>MqttSmarthome</code>](#MqttSmarthome)  
**Params**

- topic <code>string</code>
- [callback] <code>function</code>

<a name="MqttSmarthome+publish"></a>

### mqttSmarthome.publish(topic, payload, [options], [callback])
Publish a MQTT message. Payloads that are neither of type `string` nor an instance of `Buffer` will be JSON
stringified.

**Kind**: instance method of [<code>MqttSmarthome</code>](#MqttSmarthome)  
**Params**

- topic <code>string</code>
- payload <code>\*</code>
- [options] <code>object</code>
    - [.qos] <code>number</code> <code> = 0</code> - QoS level
    - [.retain] <code>boolean</code> <code> = false</code> - Retain Flag
    - [.dup] <code>boolean</code> <code> = false</code> - Mark as duplicate flag
- [callback] <code>function</code> - Fired when the QoS handling completes, or at the next tick if QoS 0. An error occurs if client is disconnecting.

<a name="MqttSmarthome+publishMulti"></a>

### mqttSmarthome.publishMulti(basetopic, data, [options], splitLevel)
Publish multiple messages at once. Every property value of the object data is published as a distinct message.
The basetopic is appended by the properties name.

**Kind**: instance method of [<code>MqttSmarthome</code>](#MqttSmarthome)  
**Params**

- basetopic <code>string</code>
- data <code>object</code>
- [options] <code>object</code> - see [publish](#MqttSmarthome+publish)
- splitLevel <code>number</code> <code> = 1</code> - until which the data object will be split into topics

**Example**  
```js
publishMulti('sun', {azimuth: 5, altitude: 0}); // publishes 2 topics: sun/azimuth:5; sun/altitude:0
```
**Example**  
```js
publishMulti('light', {hsv: {hue: 255, bri: 100; sat: 50}}, 1); // publishes 1 topic: light/hsv:{hue: 255, bri: 100; sat: 50}
```
**Example**  
```js
publishMulti('light', {hsv: {hue: 255, bri: 100; sat: 50}}, 2); // publishes 3 topics: light/hsv/hue:255; light/hsv/bri:100; light/hsv/sat: 50
```
<a name="MqttSmarthome+publishSet"></a>

### mqttSmarthome.publishSet(topic, val, [options], [callback])
Publish a value on a MQTT-Smarthome +/set/# topi.

**Kind**: instance method of [<code>MqttSmarthome</code>](#MqttSmarthome)  
**Params**

- topic <code>string</code>
- val <code>\*</code>
- [options] <code>object</code>
- [callback] <code>function</code>

<a name="MqttSmarthome+publishStatus"></a>

### mqttSmarthome.publishStatus(topic, val, [options], [callback])
Publish a value on a MQTT-SMart +/status/# topic

**Kind**: instance method of [<code>MqttSmarthome</code>](#MqttSmarthome)  
**Params**

- topic <code>string</code>
- val <code>\*</code>
- [options] <code>object</code>
- [callback] <code>function</code>

<a name="MqttSmarthome+event_connect"></a>

### "connect"
**Kind**: event emitted by [<code>MqttSmarthome</code>](#MqttSmarthome)  
<a name="MqttSmarthome+event_close"></a>

### "close"
**Kind**: event emitted by [<code>MqttSmarthome</code>](#MqttSmarthome)  
<a name="MqttSmarthome+event_error"></a>

### "error"
**Kind**: event emitted by [<code>MqttSmarthome</code>](#MqttSmarthome)  
<a name="MqttSmarthome+event_offline"></a>

### "offline"
**Kind**: event emitted by [<code>MqttSmarthome</code>](#MqttSmarthome)  
<a name="MqttSmarthome+event_reconnect"></a>

### "reconnect"
**Kind**: event emitted by [<code>MqttSmarthome</code>](#MqttSmarthome)  
<a name="MqttSmarthome+event_message"></a>

### "message" (topic, payload, packet,)
**Kind**: event emitted by [<code>MqttSmarthome</code>](#MqttSmarthome)  
**Params**

- topic <code>string</code>
- payload <code>string</code>
- packet, <code>Mqtt.packet</code> - see https://github.com/mqttjs/mqtt-packet#publish

<a name="messageCallback"></a>

## messageCallback : <code>function</code>
**Kind**: global typedef  
**Params**

- topic <code>string</code>
- payload <code>string</code> | <code>number</code> | <code>boolean</code> | <code>object</code>
- packet <code>Mqtt.packet</code>


## License

MIT © Simon Christmann and Contributors

[mit-badge]: https://img.shields.io/badge/License-MIT-blue.svg?style=flat
[mit-url]: LICENSE
