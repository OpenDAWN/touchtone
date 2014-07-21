var baudio = require('baudio');
var tone = require('../')();

process.stdin.setRawMode(true);
process.stdin.on('data', function (buf) {
    if (buf[0] === 3 || buf[0] === 4) {
        process.stdin.setRawMode(false);
        process.exit();
    }
    else {
        for (var i = 0; i < buf.length; i++) {
            tone.press(String.fromCharCode(buf[i]));
        }
    }
});
baudio(tone.play()).play();
