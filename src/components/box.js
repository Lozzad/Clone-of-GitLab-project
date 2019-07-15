"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BoxState;
(function (BoxState) {
    BoxState["CLOSED"] = "closed";
    BoxState["OPENING"] = "opening";
    BoxState["OPENED"] = "opened";
    BoxState["CLOSING"] = "closing";
})(BoxState || (BoxState = {}));
var BoxTransition;
(function (BoxTransition) {
    BoxTransition["OPEN"] = "open";
    BoxTransition["OPENED"] = "opened";
    BoxTransition["CLOSE"] = "close";
    BoxTransition["CLOSED"] = "closed";
})(BoxTransition || (BoxTransition = {}));
exports.default = AFRAME.registerComponent("box", {
    schema: {
        carouselId: { type: "string" },
        carouselAnimationDuration: { type: "string", default: "2000" },
        carouselScaleSmall: { type: "string", default: "0.25 0.25 0.25" },
        carouselPositionSmall: { type: "string", default: "0 5 -0.25" },
        carouselScaleLarge: { type: "string", default: "20 20 20" },
        carouselPositionLarge: { type: "string", default: "0 10 -0.25" }
    },
    carousel: null,
    animationStateService: null,
    carouselPositionLargeToSmallAnimation: null,
    carouselPositionSmallToLargeAnimation: null,
    carouselScaleLargeToSmallAnimation: null,
    carouselScaleSmallToLargeAnimation: null,
    state: null,
    init: function () {
        var _this = this;
        var _a, _b, _c, _d, _e;
        this.bindMethods();
        this.addEventListeners();
        this.carousel = document.getElementById(this.data.carouselId);
        this.state = BoxState.CLOSED;
        this.carouselScaleSmallToLargeAnimation = this.getAnimationString("scale", this.data.carouselScaleSmall, this.data.carouselScaleLarge, this.data.carouselAnimationDuration);
        this.carouselScaleLargeToSmallAnimation = this.getAnimationString("scale", this.data.carouselScaleLarge, this.data.carouselScaleSmall, this.data.carouselAnimationDuration);
        this.carouselPositionSmallToLargeAnimation = this.getAnimationString("position", this.data.carouselPositionSmall, this.data.carouselPositionLarge, this.data.carouselAnimationDuration);
        this.carouselPositionLargeToSmallAnimation = this.getAnimationString("position", this.data.carouselPositionLarge, this.data.carouselPositionSmall, this.data.carouselAnimationDuration);
        var stateMachine = XState.Machine({
            id: "box",
            initial: this.state,
            states: (_a = {},
                _a[BoxState.CLOSED] = { on: (_b = {}, _b[BoxTransition.OPEN] = BoxState.OPENING, _b) },
                _a[BoxState.OPENING] = { on: (_c = {}, _c[BoxTransition.OPENED] = BoxState.OPENED, _c) },
                _a[BoxState.OPENED] = { on: (_d = {}, _d[BoxTransition.CLOSE] = BoxState.CLOSING, _d) },
                _a[BoxState.CLOSING] = { on: (_e = {}, _e[BoxTransition.CLOSED] = BoxState.CLOSED, _e) },
                _a)
        });
        this.animationStateService = XState.interpret(stateMachine)
            .onTransition(function (state) {
            return _this.animationStateChanged(state.value);
        })
            .start();
    },
    getAnimationString: function (property, from, to, duration) {
        return "property: " + property + "; from: " + from + "; to: " + to + "; dur: " + duration + "; loop: once; autoplay: true;";
    },
    animationStateChanged: function (s) {
        this.state = s;
        switch (this.state) {
            case BoxState.OPENING:
                this.el.setAttribute("animation-mixer", "clip: opening; clampWhenFinished: true; loop: once;");
                this.carousel.setAttribute("animation__scale", this.carouselScaleSmallToLargeAnimation);
                this.carousel.setAttribute("animation__position", this.carouselPositionSmallToLargeAnimation);
                this.el.sceneEl.emit("box-opening", this, false);
                break;
            case BoxState.CLOSING:
                this.el.setAttribute("animation-mixer", "clip: closing; clampWhenFinished: true; loop: once;");
                this.carousel.setAttribute("animation__scale", this.carouselScaleLargeToSmallAnimation);
                this.carousel.setAttribute("animation__position", this.carouselPositionLargeToSmallAnimation);
                this.el.sceneEl.emit("box-closing", this, false);
                break;
        }
    },
    animationFinished: function () {
        switch (this.state) {
            case BoxState.OPENING:
                this.animationStateService.send(BoxTransition.OPENED);
                this.el.sceneEl.emit("box-opened", this, false);
                break;
            case BoxState.CLOSING:
                this.animationStateService.send(BoxTransition.CLOSED);
                this.el.sceneEl.emit("box-closed", this, false);
                break;
        }
    },
    clicked: function (ev) {
        ev.preventDefault();
        console.log("clicked");
        switch (this.state) {
            case BoxState.CLOSED:
                this.animationStateService.send(BoxTransition.OPEN);
                break;
            case BoxState.OPENED:
                this.animationStateService.send(BoxTransition.CLOSE);
                break;
        }
    },
    addEventListeners: function () {
        this.el.addEventListener("animation-finished", this.animationFinished, false);
        this.el.addEventListener("click", this.clicked, false);
    },
    removeEventListeners: function () {
        this.el.removeEventListener("animation-finished", this.animationFinished, false);
        this.el.removeEventListener("click", this.clicked, false);
    },
    bindMethods: function () {
        this.addEventListeners = this.addEventListeners.bind(this);
        this.removeEventListeners = this.removeEventListeners.bind(this);
        this.animationStateChanged = this.animationStateChanged.bind(this);
        this.animationFinished = this.animationFinished.bind(this);
        this.clicked = this.clicked.bind(this);
    },
    tick: function () { },
    remove: function () {
        this.el.removeObject3D("mesh");
        this.removeEventListeners();
    }
});
