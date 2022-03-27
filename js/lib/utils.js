const clamp = (number, min, max) => { // Clamp the value between the thresholds
    return Math.min(Math.max(number, min), max);
}

export default {
    clamp
};