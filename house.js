var scene = document.querySelector("a-scene");
var house = document.querySelector("#house");

house.addEventListener("click", houseClicked);

function houseClicked() {
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