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

let synthKeys = document.querySelectorAll(".key_container>*");
synthKeys = Array.from(synthKeys);
const synth = new Tone.PolySynth(Tone.Synth).toDestination();
let note, changeOctaveBy = 0;

const playNote = el => {
    el.classList.add("active");
    this.now = Tone.now(); // Tone.now must be global to keep track of
    note = el.id;
    note = note.replace(note[note.length - 1], +note[note.length - 1] + changeOctaveBy);
    synth.triggerAttack(note, now);
}

const stopNote = el => {
    el.classList.remove("active");
    this.now = Tone.now();
    note = el.id;
    note = note.replace(note[note.length - 1], +note[note.length - 1] + changeOctaveBy);
    synth.triggerRelease(note, now);
}

const clamp = (n, min, max) => { // Clamp the value between the thresholds
    return Math.min(Math.max(n, min), max);
}

synthKeys.forEach(el => { // Key events
    el.onmousedown = e => { e.button == 0 ? playNote(e.target) : null }
    el.onmouseup = e => { stopNote(e.target) }
    el.onmouseleave = e => { stopNote(e.target) }
})

let i = 0;
for (let key in keyCodes) { // Asign keyCodes
    keyCodes[key] = synthKeys[i++]
}

document.onkeydown = e => {
    switch (e.code) {
        case "KeyZ":
            changeOctaveBy++;
            changeOctaveBy = clamp(changeOctaveBy, -1, 6);
            synth.releaseAll();
            break;
        case "KeyX":
            changeOctaveBy--;
            changeOctaveBy = clamp(changeOctaveBy, -1, 6);
            synth.releaseAll();
            break;
        default:
            if (e.code in keyCodes && !e.repeat) { // Ignore repeats on key hold
                playNote(keyCodes[e.code]);
            }
    }
    document.onkeyup = e => {
        if (e.code in keyCodes) {
            stopNote(keyCodes[e.code]);
        }
    }
}