import { BaseComponent } from "../BaseComponent";

interface BoxComponent extends BaseComponent {
  animationStateService: any; // todo: type
  carousel: HTMLElement | null;
  carouselPositionLargeToSmallAnimation: string | null;
  carouselPositionSmallToLargeAnimation: string | null;
  carouselScaleLargeToSmallAnimation: string | null;
  carouselScaleSmallToLargeAnimation: string | null;
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
    carouselId: { type: "string" },
    carouselAnimationDuration: { type: "string", default: "2000" },
    carouselScaleSmall: { type: "string", default: "0.25 0.25 0.25" },
    carouselPositionSmall: { type: "string", default: "0 0.9 -0.25" },
    carouselScaleLarge: { type: "string", default: "2 2 2" },
    carouselPositionLarge: { type: "string", default: "0 1.5 -0.25" }
  },

  carousel: null,
  animationStateService: null,
  carouselPositionLargeToSmallAnimation: null,
  carouselPositionSmallToLargeAnimation: null,
  carouselScaleLargeToSmallAnimation: null,
  carouselScaleSmallToLargeAnimation: null,
  state: null,

  init() {
    this.bindMethods();
    this.addEventListeners();

    this.carousel = document.getElementById(this.data.carouselId);
    this.state = BoxState.CLOSED;

    this.carouselScaleSmallToLargeAnimation = this.getAnimationString(
      "scale",
      this.data.carouselScaleSmall,
      this.data.carouselScaleLarge,
      this.data.carouselAnimationDuration
    );
    this.carouselScaleLargeToSmallAnimation = this.getAnimationString(
      "scale",
      this.data.carouselScaleLarge,
      this.data.carouselScaleSmall,
      this.data.carouselAnimationDuration
    );
    this.carouselPositionSmallToLargeAnimation = this.getAnimationString(
      "position",
      this.data.carouselPositionSmall,
      this.data.carouselPositionLarge,
      this.data.carouselAnimationDuration
    );
    this.carouselPositionLargeToSmallAnimation = this.getAnimationString(
      "position",
      this.data.carouselPositionLarge,
      this.data.carouselPositionSmall,
      this.data.carouselAnimationDuration
    );

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
        this.carousel!.setAttribute(
          "animation__scale",
          this.carouselScaleSmallToLargeAnimation!
        );
        this.carousel!.setAttribute(
          "animation__position",
          this.carouselPositionSmallToLargeAnimation!
		);
		this.el!.sceneEl!.emit("box-opening", this, false);
        break;
      case BoxState.CLOSING:
        this.el!.setAttribute(
          "animation-mixer",
          "clip: closing; clampWhenFinished: true; loop: once;"
        );
        this.carousel!.setAttribute(
          "animation__scale",
          this.carouselScaleLargeToSmallAnimation!
        );
        this.carousel!.setAttribute(
          "animation__position",
          this.carouselPositionLargeToSmallAnimation!
		);
		this.el!.sceneEl!.emit("box-closing", this, false);
        break;
    }
  },

  animationFinished() {
    switch (this.state) {
      case BoxState.OPENING:
		this.animationStateService.send(BoxTransition.OPENED);
		this.el!.sceneEl!.emit("box-opened", this, false);
        break;
      case BoxState.CLOSING:
		this.animationStateService.send(BoxTransition.CLOSED);
		this.el!.sceneEl!.emit("box-closed", this, false);
        break;
    }
  },

  clicked(ev: CustomEvent) {
    ev.preventDefault();
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

  tick() {},

  remove() {
    this.el!.removeObject3D("mesh");
    this.removeEventListeners();
  }
} as BoxComponent);
