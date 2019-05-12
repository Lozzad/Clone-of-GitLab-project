!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("app",[],t):"object"==typeof exports?exports.app=t():e.app=t()}(window,function(){return function(e){var t={};function i(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,i),o.l=!0,o.exports}return i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(n,o,function(t){return e[t]}.bind(null,o));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t,i){e.exports=i(1)},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),i(2),i(3);var n=i(4);!function(){var e,t,i,o,s,r,a,l,c,d,u={overlayVisible:!1};function h(){o&&(o.width=window.innerWidth,o.height=window.innerHeight),s&&(s.width=window.innerWidth,s.height=window.innerHeight),a&&(a.style.top=window.innerHeight-a.clientHeight)}function m(){i=document.querySelector("video"),u.overlayVisible?(e.classList.add("hide"),i.classList.add("hide"),o.classList.remove("hide")):(e.classList.remove("hide"),i.classList.remove("hide"),o.classList.add("hide"))}window.addEventListener("resize",function(){h()}),window.addEventListener("DOMContentLoaded",function(){e=document.querySelector("a-scene"),o=document.getElementById("overlay"),s=document.getElementById("viewer"),t=document.querySelector("#house"),r=document.getElementById("carousel"),a=document.getElementById("carousel-menu"),l=document.getElementById("carousel-prev-button"),d=document.getElementById("carousel-item-button"),c=document.getElementById("carousel-next-button"),new n.House(t,r),e.addEventListener("carousel-item-clicked",function(e){var t,i=e.detail.id,n=document.getElementById(i+"-asset");n&&(t=n.getAttribute("src"),s.contentWindow.postMessage({src:t},window.location.href),u.overlayVisible=!0,m())},!1),window.addEventListener("message",function(e){"close"===e.data&&(u.overlayVisible=!1,m())},!1),l.addEventListener("click",function(){e.emit("rotate",{direction:-1})},!1),d.addEventListener("click",function(){console.log("item")},!1),c.addEventListener("click",function(){e.emit("rotate",{direction:1})},!1),h()})}()},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=AFRAME.registerComponent("carousel",{schema:{radius:{type:"number",default:1},thickness:{type:"number",default:.25},ringVisible:{type:"boolean",default:!0},itemRadius:{type:"number",default:1}},numChildren:0,interval:0,currentRotation:0,index:0,ringGeometry:null,ringMaterial:null,ringMesh:null,init:function(){this.bindMethods(),this.addEventListeners(),this.createRing(),this.numChildren=this.el.children.length,this.interval=360/this.numChildren},updateAnimation:function(e){var t,i=e.detail.direction,n=this.index+i;n<0?n=this.numChildren-1:n>this.numChildren-1&&(n=0),t=1===i&&(0===n||n>this.index)?this.currentRotation+this.interval:this.currentRotation-this.interval;var o="property: rotation; from: '90 0 "+this.currentRotation+"'; to: '90 0 "+t+"'; dur: 1000; autoplay: true;; easing: easeInOutQuad;";this.el.setAttribute("animation__rotation",o);this.el.children[this.index].removeAttribute("animation__rotate"),this.el.children[n].setAttribute("animation__rotate","property: rotation; from: '0 0 0'; to: '0 0 360'; dur: 30000; loop: true; easing: linear; autoplay: true"),this.currentRotation=t,this.index=n},bindMethods:function(){this.addEventListeners=this.addEventListeners.bind(this),this.removeEventListeners=this.removeEventListeners.bind(this),this.createRing=this.createRing.bind(this),this.sceneLoaded=this.sceneLoaded.bind(this),this.updateAnimation=this.updateAnimation.bind(this)},addEventListeners:function(){this.el.sceneEl.addEventListener("loaded",this.sceneLoaded,!1),this.el.sceneEl.addEventListener("rotate",this.updateAnimation,!1)},removeEventListeners:function(){this.el.sceneEl.removeEventListener("loaded",this.sceneLoaded,!1),this.el.sceneEl.removeEventListener("rotate",this.updateAnimation,!1)},createRing:function(){this.ringGeometry=new THREE.TorusGeometry(this.data.radius,this.data.thickness,6,40),this.ringMaterial=new THREE.MeshBasicMaterial({visible:this.data.ringVisible,color:255}),this.ringMesh=new THREE.Mesh(this.ringGeometry,this.ringMaterial)},sceneLoaded:function(){for(var e=this,t=this.el.object3D.position,i=this.el.children,n=i.length,o=2*Math.PI/n,s=0;s<n;s++){var r=i[s],a=this.data.radius*Math.cos(s*o)+t.x,l=this.data.radius*Math.sin(s*o);r.setAttribute("position",a+" "+l+" 0"),r.addEventListener("model-loaded",function(){}),r.addEventListener("click",function(){console.log("Click!: "+r.id)},!1),r.addEventListener("raycaster-intersected",function(){e.el.sceneEl.emit("carousel-item-hovered",{id:r.id},!1),r.children[0].setAttribute("visible","true"),console.log("Hover!: "+r.id)},!1),r.addEventListener("raycaster-intersected-cleared",function(){e.el.sceneEl.emit("carousel-item-hovered-cleared",{id:r.id},!1),r.children[0].setAttribute("visible","false"),console.log("Clear!: "+r.id)},!1)}},update:function(e){e&&e.ringVisible&&e.ringVisible!==this.data.ringVisible&&(this.ringMesh.material.visible=this.data.ringVisible)},tick:function(){},remove:function(){this.el.removeObject3D("mesh"),this.ringMesh=null,this.ringGeometry.dispose(),this.ringMaterial.dispose()}})},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=AFRAME.registerComponent("look-to-camera",{schema:{},init:function(){},addEventListeners:function(){},removeEventListeners:function(){},bindMethods:function(){},tick:function(){this.el.object3D.lookAt(this.el.sceneEl.camera.position)}})},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,o,s=function(){function e(e,t){var i,s,r,a,l,c=this;this._state=n.CLOSED,this.carouselAnimationDuration="2000",this.carouselScaleSmall="0.25 0.25 0.25",this.carouselPositionSmall="0 0.6 -0.25",this.carouselScaleLarge="2 2 2",this.carouselPositionLarge="0 1.2 -0.25",this.carouselScaleSmallToLargeAnimation="property: scale; from: "+this.carouselScaleSmall+"; to: "+this.carouselScaleLarge+"; dur: "+this.carouselAnimationDuration+"; loop: once; autoplay: true;",this.carouselScaleLargeToSmallAnimation="property: scale; from: "+this.carouselScaleLarge+"; to: "+this.carouselScaleSmall+"; dur: "+this.carouselAnimationDuration+"; loop: once; autoplay: true;",this.carouselPositionSmallToLargeAnimation="property: position; from: "+this.carouselPositionSmall+"; to: "+this.carouselPositionLarge+"; dur: "+this.carouselAnimationDuration+"; loop: once; autoplay: true;",this.carouselPositionLargeToSmallAnimation="property: position; from: "+this.carouselPositionLarge+"; to: "+this.carouselPositionSmall+"; dur: "+this.carouselAnimationDuration+"; loop: once; autoplay: true;",this._el=e,this._carousel=t,this._el.addEventListener("animation-finished",this.animationFinished.bind(this),!1),this._el.addEventListener("click",this.clicked.bind(this),!1);var d=XState.Machine({id:"house",initial:this._state,states:(i={},i[n.CLOSED]={on:(s={},s[o.OPEN]=n.OPENING,s)},i[n.OPENING]={on:(r={},r[o.OPENED]=n.OPENED,r)},i[n.OPENED]={on:(a={},a[o.CLOSE]=n.CLOSING,a)},i[n.CLOSING]={on:(l={},l[o.CLOSED]=n.CLOSED,l)},i)});this._stateService=XState.interpret(d).onTransition(function(e){return c.stateChanged(e.value)}).start()}return e.prototype.stateChanged=function(e){switch(this._state=e,this._state){case n.OPENING:this._el.setAttribute("animation-mixer","clip: opening; clampWhenFinished: true; loop: once;"),this._carousel.setAttribute("animation__scale",this.carouselScaleSmallToLargeAnimation),this._carousel.setAttribute("animation__position",this.carouselPositionSmallToLargeAnimation);break;case n.CLOSING:this._el.setAttribute("animation-mixer","clip: closing; clampWhenFinished: true; loop: once;"),this._carousel.setAttribute("animation__scale",this.carouselScaleLargeToSmallAnimation),this._carousel.setAttribute("animation__position",this.carouselPositionLargeToSmallAnimation)}},e.prototype.animationFinished=function(){switch(this._state){case n.OPENING:this._stateService.send(o.OPENED);break;case n.CLOSING:this._stateService.send(o.CLOSED)}},e.prototype.clicked=function(e){switch(e.preventDefault(),this._state){case n.CLOSED:this._stateService.send(o.OPEN);break;case n.OPENED:this._stateService.send(o.CLOSE)}},e}();t.House=s,function(e){e.CLOSED="closed",e.OPENING="opening",e.OPENED="opened",e.CLOSING="closing"}(n||(n={})),function(e){e.OPEN="open",e.OPENED="opened",e.CLOSE="close",e.CLOSED="closed"}(o||(o={}))}])});