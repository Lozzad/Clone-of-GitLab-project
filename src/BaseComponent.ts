import { ComponentDefinition } from "aframe";

export interface BaseComponent extends ComponentDefinition {
    //schema: {},                           //Schema describes properties of the object
    //init() {},                            //called on initiation to instantiate
    //update(),                             //called on init and when components are updated via setattrib
    addEventListeners: () => void;
    bindMethods: () => void;
    removeEventListeners: () => void;
    //tick(),                               //called each frame
    //play(),                               //called on play
    //pause(),                              //called on pause
    //updateSchema()                        //called when comp props changed, modifies schema
    //remove()                              //called when removed from entity
    //this.data                             //parsed component properties
    //this.el                               //ref to the entity html element
    //this.el.sceneEl                       //ref to scene
    //this.id                               //if multiple instances, the id of the instance
}