import { BaseComponent } from "../BaseComponent";

interface HouseBuilderComponent extends BaseComponent {
    buildHouses: () => void;
    createModel: (house: any) => HTMLElement;
    //positionHouses: (parent: HTMLElement) => void;

}

export default AFRAME.registerComponent("housebuilder", {
    //properties are stored in this.data./, used for accepting arguments
    schema: {
        //property: {type: '', default: x}
        houseData: { type: 'array' }
    },

    //multiple: false,                              //if there are multiples of the component

    //position the house models
    // positionHouses: function (parent) {
    //     if (parent == null) {
    //         console.error("marker not found in html");
    //     }
    //     this.data.houseData.forEach(house => {
    //         let model = document.createElement("a-entity");
    //         model.setAttribute('id', house.id);


    //         //console.log(house.posX + " " + house.posY + " " + house.posZ);
    //         //console.log("AAAAAAAAA " + house.id);

    //         model.object3D.position.set(house.posX, house.posY, house.posZ);
    //         model.object3D.rotation.set(
    //             THREE.Math.degToRad(house.rotX),
    //             THREE.Math.degToRad(house.rotY),
    //             THREE.Math.degToRad(house.rotZ)
    //         );
    //         //model.object3D.scale.set(house.scale, house.scale, house.scale);

    //         model.setAttribute('gltf-model', '#' + house.id + '-asset');
    //         model.setAttribute('animation-mixer', { clip: 'closed' });
    //         if (house.collidable) {
    //             model.setAttribute('class', 'collidable');
    //             model.setAttribute('house', { houseID: house.id });
    //         }
    //         marker?.appendChild(model);
    //         console.log(model);
    //     });

    // },

    createModel: function (house) {
        let model = document.createElement("a-entity");
        model.setAttribute('id', house.id);
        model.setAttribute('gltf-model', '#' + house.id + '-asset');
        model.setAttribute('animation-mixer', { clip: 'closed' });
        if (house.collidable) {
            model.setAttribute('class', 'collidable');
            model.setAttribute('house', { houseID: house.id });
        }
        return model;
    },

    //create the house assets as children of this element, then create the model in position
    buildHouses: function () {
        let modelParent = document.getElementById("h");
        if (modelParent == null) {
            console.error("no model parent found");
        }
        this.data.houseData.forEach(house => {
            //create the asset
            let asset = document.createElement("a-asset-item");
            asset.setAttribute('id', house.id + "-asset");
            asset.setAttribute('src', '/assets/houses/' + house.id + '.gltf');
            asset.setAttribute('position', house.posX + " " + house.posY + " " + house.posZ);
            asset.setAttribute('rotation', house.rotX + " " + house.rotY + " " + house.rotZ);
            asset.setAttribute('scale', house.scale + " " + house.scale + " " + house.scale)

            var model = this.createModel(house);
            console.log(model);
            modelParent!.appendChild(model);
            this.el!.appendChild(asset);
        });
    },

    //initialise the component
    init: function () {
        this.bindMethods();
        this.addEventListeners();
        this.buildHouses();
    },

    addEventListeners() {
    },

    removeEventListeners() {
    },

    bindMethods() {
        this.addEventListeners = this.addEventListeners.bind(this);
        this.removeEventListeners = this.removeEventListeners.bind(this);
    },

    remove() {
        this.removeEventListeners();
    }
} as HouseBuilderComponent);