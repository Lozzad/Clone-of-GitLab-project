AFRAME.registerComponent("three-ar-js-aframe", {
    schema:{
        
    },

    // vrDisplay
    // arView
    // vrControls
    init() {
        THREE.ARUtils.getARDisplay().then(function (display) {
            if (display) {
                this.vrDisplay = display;
                
                var scene = this.el.scene;
                var renderer = scene.renderer;
        
                // Setup the three.js rendering environment
                renderer.setPixelRatio(window.devicePixelRatio);
                renderer.setSize(window.innerWidth, window.innerHeight);
                renderer.autoClear = false;
        
                // Creating the ARView, which is the object that handles
                // the rendering of the camera stream behind the three.js
                // scene
                this.arView = new THREE.ARView(this.vrDisplay, renderer);
        
                // The ARPerspectiveCamera is very similar to THREE.PerspectiveCamera,
                // except when using an AR-capable browser, the camera uses
                // the projection matrix provided from the device, so that the
                // perspective camera's depth planes and field of view matches
                // the physical camera on the device.
                scene.camera = new THREE.ARPerspectiveCamera(
                    vrDisplay,
                    60,
                    window.innerWidth / window.innerHeight,
                    vrDisplay.depthNear,
                    vrDisplay.depthFar
                );
        
                // VRControls is a utility from three.js that applies the device's
                // orientation/position to the perspective camera, keeping our
                // real world and virtual world in sync.
                this.vrControls = new THREE.VRControls(camera);
        
                // Bind our methods
                this.bindMethods();
                this.addEventListeners();
            } else {
                THREE.ARUtils.displayUnsupportedMessage();
            }
        });
    },

    bindMethods() {
        this.onWindowResize = this.onWindowResize.bind(this);
    },

    addEventListeners() {
        window.addEventListener('resize', this.onWindowResize, false);
    },

    removeEventListeners() {
        window.removeEventListener('resize', this.onWindowResize);
    },

    onWindowResize() {
        if (this.vrDisplay) {
            var renderer = scene.renderer;

            scene.camera.aspect = window.innerWidth / window.innerHeight;
            scene.camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
    },

    update() {

    },

    tick() {       
        if (this.vrDisplay) { 
            var scene = this.el.scene;
            var renderer = scene.renderer;
            var camera = scene.camera;

            // Clears color from the frame before rendering the camera (arView) or scene.
            renderer.clearColor();

            // Render the device's camera stream on screen first of all.
            // It allows to get the right pose synchronized with the right frame.
            this.arView.render();

            // Update our camera projection matrix in the event that
            // the near or far planes have updated
            camera.updateProjectionMatrix();

            // Update our perspective camera's positioning
            this.vrControls.update();

            // Render our three.js virtual scene
            renderer.clearDepth();
            renderer.render(scene, camera);
        }
    },

    remove() {
        this.removeEventListeners();
    }
})