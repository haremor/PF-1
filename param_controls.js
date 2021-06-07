const oscTypeSelect = document.querySelectorAll(".osc_type_select>*");
const inputs = document.querySelectorAll("input");

const changeParam = (param, changeTo, paramGroup) => {
    let dispObj = {}, groupObj = {};
    groupObj[param] = changeTo;
    dispObj[paramGroup] = groupObj;
    if (!paramGroup) {
        dispObj = groupObj;
    }
    toneSynth.set(dispObj);
    return dispObj
}

inputs.forEach(el => {
    el.oninput = e => {
        changeParam(e.target.dataset.type, e.target.value, e.target.dataset.group)
    }
})

oscTypeSelect.forEach(el => {
    el.onmousedown = e => {
        var currentEl = el;
        e.target.classList.add("pressed");
        oscTypeSelect.forEach(el => { // Elegant as fuck
            changeParam("type", e.target.dataset.waveform, "oscillator");
            if (el.classList.contains("pressed") && el !== currentEl) {
                el.classList.remove("pressed");
            }
        })
    };
})