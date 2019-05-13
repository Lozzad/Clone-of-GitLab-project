import { BaseComponent } from "../BaseComponent";

interface HouseComponent extends BaseComponent {
  animationStateService: any; // todo: type
  carousel: HTMLElement | null;
  carouselPositionLargeToSmallAnimation: string | null;
  carouselPositionSmallToLargeAnimation: string | null;
  carouselScaleLargeToSmallAnimation: string | null;
  carouselScaleSmallToLargeAnimation: string | null;
  state: HouseState | null;
	animationFinished: () => void;
	getAnimationString: (property: string, from: string, to: string, duration: string) => string;
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
		carouselId: { type: "string" },
		carouselAnimationDuration: { type: "string", default: "2000" },
		carouselScaleSmall: { type: "string", default: "0.25 0.25 0.25" },
		carouselPositionSmall: { type: "string", default: "0 0.6 -0.25" },
		carouselScaleLarge: { type: "string", default: "2 2 2" },
		carouselPositionLarge: { type: "string", default: "0 1.2 -0.25" }
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
		this.state = HouseState.CLOSED;

		this.carouselScaleSmallToLargeAnimation = this.getAnimationString("scale", this.data.carouselScaleSmall, this.data.carouselScaleLarge, this.data.carouselAnimationDuration);
		this.carouselScaleLargeToSmallAnimation = this.getAnimationString("scale", this.data.carouselScaleLarge, this.data.carouselScaleSmall, this.data.carouselAnimationDuration);
		this.carouselPositionSmallToLargeAnimation = this.getAnimationString("position", this.data.carouselPositionSmall, this.data.carouselPositionLarge, this.data.carouselAnimationDuration);
		this.carouselPositionLargeToSmallAnimation = this.getAnimationString("position", this.data.carouselPositionLarge, this.data.carouselPositionSmall, this.data.carouselAnimationDuration);

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
		
		this.animationStateService = XState.interpret(stateMachine).onTransition(state => this.animationStateChanged(state.value as HouseState)).start();
	},
	
	getAnimationString(property: string, from: string, to: string, duration: string): string {
		return `property: ${property}; from: ${from}; to: ${to}; dur: ${duration}; loop: once; autoplay: true;`;
	},

	animationStateChanged(s: HouseState) {
		this.state = s;
		switch (this.state) {
			case HouseState.OPENING :
				this.el!.setAttribute("animation-mixer", "clip: opening; clampWhenFinished: true; loop: once;");
				this.carousel!.setAttribute("animation__scale", this.carouselScaleSmallToLargeAnimation!);
				this.carousel!.setAttribute("animation__position", this.carouselPositionSmallToLargeAnimation!);
			break;
			case HouseState.CLOSING :
				this.el!.setAttribute("animation-mixer", "clip: closing; clampWhenFinished: true; loop: once;");
				this.carousel!.setAttribute("animation__scale", this.carouselScaleLargeToSmallAnimation!);
				this.carousel!.setAttribute("animation__position", this.carouselPositionLargeToSmallAnimation!);
			break;
		}
	},

	animationFinished() {
		switch (this.state) {
			case HouseState.OPENING:
				this.animationStateService.send(HouseTransition.OPENED);
				break;
			case HouseState.CLOSING:
				this.animationStateService.send(HouseTransition.CLOSED);
				break;
		}
	},

	clicked(ev: CustomEvent) {
		ev.preventDefault();
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
		this.el!.addEventListener("animation-finished", this.animationFinished, false);
		this.el!.addEventListener("click", this.clicked, false);
	},

	removeEventListeners() {
		this.el!.removeEventListener("animation-finished", this.animationFinished, false);
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
	}
} as HouseComponent);