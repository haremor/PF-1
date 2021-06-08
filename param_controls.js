const oscTypeSelect = document.querySelectorAll(".osc_type_select>*");
const allInputs = document.querySelectorAll("input");
const rangeInputs = document.querySelectorAll("input[type=range]");
const selects = document.querySelectorAll("select");

const changeParam = (el, param = el.dataset.type, changeTo = el.value, paramGroup = el.dataset.group) => {
    if (!isNaN(+changeTo) && !(changeTo instanceof Array)) { // Check if it's a string containing a number or an array. I want to die
        changeTo = +changeTo;
    }
    let dispObj = {}, groupObj = {};
    groupObj[param] = changeTo;
    dispObj[paramGroup] = groupObj;
    if (!paramGroup) {
        dispObj = groupObj;
    }
    toneSynth.set(dispObj);
    return dispObj
}

const changeBoxValue = (el) => {
    if (el.nextElementSibling) {
        el.nextElementSibling.innerText = el.value;
    }
}

allInputs.forEach(el => {
    el.addEventListener("input", (e) => {
        changeParam(e.target)
    })
})

rangeInputs.forEach(el => {
    el.addEventListener("input", (e) => {
        changeBoxValue(e.target);
    })
    el.ondblclick = e => {
        e.target.value = 0;
        changeBoxValue(e.target);
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
        oscType = e.target.dataset.osctype;
        var currentEl = el;
        e.target.classList.add("pressed");
        oscTypeSelect.forEach(el => { // Elegant as fuck
            changeParam(null, "type", e.target.dataset.osctype, "oscillator");
            if (el.classList.contains("pressed") && el !== currentEl) {
                el.classList.remove("pressed");
            }
        })
    };
});