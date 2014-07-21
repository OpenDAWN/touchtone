var baudio = require('baudio');
var touchtone = require('../');
var minimist = require('minimist');
var argv = minimist(process.argv.slice(2), {
    alias: { d: 'duration', p: 'pause', v: 'volume' }
});

var tone = touchtone(argv);
var keys = argv._.join('').split('');
keys.forEach(function (key) { tone.press(key) });

baudio(tone.play()).play();
