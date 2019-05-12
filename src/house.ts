export class House {

    private _el: HTMLElement;
    private _carousel: HTMLElement;
    private _state: HouseState = HouseState.CLOSED;
    private _stateService;

    // Define the animation constraints
    private carouselAnimationDuration: string = "2000";
    private carouselScaleSmall: string = "0.25 0.25 0.25";
    private carouselPositionSmall: string = "0 0.6 -0.25";
    private carouselScaleLarge: string = "2 2 2";
    private carouselPositionLarge: string = "0 1.2 -0.25";

    // Create the animation strings
    private carouselScaleSmallToLargeAnimation: string = "property: scale" +
    "; from: " + this.carouselScaleSmall +
    "; to: " + this.carouselScaleLarge +
    "; dur: " + this.carouselAnimationDuration +
    "; loop: once; autoplay: true;";

    private carouselScaleLargeToSmallAnimation: string = "property: scale" +
    "; from: " + this.carouselScaleLarge +
    "; to: " + this.carouselScaleSmall +
    "; dur: " + this.carouselAnimationDuration +
    "; loop: once; autoplay: true;";

    private carouselPositionSmallToLargeAnimation: string = "property: position" +
    "; from: " + this.carouselPositionSmall +
    "; to: " + this.carouselPositionLarge +
    "; dur: " + this.carouselAnimationDuration +
    "; loop: once; autoplay: true;";

    private carouselPositionLargeToSmallAnimation: string = "property: position" +
    "; from: " + this.carouselPositionLarge +
    "; to: " + this.carouselPositionSmall +
    "; dur: " + this.carouselAnimationDuration +
    "; loop: once; autoplay: true;";

    constructor(el: HTMLElement, carousel: HTMLElement) {
        this._el = el;
        this._carousel = carousel;

        this._el.addEventListener("animation-finished", this.animationFinished.bind(this), false);
        this._el.addEventListener("click", this.clicked.bind(this), false);

        const stateMachine = XState.Machine({
            id: "house",
            initial: this._state,
            states: {
                [HouseState.CLOSED]: { on: { [HouseTransition.OPEN]: HouseState.OPENING } },
                [HouseState.OPENING]: { on: { [HouseTransition.OPENED]: HouseState.OPENED } },
                [HouseState.OPENED]: { on: { [HouseTransition.CLOSE]: HouseState.CLOSING } },
                [HouseState.CLOSING]: { on: { [HouseTransition.CLOSED]: HouseState.CLOSED } }
            }
        });
        
        this._stateService = XState.interpret(stateMachine).onTransition(state => this.stateChanged(state.value as HouseState)).start();
    }

    stateChanged(s: HouseState) {
        this._state = s;
        switch (this._state) {
            case HouseState.OPENING :
                this._el.setAttribute("animation-mixer", "clip: opening; clampWhenFinished: true; loop: once;");
                this._carousel.setAttribute("animation__scale", this.carouselScaleSmallToLargeAnimation);
                this._carousel.setAttribute("animation__position", this.carouselPositionSmallToLargeAnimation);
            break;
            case HouseState.CLOSING :
                this._el.setAttribute("animation-mixer", "clip: closing; clampWhenFinished: true; loop: once;");
                this._carousel.setAttribute("animation__scale", this.carouselScaleLargeToSmallAnimation);
                this._carousel.setAttribute("animation__position", this.carouselPositionLargeToSmallAnimation);
            break;
        }
    }

    animationFinished() {
        switch (this._state) {
            case HouseState.OPENING:
                this._stateService.send(HouseTransition.OPENED);
                break;
            case HouseState.CLOSING:
                this._stateService.send(HouseTransition.CLOSED);
                break;
        }
    }

    clicked(ev) {
        ev.preventDefault();
        switch (this._state) {
            case HouseState.CLOSED:
                this._stateService.send(HouseTransition.OPEN);                
                break;
            case HouseState.OPENED:
                this._stateService.send(HouseTransition.CLOSE);
                break;
        }
    }

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