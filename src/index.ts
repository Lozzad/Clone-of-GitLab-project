import "./components/houseBuilder";
import "./components/house";
import houses from "./newHouseData.json";

var scene,
  video,
  overlay,
  viewer,
  carouselMenu;

interface AppState {
  selectedItem: string | null;
  selectedUrl: string | null;
  houseID: string | null;
  houseOpened: boolean;
}

var state = {
  selectedItem: null,
  selectedUrl: null,
  houseOpened: false,
  houseID: null
} as AppState;

// enable to resize all the scene when we move the marker on the camera
function resize() {
  if (overlay) {
    overlay.width = window.innerWidth;
    overlay.height = window.innerHeight;
  }
  if (viewer) {
    viewer.width = window.innerWidth;
    viewer.height = window.innerHeight;
  }
  if (carouselMenu) {
    carouselMenu.style.top = window.innerHeight - carouselMenu.clientHeight;
  }
}

window.addEventListener("resize", function () {
  resize();
});

function render() {
  video = document.querySelector("video");
  // if an item is selected, the scene should be hode in order to display the viewer
  if (state.selectedItem) {
    scene.classList.add("hide");
    video.classList.add("hide");
    overlay.classList.remove("hide");
    viewer.contentWindow.postMessage(
      {
        src: state.selectedItem,
        href: state.selectedUrl
      },
      window.location.href
    );
  } else {
    scene.classList.remove("hide");
    video.classList.remove("hide");
    overlay.classList.add("hide");
  }
}

window.addEventListener("DOMContentLoaded", function () {
  scene = document.querySelector("a-scene");
  overlay = document.getElementById("overlay");
  viewer = document.getElementById("viewer");

  //initialise the housebuilder element with the data from the JSON
  scene.setAttribute('housebuilder', { houseData: houses });

  scene.addEventListener("loaded", () => {
    //here for when content has fully loaded 
    console.log("loaded");
  });


  // when the house is open, must display the object inside (the map for now) - func removed at the moment
  scene.addEventListener("house-opened", (ev: CustomEvent) => {
    const id: string = ev.detail.id;
    const url: string = ev.detail.url;

    if (url) {
      state.selectedUrl = url;
    } else {
      state.selectedUrl = null;
    }

    var asset: HTMLElement | null = document.getElementById(id + "0-asset");
    console.log(asset);
    if (asset) {
      state.selectedItem = asset.getAttribute("src") as string;
    }

    state.houseOpened = true;

    render();
  }, false);

  scene.addEventListener("house-closing", () => {
    state.houseOpened = false;
    render();
  }, false);

  // tool for debugin in the console
  scene.addEventListener("house-id-selected", (ev: CustomEvent) => {
    const id: string = ev.detail.id;
    state.houseID = id;
    console.log("I got the message: " + id);
  });

  resize();
});
