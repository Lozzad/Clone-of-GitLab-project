import { BaseComponent } from "../BaseComponent";

interface BoxComponent extends BaseComponent {
    animationStateService: any;
    state: BoxState | null;
    animationFinished: () => void;
    getAnimationString: (
        property: string,
        from: string,
        to: string,
        duration: string
    ) => string;
    animationStateChanged: (state: BoxState) => void;
    clicked: (ev: CustomEvent) => void;
}

enum BoxState {
    CLOSED = "closed",
    OPENING = "opening",
    OPENED = "opened",
    CLOSING = "closing"
}

enum BoxTransition {
    OPEN = "open",
    OPENED = "opened",
    CLOSE = "close",
    CLOSED = "closed"
}

export default AFRAME.registerComponent("box", {
    schema: {
        boxID: { type: "string" },
        link: { type: "string" },
    },

    animationStateService: null,
    state: null,

    init() {
        this.bindMethods();
        this.addEventListeners();
        this.data.counter = 0;

        this.state = BoxState.CLOSED;

        const stateMachine = XState.Machine({
            id: "box",
            initial: this.state,
            states: {
                [BoxState.CLOSED]: { on: { [BoxTransition.OPEN]: BoxState.OPENING } },
                [BoxState.OPENING]: { on: { [BoxTransition.OPENED]: BoxState.OPENED } },
                [BoxState.OPENED]: { on: { [BoxTransition.CLOSE]: BoxState.CLOSING } },
                [BoxState.CLOSING]: { on: { [BoxTransition.CLOSED]: BoxState.CLOSED } }
            }
        });

        this.animationStateService = XState.interpret(stateMachine)
            .onTransition(state =>
                this.animationStateChanged(state.value as BoxState)
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

    animationStateChanged(s: BoxState) {
        this.state = s;
        switch (this.state) {
            case BoxState.OPENING:
                this.el!.setAttribute(
                    "animation-mixer",
                    "clip: opening; clampWhenFinished: true; loop: once;"
                );
                this.el!.sceneEl!.emit("box-opening", this, false);
                break;
            case BoxState.CLOSING:
                this.el!.setAttribute(
                    "animation-mixer",
                    "clip: closing; clampWhenFinished: true; loop: once;"
                );
                this.el!.sceneEl!.emit("box-closing", this, false);
                break;
        }
    },

    animationFinished() {
        switch (this.state) {
            case BoxState.OPENING:
                this.animationStateService.send(BoxTransition.OPENED);
                this.el!.sceneEl!.emit("box-opened", { id: this.data.boxID, url: this.data.boxURL }, false);
                this.el!.sceneEl!.emit("box-id-selected", { id: this.data.boxID }, false);
                break;
            case BoxState.CLOSING:
                this.animationStateService.send(BoxTransition.CLOSED);
                this.el!.sceneEl!.emit("box-closed", this, false);
                break;
        }
    },

    clicked(ev: CustomEvent) {
        ev.preventDefault();
        console.log("clicked: " + this.data.boxID);
        switch (this.state) {
            case BoxState.CLOSED:
                this.animationStateService.send(BoxTransition.OPEN);
                break;
            case BoxState.OPENED:
                this.animationStateService.send(BoxTransition.CLOSE);
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
                if (this.state == BoxState.OPENED) {
                    this.animationStateService.send(BoxTransition.CLOSE);
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

} as BoxComponent);
