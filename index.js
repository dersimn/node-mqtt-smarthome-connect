const EventEmitter = require("events");
const Mqtt = require("mqtt");

class MqttSmarthome extends EventEmitter {
    constructor(mqttUrl, options = {}) {
        super();

        this.mqttUrl = mqttUrl || "mqtt://localhost";
        this.clientId = (options.name || "mqttsmarthome") + Math.random().toString(16).substr(2, 8);

        if (options.logger == null) {
            this.log = require("yalm");
            this.log.setLevel( "silent" );
        } else {
            this.log = options.logger;
        }
    }

    connect() {
        this.mqtt = Mqtt.connect( this.mqttUrl, {
            clientId: this.clientId
        });

        this.mqtt.on("connect", () => {
            this.emit("connected");
            this.log.debug("mqtt conencted", this.mqttUrl,this.clientId);
        });

        this.mqtt.on("close", () => {
            this.emit("disconnected");
            this.log.debug("mqtt disconnected");
        });

        this.mqtt.on("error", err => {
            this.log.error("mqtt", err.toString());
        });

        this.mqtt.on("offline", () => {
            this.log.error("mqtt offline");
        });

        this.mqtt.on("reconnect", () => {
            this.log.info("mqtt reconnect");
        });

        this.mqtt.on("message", (topic, payload) => {
            payload = payload.toString();
            this.log.debug('mqtt <', topic, payload);

            // Process payload
            if (payload.indexOf('{') !== -1) {
                try {
                    payload = JSON.parse(payload);
                } catch (err) {
                    log.error(err.toString());
                }
            } else if (payload === "false") {
                payload = false;
            } else if (payload === "true") {
                payload = true;
            } else if (!isNaN(payload)) {
                payload = parseFloat(payload);
            }

            this.emit("message", topic, payload);
        });
    }

    subscribe(topic) {
        this.mqtt.subscribe(topic);

        //TODO: check if we need to resubscribe after reconnect
    }

    publish(basetopic, data, level = 0) {
        if ( level == 0 ) {
            this.log.debug('mqtt >', basetopic, data);
            this.mqtt.publish(basetopic, JSON.stringify(data));
        } else {
            for ( var datapoint in data ) {
                if ( typeof data[datapoint] === "object" ) {
                    this.publish( basetopic + "/" + datapoint, data[datapoint], level-1 );
                } else {
                    this.publish( basetopic + "/" + datapoint, data[datapoint], 0 );
                }
            }
        }
    }
}

module.exports = MqttSmarthome;
