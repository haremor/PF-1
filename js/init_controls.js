// Initialize controls

import utils from './lib/utils.js';
import { toneSynth, customSynth, destination, reverbFX } from './lib/synthLib.js';

const oscTypeSelect = document.querySelectorAll(".osc_type_select>*");
const allInputs = document.querySelectorAll("input:not(.reverb_param)");
const rangeInputs = document.querySelectorAll("input[type=range]");
const selects = document.querySelectorAll("select");
const reverbButton = document.querySelector(".reverb .button");
const reverbParams = document.querySelectorAll(".reverb_param");
const releasePoints = document.querySelectorAll(".point");
const resetButton = document.querySelector(".reset");
const antiClickButton = document.querySelector(".anti_click");

const changeSynthParam = (el, param = el.dataset.type, changeTo = el.value, paramGroup = el.dataset.group) => {
    if (!isNaN(+changeTo) && !(changeTo instanceof Array)) { // Check if it's a string containing a number and not an array.
        changeTo = +changeTo;
    }

    let dispObj = {}, groupObj = {};
    groupObj[param] = changeTo;
    dispObj[paramGroup] = groupObj;

    if (!paramGroup) {
        dispObj = groupObj;
    }

    toneSynth.set(dispObj);

    return dispObj;
}

const changeBoxValue = (el) => {
    if (el.nextElementSibling) {
        el.nextElementSibling.innerText = el.value;
    }
}

const toggleReverb = () => {
    if (reverbButton.classList.contains("pressed")) {
        toneSynth.disconnect(destination);
        toneSynth.connect(reverbFX);
    } else {
        toneSynth.disconnect(reverbFX);
        toneSynth.connect(destination);
    }
}

const changeReverbParam = (el) => {
    let param = el.dataset.type;
    reverbFX[param].value = +el.value;
}

allInputs.forEach(el => {
    el.addEventListener("input", (e) => {
        changeSynthParam(e.target);
    })
})

rangeInputs.forEach(el => {
    el.addEventListener("input", (e) => {
        changeBoxValue(e.target);
    })
    el.ondblclick = e => {
        e.target.value = 0;
        changeBoxValue(e.target);
        changeSynthParam(e.target);
    }
})

selects.forEach(el => {
    el.onchange = e => {
        changeSynthParam(e.target);
    }
})

oscTypeSelect.forEach(el => {
    el.onmousedown = e => {
        const oscType = e.target.dataset.osctype;
        const currentEl = el;

        e.target.classList.add("pressed");
        changeSynthParam(null, "type", oscType, "oscillator");

        oscTypeSelect.forEach(el => {
            if (el.classList.contains("pressed") && el !== currentEl) {
                el.classList.remove("pressed");
            }
        });
    }
});

reverbButton.onmousedown = e => {
    e.target.classList.toggle("pressed");
    toggleReverb();
}

reverbParams.forEach(el => {
    el.onchange = e => {
        changeReverbParam(e.target);
    }
})

releasePoints.forEach(el => { // Wasn't fully implemented
    let y, readyToResize;
    el.onmousemove = e => {
        let rect = e.target.getBoundingClientRect();
        let fill = e.target.firstElementChild;
        y = e.clientY - rect.bottom;
        if (readyToResize) {
            fill.style.height = utils.clamp(-y * 3, 0, 100) + "%";
        }
    }
    el.onmousedown = () => { readyToResize = true }
    el.onmouseup = () => { readyToResize = false }
    el.onmouseout = () => { readyToResize = false }
    el.ondblclick = e => {
        let fill = e.target.firstElementChild;
        fill.style.height = "100%";
    }
})

resetButton.onmousedown = () => {
    location.reload(1);
}

antiClickButton.onmousedown = e => {
    e.target.classList.toggle("pressed");
    customSynth.antiClickTriggered = !(customSynth.antiClickTriggered);
}
