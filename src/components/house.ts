import { BaseComponent } from "../BaseComponent";

interface HouseComponent extends BaseComponent {
    animationStateService: any;
    state: HouseState | null;
    animationFinished: () => void;
    getAnimationString: (
        property: string,
        from: string,
        to: string,
        duration: string
    ) => string;
    animationStateChanged: (state: HouseState) => void;
    clicked: (ev: CustomEvent) => void;
}

enum HouseState {
    CLOSED = "closed",
    OPENING = "opening",
    OPENED = "opened",
    CLOSING = "closing"
}

enum HouseTransition {
    OPEN = "open",
    OPENED = "opened",
    CLOSE = "close",
    CLOSED = "closed"
}

export default AFRAME.registerComponent("house", {
    schema: {
        houseID: { type: "string" },
        link: { type: "string" },
    },

    multiple: true,
    animationStateService: null,
    state: null,

    init() {
        this.bindMethods();
        this.addEventListeners();
        this.data.counter = 0;

        this.state = HouseState.CLOSED;

        const stateMachine = XState.Machine({
            id: "house",
            initial: this.state,
            states: {
                [HouseState.CLOSED]: { on: { [HouseTransition.OPEN]: HouseState.OPENING } },
                [HouseState.OPENING]: { on: { [HouseTransition.OPENED]: HouseState.OPENED } },
                [HouseState.OPENED]: { on: { [HouseTransition.CLOSE]: HouseState.CLOSING } },
                [HouseState.CLOSING]: { on: { [HouseTransition.CLOSED]: HouseState.CLOSED } }
            }
        });

        this.animationStateService = XState.interpret(stateMachine)
            .onTransition(state =>
                this.animationStateChanged(state.value as HouseState)
            )
            .start();
    },

    getAnimationString(
        property: string,
        from: string,
        to: string,
        duration: string
    ): string {
        return `property: ${property}; from: ${from}; to: ${to}; dur: ${duration}; loop: once; autoplay: true;`;
    },

    animationStateChanged(s: HouseState) {
        this.state = s;
        switch (this.state) {
            case HouseState.OPENING:
                this.el!.setAttribute(
                    "animation-mixer",
                    "clip: opening; clampWhenFinished: true; loop: once;"
                );
                this.el!.sceneEl!.emit("house-opening", this, false);
                break;
            case HouseState.CLOSING:
                this.el!.setAttribute(
                    "animation-mixer",
                    "clip: closing; clampWhenFinished: true; loop: once;"
                );
                this.el!.sceneEl!.emit("house-closing", this, false);
                break;
        }
    },

    animationFinished() {
        switch (this.state) {
            case HouseState.OPENING:
                this.animationStateService.send(HouseTransition.OPENED);
                this.el!.sceneEl!.emit("house-opened", { id: this.data.houseID }, false);
                this.el!.sceneEl!.emit("house-id-selected", { id: this.data.houseID }, false);
                break;
            case HouseState.CLOSING:
                this.animationStateService.send(HouseTransition.CLOSED);
                this.el!.sceneEl!.emit("house-closed", this, false);
                break;
        }
    },

    clicked(ev: CustomEvent) {
        ev.preventDefault();
        console.log("clicked: " + this.data.houseID);
        switch (this.state) {
            case HouseState.CLOSED:
                this.animationStateService.send(HouseTransition.OPEN);
                break;
            case HouseState.OPENED:
                this.animationStateService.send(HouseTransition.CLOSE);
                break;
        }
    },

    addEventListeners() {
        this.el!.addEventListener(
            "animation-finished",
            this.animationFinished,
            false
        );
        this.el!.addEventListener("click", this.clicked, false);
        this.el!.sceneEl!.addEventListener(
            "closed-viewer",
            () => {
                if (this.state == HouseState.OPENED) {
                    this.animationStateService.send(HouseTransition.CLOSE);
                }
            },
            true
        );
    },

    removeEventListeners() {
        this.el!.removeEventListener(
            "animation-finished",
            this.animationFinished,
            false
        );

        this.el!.removeEventListener("click", this.clicked, false);
    },

    bindMethods() {
        this.addEventListeners = this.addEventListeners.bind(this);
        this.removeEventListeners = this.removeEventListeners.bind(this);
        this.animationStateChanged = this.animationStateChanged.bind(this);
        this.animationFinished = this.animationFinished.bind(this);
        this.clicked = this.clicked.bind(this);
    },

    tick() {

    },

    remove() {
        this.el!.removeObject3D("mesh");
        this.removeEventListeners();
    },

} as HouseComponent);
