import { BaseComponent } from "../BaseComponent";

interface HouseBuilderComponent extends BaseComponent {

}

export default AFRAME.registerComponent("houseBuilder", {
    schema: {
        //property: {type: '', default: x}
    },
    //multiple: false,
    init: function () {
        console.log("Housebuilder");
    },
    addEventListeners() { },
    removeEventListeners() { },
    bindMethods() { },
} as HouseBuilderComponent);