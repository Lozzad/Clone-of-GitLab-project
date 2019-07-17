//storing the houses
let houses = [
        {
        "id": "af",
        "posX": -0.3, "posY": 0, "posZ": 2.4,
        "rotX": 0, "rotY": -90, "rotZ": 0,
        "scale": 0.04,
        "collidable": true,
        "childIds": [
            {"id": "af0"}
        ]
    },
    {
        "id": "af2",
        "posX": 0.9, "posY": 0, "posZ": -2.5,
        "rotX": 0, "rotY": 90, "rotZ": 0,
        "scale": 0.04,
        "collidable": false,
        "childIds": []
    },
    {
        "id": "ag",
        "posX": -1.2, "posY": 0, "posZ": 0.3,
        "rotX": 0, "rotY": 0, "rotZ": 0,
        "scale": 0.04,
        "collidable": true,
        "childIds": [
           {"id": "ag0"}//,
           // {"id": "ag1"}
        ]
    },
    {
        "id": "ah",
        "posX": 0.6, "posY": 0, "posZ": -1.2,
        "rotX": 0, "rotY": -90, "rotZ": 0,
        "scale": 0.04,
        "collidable": true,
        "childIds": [
            {"id": "ah0"}
        ]
    },
    {
        "id": "alice",
        "posX": -0.6, "posY": 0, "posZ": 0.3,
        "rotX": 0, "rotY": 180, "rotZ": 0,
        "scale": 0.025,
        "collidable": false,
        "childIds": []
    },
    {
        "id": "aw",
        "posX": -1, "posY": 0, "posZ": -3.5,
        "rotX": 0, "rotY": 90, "rotZ": 0,
        "scale": 0.04,
        "collidable": true,
        "childIds": [
            {"id": "aw0"}
        ]
    },
    {
        "id": "bg",
        "posX": 2.1, "posY": 0, "posZ": -3.5,
        "rotX": 0, "rotY": -120, "rotZ": 0,
        "scale": 0.04,
        "collidable": true,
        "childIds": [
            {"id": "bg0"}
        ]
    },
    {
        "id": "cha",
        "posX": -1.5, "posY": 0, "posZ": 3.5,
        "rotX": 0, "rotY": 180, "rotZ": 0,
        "scale": 0.04,
        "collidable": true,
        "childIds": [
          {"id": "cha0"},
          {"id": "cha1"},
          {"id": "cha2"},
          {"id": "cha3"},
          {"id": "cha4"},
          {"id": "cha5"}
        ]
    },
    {
        "id": "ct",
        "posX": -0.6, "posY": 0, "posZ": 1.2,
        "rotX": 0, "rotY": 180, "rotZ": 0,
        "scale": 0.04,
        "collidable": true,
        "childIds": [
            //{"id": "ct0"},
            //{"id": "ct1"}
        ]
    },
    {
        "id": "dls",
        "posX":  -0.3, "posY": 0, "posZ":0.9,
        "rotX": 0, "rotY": -90, "rotZ": 0,
        "scale": 0.04,
        "collidable": true,
        "childIds": [
            {"id": "dls0"},
            {"id": "dls1"}
        ]
    },
    {
        "id": "eb",
        "posX": 0.9, "posY": 0, "posZ": 0.6,
        "rotX": 0, "rotY": 180, "rotZ": 0,
        "scale": 0.04,
        "collidable": true,
        "childIds": [
            //{"id": "eb0"},
            //{"id": "eb1"}
        ]
    },
    {
        "id": "ef",
        "posX": -1.2, "posY": 0, "posZ":2.7,
        "rotX": 0, "rotY": 180, "rotZ": 0,
        "scale": 0.04,
        "collidable": true,
        "childIds": [
            //{"id": "ef0"}
        ]
    },
    {
        "id": "fc",
        "posX": 1.2, "posY": 0, "posZ": -2,
        "rotX": 0, "rotY": 90, "rotZ": 0,
        "scale": 0.04,
        "collidable": true,
        "childIds": [
            //{"id": "fc0"}
        ]
    },
    {
        "id": "fh",
        "posX": -1.3, "posY": 0, "posZ": -0.3,
        "rotX": 0, "rotY": -90, "rotZ": 0,
        "scale": 0.04,
        "collidable": true,
        "childIds": [
            //{"id": "fh0"}
        ]
    },
    {
        "id": "fs",
        "posX": -1.8, "posY": 0, "posZ": -0.3,
        "rotX": 0, "rotY": -90, "rotZ": 0,
        "scale": 0.04,
        "collidable": true,
        "childIds": [
            //{"id": "fs0"}
        ]
    },
    {
        "id": "ga",
        "posX":2.4, "posY": 0, "posZ": 2.4,
        "rotX": 0, "rotY": 180, "rotZ": 0,
        "scale": 0.04,
        "collidable": true,
        "childIds": [
            //{"id": "ga0"},
            //{"id": "ga1"},
            //{"id": "ga2"}
        ]
    },
    {
        "id": "jd",
        "posX": -0.9, "posY": 0, "posZ": -3,
        "rotX": 0, "rotY": 90, "rotZ": 0,
        "scale": 0.04,
        "collidable": true,
        "childIds": [
            //{"id": "jd0"}
        ]
    },
    {
        "id": "lb",
        "posX": -0.9, "posY": 0, "posZ": 2.4,
        "rotX": 0, "rotY": 180, "rotZ": 0,
        "scale": 0.04,
        "collidable": true,
        "childIds": [
            //{"id": "lb0"}
        ]
    },
    {
        "id": "lk",
        "posX": -0.7, "posY": 0, "posZ": -0.6,
        "rotX": 0, "rotY": 180, "rotZ": 0,
        "scale": 0.04,
        "collidable": true,
        "childIds": [
           // {"id": "lk0"}
        ]
    },
    {
        "id": "lp",
        "posX": -0.1, "posY": 0, "posZ": -0.6,
        "rotX": 0, "rotY": 90, "rotZ": 0,
        "scale": 0.04,
        "collidable": true,
        "childIds": [
            //{"id": "lp0"},
            //{"id": "lp1"}
        ]
    },
    {
        "id": "ls",
        "posX": 0.2, "posY": 0, "posZ": -1.2,
        "rotX": 0, "rotY": 0, "rotZ": 0,
        "scale": 0.04,
        "collidable": true,
        "childIds": [
            //{"id": "ls0"},
            //{"id": "ls1"}
        ]
    },
    {
        "id": "lt",
        "posX": -0.6, "posY": 0, "posZ": -2.1,
        "rotX": 0, "rotY": 90, "rotZ": 0,
        "scale": 0.04,
        "collidable": true,
        "childIds": [
            //{"id": "lt0"}
        ]
    },
    {
        "id": "ma",
        "posX": 0.6, "posY": 0, "posZ": -2,
        "rotX": 0, "rotY": 90, "rotZ": 0,
        "scale": 0.04,
        "collidable": true,
        "childIds": [
            //{"id": "ma0"}
        ]
    },
    {
        "id": "md",
        "posX": 1.5, "posY": 0, "posZ": -1.2,
        "rotX": 0, "rotY": 180, "rotZ": 0,
        "scale": 0.04,
        "collidable": true,
        "childIds": [
           // {"id": "md0"},
           // {"id": "md1"}
        ]
    },
    {
        "id": "nl",
        "posX": 1.5, "posY": 0, "posZ": -0.6,
        "rotX": 0, "rotY": 180, "rotZ": 0,
        "scale": 0.04,
        "collidable": true,
        "childIds": [
            //{"id": "nl0"}
        ]
    },
    {
        "id": "ollie",
        "posX": 0, "posY": 0, "posZ": 3.5,
        "rotX": 0, "rotY": -90, "rotZ": 0,
        "scale": 0.04,
        "collidable": true,
        "childIds": [
            {"id": "ollie0"}
        ]
    },
    {
        "id": "pb",
        "posX": 2.4, "posY": 0, "posZ": 3.5,
        "rotX": 0, "rotY": 180, "rotZ": 0,
        "scale": 0.04,
        "collidable": false,
        "childIds": []
    },
    {
        "id": "rc",
        "posX": 0.3, "posY": 0, "posZ": 1.5,
        "rotX": 0, "rotY": 0, "rotZ": 0,
        "scale": 0.04,
        "collidable": false,
        "childIds": []
    },
    {
        "id": "rmj",
        "posX": 0, "posY": 0, "posZ": 1.8,
        "rotX": 0, "rotY": -90, "rotZ": 0,
        "scale": 0.04,
        "collidable": true,
        "childIds": [
            //{"id": "rmj0"}
        ]
    },
    {
        "id": "rw",
        "posX": -0.5, "posY": 0, "posZ": -1.2,
        "rotX": 0, "rotY": 180, "rotZ": 0,
        "scale": 0.04,
        "collidable": true,
        "childIds": [
           // {"id": "rw0"}
        ]
    },
    {
        "id": "ss",
        "posX": -1.8, "posY": 0, "posZ": 0.6,
        "rotX": 0, "rotY": -90, "rotZ": 0,
        "scale": 0.04,
        "collidable": true,
        "childIds": [
            //{"id": "ss0"}
        ]
    },
    {
        "id": "za",
        "posX": -0.3, "posY": 0, "posZ": -1.8,
        "rotX": 0, "rotY": 90, "rotZ": 0,
        "scale": 0.04,
        "collidable": true,
        "childIds": [
            //{"id": "za0"},
            //{"id": "za1"}
        ]
    }
];

