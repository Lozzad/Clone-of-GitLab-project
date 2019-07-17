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

interface AppState {
	selectedItem: string | null;
	boxOpened: boolean;
}

var state = {
	selectedItem: null,
	boxOpened: false
} as AppState;

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

  if (state.selectedItem) {
    scene.classList.add("hide");
    video.classList.add("hide");
		overlay.classList.remove("hide");
		viewer.contentWindow.postMessage(
			{
				src: state.selectedItem
			},
			window.location.href
		);
  } else {
    scene.classList.remove("hide");
    video.classList.remove("hide");
    overlay.classList.add("hide");
	}
	
	if (state.boxOpened) {
		carouselMenu.classList.remove("hide");
	} else {
		carouselMenu.classList.add("hide");
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

	scene.addEventListener("loaded", () => {
		
	});

	scene.addEventListener("box-opened", () => {
		state.boxOpened = true;
		render();
	}, false);

	scene.addEventListener("box-closing", () => {
		state.boxOpened = false;
		render();
	}, false);

	scene.addEventListener("carousel-item-selected", (ev: CustomEvent) => {
		const id: string = ev.detail.id;

    var asset: HTMLElement | null = document.getElementById(id + "-asset");
    console.log(asset);

		if (asset) {
			state.selectedItem = asset.getAttribute("src") as string;
		}

		render();
	}, false);

  window.addEventListener(
    "message",
    (event) => {
      if (event.data === "close") {
        state.selectedItem = null;
        render();
      }
    },
    false
  );

  prevButton.addEventListener(
    "click",
    () => {
      scene.emit("rotate-carousel", {
        direction: -1
      });
    },
    false
  );

  itemButton.addEventListener(
    "click",
    () => {
      scene.emit("select-carousel-item");
    },
    false
  );

  nextButton.addEventListener(
    "click",
    () => {
      scene.emit("rotate-carousel", {
        direction: 1
      });
    },
    false
  );

  resize();
});
