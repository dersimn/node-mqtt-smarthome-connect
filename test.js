const MqttSmarthome = require("./index.js");
const log = require("yalm");
log.setLevel("debug");
const mqsh = new MqttSmarthome("mqtt://10.1.1.50", {logger: log});

mqsh.on("message", (topic, payload) => {
	log.debug("event message", topic, payload);
});

mqsh.connect();

mqsh.subscribe("test/set/0");
mqsh.subscribe("test/set/1", (topic, payload) => {
	log.debug("test/set/1", "callback", topic, payload);
});
mqsh.subscribe("test/set/2/#", (topic, payload) => {
	log.debug("test/set/2/#", "callback", topic, payload);
});
mqsh.subscribe("test/+/3/#", (topic, payload) => {
	log.debug("test/+/3/#", "callback", topic, payload);
});

var data = {
	boolean: true,
	number: 1.515724844534868,
	string: "alert",
	object: {
		hue: 1.0,
		sat: 1.0,
		bri: 1.0
	},
	array: [ 1,2,3,4,5 ],
	array_of_objects: [
		{
			hsv: {
				hue: 1.0,
				sat: 0.5,
				bri: 1.0
			}
		},
		{ 
			hsv: {
				hue: 0.5,
				sat: 1.0,
				bri: 1.0
			}
		}
	]
};

mqsh.publish("testlight/status/light1", data);
mqsh.publish("testlight/status/light2", data, 1);
mqsh.publish("testlight/status/light3", data, 99);

mqsh.publish("test/set/0", "foo");
mqsh.publish("test/set/1", "foo");
mqsh.publish("test/set/1/sub", "foo");
mqsh.publish("test/set/2", "foo");
mqsh.publish("test/set/2/sub", "foo");
mqsh.publish("test/set/2/sub/sub", "foo");
mqsh.publish("test/set/3", "foo");
mqsh.publish("test/status/3", "foo");
mqsh.publish("test/set/3/sub", "foo");
mqsh.publish("test/set/3/sub/sub", "foo");
