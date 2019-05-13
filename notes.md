## A-Frame component Boilerplate

```
import { BaseComponent } from "../BaseComponent";

interface MyComponent extends BaseComponent {

}

export default AFRAME.registerComponent("mycomponent", {
    schema: {

    },

    init() {
      this.bindMethods();
      this.addEventListeners();
    },

    addEventListeners() {

    },

    removeEventListeners() {

    },

    bindMethods() {
      this.addEventListeners = this.addEventListeners.bind(this);
      this.removeEventListeners = this.removeEventListeners.bind(this);
    },

    tick() {
      
    },

    remove() {
      this.el!.removeObject3D("mesh");
      this.removeEventListeners();
    }
} as MyComponent);
```