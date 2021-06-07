let customSynth = {
    currentNote: null,
    changeOctaveBy: 0,
    params: {
        "volume": -20,
        "detune": 0,
        "portamento": 0,
        "envelope": {
            "attack": 0,
            "attackCurve": "linear",
            "decay": 0,
            "decayCurve": "exponential",
            "release": 0,
            "releaseCurve": "exponential", // new Array(100).fill(0).map(() => Math.random())
            "sustain": 0.4
        },
        "filter": {
            "Q": 1,
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
            "release": 0,
            "releaseCurve": "exponential",
            "sustain": 0,
            "baseFrequency": 300,
            "exponent": 2,
            "octaves": 4
        },
        "oscillator": {
            "frequency": 440,
            "partialCount": 0,
            "partials": [],
            "phase": 0,
            "type": "square"
        }
    },
    // gotta make an anti-click mode
    playNote: function (el) {
        el.classList.add("active");
        // globalThis.now = Tone.now();
        let note = customSynth.currentNote;
        note = el.id;
        note = note.replace(note[note.length - 1], +note[note.length - 1] + customSynth.changeOctaveBy); // Elegant as fuck
        toneSynth.triggerAttack(note, Tone.immediate());
    },

    stopNote: function (el) {
        el.classList.remove("active");
        // globalThis.now = Tone.now();
        let note = customSynth.currentNote;
        note = el.id;
        note = note.replace(note[note.length - 1], +note[note.length - 1] + customSynth.changeOctaveBy);
        toneSynth.triggerRelease(note, Tone.immediate());
    }
}

let keyCodes = {
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

const synthKeys = document.querySelectorAll(".key_container>*");
const toneSynth = new Tone.PolySynth(Tone.MonoSynth, customSynth.params).toDestination(); // Define the synth
let mouseDown;

document.addEventListener("mousedown", () => { mouseDown = true });
document.addEventListener("mouseup", () => { mouseDown = false });

const clamp = (n, min, max) => { // Clamp the value between the thresholds
    return Math.min(Math.max(n, min), max);
}

synthKeys.forEach(el => { // Key events
    el.onmousedown = e => { e.button === 0 ? customSynth.playNote(e.target) : null }
    el.onmouseup = e => { customSynth.stopNote(e.target) }
    el.onmouseover = e => { if (mouseDown) customSynth.playNote(e.target) }; // I implemented this just so you can do a fucking key slide on a mousedown
    el.onmouseleave = e => { customSynth.stopNote(e.target) };
})

let i = 0;
for (let key in keyCodes) { // Asign key codes
    keyCodes[key] = synthKeys[i++]
}

document.onkeydown = e => {
    switch (e.code) {
        case "KeyX":
            customSynth.changeOctaveBy++;
            customSynth.changeOctaveBy = clamp(customSynth.changeOctaveBy, -1, 5);
            toneSynth.releaseAll();
            break;
        case "KeyZ":
            customSynth.changeOctaveBy--;
            customSynth.changeOctaveBy = clamp(customSynth.changeOctaveBy, -1, 5);
            toneSynth.releaseAll();
            break;
        case "Quote": // Disable Firefox Search
            e.preventDefault();
            break;
        default:
            if (e.code in keyCodes && !e.repeat) { // Ignore repeats on key hold
                customSynth.playNote(keyCodes[e.code]);
            }
    }
    document.onkeyup = e => {
        if (e.code in keyCodes) {
            customSynth.stopNote(keyCodes[e.code]);
        }
    }
}