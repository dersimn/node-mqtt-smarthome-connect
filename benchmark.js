const suite = require('benchmark').Suite();

const topic = 'test';

suite.add('Plain concatenation', function() {
    const res = 'test' + '/' + topic;
}).add('String array join()', function() {
    const res = ['test', topic].join('/');
}).on('cycle', function(event) {
    console.log(String(event.target));
}).on('complete', function() {
    console.log('done');
}).run({ 'async': true });
