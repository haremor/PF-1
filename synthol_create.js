const log = console.log;
const notes = ["C", "D", "E", "F", "G", "A", "B"];
let html = "";
let toOctave = 3;

for (let octave = 2; octave <= toOctave; octave++) {
    html += `<ul data-octave="${octave}">`;
    for (let i = 0; i < notes.length; i++) {
        let hasSharp = true;
        let note = notes[i];

        if (note === "E" || note === "B") {
            hasSharp = false;
        }

        html += `<li class="key_container"><div id="${note}" class="white_key"></div>`;

        if (hasSharp) {
            html += `<div id="${note + "#"}" class="black_key"></div>`;
        }

        html += "</li>";
    }
    html += "</ul>"
}

let synth_space = document.getElementById("synth_wrap");
synth_space.innerHTML = html;