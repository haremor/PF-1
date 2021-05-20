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
    "Semicolon": null,
    "Quote": null,
}

let synthKeys = document.querySelectorAll(".key_container>*");
synthKeys = Array.from(synthKeys);
const synth = new Tone.PolySynth(Tone.Synth).toDestination();
let notesPlaying = [];

const playNote = el => {
    el.classList.add("active");
    this.now = Tone.now(); // Tone.now must be global to keep track of
    let note = el.id;
    if (notesPlaying.indexOf(note) == -1) {
        notesPlaying.push(note);
    }
    synth.triggerAttack(notesPlaying, now);
}

const stopNote = el => {
    el.classList.remove("active");
    this.now = Tone.now();
    let noteToStop = notesPlaying.find((i) => { if (i == el.id) return i }); // Find the note that's no longer active
    synth.triggerRelease(noteToStop, now);
    let i = notesPlaying.indexOf(noteToStop);
    notesPlaying.splice(i, 1);
}

synthKeys.forEach((el) => { // Key events
    el.onmousedown = (e) => { e.button == 0 ? playNote(e.target) : null }
    el.onmouseup = (e) => { stopNote(e.target) }
    el.onmouseleave = (e) => { stopNote(e.target) }
})

let i = 0;
for (let key in keyCodes) { // Asign keyCodes
    keyCodes[key] = synthKeys[i++]
}

document.onkeydown = e => {
    if (e.code in keyCodes && !e.repeat) { // Ignore repeats on key hold
        playNote(keyCodes[e.code]);
    }
    document.onkeyup = e => {
        if (e.code in keyCodes) {
            stopNote(keyCodes[e.code]);
        }
    }
}

// setInterval(() => {
//     log(notesPlaying)
// }, 700);