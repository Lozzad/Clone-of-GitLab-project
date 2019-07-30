import "./components/carousel";
import "./components/look-to-camera";
import "./components/box";
import "../viewer.html";

var scene,
  video,
  overlay,
  viewer,
  carouselMenu,
  // prevButton,
  // nextButton,
  // itemButton,
  raycaster,
  mark,
  // test,
  nextImage;

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

	if (state.boxOpened) {
    // console.log(state.boxOpened);
		// carouselMenu.classList.remove("hide");
    } else {
    // carouselMenu.classList.add("hide");
	}
}

window.addEventListener("DOMContentLoaded", function() {
  scene = document.querySelector("a-scene");
  overlay = document.getElementById("overlay");
  viewer = document.getElementById("viewer");
  raycaster = document.querySelector('[ar-raycaster]');
  mark = document.querySelector('#cursor');
  nextImage = viewer.contentDocument.querySelector('#nextImage');
  // test = document.querySelector('#cube');

  // carouselMenu = document.getElementById("carousel-menu");
  // prevButton = document.getElementById("carousel-prev-button");
  // itemButton = document.getElementById("carousel-item-button");
  // nextButton = document.getElementById("carousel-next-button");

	scene.addEventListener("loaded", () => {
	});

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

  console.log(nextImage);
  nextImage.addEventListener("click", (ev:CustomEvent) => {
    const id: string = ev.detail.id;

    var asset2: HTMLElement | null = document.getElementById(id + "1-asset");
    console.log(asset2);
    if (asset2) {
      state.selectedItem = asset2.getAttribute("src") as string;
    };

    render();
  }, false);


	scene.addEventListener("box-closing", () => {
		state.boxOpened = false;
		render();
  }, false);

  scene.addEventListener("box-id-selected", (ev: CustomEvent) => {
    const id: string = ev.detail.id;
    state.houseID = id;
    console.log("I got the message: "+id);
  });

  scene.addEventListener("carousel-item-selected", (ev: CustomEvent) => {
		const id: string = ev.detail.id;

    var asset: HTMLElement | null = document.getElementById(id + "-asset");

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
        console.log("viewer closed");
        scene.emit("closed-viewer");
        render();
      }
    },
    false
  );

  // prevButton.addEventListener(
  //   "click",
  //   () => {
  //     scene.emit("rotate-carousel", {
  //       direction: -1
  //     });
  //   },
  //   false
  // );

  // itemButton.addEventListener(
  //   "click",
  //   () => {
  //     scene.emit("select-carousel-item");
  //   },
  //   false
  // );

  // nextButton.addEventListener(
  //   "click",
  //   () => {
  //     scene.emit("rotate-carousel", {
  //       direction: 1
  //     });
  //   },
  //   false
  // );

  raycaster.addEventListener("raycaster-intersection", (evt: CustomEvent) => {
    // Turn the mark green and move it to the intersection point.
    console.log("hit one "+evt.detail.intersections[0]);
    mark.setAttribute('color', 'yellow');
    mark.setAttribute('position', evt.detail.intersections[0].point);
    mark.setAttribute('visible', 'true');

  });
  raycaster.addEventListener("raycaster-intersection-cleared", () => {
  // Turn the mark red.
  // mark.setAttribute('color', 'red');
  mark.setAttribute('visible', 'false');
  });

  // //this does not check the ray caster, only if the screen has been clicked
  // test.addEventListener(
  //   "click",
  //   () => {
  //     console.log('I was clickexxxxxxd!');
  //     test.setAttribute('material', 'color', 'green');
  //   },
  //   false
  // );

  // test.addEventListener('click', function () {
  //   // test.setAttribute('material', 'color', 'green');
  //   console.log('I was clickexxxxxxd!');
  // });

  resize();

});