let objects = new Map([
  ["af0", 0.1],
  ["ag0", 0.1],
  ["ah0", 0.1],
  ["aw0", 0.1],
  ["bg0", 0.1],
  ["cha0", 1.2],
  ["cha1", 1.2],
  ["cha2", 1.2],
  ["cha3", 3],
  ["cha4", 0.025],
  ["cha5", 0.1],
  ["dls0", 0.1],
  ["dls1", 0.1],
  ["ollie0", 0.1]
]);

//add the assets to the html to preload them
function addAssets() {
    let assetParent = document.querySelector("a-assets");
    houses.forEach(house => {
        let asset = document.createElement("a-asset-item");
        asset.setAttribute('id', house.id + "-asset");
        asset.setAttribute('src', '/assets/houses/' + house.id + '.gltf')
        assetParent.appendChild(asset);
    });
    Array.from(objects.keys()).forEach(id => {
        let asset = document.createElement("a-asset-item");
        asset.setAttribute('id', id + "-asset");
        asset.setAttribute('src', '/assets/objects/' + id + '.gltf')
        assetParent.appendChild(asset);
    })
}

//creates the house entities
function addHouses() {
    houses.forEach(houseData => {
        let marker = document.querySelector("a-marker");
        let house = document.createElement("a-entity");

        house.setAttribute('id', houseData.id);
        house.object3D.position.set(houseData.posX - 0.3, houseData.posY, houseData.posZ - 2);
        house.object3D.rotation.set(
            THREE.Math.degToRad(houseData.rotX),
            THREE.Math.degToRad(houseData.rotY),
            THREE.Math.degToRad(houseData.rotZ)
        );
        house.object3D.scale.set(houseData.scale, houseData.scale, houseData.scale);
        house.setAttribute('gltf-model', '#' + houseData.id + '-asset');
        house.setAttribute('animation-mixer', {clip: 'closed'});
        if (houseData.collidable) {
            house.setAttribute('class', 'collidable');
            let carousel = createCarousel(houseData.id, houseData.childIds);
            house.appendChild(carousel);
            house.setAttribute('box', {carouselId: houseData.id + "-carousel"});
        }
        marker.appendChild(house);
    });
}

//creates the carousel entities and sub entities
function createCarousel(id, childIds) {
    let carousel = document.createElement("a-entity");
    carousel.object3D.rotation.set(
        THREE.Math.degToRad(90),
        THREE.Math.degToRad(0),
        THREE.Math.degToRad(90)
    );
    carousel.setAttribute('id', id + "-carousel");
    carousel.object3D.position.set(0, 1, -0.25);
    carousel.object3D.scale.set(0.25, 0.25, 0.25);

    let carouselChild = document.createElement("a-entity");
    carouselChild.setAttribute('carousel', {radius: 0.4, thickness: 0.01, ringVisible: true, itemRadius: 0.1});

    childIds.forEach(child => {
        //create the carousel item
        let object = document.createElement("a-entity");
        object.setAttribute("id", child.id);
        object.setAttribute("gltf-model", '#' + child.id + '-asset');
        let objectScale = objects.get(child.id);
        object.object3D.scale.set(objectScale, objectScale, objectScale);
        carouselChild.appendChild(object);
    });

    carousel.appendChild(carouselChild);
    console.log("created carousel:" + carousel);

    return carousel;
}

addAssets();
addHouses();
