var tone = require('../')();
tone.dial('18005551212');

var baudio = require('baudio');
baudio(tone.play()).play();
