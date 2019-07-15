"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./components/carousel");
require("./components/look-to-camera");
require("./components/box");
var scene, video, overlay, viewer, carouselMenu, prevButton, nextButton, itemButton;
var state = {
    selectedItem: null,
    boxOpened: false
};
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
    if (state.selectedItem) {
        scene.classList.add("hide");
        video.classList.add("hide");
        overlay.classList.remove("hide");
        viewer.contentWindow.postMessage({
            src: state.selectedItem
        }, window.location.href);
    }
    else {
        scene.classList.remove("hide");
        video.classList.remove("hide");
        overlay.classList.add("hide");
    }
    if (state.boxOpened) {
        carouselMenu.classList.remove("hide");
    }
    else {
        carouselMenu.classList.add("hide");
    }
}
window.addEventListener("DOMContentLoaded", function () {
    scene = document.querySelector("a-scene");
    overlay = document.getElementById("overlay");
    viewer = document.getElementById("viewer");
    carouselMenu = document.getElementById("carousel-menu");
    prevButton = document.getElementById("carousel-prev-button");
    itemButton = document.getElementById("carousel-item-button");
    nextButton = document.getElementById("carousel-next-button");
    scene.addEventListener("loaded", function () {
    });
    scene.addEventListener("box-opened", function () {
        state.boxOpened = true;
        render();
    }, false);
    scene.addEventListener("box-closing", function () {
        state.boxOpened = false;
        render();
    }, false);
    scene.addEventListener("carousel-item-selected", function (ev) {
        var id = ev.detail.id;
        var asset = document.getElementById(id + "-asset");
        if (asset) {
            state.selectedItem = asset.getAttribute("src");
        }
        render();
    }, false);
    window.addEventListener("message", function (event) {
        if (event.data === "close") {
            state.selectedItem = null;
            render();
        }
    }, false);
    prevButton.addEventListener("click", function () {
        scene.emit("rotate-carousel", {
            direction: -1
        });
    }, false);
    itemButton.addEventListener("click", function () {
        scene.emit("select-carousel-item");
    }, false);
    nextButton.addEventListener("click", function () {
        scene.emit("rotate-carousel", {
            direction: 1
        });
    }, false);
    resize();
});
