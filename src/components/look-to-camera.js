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
