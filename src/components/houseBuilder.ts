import { BaseComponent } from "../BaseComponent";

interface HouseBuilderComponent extends BaseComponent {
    buildHouses: () => void;
    createModel: (house: any) => HTMLElement;
    drawLine: (posX: number, posY: number) => HTMLElement;
    //positionHouses: (parent: HTMLElement) => void;

}

export default AFRAME.registerComponent("housebuilder", {
    //properties are stored in this.data./, used for accepting arguments
    schema: {
        //property: {type: '', default: x}
        houseData: { type: 'array' }
    },

    //multiple: false,                              //if there are multiples of the component

    //position the house models
    // positionHouses: function (parent) {
    //     if (parent == null) {
    //         console.error("marker not found in html");
    //     }
    //     this.data.houseData.forEach(house => {
    //         let model = document.createElement("a-entity");
    //         model.setAttribute('id', house.id);


    //         //console.log(house.posX + " " + house.posY + " " + house.posZ);
    //         //console.log("AAAAAAAAA " + house.id);

    //         model.object3D.position.set(house.posX, house.posY, house.posZ);
    //         model.object3D.rotation.set(
    //             THREE.Math.degToRad(house.rotX),
    //             THREE.Math.degToRad(house.rotY),
    //             THREE.Math.degToRad(house.rotZ)
    //         );
    //         //model.object3D.scale.set(house.scale, house.scale, house.scale);

    //         model.setAttribute('gltf-model', '#' + house.id + '-asset');
    //         model.setAttribute('animation-mixer', { clip: 'closed' });
    //         if (house.collidable) {
    //             model.setAttribute('class', 'collidable');
    //             model.setAttribute('house', { houseID: house.id });
    //         }
    //         marker?.appendChild(model);
    //         console.log(model);
    //     });

    // },

    createModel: function (house) {

        //look into confi1.html 

        let model = document.createElement("a-entity");
        model.setAttribute('id', house.id);
        model.setAttribute('gltf-model', '#' + house.id + '-asset');
        model.setAttribute('animation-mixer', { clip: 'closed' });
        model.setAttribute('position', house.posX + " " + house.posY + " " + house.posZ)
        if (house.collidable) {
            model.setAttribute('class', 'collidable');
            model.setAttribute('house', { houseID: house.id });
        }
        //model.object3D.position.set(house.posX, house.posY, house.posZ);
        //console.log(house.posX + " " + house.posY + " " + house.posZ);
        //console.log(model.object3D.position);
        // model.object3D.rotation.set(
        //     THREE.Math.degToRad(house.rotX),
        //     THREE.Math.degToRad(house.rotY),
        //     THREE.Math.degToRad(house.rotZ)
        // );
        model.object3D.scale.set(house.scale, house.scale, house.scale);
        return model;
    },

    drawLine: function (posX, posY) {
        let line = document.createElement("a-entity");
        line.setAttribute("start", "0, 0, 0");
        line.setAttribute("end", posX + " 0 " + posY);
        line.setAttribute("color", "red");
        return line;
    },

    //create the house assets as children of this element, then create the model in position
    buildHouses: function () {
        let assetParent = document.querySelector("a-assets");
        let modelParent = document.getElementById("house models");
        if (modelParent == null) {
            console.error("no model parent found");
        }

        var count = 0;

        this.data.houseData.forEach(house => {
            //create the asset
            let asset = document.createElement("a-asset-item");
            asset.setAttribute('id', house.id + "-asset");
            asset.setAttribute('src', '/assets/housesNew/' + house.id + '.glb');
            asset.setAttribute('position', house.posX + " " + house.posY + " " + house.posZ);
            asset.setAttribute('rotation', house.rotX + " " + house.rotY + " " + house.rotZ);
            asset.setAttribute('scale', house.scale + " " + house.scale + " " + house.scale)
            assetParent.appendChild(asset);
            //important that thi comes after the asset is appended
            modelParent!.appendChild(this.createModel(house)).appendChild(this.drawLine(house.posX, house.posY));
            count++;
        });
        console.log("spawned " + count + "houses!");
    },

    //initialise the component
    init: function () {
        console.log("init housebuilder");
        this.bindMethods();
        this.addEventListeners();
        this.buildHouses();
    },

    addEventListeners() {
    },

    removeEventListeners() {
    },

    bindMethods() {
        this.addEventListeners = this.addEventListeners.bind(this);
        this.removeEventListeners = this.removeEventListeners.bind(this);
    },

    remove() {
        this.removeEventListeners();
    }
} as HouseBuilderComponent);