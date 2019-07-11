import { BaseComponent } from "../BaseComponent";

interface ImageViewerComponent extends BaseComponent {
    currentSide: number;

    sceneLoaded: () => void;
    flipImage: () => void;
}

export default AFRAME.registerComponent("imageViewer", {
    schema: {
        imageId: { type: "string" }
    },

    image: null,

} as ImageViewerComponent);