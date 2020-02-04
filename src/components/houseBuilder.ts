import { BaseComponent } from "../BaseComponent";

interface HouseBuilderComponent extends BaseComponent {

}

export default AFRAME.registerComponent("housebuilder", {
    schema: {
        //property: {type: '', default: x}
        houseData: {}
    },
    //multiple: false,

    init: function () {
        console.log("Housebuilder init");
        console.log(this.data.houseData);
    },

    addEventListeners() { },
    removeEventListeners() { },
    bindMethods() { },
} as HouseBuilderComponent);