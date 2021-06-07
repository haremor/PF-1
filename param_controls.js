const oscTypeSelect = document.querySelectorAll(".osc_type_select>*");
const allInputs = document.querySelectorAll("input");
const rangeInputs = document.querySelectorAll("input[type=range]");
const selects = document.querySelectorAll("select");

function changeParam (el, param = el.dataset.type, changeTo = el.value, paramGroup = el.dataset.group) {
    let dispObj = {}, groupObj = {};
    groupObj[param] = changeTo;
    dispObj[paramGroup] = groupObj;
    if (!paramGroup) {
        dispObj = groupObj;
    }
    toneSynth.set(dispObj);
    return dispObj
}

allInputs.forEach(el => {
    el.oninput = e => {
        changeParam(e.target);
    }
})

rangeInputs.forEach(el => {
    el.ondblclick = e => {
        e.target.value = 0;
        changeParam(e.target);
    }
})

selects.forEach(el => {
    el.onchange = e => {
        changeParam(e.target)
    }
})

oscTypeSelect.forEach(el => {
    el.onmousedown = e => {
        var currentEl = el;
        e.target.classList.add("pressed");
        oscTypeSelect.forEach(el => { // Elegant as fuck
            changeParam(null, "type", e.target.dataset.waveform, "oscillator");
            if (el.classList.contains("pressed") && el !== currentEl) {
                el.classList.remove("pressed");
            }
        })
    };
})