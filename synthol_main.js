let customSynth = {
    note: null,
    changeOctaveBy: 0,
    synthParams: {
        "volume": -8,
        "detune": 0,
        "portamento": 0,
        "envelope": {
            "attack": 0.05,
            "attackCurve": "linear",
            "decay": 0.3,
            "decayCurve": "exponential",
            "release": 0.8,
            "releaseCurve": "exponential",
            "sustain": 0.4
        },
        "filter": {
            "Q": 3,
            "detune": 43,
            "frequency": 0,
            "gain": 0,
            "rolloff": -12,
            "type": "lowpass"
        },
        "filterEnvelope": {
            "attack": 0.001,
            "attackCurve": "linear",
            "decay": 0.7,
            "decayCurve": "exponential",
            "release": 0.8,
            "releaseCurve": "exponential",
            "sustain": 0.1,
            "baseFrequency": 300,
            "exponent": 2,
            "octaves": 4
        },
        "oscillator": {
            "detune": 0,
            "frequency": 440,
            "partialCount": 8,
            "partials": [
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1
            ],
            "phase": 0,
            "type": "custom"
        }
    },
    // gotta make an anti-click mode
    playNote: function (el) {
        el.classList.add("active");
        // globalThis.now = Tone.now();
        let note = customSynth.note;
        note = el.id;
        note = note.replace(note[note.length - 1], +note[note.length - 1] + customSynth.changeOctaveBy); // Elegant as fuck
        toneSynth.triggerAttack(note, Tone.immediate());
    },

    stopNote: function (el) {
        el.classList.remove("active");
        // globalThis.now = Tone.now();
        let note = customSynth.note;
        note = el.id;
        note = note.replace(note[note.length - 1], +note[note.length - 1] + customSynth.changeOctaveBy);
        toneSynth.triggerRelease(note, Tone.immediate());
    },

    keyCodes: {
        "KeyA": null,
        "KeyW": null,
        "KeyS": null,
        "KeyE": null,
        "KeyD": null,
        "KeyF": null,
        "KeyT": null,
        "KeyG": null,
        "KeyY": null,
        "KeyH": null,
        "KeyU": null,
        "KeyJ": null,
        "KeyK": null,
        "KeyO": null,
        "KeyL": null,
        "KeyP": null,
        "Semicolon": null
    }
}

let synthKeys = document.querySelectorAll(".key_container>*");
synthKeys = Array.from(synthKeys);
const toneSynth = new Tone.PolySynth(Tone.MonoSynth, customSynth.synthParams).toDestination(); // Define the synth
let mouseDown;

document.addEventListener("mousedown", () => { mouseDown = true });
document.addEventListener("mouseup", () => { mouseDown = false });

const clamp = (n, min, max) => { // Clamp the value between the thresholds
    return Math.min(Math.max(n, min), max);
}

synthKeys.forEach(el => { // Key events
    el.onmousedown = e => { e.button == 0 ? customSynth.playNote(e.target) : null }
    el.onmouseup = e => { customSynth.stopNote(e.target) }
    el.onmouseover = e => { if (mouseDown) customSynth.playNote(e.target) }; // I implemented this just so you can do a fucking key slide on a mousedown
    el.onmouseleave = e => { customSynth.stopNote(e.target) };
})

let i = 0;
for (let key in customSynth.keyCodes) { // Asign keyCodes
    customSynth.keyCodes[key] = synthKeys[i++]
}

document.onkeydown = e => {
    switch (e.code) {
        case "KeyX":
            customSynth.changeOctaveBy++;
            customSynth.changeOctaveBy = clamp(customSynth.changeOctaveBy, -1, 6);
            toneSynth.releaseAll();
            break;
        case "KeyZ":
            customSynth.changeOctaveBy--;
            customSynth.changeOctaveBy = clamp(customSynth.changeOctaveBy, -1, 6);
            toneSynth.releaseAll();
            break;
        default:
            if (e.code in customSynth.keyCodes && !e.repeat) { // Ignore repeats on key hold
                customSynth.playNote(customSynth.keyCodes[e.code]);
            }
    }
    document.onkeyup = e => {
        if (e.code in customSynth.keyCodes) {
            customSynth.stopNote(customSynth.keyCodes[e.code]);
        }
    }
}