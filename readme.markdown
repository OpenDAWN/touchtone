# touchtone

generate
[DTMF](https://en.wikipedia.org/wiki/Dual-tone_multi-frequency_signaling)
tones like a touchtone phone

# example

## server example with baudio

Using [baudio](https://npmjs.org/package/baudio), we can make a tone script that
runs on the server.

``` js
var tone = require('touchtone')();
tone.dial('18005551212');

var baudio = require('baudio');
baudio(tone.play()).play();
```

Make sure you have [sox](http://sox.sourceforge.net)
installed to use baudio.

## browser example with webaudio

We can play tones in the browser using
[webaudio](https://npmjs.org/package/webaudio):

``` js
var tone = require('touchtone')();
var baudio = require('webaudio');

var form = document.querySelector('form');
form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var number = form.elements.number.value;
    tone.dial(number);
});

baudio(tone.play()).play();
```

# usage

There is also a `touchtone` command that ships with this package.

```
USAGE

  touchtone {OPTIONS} NUMBER

INFO

  Play the DTMF tones for NUMBER on the system audio device.

OPTIONS

  -d --duration  Time in seconds to play each tone.

  -p --pause     Time in seconds to pause between tones.

  -v --volume    Volume: higher than 1: louder, lower than 1: softer.

  -h --help      Show this message.

EXAMPLE
  
  touchtone 18005551212
  touchtone '*69'

```

# methods

``` js
var touchtone = require('touchtone')
```

## var tone = touchtone(opts)

Create a new `tone` instance with `opts`:

* `opts.duration` - time in seconds to play each tone
* `opts.pause` - time in seconds between each tone
* `opts.volume` - higher than 1: louder, lower than 1: quieter

# tone.press(key)

Generate a single tone for a string character `key`.

# tone.dial(number)

Generate a sequence of numbers from a string `number`.

# tone.play()

Return a `function (t) {}` that itself returns an amplitude between -1 and 1,
inclusive. This function can be fed into
[baudio](https://npmjs.org/package/baudio) or 
[webaudio](https://npmjs.org/package/webaudio) to generate sounds.

# events

## tone.on('ready', function () {})

When the queued-up tones are finished playing, this event fires.

# DTMF keys

All 16 DTMF keys are supported:

```
 HZ  1209 1336 1477 1633
697    1    2    3    A
770    4    5    6    B
852    7    8    9    C
941    *    0    #    D
```

Refer to each key by its symbol name as a string.

# install

First install [sox](http://sox.sourceforge.net) unless you only want to use this
module in a browser.

If you want the command-line client, do:

```
npm install -g touchtone
```

If you want the library, do:

```
npm install touchtone
```

# license

MIT
