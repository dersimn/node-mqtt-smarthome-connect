const MqttSmarthome = require("./index.js");
const log = require("yalm");
log.setLevel("debug");
const mqsh = new MqttSmarthome("mqtt://10.1.1.50", {logger: log});

mqsh.on("message", (topic, payload) => {
	log.debug("event message", topic, payload);
});

mqsh.connect();

mqsh.subscribe("test/set/0");

var data = {
	poweron: true,
	hsv: {
		hue: 1.0,
		sat: 1.0,
		bri: 1.0
	},
	ct: {
		ct: 1.0,
		bri: 1.0
	},
	animation: "alert",
	stripe: [
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

mqsh.publish("testlight1/status/light", data);
mqsh.publish("testlight2/status/light", data, 1);
mqsh.publish("testlight3/status/light", data, 99);
