AFRAME.registerComponent("al-carousel", {
    schema: {
        items: {type: "number", default: 6},
        radius: {type: "number", default: 1},
        thickness: {type: "number", default: 0.25},
        ringVisible: {type: "boolean", default: true}
    },

    // ringGeometry:    THREE.TorusGeometry
    // ringMaterial:    THREE.MeshBasicMaterial
    // ringMesh:        THREE.Mesh
    init() {
        this.bindMethods();
        this.addEventListeners();
        this.createRing();
        this.addChildren();
    },

    bindMethods() {
        this.removeChildren = this.removeChildren.bind(this);
        this.addChildren = this.addChildren.bind(this);
        this.addEventListeners = this.addEventListeners.bind(this);
        this.removeEventListeners = this.removeEventListeners.bind(this);
        this.createRing = this.createRing.bind(this);
    },

    addEventListeners() {

    },

    removeEventListeners() {

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

    removeChildren() {
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

    addChildren() {
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

    update(oldData) {
        // Check & Change the number of tiems
        if (oldData && 
            oldData.items 
            && oldData.items !== this.data.items
        ) {
            this.removeChildren();
            this.addChildren();
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
        var children = this.el.object3DMap.mesh.children;
        // For each item, make them look at the camera's position
        for(var i = 0; i < this.data.items; i++) {
            children[i].lookAt(this.el.sceneEl.camera.position);
        }
    },

    remove() {
        this.removeChildren();
        
        this.el.removeObject3D("mesh");
        this.ringMesh = null;
        this.ringGeometry.dispose();
        this.ringMaterial.dispose();
    }
});