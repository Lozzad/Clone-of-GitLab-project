import "./components/carousel";
import "./components/look-to-camera";
import "./components/box";

var scene,
  video,
  overlay,
  viewer,
  carouselMenu,
  prevButton,
  nextButton,
  itemButton;

var state = {
  overlayVisible: false
};

function viewObjectInOverlay(src) {
  viewer.contentWindow.postMessage(
    {
      src: src
    },
    window.location.href
  );

  state.overlayVisible = true;

  render();
}

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

window.addEventListener("resize", function() {
  resize();
});

function render() {
  video = document.querySelector("video");

  if (state.overlayVisible) {
    scene.classList.add("hide");
    video.classList.add("hide");
    overlay.classList.remove("hide");
  } else {
    scene.classList.remove("hide");
    video.classList.remove("hide");
    overlay.classList.add("hide");
  }
}

window.addEventListener("DOMContentLoaded", function() {
  scene = document.querySelector("a-scene");
  overlay = document.getElementById("overlay");
  viewer = document.getElementById("viewer");
  carouselMenu = document.getElementById("carousel-menu");
  prevButton = document.getElementById("carousel-prev-button");
  itemButton = document.getElementById("carousel-item-button");
  nextButton = document.getElementById("carousel-next-button");

	scene.addEventListener(
    "carousel-item-clicked",
    function(event) {
      var id = event.detail.id;
      var asset = document.getElementById(id + "-asset");

      if (asset) {
        viewObjectInOverlay(asset.getAttribute("src"));
      }
    },
    false
  );

  window.addEventListener(
    "message",
    function(event) {
      if (event.data === "close") {
        state.overlayVisible = false;
        render();
      }
    },
    false
  );

  prevButton.addEventListener(
    "click",
    function() {
      scene.emit("rotate", {
        direction: -1
      });
    },
    false
  );

  itemButton.addEventListener(
    "click",
    function() {
      console.log("item");
    },
    false
  );

  nextButton.addEventListener(
    "click",
    function() {
      scene.emit("rotate", {
        direction: 1
      });
    },
    false
  );

  resize();
});
