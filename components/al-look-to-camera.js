AFRAME.registerComponent("al-look-to-camera", {
    schema: {},

    init() {
      this.tickFunction = AFRAME.utils.throttle(
        this.tickFunction,
        100,
        this
      );
    },

    tickFunction() {
      this.el.object3D.lookAt(this.el.sceneEl.camera.position);
    },

    tick() {
      this.tickFunction();
    }
});
