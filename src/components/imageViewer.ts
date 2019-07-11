import { BaseComponent } from "../BaseComponent";

interface ImageViewerComponent extends BaseComponent {
    currentSide: number | null;

    flipImage: () => void;
}

export default AFRAME.registerComponent("imageViewer", {
    schema: {
        imageId: { type: "string" }
    },

    currentSide: null,

    init() {
        this.currentSide = 0;
    },
    
    flipImage() {

    },

    addEventListeners() {

    },

    removeEventListeners() {

    },

    bindMethods() {

    },

    tick() {},

    remove() {

    }
} as ImageViewerComponent);