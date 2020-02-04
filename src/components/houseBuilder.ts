import { BaseComponent } from "../BaseComponent";

interface HouseBuilderComponent extends BaseComponent {
    buildHouses: () => void;
}

export default AFRAME.registerComponent("housebuilder", {
    schema: {
        //property: {type: '', default: x}
        houseData: { type: 'array' }
    },
    //multiple: false,

    //create the house assets as children of this element, then create the model in position
    buildHouses: function () {
        const marker = document.querySelector("a-marker");
        this.data.houseData.forEach(house => {
            //create the asset
            let asset = document.createElement("a-asset-item");
            asset.setAttribute('id', house.id + "-asset");
            asset.setAttribute('src', '/assets/houses/' + house.id + '.gltf');
            this.el?.appendChild(asset);

            //create and position the model
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
                house.setAttribute('class', 'collidable');
                house.setAttribute('box', { boxID: house.id });
            }
            marker.appendChild(house);
        });
    },

    init: function () {
        console.log("Housebuilder init");
        console.log(this.data.houseData);
        this.buildHouses();
    },

    addEventListeners() { },
    removeEventListeners() { },
    bindMethods() { },
} as HouseBuilderComponent);