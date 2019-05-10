
window.addEventListener("DOMContentLoaded", function() {
    house = document.querySelector("#house");
    house.addEventListener("click", houseClicked, true);
});

// Define the animation constraints
// =============================================================
const duration = "3000";

const scale_small = "1 1 1";
const position_small = "0 0.4 -0.25";

const scale_large = "2 2 2";
const position_large = "0 0.8 -0.25";
// =============================================================

// Create the animation strings
// =============================================================
const scale_smallToLarge = "property: scale" +
"; from: " + scale_small +
"; to: " + scale_large +
"; dur: " + duration +
"; loop: once; autoplay: true;";

const scale_largeToSmall = "property: scale" +
"; from: " + scale_large +
"; to: " + scale_small +
"; dur: " + duration +
"; loop: once; autoplay: true;";

const position_smallToLarge = "property: position" +
"; from: " + position_small +
"; to: " + position_large +
"; dur: " + duration +
"; loop: once; autoplay: true;";

const position_largeToSmall = "property: position" +
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
}

var houseTransition = {
    OPEN: "open",
    OPENED: "opened",
    CLOSE: "close",
    CLOSED: "closed"
}

var currentHouseState = houseState.CLOSED;

var houseMachine = XState.Machine({
    id: "house",
    initial: currentHouseState,
    states: {
        [houseState.CLOSED]: { on: { [houseTransition.OPEN]: houseState.OPENING } },
        [houseState.OPENING]: { on: { [houseTransition.OPENED]: houseState.OPENED } },
        [houseState.OPENED]: { on: { [houseTransition.CLOSE]: houseState.CLOSING } },
        [houseState.CLOSING]: { on: { [houseTransition.CLOSED]: houseState.CLOSED } }
    }
});

var houseService = XState.interpret(houseMachine).onTransition(state => handleHouseState(state.value)).start();

// todo: merge with render() in index.html
function handleHouseState(s) {
    currentHouseState = s;
    switch (currentHouseState) {
        case houseState.OPENING :
            house.setAttribute("animation-mixer", "clip: opening; clampWhenFinished: true; loop: once;");
            carousel.setAttribute("animation__scale", scale_smallToLarge);
            carousel.setAttribute("animation__position", position_smallToLarge);
        break;
        case houseState.CLOSING :
            house.setAttribute("animation-mixer", "clip: closing; clampWhenFinished: true; loop: once;");
            carousel.setAttribute("animation__scale", scale_largeToSmall);
            carousel.setAttribute("animation__position", position_largeToSmall);
        break;
    }
}

house.addEventListener("animation-finished", function() {
    switch (currentHouseState) {
        case houseState.OPENING:
            houseService.send(houseTransition.OPENED);
            break;
        case houseState.CLOSING:
            houseService.send(houseTransition.CLOSED);
            break;
    }
});