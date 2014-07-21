var tone = require('../../')();
var baudio = require('webaudio');

var form = document.querySelector('form');
form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var number = form.elements.number.value;
    tone.dial(number);
});

baudio(tone.play()).play();
