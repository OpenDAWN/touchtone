var baudio = require('baudio');
var touchtone = require('../');
var minimist = require('minimist');
var argv = minimist(process.argv.slice(2), {
    alias: { d: 'duration', p: 'pause', v: 'volume' }
});

var tone = touchtone(argv);
tone.dial(argv._.join(''));
tone.on('ready', function () { b.end() });

var b = baudio(tone.play());
b.play();
