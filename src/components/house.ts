import { BaseComponent } from "../BaseComponent";

interface HouseComponent extends BaseComponent {
    createHouse: () => void;
}

export default AFRAME.registerComponent("house", {
    schema: {
        id: {type: "string"},
        position: {type: "string"},
        rotation: {type: "string", default: "0 0 0"},
        collidable: {type: "boolean", default: true},
        scale: {type: "string", default: "0.1 0.1 0.1"}
    }, 

    init() {
        this.bindMethods();
        this.addEventListeners();
        this.createHouse();
    },

    bindMethods() {
        this.addEventListeners = this.addEventListeners.bind(this);
        this.removeEventListeners = this.removeEventListeners.bind(this);
        this.createHouse = this.createHouse.bind(this);
    },

    addEventListeners() {

    },

    removeEventListeners() {

    },

    createHouse() {

    },


} as HouseComponent);