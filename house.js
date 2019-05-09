var scene = document.querySelector("a-scene");
var house = document.querySelector("#house");
var carousel = document.querySelector("#carousel-controller");

house.addEventListener("click", houseClicked);

// Define the animation constraints
// =============================================================
const duration = "6000";

const scale_small = "0.01 0.01 0.01";
const position_small = "0 0.1 0";

const scale_large = "0.3 0.3 0.3";
const position_large = "0 0.3 0";
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

function houseClicked() {
    if (!overlayVisible) {
        switch (currentHouseState) {
            case houseState.CLOSED:
                houseService.send(houseTransition.OPEN);
                carousel.setAttribute("animation__scale", scale_smallToLarge);
                carousel.setAttribute("animation__position", position_smallToLarge);
                break;
            case houseState.OPENED:
                houseService.send(houseTransition.CLOSE);
                carousel.setAttribute("animation__scale", scale_largeToSmall);
                carousel.setAttribute("animation__position", position_largeToSmall);
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

function handleHouseState(s) {
    currentHouseState = s;
    if (s === houseState.OPENING || s === houseState.CLOSING) {
        house.setAttribute("animation-mixer", "clip: " + s + "; clampWhenFinished: true; loop: once;");
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