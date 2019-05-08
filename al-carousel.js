AFRAME.registerComponent("al-carousel", {
    schema:{
        items: {type: "number", default: 6},
        radius: {type: "number", default: 1},
        thickness: {type: "number", default: 0.25}
    },

    // ringGeometry:    THREE.TorusGeometry
    // ringMaterial:    THREE.MeshBasicMaterial
    // ringMesh:        THREE.Mesh
    init() {
        this.ringGeometry = new THREE.TorusGeometry(
            this.data.radius,
            this.data.thickness,
            20,
            6
        );
        this.ringMaterial = new THREE.MeshBasicMaterial();
        this.ringMesh = new THREE.Mesh(this.ringGeometry, this.ringMaterial);

        this.el.setObject3D("mesh", ringMesh);
    },

    bindMethods() {

    },

    addEventListeners() {

    },

    removeEventListeners() {

    },

    update(oldData) {

    },

    tick() {       

    },

    remove() {
        this.el.removeObject3D("mesh");
        this.ringMesh = null;
        this.ringGeometry.dispose();
        this.ringMaterial.dispose();
    }
})