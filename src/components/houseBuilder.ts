import { BaseComponent } from "../BaseComponent";

interface HouseBuilderComponent extends BaseComponent {
    houseData: [] | null;
}

export default AFRAME.registerComponent("housebuilder", {
    schema: {
        //property: {type: '', default: x}
        houseData: { type: 'any', default: null }
    },
    houseData: null,
    //multiple: false,

    init: function () {
        console.log("Housebuilder init");
        console.log(this.houseData);
    },

    addEventListeners() { },
    removeEventListeners() { },
    bindMethods() { },
} as HouseBuilderComponent);