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
    currentRotation: -90,
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
            newRotation = this.currentRotation - this.interval;
        }
        else {
            newRotation = this.currentRotation + this.interval;
        }
        var rotateCarouselAnim = "property: rotation; from: '90 0 " + this.currentRotation + "'; to: '90 0 " + newRotation + "'; dur: 1000; autoplay: true; easing: easeInOutQuad;";
        this.el.setAttribute("animation__rotation", rotateCarouselAnim);
        //const rotateObjectAnim = `property: rotation; from: '90 90 0'; to: '90 90 360'; dur: 10000; loop: true; easing: linear; autoplay: true`;
        this.el.children[this.index].object3D.scale.divideScalar(1.5);
        this.el.children[newIndex].object3D.scale.multiplyScalar(1.5);
        //this.el!.children[this.index].removeAttribute("animation__rotate");
        //this.el!.children[this.index].setAttribute("rotation", "-90 0 0");
        //this.el!.children[newIndex].removeAttribute("rotation");
        //this.el!.children[newIndex].setAttribute("animation__rotate", rotateObjectAnim);
        this.currentRotation = newRotation;
        this.index = newIndex;
    },
    selectItem: function () {
        var child = this.el.children[this.index];
        this.el.sceneEl.emit("carousel-item-selected", { id: child.id }, false);
    },
    bindMethods: function () {
        // this.removeDebugChildren = this.removeDebugChildren.bind(this);
        // this.addDebugChildren = this.addDebugChildren.bind(this);
        this.addEventListeners = this.addEventListeners.bind(this);
        this.removeEventListeners = this.removeEventListeners.bind(this);
        this.createRing = this.createRing.bind(this);
        this.sceneLoaded = this.sceneLoaded.bind(this);
        this.updateAnimation = this.updateAnimation.bind(this);
        this.selectItem = this.selectItem.bind(this);
    },
    addEventListeners: function () {
        this.el.sceneEl.addEventListener("loaded", this.sceneLoaded, false);
        this.el.sceneEl.addEventListener("rotate-carousel", this.updateAnimation, false);
        this.el.sceneEl.addEventListener("select-carousel-item", this.selectItem, false);
    },
    removeEventListeners: function () {
        this.el.sceneEl.removeEventListener("loaded", this.sceneLoaded, false);
        this.el.sceneEl.removeEventListener("rotate-carousel", this.updateAnimation, false);
        this.el.sceneEl.removeEventListener("select-carousel-item", this.selectItem, false);
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
        var position = this.el.object3D.position;
        var children = this.el.children;
        var numChildren = children.length;
        var intervalRad = (Math.PI * 2) / numChildren;
        for (var i = 0; i < numChildren; i++) {
            var child = children[i];
            var x = this.data.radius * Math.cos(i * intervalRad) + position.x;
            var y = this.data.radius * Math.sin(i * intervalRad);
            child.setAttribute("position", x + " " + y + " 0");
            child.setAttribute("rotation", "-90 0 0");
            // Add sphere when model is loaded
            child.addEventListener("model-loaded", function () {
                // Get the radius of the child's bounding sphere
                // var model = ev.detail.model;
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
            // child.addEventListener(
            //   "click",
            //   () => {
            //     this.el!.sceneEl!.emit("carousel-item-clicked", {id: child.id}, false);
            //     console.log("Click!: " + child.id);
            //   },
            //   false
            // );
            // child.addEventListener(
            //   "raycaster-intersected",
            //   () => {
            //     this.el!.sceneEl!.emit(
            //       "carousel-item-hovered",
            //       { id: child.id },
            //       false
            //     );
            //     child.children[0].setAttribute("visible", "true");
            //     console.log("Hover!: " + child.id);
            //   },
            //   false
            // );
            // child.addEventListener(
            //   "raycaster-intersected-cleared",
            //   () => {
            //     this.el!.sceneEl!.emit(
            //       "carousel-item-hovered-cleared",
            //       { id: child.id },
            //       false
            //     );
            //     child.children[0].setAttribute("visible", "false");
            //     console.log("Clear!: " + child.id);
            //   },
            //   false
            // );
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
