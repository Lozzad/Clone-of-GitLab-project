!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("app",[],t):"object"==typeof exports?exports.app=t():e.app=t()}(window,(function(){return function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";var i,o,s,a;Object.defineProperty(t,"__esModule",{value:!0}),n(2);var r={selectedItem:null,selectedUrl:null,boxOpened:!1,houseID:null};function d(){s&&(s.width=window.innerWidth,s.height=window.innerHeight),a&&(a.width=window.innerWidth,a.height=window.innerHeight)}function c(){o=document.querySelector("video"),r.selectedItem?(i.classList.add("hide"),o.classList.add("hide"),s.classList.remove("hide"),a.contentWindow.postMessage({src:r.selectedItem,href:r.selectedUrl},window.location.href)):(i.classList.remove("hide"),o.classList.remove("hide"),s.classList.add("hide"))}window.addEventListener("resize",(function(){d()})),window.addEventListener("DOMContentLoaded",(function(){i=document.querySelector("a-scene"),s=document.getElementById("overlay"),a=document.getElementById("viewer"),i.addEventListener("loaded",(function(){})),i.addEventListener("box-opened",(function(e){var t=e.detail.id,n=e.detail.url;r.selectedUrl=n||null;var i=document.getElementById(t+"0-asset");console.log(i),i&&(r.selectedItem=i.getAttribute("src")),r.boxOpened=!0,c()}),!1),i.addEventListener("box-closing",(function(){r.boxOpened=!1,c()}),!1),i.addEventListener("box-id-selected",(function(e){var t=e.detail.id;r.houseID=t,console.log("I got the message: "+t)})),d()}))},function(e,t,n){"use strict";var i,o;Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.CLOSED="closed",e.OPENING="opening",e.OPENED="opened",e.CLOSING="closing"}(i||(i={})),function(e){e.OPEN="open",e.OPENED="opened",e.CLOSE="close",e.CLOSED="closed"}(o||(o={})),t.default=AFRAME.registerComponent("box",{schema:{boxID:{type:"string"},link:{type:"string"}},animationStateService:null,state:null,init:function(){var e,t,n,s,a,r=this;this.bindMethods(),this.addEventListeners(),this.data.counter=0,this.state=i.CLOSED;var d=XState.Machine({id:"box",initial:this.state,states:(e={},e[i.CLOSED]={on:(t={},t[o.OPEN]=i.OPENING,t)},e[i.OPENING]={on:(n={},n[o.OPENED]=i.OPENED,n)},e[i.OPENED]={on:(s={},s[o.CLOSE]=i.CLOSING,s)},e[i.CLOSING]={on:(a={},a[o.CLOSED]=i.CLOSED,a)},e)});this.animationStateService=XState.interpret(d).onTransition((function(e){return r.animationStateChanged(e.value)})).start()},getAnimationString:function(e,t,n,i){return"property: "+e+"; from: "+t+"; to: "+n+"; dur: "+i+"; loop: once; autoplay: true;"},animationStateChanged:function(e){switch(this.state=e,this.state){case i.OPENING:this.el.setAttribute("animation-mixer","clip: opening; clampWhenFinished: true; loop: once;"),this.el.sceneEl.emit("box-opening",this,!1);break;case i.CLOSING:this.el.setAttribute("animation-mixer","clip: closing; clampWhenFinished: true; loop: once;"),this.el.sceneEl.emit("box-closing",this,!1)}},animationFinished:function(){switch(this.state){case i.OPENING:this.animationStateService.send(o.OPENED),this.el.sceneEl.emit("box-opened",{id:this.data.boxID,url:this.data.boxURL},!1),this.el.sceneEl.emit("box-id-selected",{id:this.data.boxID},!1);break;case i.CLOSING:this.animationStateService.send(o.CLOSED),this.el.sceneEl.emit("box-closed",this,!1)}},clicked:function(e){switch(e.preventDefault(),console.log("clicked: "+this.data.boxID),this.state){case i.CLOSED:this.animationStateService.send(o.OPEN);break;case i.OPENED:this.animationStateService.send(o.CLOSE)}},addEventListeners:function(){var e=this;this.el.addEventListener("animation-finished",this.animationFinished,!1),this.el.addEventListener("click",this.clicked,!1),this.el.sceneEl.addEventListener("closed-viewer",(function(){e.state==i.OPENED&&e.animationStateService.send(o.CLOSE)}),!0)},removeEventListeners:function(){this.el.removeEventListener("animation-finished",this.animationFinished,!1),this.el.removeEventListener("click",this.clicked,!1)},bindMethods:function(){this.addEventListeners=this.addEventListeners.bind(this),this.removeEventListeners=this.removeEventListeners.bind(this),this.animationStateChanged=this.animationStateChanged.bind(this),this.animationFinished=this.animationFinished.bind(this),this.clicked=this.clicked.bind(this)},tick:function(){},remove:function(){this.el.removeObject3D("mesh"),this.removeEventListeners()}})}])}));