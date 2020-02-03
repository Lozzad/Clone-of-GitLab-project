!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("app",[],t):"object"==typeof exports?exports.app=t():e.app=t()}(window,(function(){return function(e){var t={};function i(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,i),o.l=!0,o.exports}return i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(n,o,function(t){return e[t]}.bind(null,o));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t,i){e.exports=i(1)},function(e,t,i){"use strict";var n,o,s,r,a,d;Object.defineProperty(t,"__esModule",{value:!0}),i(2);var c={selectedItem:null,selectedUrl:null,boxOpened:!1,houseID:null};function l(){s&&(s.width=window.innerWidth,s.height=window.innerHeight),r&&(r.width=window.innerWidth,r.height=window.innerHeight)}function u(){o=document.querySelector("video"),c.selectedItem?(n.classList.add("hide"),o.classList.add("hide"),s.classList.remove("hide"),r.contentWindow.postMessage({src:c.selectedItem,href:c.selectedUrl},window.location.href)):(n.classList.remove("hide"),o.classList.remove("hide"),s.classList.add("hide"))}window.addEventListener("resize",(function(){l()})),window.addEventListener("DOMContentLoaded",(function(){n=document.querySelector("a-scene"),s=document.getElementById("overlay"),r=document.getElementById("viewer"),a=document.querySelector("[ar-raycaster]"),d=document.querySelector("#cursor"),n.addEventListener("loaded",(function(){})),n.addEventListener("box-opened",(function(e){var t=e.detail.id,i=e.detail.url;c.selectedUrl=i||null;var n=document.getElementById(t+"0-asset");console.log(n),n&&(c.selectedItem=n.getAttribute("src")),c.boxOpened=!0,u()}),!1),n.addEventListener("box-closing",(function(){c.boxOpened=!1,u()}),!1),n.addEventListener("box-id-selected",(function(e){var t=e.detail.id;c.houseID=t,console.log("I got the message: "+t)})),a.addEventListener("raycaster-intersection",(function(e){console.log("hit one "+e.detail.intersections[0]),d.setAttribute("color","yellow"),d.setAttribute("position",e.detail.intersections[0].point),d.setAttribute("visible","true")})),a.addEventListener("raycaster-intersection-cleared",(function(){d.setAttribute("visible","false")})),l()}))},function(e,t,i){"use strict";var n,o;Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.CLOSED="closed",e.OPENING="opening",e.OPENED="opened",e.CLOSING="closing"}(n||(n={})),function(e){e.OPEN="open",e.OPENED="opened",e.CLOSE="close",e.CLOSED="closed"}(o||(o={})),t.default=AFRAME.registerComponent("box",{schema:{boxID:{type:"string"},link:{type:"string"}},animationStateService:null,state:null,init:function(){var e,t,i,s,r,a=this;this.bindMethods(),this.addEventListeners(),this.data.counter=0,this.state=n.CLOSED;var d=XState.Machine({id:"box",initial:this.state,states:(e={},e[n.CLOSED]={on:(t={},t[o.OPEN]=n.OPENING,t)},e[n.OPENING]={on:(i={},i[o.OPENED]=n.OPENED,i)},e[n.OPENED]={on:(s={},s[o.CLOSE]=n.CLOSING,s)},e[n.CLOSING]={on:(r={},r[o.CLOSED]=n.CLOSED,r)},e)});this.animationStateService=XState.interpret(d).onTransition((function(e){return a.animationStateChanged(e.value)})).start()},getAnimationString:function(e,t,i,n){return"property: "+e+"; from: "+t+"; to: "+i+"; dur: "+n+"; loop: once; autoplay: true;"},animationStateChanged:function(e){switch(this.state=e,this.state){case n.OPENING:this.el.setAttribute("animation-mixer","clip: opening; clampWhenFinished: true; loop: once;"),this.el.sceneEl.emit("box-opening",this,!1);break;case n.CLOSING:this.el.setAttribute("animation-mixer","clip: closing; clampWhenFinished: true; loop: once;"),this.el.sceneEl.emit("box-closing",this,!1)}},animationFinished:function(){switch(this.state){case n.OPENING:this.animationStateService.send(o.OPENED),this.el.sceneEl.emit("box-opened",{id:this.data.boxID,url:this.data.boxURL},!1),this.el.sceneEl.emit("box-id-selected",{id:this.data.boxID},!1);break;case n.CLOSING:this.animationStateService.send(o.CLOSED),this.el.sceneEl.emit("box-closed",this,!1)}},clicked:function(e){switch(e.preventDefault(),console.log("clicked: "+this.data.boxID),this.state){case n.CLOSED:this.animationStateService.send(o.OPEN);break;case n.OPENED:this.animationStateService.send(o.CLOSE)}},addEventListeners:function(){var e=this;this.el.addEventListener("animation-finished",this.animationFinished,!1),this.el.addEventListener("click",this.clicked,!1),this.el.sceneEl.addEventListener("closed-viewer",(function(){e.state==n.OPENED&&e.animationStateService.send(o.CLOSE)}),!0)},removeEventListeners:function(){this.el.removeEventListener("animation-finished",this.animationFinished,!1),this.el.removeEventListener("click",this.clicked,!1)},bindMethods:function(){this.addEventListeners=this.addEventListeners.bind(this),this.removeEventListeners=this.removeEventListeners.bind(this),this.animationStateChanged=this.animationStateChanged.bind(this),this.animationFinished=this.animationFinished.bind(this),this.clicked=this.clicked.bind(this)},tick:function(){},remove:function(){this.el.removeObject3D("mesh"),this.removeEventListeners()}})}])}));