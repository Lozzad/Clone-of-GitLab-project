(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("app", [], factory);
	else if(typeof exports === 'object')
		exports["app"] = factory();
	else
		root["app"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(2);
__webpack_require__(3);
__webpack_require__(4);
var scene, video, overlay, viewer, carouselMenu, prevButton, nextButton, itemButton;
var state = {
    overlayVisible: false
};
function viewObjectInOverlay(src) {
    viewer.contentWindow.postMessage({
        src: src
    }, window.location.href);
    state.overlayVisible = true;
    render();
}
function resize() {
    if (overlay) {
        overlay.width = window.innerWidth;
        overlay.height = window.innerHeight;
    }
    if (viewer) {
        viewer.width = window.innerWidth;
        viewer.height = window.innerHeight;
    }
    if (carouselMenu) {
        carouselMenu.style.top = window.innerHeight - carouselMenu.clientHeight;
    }
}
window.addEventListener("resize", function () {
    resize();
});
function render() {
    video = document.querySelector("video");
    if (state.overlayVisible) {
        scene.classList.add("hide");
        video.classList.add("hide");
        overlay.classList.remove("hide");
    }
    else {
        scene.classList.remove("hide");
        video.classList.remove("hide");
        overlay.classList.add("hide");
    }
}
window.addEventListener("DOMContentLoaded", function () {
    scene = document.querySelector("a-scene");
    overlay = document.getElementById("overlay");
    viewer = document.getElementById("viewer");
    carouselMenu = document.getElementById("carousel-menu");
    prevButton = document.getElementById("carousel-prev-button");
    itemButton = document.getElementById("carousel-item-button");
    nextButton = document.getElementById("carousel-next-button");
    scene.addEventListener("carousel-item-clicked", function (event) {
        var id = event.detail.id;
        var asset = document.getElementById(id + "-asset");
        if (asset) {
            viewObjectInOverlay(asset.getAttribute("src"));
        }
    }, false);
    window.addEventListener("message", function (event) {
        if (event.data === "close") {
            state.overlayVisible = false;
            render();
        }
    }, false);
    prevButton.addEventListener("click", function () {
        scene.emit("rotate", {
            direction: -1
        });
    }, false);
    itemButton.addEventListener("click", function () {
        console.log("item");
    }, false);
    nextButton.addEventListener("click", function () {
        scene.emit("rotate", {
            direction: 1
        });
    }, false);
    resize();
});


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AFRAME.registerComponent("carousel", {
    schema: {
        radius: { type: "number", default: 1 },
        thickness: { type: "number", default: 0.25 },
        ringVisible: { type: "boolean", default: true },
        itemRadius: { type: "number", default: 1 }
    },
    numChildren: 0,
    interval: 0,
    currentRotation: 0,
    index: 0,
    ringGeometry: null,
    ringMaterial: null,
    ringMesh: null,
    init: function () {
        this.bindMethods();
        this.addEventListeners();
        this.createRing();
        //this.addDebugChildren();
        this.numChildren = this.el.children.length;
        this.interval = 360 / this.numChildren;
    },
    updateAnimation: function (ev) {
        var direction = ev.detail.direction;
        var newIndex = this.index + direction;
        if (newIndex < 0) {
            newIndex = this.numChildren - 1;
        }
        else if (newIndex > this.numChildren - 1) {
            newIndex = 0;
        }
        var newRotation;
        // if the direction is positive, and the new index is 0 or greater than the current index, add an interval
        if (direction === 1 && (newIndex === 0 || newIndex > this.index)) {
            newRotation = this.currentRotation + this.interval;
        }
        else {
            // if the direction is negative, and the new index is the number of children or less than the current index, subtract an interval
            newRotation = this.currentRotation - this.interval;
        }
        var animString = "property: rotation" +
            "; from: '90 0 " +
            this.currentRotation +
            "'" +
            "; to: '90 0 " +
            newRotation +
            "'" +
            "; dur: 1000" +
            "; autoplay: true;" +
            "; easing: easeInOutQuad;";
        this.el.setAttribute("animation__rotation", animString);
        var animString2 = "property: rotation" +
            "; from: '0 0 0'" +
            "; to: '0 0 360'" +
            "; dur: 30000; loop: true; easing: linear; autoplay: true";
        this.el.children[this.index].removeAttribute("animation__rotate");
        this.el.children[newIndex].setAttribute("animation__rotate", animString2);
        this.currentRotation = newRotation;
        this.index = newIndex;
    },
    bindMethods: function () {
        // this.removeDebugChildren = this.removeDebugChildren.bind(this);
        // this.addDebugChildren = this.addDebugChildren.bind(this);
        this.addEventListeners = this.addEventListeners.bind(this);
        this.removeEventListeners = this.removeEventListeners.bind(this);
        this.createRing = this.createRing.bind(this);
        this.sceneLoaded = this.sceneLoaded.bind(this);
        this.updateAnimation = this.updateAnimation.bind(this);
    },
    addEventListeners: function () {
        this.el.sceneEl.addEventListener("loaded", this.sceneLoaded, false);
        this.el.sceneEl.addEventListener("rotate", this.updateAnimation, false);
    },
    removeEventListeners: function () {
        this.el.sceneEl.removeEventListener("loaded", this.sceneLoaded, false);
        this.el.sceneEl.removeEventListener("rotate", this.updateAnimation, false);
    },
    createRing: function () {
        this.ringGeometry = new THREE.TorusGeometry(this.data.radius, this.data.thickness, 6, 40);
        this.ringMaterial = new THREE.MeshBasicMaterial({
            visible: this.data.ringVisible,
            color: 0x0000ff
        });
        this.ringMesh = new THREE.Mesh(this.ringGeometry, this.ringMaterial);
    },
    sceneLoaded: function () {
        var _this = this;
        var position = this.el.object3D.position;
        var children = this.el.children;
        var numChildren = children.length;
        var intervalRad = (Math.PI * 2) / numChildren;
        for (var i = 0; i < numChildren; i++) {
            var child = children[i];
            var x = this.data.radius * Math.cos(i * intervalRad) + position.x;
            var y = this.data.radius * Math.sin(i * intervalRad);
            child.setAttribute("position", "" + x + " " + y + " " + "0");
            // Add sphere when model is loaded
            child.addEventListener("model-loaded", function () {
                // Get the radius of the child's bounding sphere
                //var model = ev.detail.model;
                // Compute the bounding sphere radius of the scene
                // var box3 = new THREE.Box3();
                // box3.setFromObject(model);
                // var sphere = new THREE.Sphere(1);
                // box3.getBoundingSphere(sphere);
                // var ratio = sphere.radius / this.data.itemRadius;
                // // If ratio is > 1, this means that the item is larger than the
                // // maximum item radius, thus it must be shrunk to fit
                // if (ratio > 1) {
                //     model.scale.set(1 / ratio, 1 / ratio, 1 / ratio);
                // }
                // var geom = new THREE.SphereGeometry(this.data.itemRadius);
                // var mat = new THREE.MeshBasicMaterial({
                //     visible: true,
                //     side: THREE.DoubleSide
                // });
                // var sphereMesh = new THREE.Mesh(geom, mat);
                // sphereMesh.add(model);
                //child.setObject3D("mesh", model);
            });
            child.addEventListener("click", function () {
                //this.el.sceneEl.emit("carousel-item-clicked", {id: child.id}, false);
                console.log("Click!: " + child.id);
            }, false);
            child.addEventListener("raycaster-intersected", function () {
                _this.el.sceneEl.emit("carousel-item-hovered", { id: child.id }, false);
                child.children[0].setAttribute("visible", "true");
                console.log("Hover!: " + child.id);
            }, false);
            child.addEventListener("raycaster-intersected-cleared", function () {
                _this.el.sceneEl.emit("carousel-item-hovered-cleared", { id: child.id }, false);
                child.children[0].setAttribute("visible", "false");
                console.log("Clear!: " + child.id);
            }, false);
        }
    },
    update: function (oldData) {
        // Check & Change Visibility of the Ring
        if (oldData &&
            oldData.ringVisible &&
            oldData.ringVisible !== this.data.ringVisible) {
            this.ringMesh
                .material.visible = this.data.ringVisible;
        }
    },
    tick: function () { },
    remove: function () {
        this.el.removeObject3D("mesh");
        this.removeEventListeners();
        this.ringMesh = null;
        this.ringGeometry.dispose();
        this.ringMaterial.dispose();
    }
});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AFRAME.registerComponent("look-to-camera", {
    schema: {},
    init: function () { },
    addEventListeners: function () { },
    removeEventListeners: function () { },
    bindMethods: function () { },
    tick: function () {
        this.el.object3D.lookAt(this.el.sceneEl.camera.position);
    }
});


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

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
        this.animationStateService = XState.interpret(stateMachine).onTransition(function (state) { return _this.animationStateChanged(state.value); }).start();
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
                break;
            case BoxState.CLOSING:
                this.el.setAttribute("animation-mixer", "clip: closing; clampWhenFinished: true; loop: once;");
                this.carousel.setAttribute("animation__scale", this.carouselScaleLargeToSmallAnimation);
                this.carousel.setAttribute("animation__position", this.carouselPositionLargeToSmallAnimation);
                break;
        }
    },
    animationFinished: function () {
        switch (this.state) {
            case BoxState.OPENING:
                this.animationStateService.send(BoxTransition.OPENED);
                break;
            case BoxState.CLOSING:
                this.animationStateService.send(BoxTransition.CLOSED);
                break;
        }
    },
    clicked: function (ev) {
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
    tick: function () {
    },
    remove: function () {
        this.el.removeObject3D("mesh");
        this.removeEventListeners();
    }
});


/***/ })
/******/ ]);
});