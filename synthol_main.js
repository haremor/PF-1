const keyMatch = {
    a: null,
    w: null,
    s: null,
    e: null,
    d: null,
    f: null,
    t: null,
    g: null,
    y: null,
    h: null,
    u: null,
    j: null,
    k: null,
    o: null,
    l: null
}

let keys = document.querySelectorAll(".key_container>*");
keys = Array.from(keys);
const synth = new Tone.PolySynth(Tone.Synth).toDestination();

const playNote = el => {
    el.classList.add("active");
    this.now = Tone.now(); // Tone.now must be global to keep track of
    this.note = el.id + el.parentNode.parentNode.dataset.octave;
    synth.triggerAttack(note, now);
}

const stopNote = el => {
    el.classList.remove("active");
    this.now = Tone.now();
    synth.triggerRelease(note, now);
}

keys.forEach((el) => { // Key events
    el.onmousedown = (e) => { e.button == 0 ? playNote(e.target) : null }
    el.onmouseup = (e) => { stopNote(e.target) }
    el.onmouseleave = (e) => { this.note !== undefined ? stopNote(e.target) : null}
})

let i = 0;
for (let key in keyMatch) {
    keyMatch[key] = keys[i++]
}

// document.onkeydown = e => { 
//     if (e.key in keyMatch) {
//         playNote(keyMatch[e.key]);
//     }
//     document.onkeyup = e => {
//         if (e.key in keyMatch) {
//             stopNote(keyMatch[e.key]);
//         }
//     }
// }