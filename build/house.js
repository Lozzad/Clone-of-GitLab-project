var _a, _b, _c, _d, _e;
window.addEventListener("DOMContentLoaded", function () {
    house = document.querySelector("#house");
    house.addEventListener("click", houseClicked, true);
});
// Define the animation constraints
// =============================================================
var duration = "2000";
var scale_small = "0.25 0.25 0.25";
var position_small = "0 0.6 -0.25";
var scale_large = "2 2 2";
var position_large = "0 1.2 -0.25";
// =============================================================
// Create the animation strings
// =============================================================
var scale_smallToLarge = "property: scale" +
    "; from: " + scale_small +
    "; to: " + scale_large +
    "; dur: " + duration +
    "; loop: once; autoplay: true;";
var scale_largeToSmall = "property: scale" +
    "; from: " + scale_large +
    "; to: " + scale_small +
    "; dur: " + duration +
    "; loop: once; autoplay: true;";
var position_smallToLarge = "property: position" +
    "; from: " + position_small +
    "; to: " + position_large +
    "; dur: " + duration +
    "; loop: once; autoplay: true;";
var position_largeToSmall = "property: position" +
    "; from: " + position_large +
    "; to: " + position_small +
    "; dur: " + duration +
    "; loop: once; autoplay: true;";
// =============================================================
function houseClicked(ev) {
    ev.preventDefault();
    if (!overlayVisible) {
        switch (currentHouseState) {
            case houseState.CLOSED:
                houseService.send(houseTransition.OPEN);
                break;
            case houseState.OPENED:
                houseService.send(houseTransition.CLOSE);
                break;
        }
    }
}
var houseState = {
    CLOSED: "closed",
    OPENING: "opening",
    OPENED: "opened",
    CLOSING: "closing"
};
var houseTransition = {
    OPEN: "open",
    OPENED: "opened",
    CLOSE: "close",
    CLOSED: "closed"
};
var currentHouseState = houseState.CLOSED;
var houseMachine = XState.Machine({
    id: "house",
    initial: currentHouseState,
    states: (_a = {},
        _a[houseState.CLOSED] = { on: (_b = {}, _b[houseTransition.OPEN] = houseState.OPENING, _b) },
        _a[houseState.OPENING] = { on: (_c = {}, _c[houseTransition.OPENED] = houseState.OPENED, _c) },
        _a[houseState.OPENED] = { on: (_d = {}, _d[houseTransition.CLOSE] = houseState.CLOSING, _d) },
        _a[houseState.CLOSING] = { on: (_e = {}, _e[houseTransition.CLOSED] = houseState.CLOSED, _e) },
        _a)
});
var houseService = XState.interpret(houseMachine).onTransition(function (state) { return handleHouseState(state.value); }).start();
// todo: merge with render() in index.html
function handleHouseState(s) {
    currentHouseState = s;
    switch (currentHouseState) {
        case houseState.OPENING:
            house.setAttribute("animation-mixer", "clip: opening; clampWhenFinished: true; loop: once;");
            carousel.setAttribute("animation__scale", scale_smallToLarge);
            carousel.setAttribute("animation__position", position_smallToLarge);
            break;
        case houseState.CLOSING:
            house.setAttribute("animation-mixer", "clip: closing; clampWhenFinished: true; loop: once;");
            carousel.setAttribute("animation__scale", scale_largeToSmall);
            carousel.setAttribute("animation__position", position_largeToSmall);
            break;
    }
}
house.addEventListener("animation-finished", function () {
    switch (currentHouseState) {
        case houseState.OPENING:
            houseService.send(houseTransition.OPENED);
            break;
        case houseState.CLOSING:
            houseService.send(houseTransition.CLOSED);
            break;
    }
});
