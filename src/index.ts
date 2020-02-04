//import "./components/carousel";
//import "./components/look-to-camera";
import "./components/box";

var scene,
  video,
  overlay,
  viewer,
  carouselMenu,
  raycaster,
  mark;


interface AppState {
  selectedItem: string | null;
  selectedUrl: string | null;
  houseID: string | null;
  boxOpened: boolean;
}

var state = {
  selectedItem: null,
  selectedUrl: null,
  boxOpened: false,
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

  // usefull for the carrousel
  // if (state.boxOpened) {
  //   // console.log(state.boxOpened);
  //   // carouselMenu.classList.remove("hide");
  // } else {
  //   // carouselMenu.classList.add("hide");
  // }
}

window.addEventListener("DOMContentLoaded", function () {
  scene = document.querySelector("a-scene");
  overlay = document.getElementById("overlay");
  viewer = document.getElementById("viewer");
  raycaster = document.querySelector('[ar-raycaster]');
  mark = document.querySelector('#cursor');

  scene.addEventListener("loaded", () => {
    //here for when content has fully loaded 

  });


  // when the house is open, must display the object inside (the map for know)
  scene.addEventListener("box-opened", (ev: CustomEvent) => {
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

    state.boxOpened = true;

    render();
  }, false);


  // usefull for displayed an other image (not successfull for now)
  // nextImage.addEventListener("click", (ev:CustomEvent) => {
  //   const id: string = ev.detail.id;
  //
  //   var asset2: HTMLElement | null = document.getElementById(id + "1-asset");
  //   console.log(asset2);
  //   if (asset2) {
  //     state.selectedItem = asset2.getAttribute("src") as string;
  //   };
  //
  //   render();
  // }, false);


  scene.addEventListener("box-closing", () => {
    state.boxOpened = false;
    render();
  }, false);

  // tool for debugin in the console
  scene.addEventListener("box-id-selected", (ev: CustomEvent) => {
    const id: string = ev.detail.id;
    state.houseID = id;
    console.log("I got the message: " + id);
  });

  raycaster.addEventListener("raycaster-intersection", (evt: CustomEvent) => {
    // Turn the mark green and move it to the intersection point.
    console.log("hit one " + evt.detail.intersections[0]);
    mark.setAttribute('color', 'yellow');
    mark.setAttribute('position', evt.detail.intersections[0].point);
    mark.setAttribute('visible', 'true');
  });

  raycaster.addEventListener("raycaster-intersection-cleared", () => {
    // Turn the mark red.
    // mark.setAttribute('color', 'red');
    mark.setAttribute('visible', 'false');
  });


  //window.addEventListener();

  resize();

});
