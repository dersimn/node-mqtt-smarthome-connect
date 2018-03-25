const EventEmitter = require('events');
const Mqtt = require('mqtt');
const mqttWildcard = require('mqtt-wildcard');
const shortid = require('shortid');

class MqttSmarthome extends EventEmitter {
    /**
     *
     * @param mqttUrl
     * @param options
     */
    constructor(mqttUrl, options = {}) {
        super();
        this.messageCallbacks = {};
        this.callbackIds = {};

        this.mqttUrl = mqttUrl || 'mqtt://localhost';
        this.clientId = (options.name || 'mqttsmarthome') + Math.random().toString(16).substr(2, 8);

        if (options.logger == null) { // eslint-disable-line no-eq-null
            this.log = require('yalm');
            this.log.setLevel('silent');
        } else {
            this.log = options.logger;
        }
    }

    connect() {
        this.mqtt = Mqtt.connect(this.mqttUrl, {
            clientId: this.clientId
        });

        this.mqtt.on('connect', () => {
            this.emit('connected');
            this.log.debug('mqtt conencted', this.mqttUrl, this.clientId);
        });

        this.mqtt.on('close', () => {
            this.emit('disconnected');
            this.log.debug('mqtt disconnected');
        });

        this.mqtt.on('error', err => {
            this.log.error('mqtt', err.toString());
        });

        this.mqtt.on('offline', () => {
            this.log.error('mqtt offline');
        });

        this.mqtt.on('reconnect', () => {
            this.log.info('mqtt reconnect');
        });

        this.mqtt.on('message', (topic, payload, packet) => {
            payload = payload.toString();
            this.log.debug('mqtt <', topic, payload);

            // Process payload
            if (payload.indexOf('{') !== -1) {
                try {
                    payload = JSON.parse(payload);
                } catch (err) {
                    this.log.error(err.toString());
                }
            } else if (payload === 'false') {
                payload = false;
            } else if (payload === 'true') {
                payload = true;
            } else if (!isNaN(payload)) {
                payload = parseFloat(payload);
            }

            this.emit('message', topic, payload, packet);

            Object.keys(this.messageCallbacks).forEach(callbackTopic => {
                if (mqttWildcard(topic, callbackTopic) && this.messageCallbacks[callbackTopic]) {
                    Object.keys(this.messageCallbacks[callbackTopic]).forEach(id => {
                        if (typeof this.messageCallbacks[callbackTopic][id] === 'function') {
                            this.messageCallbacks[callbackTopic][id](topic, payload, packet);
                        }
                    });
                }
            });

        });
    }

    /**
     *
     * @param {string} topic
     * @param {function} callback
     * @returns {idSubscription} id
     */
    subscribe(topic, callback = null) {
        const id = shortid.generate();
        this.callbackIds[id] = topic;
        if (!this.messageCallbacks[topic]) {
           this.messageCallbacks[topic] = {};
        }
        this.messageCallbacks[topic][id] = callback;
        this.mqtt.subscribe(topic);
        return id;
    }

    /**
     *
     * @param {idSubscription} id
     * @returns {boolean} last - true if it was the last subscription on that topic
     */
    unsubscribe(id) {
        const topic = this.callbackIds[id];
        delete this.messageCallbacks[topic][id];
        if (Object.keys(this.messageCallbacks[topic]).length === 0) {
            this.mqtt.unsubscribe(topic);
            delete this.messageCallbacks[topic];
            return 0;
        }
        return Object.keys(this.messageCallbacks[topic]).length;
    }

    publish(basetopic, data, level = 0) {
        if (level == 0) {
            this.log.debug('mqtt >', basetopic, data);
            if (typeof data === 'object') {
                this.mqtt.publish(basetopic, JSON.stringify(data));
            } else {
                this.mqtt.publish(basetopic, String(data));
            }
        } else {
            for (const datapoint in data) {
                if (typeof data[datapoint] === 'object') {
                    this.publish(basetopic + '/' + datapoint, data[datapoint], level - 1);
                } else {
                    this.publish(basetopic + '/' + datapoint, data[datapoint], 0);
                }
            }
        }
    }
}

module.exports = MqttSmarthome;
