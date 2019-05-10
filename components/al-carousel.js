AFRAME.registerComponent("al-carousel", {
    schema: {
        radius: {type: "number", default: 1},
        thickness: {type: "number", default: 0.25},
        ringVisible: {type: "boolean", default: true},
        itemRadius: {type: "number", default: 1}
    },

    // ringGeometry:    THREE.TorusGeometry
    // ringMaterial:    THREE.MeshBasicMaterial
    // ringMesh:        THREE.Mesh
    init() {
        this.bindMethods();
        this.addEventListeners();
        this.createRing();
        //this.addDebugChildren();
    },

    bindMethods() {
        this.removeDebugChildren = this.removeDebugChildren.bind(this);
        this.addDebugChildren = this.addDebugChildren.bind(this);

        this.addEventListeners = this.addEventListeners.bind(this);
        this.removeEventListeners = this.removeEventListeners.bind(this);
        this.createRing = this.createRing.bind(this);
        this.sceneLoaded = this.sceneLoaded.bind(this);
    },

    addEventListeners() {
        this.el.sceneEl.addEventListener("loaded", this.sceneLoaded, false);
    },

    removeEventListeners() {
        this.el.sceneEl.removeEventListener("loaded", this.sceneLoaded, false);
    },

    createRing() {
        this.ringGeometry = new THREE.TorusGeometry(
            this.data.radius,
            this.data.thickness,
            6,
            40
        );
        this.ringMaterial = new THREE.MeshBasicMaterial({
            visible: this.data.ringVisible,
            color: 0x0000ff
        });
        this.ringMesh = new THREE.Mesh(this.ringGeometry, this.ringMaterial);
    },

    removeDebugChildren() {
        // Dispose of each child object
        for(var i = 0; i < this.data.items; i++) {
            var child = this.ringMesh.children[i].object3D;

            var geom = child.geometry;
            if (geom) {
                geom.dispose();
            }

            var mat = child.material;
            if (mat) {
                mat.dispose();
            }
        }
        this.el.setObject3D("mesh", this.ringMesh);
    },

    addDebugChildren() {
        var position = this.el.object3D.position;

        var intervalRad = (Math.PI * 2) / this.data.items;

        for (var i = 0; i < this.data.items; i++) {
            var geom = new THREE.BoxGeometry(
                this.data.radius / 5,
                this.data.radius / 5,
                this.data.radius / 5
            );
            var mat = new THREE.MeshBasicMaterial({
                color: 0x00ff00
            });
            var placeHolder = new THREE.Mesh(geom, mat);

            var x = this.data.radius * Math.cos(i * intervalRad) + position.x;
            var y = this.data.radius * Math.sin(i * intervalRad);
            placeHolder.position.set(x, y, 0);

            // Add as a child of the ring mesh
            this.ringMesh.add(placeHolder);
        }
        this.el.setObject3D("mesh", this.ringMesh);
    },

    sceneLoaded() {
        var children = this.el.children;
        var numChildren = children.length;
        
        for (var i = 0; i < numChildren; i++) {
            var child = children[i];            
            child.addEventListener("model-loaded", this.modelLoaded.bind(child), false);
        }
    },

    modelLoaded(ev) {

        var model = ev.detail.model;

        var carousel = this.parentEl;
        var radius = carousel.components["al-carousel"].data.radius;
        var itemRadius = carousel.components["al-carousel"].data.itemRadius;
        var index = Array.from(carousel.children).indexOf(this);
        var intervalRad = (Math.PI * 2) / carousel.children.length;
        var position = carousel.object3D.position;
        
        // Compute the bounding sphere radius of the scene
        var box3 = new THREE.Box3();
        box3.setFromObject(model);

        var dist = box3.min.distanceTo(box3.max) / 2;
        // var sphere = new THREE.Sphere(1);
        // box3.getBoundingSphere(sphere);

        var ratio = dist / itemRadius;

        // If ratio is > 1, this means that the item is larger than the
        // maximum item radius, thus it must be shrunk to fit
        // if (ratio > 1) {
        //     model.scale.set(1 / ratio, 1 / ratio, 1 / ratio);
        // }

        // var geom = new THREE.SphereGeometry(itemRadius);
        // var mat = new THREE.MeshBasicMaterial({
        //     visible: true,
        //     wireframe: false,
        //     side: THREE.DoubleSide
        // });
        // var sphereMesh = new THREE.Mesh(geom, mat);

        //sphereMesh.add(model);

        //this.setObject3D("mesh", sphereMesh);

        var x = radius * Math.cos(index * intervalRad) + position.x;
        var y = radius * Math.sin(index * intervalRad);
        this.setAttribute("position", "" + x + " " + y + " "  + "0");

        this.children[0].addEventListener("click", function(ev) {
            ev.preventDefault();
            this.sceneEl.emit("al-carousel-item-clicked", {id: this.id});
            console.log("Click!: " + this.id);
            //this.object3D.children[0].material.color = "#00ff00";
        }, true);

        this.children[0].addEventListener("raycaster-intersected", function(ev) {
            ev.preventDefault();
            this.sceneEl.emit("al-carousel-item-hovered", {id: this.id});
            //child.children[0].setAttribute("visible", "true");
            console.log("Hover!: " + this.id);
            //this.object3D.children[0].material.color = "#ff0000";
        }, true);

        this.children[0].addEventListener("raycaster-intersected-cleared", function(ev) {
            ev.preventDefault();
            this.sceneEl.emit("al-carousel-item-hovered-cleared", {id: this.id});
            //child.children[0].setAttribute("visible", "false");
            console.log("Clear!: " + this.id);
            //this.object3D.children[0].material.color = "#ffffff";
        }, true);
    },

    update(oldData) {
        // Check & Change the number of tiems
        if (oldData && 
            oldData.items 
            && oldData.items !== this.data.items
        ) {
            this.removeDebugChildren();
            this.addDebugChildren();
        }

        // Check & Change Visibility of the Ring
        if (oldData && 
            oldData.ringVisible 
            && oldData.ringVisible !== this.data.ringVisible
        ) {
            this.ringMesh.material.visible = this.data.ringVisible;
        }
    },

    tick() {       
        // var children = this.el.object3DMap.mesh.children;
        // // For each item, make them look at the camera's position
        // for(var i = 0; i < this.data.items; i++) {
        //     children[i].lookAt(this.el.sceneEl.camera.position);
        // }
    },

    remove() {
        //this.removeDebugChildren();
        
        this.el.removeObject3D("mesh");
        this.ringMesh = null;
        this.ringGeometry.dispose();
        this.ringMaterial.dispose();
    }
});