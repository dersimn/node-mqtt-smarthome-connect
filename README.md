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
- [wildcardMatch] <code>array</code> - If subscription was example/+/foo/bar this array contains the "+" in topic string
- packet <code>Mqtt.packet</code>


## License

MIT © [Simon Christmann](https://github.com/dersimn), [Sebastian Raff](https://github.com/hobbyquaker) and Contributors

[mit-badge]: https://img.shields.io/badge/License-MIT-blue.svg?style=flat
[mit-url]: LICENSE
