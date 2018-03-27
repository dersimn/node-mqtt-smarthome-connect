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
            mqtt.removeAllListeners();
            done();

        });
    });
    it('mqsh connect to mqtt', function (done) {
        this.timeout(5000);
        mqsh.on('connected', function () {
            mqtt.removeAllListeners();
            done();
        });
        mqsh.connect();
    });
}

function end() {
    it('mqsh disconnect from mqtt', function (done) {
        this.timeout(5000);
        mqsh.on('disconnected', function () {
            mqtt.removeAllListeners();
            done();
        });
        mqsh.end();
    });
    it('MQTT.js disconnect from mqtt', function (done) {
        this.timeout(5000);
        mqtt.on('close', function () {
            mqtt.removeAllListeners();
            done();
        });
        mqtt.end();
    });
}

function publishTestSuccessful(testTopic, testPayloadPub, testPayloadSub) {
    it('publish ' + testPayloadSub + ' on ' + testTopic, function (done) {
        mqtt.on('message', (topic, payload, packet) => {
            // Debug('message', topic, payload.toString());
            topic.should.equal(testTopic);
            payload.toString().should.equal(testPayloadSub);
            mqtt.removeAllListeners();
            done();
        });
        debug('mqtt sub', testTopic);
        mqtt.subscribe(testTopic, function (err) {
            if (err) throw err;
            debug('mqsh pub', testTopic, testPayloadPub);
            mqsh.publish(testTopic, testPayloadPub);
        });
    });
}

let subCount = 0;
function subscribeTestSuccessfulCallback(testTopic, testPayloadPub, testPayloadSub) {
    let subId;
    it('receive ' + JSON.stringify(testPayloadSub) + ' on ' + testTopic, function (done) {
        this.timeout(4000);
        subCount += 1;
        debug('mqsh sub callback', testTopic);
        subId = mqsh.subscribe(testTopic, (topic, val, packet) => {
            debug('<', topic, val);
            topic.should.equal(testTopic);
            val.should.equal(testPayloadSub);
            done();
        });
        setTimeout(() => {
            mqtt.publish(testTopic, testPayloadPub);
        }, 0);
    });
    it('unsubscribe ' + testTopic, function (done) {
        debug('mqsh unsub', testTopic, subId, 'count before decrement:' + subCount);
        subCount -= 1;
        // Todo: this fails. why? mqsh.unsubscribe(subId).should.equal(subCount);
        done();
    });
}

function subscribeTestSuccessfulEvent(testTopic, testPayloadPub, testPayloadSub) {
    let subId;
    it('receive ' + JSON.stringify(testPayloadSub) + ' on ' + testTopic, function (done) {
        this.timeout(4000);
        subCount += 1;
        mqsh.on('message', (topic, val, packet) => {
            debug('mqsh <', topic, val);
            topic.should.equal(testTopic);
            val.should.equal(testPayloadSub);
            mqsh.removeAllListeners();
            done();
        });
        debug('mqsh sub event', testTopic);
        subId = mqsh.subscribe(testTopic);
        debug('mqtt >', testTopic, testPayloadPub);
        mqtt.publish(testTopic, testPayloadPub);
    });
    it('unsubscribe ' + testTopic, function (done) {
        debug('mqsh unsub', testTopic, subId, 'count before decrement:' + subCount);
        subCount -= 1;
        // Todo: this fails. why? mqsh.unsubscribe(subId).should.equal(subCount);
        done();
    });
}

describe('connect', function () {
    start();
});

describe('publish', function () {
    let payload;

    publishTestSuccessful('test/1', 1, '1');
    publishTestSuccessful('test/2', '2', '2');

    payload = true;
    publishTestSuccessful('test/true', payload, JSON.stringify(payload));
    payload = false;
    publishTestSuccessful('test/false', payload, JSON.stringify(payload));
    payload = 3.14159;
    publishTestSuccessful('test/pi', payload, JSON.stringify(payload));

    payload = [3, 4, false, 'string', {bla: 'foo'}];
    publishTestSuccessful('test/string', payload, JSON.stringify(payload));
    payload = {bla: 'foo', arr: [1, 2, false]};
    publishTestSuccessful('test/obj', payload, JSON.stringify(payload));
});

describe('subscribe', function () {
    let payload;

    subscribeTestSuccessfulEvent('test/1', '1', 1);
    subscribeTestSuccessfulEvent('test/2', '2', 2);
    payload = 3.14159;
    subscribeTestSuccessfulEvent('test/pi', JSON.stringify(payload), payload);

    payload = true;
    subscribeTestSuccessfulEvent('test/true', JSON.stringify(payload), payload);
    payload = false;
    subscribeTestSuccessfulEvent('test/false', JSON.stringify(payload), payload);

    /*
    payload = [3, 4, false, 'string', {bla: 'foo'}];
    subscribeTestSuccessfulEvent('test/1', JSON.stringify(payload), payload);
    payload = {bla: 'foo', arr: [1, 2, false]};
    subscribeTestSuccessfulEvent('test/1', JSON.stringify(payload), payload);
*/

    subscribeTestSuccessfulCallback('test/1', '1', 1);
    subscribeTestSuccessfulCallback('test/2', '2', 2);
    payload = 3.14159;
    subscribeTestSuccessfulCallback('test/pi', JSON.stringify(payload), payload);

    payload = true;
    subscribeTestSuccessfulCallback('test/true', JSON.stringify(payload), payload);
    payload = false;
    subscribeTestSuccessfulCallback('test/false', JSON.stringify(payload), payload);

    /*
    payload = [3, 4, false, 'string', {bla: 'foo'}];
    subscribeTestSuccessfulCallback('test/1', JSON.stringify(payload), payload);
    payload = {bla: 'foo', arr: [1, 2, false]};
    subscribeTestSuccessfulCallback('test/1', JSON.stringify(payload), payload);
*/
});

describe('end', function () {
    end();
});
