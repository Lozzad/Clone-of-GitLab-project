import { BaseComponent } from "../BaseComponent";

interface HouseBuilderComponent extends BaseComponent {
    buildHouses: () => void;
    positionHouses: () => void;

}

export default AFRAME.registerComponent("housebuilder", {
    //properties are stored in this.data./, used for accepting arguments
    schema: {
        //property: {type: '', default: x}
        houseData: { type: 'array' }
    },

    //multiple: false,                              //if there are multiples of the component

    //position the house models
    positionHouses: function () {
        let marker = document.querySelector("a-marker");
        this.data.houseData.forEach(house => {
            let model = document.createElement("a-entity");
            model.setAttribute('id', house.id);

            model.object3D.position.set(house.posX - 0.3, house.posY, -1 * house.posZ - 1.5);
            model.object3D.rotation.set(
                THREE.Math.degToRad(house.rotX),
                THREE.Math.degToRad(house.rotY),
                THREE.Math.degToRad(house.rotZ)
            );
            model.object3D.scale.set(house.scale, house.scale, house.scale);

            model.setAttribute('gltf-model', '#' + house.id + '-asset');
            model.setAttribute('animation-mixer', { clip: 'closed' });
            if (house.collidable) {
                model.setAttribute('class', 'collidable');
                model.setAttribute('house', { houseID: house.id });
            }
            marker.appendChild(model);
        });
    },

    //create the house assets as children of this element, then create the model in position
    buildHouses: function () {
        this.data.houseData.forEach(house => {
            //create the asset
            let asset = document.createElement("a-asset-item");
            asset.setAttribute('id', house.id + "-asset");
            asset.setAttribute('src', '/assets/houses/' + house.id + '.gltf');
            this.el!.appendChild(asset);
        });
    },

    //initialise the component
    init: function () {
        this.buildHouses();
    },

    addEventListeners() {
        let scene = document.querySelector("a-scene");

        if (scene.hasLoaded) {
            console.log("Loaded: positioning houses");
            this.positionHouses();
        } else {
            scene.addEventListener("loaded", () => {
                console.log("positioning the houses!")
                this.positionHouses();
            });
        }
    },

    removeEventListeners() { },
    bindMethods() { },
} as HouseBuilderComponent);