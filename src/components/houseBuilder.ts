import { BaseComponent } from "../BaseComponent";

interface HouseBuilderComponent extends BaseComponent {

}

export default AFRAME.registerComponent("housebuilder", {
    schema: {
        //property: {type: '', default: x}
    },
    //multiple: false,

    init: function () {
        console.log("Housebuilder init");
    },

    addEventListeners() { },
    removeEventListeners() { },
    bindMethods() { },
} as HouseBuilderComponent);