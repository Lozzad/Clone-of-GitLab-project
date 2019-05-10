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
        var position = this.el.object3D.position;
        var children = this.el.children;
        var numChildren = children.length;
        var intervalRad = (Math.PI * 2) / numChildren;

        for (var i = 0; i < numChildren; i++) {
            var child = children[i];

            var x = this.data.radius * Math.cos(i * intervalRad) + position.x;
            var y = this.data.radius * Math.sin(i * intervalRad);
            child.setAttribute("position", "" + x + " " + y + " "  + "0");

            // Get the radius of the child's bounding sphere
            var mesh = child.object3D.children[0].children[0];
            mesh.geometry.computeBoundingSphere();
            var rad = mesh.geometry.boundingSphere.radius;

            var ratio = rad / this.data.itemRadius;

            // If ratio is > 1, this means that the item is larger than the
            // maximum item radius, thus it must be shrunk to fit
            if (ratio > 1) {
                mesh.scale.set(1 / ratio, 1 / ratio, 1 / ratio);
            }

            var geom = new THREE.SphereGeometry(this.data.itemRadius);
            var mat = new THREE.MeshBasicMaterial({
                visible: true,
                side: THREE.DoubleSide
            });
            var sphereMesh = new THREE.Mesh(geom, mat);


            var gltf = child.object3D;

            sphereMesh.add(gltf);
            child.setObject3D("mesh", sphereMesh);
            // //child.object3D.add(m2);
            // //child.setObject3D("mesh", mesh);

            child.addEventListener("click", () => {
                this.el.sceneEl.emit("al-carousel-item-clicked", {id: child.id}, false);
                console.log("Click!: " + child.id);
            }, false);

            child.addEventListener("raycaster-intersected", () => {
                this.el.sceneEl.emit("al-carousel-item-hovered", {id: child.id}, false);
                child.children[0].setAttribute("visible", "true");
                console.log("Hover!: " + child.id);
            }, false);

            child.addEventListener("raycaster-intersected-cleared", () => {
                this.el.sceneEl.emit("al-carousel-item-hovered-cleared", {id: child.id}, false);
                child.children[0].setAttribute("visible", "false");
                console.log("Clear!: " + child.id);
            }, false);
        }
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