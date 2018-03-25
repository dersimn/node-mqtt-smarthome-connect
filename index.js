const EventEmitter = require('events');
const Mqtt = require('mqtt');
const mqttWildcard = require('mqtt-wildcard');
const shortid = require('shortid');

class MqttSmarthome extends EventEmitter {
    /**
     *
     * @param {string} [mqttUrl=mqtt://localhost]
     * @param {object} [options]
     * @see https://github.com/mqttjs/MQTT.js#client for all available options
     * @param {object} [options.logger]
     * @param {string} [options.clientId=mqttsmarthome-<random>]
     */
    constructor(mqttUrl = 'mqtt://localhost', options = {}) {
        super();
        this.messageCallbacks = {};
        this.callbackIds = {};

        this.log = options.logger || {
            debug: () => {},
            info: () => {},
            warn: () => {},
            error: () => {}
        };

        delete options.logger;

        this.mqttUrl = mqttUrl;
        this.mqttOptions = Object.assign({
            clientId: 'mqttsmarthome-' + shortid.generate()
        }, options);

        console.log(this.mqttOptions);
    }

    /**
     *
     */
    connect() {
        this.mqtt = Mqtt.connect(this.mqttUrl, this.mqttOptions);

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
            payload = this._parsePayload(payload);
            this.log.debug('mqtt <', topic, payload);
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
     * @param {boolean} [force=false] passing it to true will close the client right away, without waiting for the in-flight messages to be acked.
     * @param {function} [callback] will be called when the client is closed.
     */
    end(force, callback) {
        this.mqtt.end(force, callback);
    }

    _parsePayload(payload) {
        payload = payload.toString();

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
        return payload;
    }

    /**
     *
     * @param {string} topic
     * @param {function} [callback=null]
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
     * @returns {number} remaining number of subscription on that topic
     */
    unsubscribe(id) {
        const topic = this.callbackIds[id];
        if (topic) {
            delete this.messageCallbacks[topic][id];
            const length = Object.keys(this.messageCallbacks[topic]).length;
            if (length === 0) {
                this.mqtt.unsubscribe(topic);
                delete this.messageCallbacks[topic];
            }
            return length;
        }
        return 0;
    }

    /**
     *
     * @param {string} topic
     * @param {*} payload
     * @param {object} [options]
     * @param {number} [options.qos=0] QoS level
     * @param {boolean} [options.retain=false] Retain Flag
     * @param {boolean} [options.dup=false] Mark as duplicate flag
     * @param {function} [callback] Fired when the QoS handling completes, or at the next tick if QoS 0. An error occurs if client is disconnecting.
     */
    publish(topic, payload, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = {};
        }
        const type = typeof payload;
        if (type === 'object' && !(payload instanceof Buffer)) {
            payload = JSON.stringify(payload);
        } else if (type !== 'object') {
            payload = String(payload);
        }
        this.log.debug('mqtt >', topic, payload);
        this.mqtt.publish(topic, payload, options, callback);
    }

    /**
     * Publish multiple methods at once.
     * @param {string} basetopic
     * @param {object} data
     * @param {object} [options]
     */
    publishMulti(basetopic, data, options) {
        if (typeof data !== 'object') {
            return false;
        }
        Object.keys(data).forEach(topic => {
            this.publish(basetopic + '/' + topic, data[topic], options);
        });
    }
}

module.exports = MqttSmarthome;
