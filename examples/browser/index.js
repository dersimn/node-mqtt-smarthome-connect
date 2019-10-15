const MqttSmarthome = require('mqtt-smarthome-connect');

const mqsh = new MqttSmarthome('ws://localhost:9001', {
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
