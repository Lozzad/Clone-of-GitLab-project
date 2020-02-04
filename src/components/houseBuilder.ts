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

    buildHouses: function () {
        // this.data.houseData.forEach(house => {
        //     let asset = document.createElement("a-asset-item");
        //     asset.setAttribute('id', house.id + "-asset");
        //     asset.setAttribute('src', '/assets/houses/' + house.id + '.gltf');
        //     //this.el?.appendChild(asset);
        // });
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