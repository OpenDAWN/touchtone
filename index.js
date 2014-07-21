var defined = require('defined');
var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');

var columns = [ 1209, 1336, 1477, 1633 ];
var rows = [ 697, 770, 852, 941 ];
var labels = '123a456b789c*0#d'.split('');

var tones = {};
for (var i = 0; i < rows.length; i++) {
    for (var j = 0; j < columns.length; j++) {
        var lb = labels.shift();
        tones[lb] = [ rows[i], columns[j] ];
    }
}

module.exports = Touchtone;
module.exports.tones = tones;
inherits(Touchtone, EventEmitter);

function Touchtone (opts) {
    if (!(this instanceof Touchtone)) return new Touchtone(opts);
    if (!opts) opts = {};
    this._duration = opts.duration || 1/8;
    this._pause = defined(opts.pause, this._duration / 4);
    this._tones = [];
    this._volume = defined(opts.volume, 1);
}

Touchtone.prototype.press = function (key) {
    var t = tones[key];
    if (!t) return;
    this._tones.push([ t, null ]);
    if (this._pause) this._tones.push([ 'pause', null ]);
};

Touchtone.prototype.play = function () {
    var self = this;
    return function (t) {
        var tone = self._tones[0];
        if (!tone) return 0;
        if (tone[1] === null) {
            tone[1] = t;
        }
        if (tone[0] === 'pause' && tone[1] < t - self._pause) {
            shift();
        }
        else if (tone[1] < t - self._duration) {
            shift();
            return 0;
        }
        if (tone[0] === 'pause') return 0;
        return self._volume * (sin(tone[0][0]) + sin(tone[0][1])) / 2;
        
        function sin (x) { return Math.sin(2 * Math.PI * x * t) }
    };
    
    function shift () {
        self._tones.shift();
        if (self._tones.length === 0) {
            self.emit('ready');
        }
    }
};
