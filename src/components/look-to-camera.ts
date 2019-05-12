import { BaseComponent } from "../basecomponent";

export default AFRAME.registerComponent("look-to-camera", {
    schema: {},

    init() {

    },

    addEventListeners() {

    },

    removeEventListeners() {

    },

    bindMethods() {

    },

    tick() {
      this.el!.object3D!.lookAt(this.el!.sceneEl!.camera.position);
    }
} as BaseComponent);