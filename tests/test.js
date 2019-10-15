/* eslint-disable no-unused-vars, prefer-arrow-callback, curly, capitalized-comments */
/* global it, describe */

const path = require('path');
const should = require('should');
const Mqtt = require('mqtt');

const mqttUrl = 'mqtt://localhost';

let mqtt;

const MqttSmarthome = require(path.join(__dirname, '..', 'index.js'));

let mqsh;

function debug() {
    // console.log.apply(this, arguments);
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
        mqsh.on('connect', function () {
            mqtt.removeAllListeners();
            done();
        });
        mqsh.connect();
    });
}

function end() {
    it('mqsh disconnect from mqtt', function (done) {
        this.timeout(5000);
        mqsh.on('close', function () {
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
function subscribeTestSuccessfulCallback(testTopicPub, testTopicSub, testPayloadPub, testPayloadSub) {
    let subId;
    it('subscribe ' + JSON.stringify(testTopicSub) + ' and receive ' + JSON.stringify(testPayloadSub) + ' on ' + JSON.stringify(testTopicPub), function (done) {
        subCount += 1;
        debug('mqsh sub callback', testTopicSub);
        subId = mqsh.subscribe(testTopicSub, (topic, val, packet) => {
            debug('<', topic, val);
            topic.should.equal(testTopicPub);
            val.should.equal(testPayloadSub);
            done();
        });
        this.timeout(4000);

        setTimeout(() => {
            mqtt.publish(testTopicPub, testPayloadPub);
        }, 100);
    });
    it('unsubscribe ' + testTopicSub, function (done) {
        debug('mqsh unsub', testTopicSub, subId, 'count before decrement:' + subCount);
        subCount -= 1;
        mqsh.unregisterCallback(subId).should.equal(subCount);
        done();
    });
}

function subscribeTestSuccessfulEvent(testTopicPub, testTopicSub, testPayloadPub, testPayloadSub) {
    let subId;
    it('subscribe ' + testTopicSub, function () {
        debug('mqsh sub', testTopicSub);
        subId = mqsh.subscribe(testTopicSub);
    });
    it('receive ' + JSON.stringify(testPayloadSub) + ' on ' + testTopicPub, function (done) {
        this.timeout(4000);
        subCount += 1;
        mqsh.on('message', (topic, val, packet) => {
            debug('mqsh <', topic, val);
            topic.should.equal(testTopicPub);
            val.should.equal(testPayloadSub);
            mqsh.removeAllListeners();
            done();
        });
        debug('mqtt >', testTopicPub, testPayloadPub);
        setTimeout(() => {
            mqtt.publish(testTopicPub, testPayloadPub);
        }, 100);
    });
    it('unsubscribe ' + testTopicSub, function (done) {
        debug('mqsh unsub', testTopicSub, subId, 'count before decrement:' + subCount);
        subCount -= 1;
        mqsh.unregisterCallback(subId).should.equal(subCount);
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

describe('subscribe and receive messages via event', function () {
    let payload;

    subscribeTestSuccessfulEvent('test/1', 'test/1', '1', 1);
    subscribeTestSuccessfulEvent('test/2', 'test/2', '2', 2);
    payload = 3.14159;
    subscribeTestSuccessfulEvent('test/pi', 'test/pi', JSON.stringify(payload), payload);

    payload = true;
    subscribeTestSuccessfulEvent('test/true', 'test/true', JSON.stringify(payload), payload);
    payload = false;
    subscribeTestSuccessfulEvent('test/false', 'test/false', JSON.stringify(payload), payload);

    /*
    payload = [3, 4, false, 'string', {bla: 'foo'}];
    subscribeTestSuccessfulEvent('test/1', JSON.stringify(payload), payload);
    payload = {bla: 'foo', arr: [1, 2, false]};
    subscribeTestSuccessfulEvent('test/1', JSON.stringify(payload), payload);

*/
});

describe('subscribe and receive messages via callback', function () {
    let payload;

    subscribeTestSuccessfulCallback('test/1', 'test/1', '1', 1);
    subscribeTestSuccessfulCallback('test/2', 'test/2', '2', 2);
    payload = 3.14159;
    subscribeTestSuccessfulCallback('test/pi', 'test/pi', JSON.stringify(payload), payload);

    payload = true;
    subscribeTestSuccessfulCallback('test/true', 'test/true', JSON.stringify(payload), payload);
    payload = false;
    subscribeTestSuccessfulCallback('test/false', 'test/false', JSON.stringify(payload), payload);

    /*
    payload = [3, 4, false, 'string', {bla: 'foo'}];
    subscribeTestSuccessfulCallback('test/1', JSON.stringify(payload), payload);
    payload = {bla: 'foo', arr: [1, 2, false]};
    subscribeTestSuccessfulCallback('test/1', JSON.stringify(payload), payload);
*/
});

describe('subscribe with wildcard and receive messages via callback', function () {
    subscribeTestSuccessfulCallback('test/1', 'test/+', 'foo', 'foo');
    subscribeTestSuccessfulCallback('test/1/2', 'test/+/2', 'bar', 'bar');
    subscribeTestSuccessfulCallback('test/1/2/3', 'test/#', 'moo', 'moo');
    subscribeTestSuccessfulCallback('test/1/2/3/4', 'test/+/2/#', 'bla', 'bla');
});

describe('end', function () {
    end();
});
