const suite = require('benchmark').Suite();

const base = 'muh';
const topic = 'test';

suite.add(' 2 Plain concatenation', function() {
    const res = base + '/' + topic;
}).add(' 2 String array join()', function() {
    const res = [base, topic, base].join('/');
}).add(' 3 Plain concatenation', function() {
    const res = base + '/' + topic + '/' + base;
}).add(' 3 String array join()', function() {
    const res = [base, topic, base].join('/');
}).add(' 4 Plain concatenation', function() {
    const res = base + '/' + topic + '/' + base + '/' + topic;
}).add(' 4 String array join()', function() {
    const res = [base, topic, base, topic].join('/');
}).add('20 Plain concatenation', function() {
    const res = base + '/' + topic + '/' + base + '/' + topic + '/' + base + '/' + topic + '/' + base + '/' + topic +
        '/' + base + '/' + topic + '/' + base + '/' + topic + '/' + base + '/' + topic + '/' + base + '/' + topic + '/'
        + base + '/' + topic + '/' + base + '/' + topic;
}).add('20 String array join()', function() {
    const res = [base, topic, base, topic, base, topic, base, topic, base, topic, base, topic, base, topic, base, topic, base, topic, base, topic].join('/');
}).on('cycle', function(event) {
    console.log(String(event.target));
}).on('complete', function() {
    console.log('done');
}).run({ 'async': true });
