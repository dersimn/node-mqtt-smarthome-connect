/* eslint-disable no-undef, no-unused-vars, prefer-arrow-callback, curly */
/* global it, describe */

const path = require('path');
const should = require('should');
const Mqtt = require('mqtt');

const mqttUrl = 'mqtt://localhost';

let mqtt;

const MqttSmarthome = require(path.join(__dirname, '..', 'index.js'));

let mqsh;

function debug() {
    console.log.apply(this, arguments);
}

function start() {
    it('create an instance without throwing an error', function () {
        mqsh = new MqttSmarthome(mqttUrl);
    });
    it('MQTT.js connect to mqtt', function (done) {
        this.timeout(5000);
        mqtt = Mqtt.connect(mqttUrl);
        mqtt.on('connect', function () {
            done();
        });
    });
    it('mqsh connect to mqtt', function (done) {
        this.timeout(5000);
        mqsh.on('connected', function () {
            done();
        });
        mqsh.connect();
    });
}

function end() {
    it('mqsh disconnect from mqtt', function (done) {
        this.timeout(5000);
        mqsh.on('disconnected', function () {
            done();
        });
        mqsh.end();
    });
    it('MQTT.js disconnect from mqtt', function (done) {
        this.timeout(5000);
        mqtt.on('close', function () {
            done();
        });
        mqtt.end();
    });
}

function publishTest(testTopic, testPayloadPub, testPayloadSub) {
    it('publish ' + testPayloadSub + ' on ' + testTopic, function (done) {
        mqtt.on('message', (topic, payload, packet) => {
            // Debug('message', topic, payload.toString());
            topic.should.equal(testTopic);
            payload.toString().should.equal(testPayloadSub);
            mqtt.removeAllListeners();
            done();
        });
        mqtt.subscribe(testTopic, function (err) {
            if (err) throw err;
            mqsh.publish(testTopic, testPayloadPub);
        });
    });
}

describe('mqtt connection', function () {
    start();
});

describe('mqtt publish', function () {
    let payload;

    publishTest('test/1', 1, '1');
    publishTest('test/1', '2', '2');
    payload = [3, 4, false, 'string', {bla: 'foo'}];
    publishTest('test/1', payload, JSON.stringify(payload));
    payload = {bla: 'foo', arr: [1, 2, false]};
    publishTest('test/1', payload, JSON.stringify(payload));
    payload = true;
    publishTest('test/1', payload, JSON.stringify(payload));
    payload = false;
    publishTest('test/1', payload, JSON.stringify(payload));
    payload = 3.14159;
    publishTest('test/1', payload, JSON.stringify(payload));
});

describe('end mqtt connection', function () {
    end();
});
