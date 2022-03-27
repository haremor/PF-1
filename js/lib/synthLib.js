const customSynth = { // Our custom created synth
    changeOctaveBy: 0,
    antiClickTriggered: false,
    params: {
        "volume": 0,
        "detune": 0,
        "portamento": 0,
        "oscillator": {
            "type": "fatsquare",
            "count": 1,
            "spread": 1,
        },
        "envelope": {
            "attack": 0,
            "attackCurve": "linear",
            "decay": 0,
            "decayCurve": "exponential",
            "release": 0.1,
            "releaseCurve": "linear", // new Array(50).fill(0).map(() => Math.random())
            "sustain": 0.4
        },
        "filter": {
            "Q": 0,
            "frequency": 0,
            "gain": 0,
            "rolloff": -12,
            "type": "lowpass"
        },
        "filterEnvelope": {
            "attack": 0,
            "attackCurve": "linear",
            "decay": 0,
            "decayCurve": "exponential",
            "release": 0.1,
            "releaseCurve": "linear",
            "sustain": 0.4,
            "baseFrequency": 300,
            "exponent": 2,
            "octaves": 4
        }
    },

    playNote: function (el) {
        el.classList.add("active");
        now = Tone.now();
        let note = el.id;
        note = note.replace(note[note.length - 1], +note[note.length - 1] + customSynth.changeOctaveBy);
        toneSynth.triggerAttack(note, this.antiClickTriggered === true ? now : Tone.immediate());
    },

    stopNote: function (el) {
        el.classList.remove("active");
        now = Tone.now();
        let note = el.id;
        note = note.replace(note[note.length - 1], +note[note.length - 1] + customSynth.changeOctaveBy);
        toneSynth.triggerRelease(note, this.antiClickTriggered === true ? now : Tone.immediate());
    }
}

const toneSynth = new Tone.PolySynth(Tone.MonoSynth, customSynth.params);
const destination = Tone.Destination;
const reverbFX = new Tone.JCReverb(0).toDestination();

export {
    toneSynth,
    customSynth,
    destination,
    reverbFX
}