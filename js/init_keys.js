// Initialize keys (sound and events)

import utils from './lib/utils.js';
import {toneSynth, customSynth, destination} from './lib/synthLib.js';

toneSynth.connect(destination);

const synthKeys = document.querySelectorAll(".key_container>*");
synthKeys.forEach(el => { // Key events
    el.onmousedown = e => { e.button === 0 ? customSynth.playNote(e.target) : null }
    el.onmouseup = e => { customSynth.stopNote(e.target) }
    el.onmouseover = e => { if (mouseDown) customSynth.playNote(e.target) };
    el.onmouseleave = e => { customSynth.stopNote(e.target) };
})

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

let i = 0;
for (let key in keyCodes) { // Asign key codes
    keyCodes[key] = synthKeys[i++];
}

let mouseDown;
document.addEventListener("mousedown", () => { mouseDown = true });
document.addEventListener("mouseup", () => { mouseDown = false });

document.onkeydown = e => {
    switch (e.code) {
        case "KeyX":
            customSynth.changeOctaveBy++;
            customSynth.changeOctaveBy = utils.clamp(customSynth.changeOctaveBy, -1, 5);
            toneSynth.releaseAll();
            break;
        case "KeyZ":
            customSynth.changeOctaveBy--;
            customSynth.changeOctaveBy = utils.clamp(customSynth.changeOctaveBy, -1, 5);
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
}

document.onkeyup = e => {
    if (e.code in keyCodes) {
        customSynth.stopNote(keyCodes[e.code]);
    }
}