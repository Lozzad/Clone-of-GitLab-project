import { ComponentDefinition } from "aframe";

export interface BaseComponent extends ComponentDefinition {
    //schema: {},                           //TODO: Research this
    //init() {},                            //TODO: Research this
    addEventListeners: () => void;
    bindMethods: () => void;
    removeEventListeners: () => void;
    //tick() {}                             //called each frame
}