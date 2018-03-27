const path = require('path');
const Mqtt = require('mqtt');
const MqttSmarthome = require(path.join(__dirname, '..', 'index.js'));
const should = require('should');

describe('mqtt connection', function () {
    let mqsh;
    it('should instantiate without throwing an error', function () {
        mqsh = new MqttSmarthome();
    });
    it('should connect to mqtt', function (done) {
        this.timeout(5000);
        mqsh.on('connected', function () {
            done();
        });
        mqsh.connect();
    });
    it('should disconnect from mqtt', function (done) {
        this.timeout(5000);
        mqsh.on('disconnected', function () {
            done();
        });
        mqsh.end();
    });
});