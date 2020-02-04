!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("app",[],t):"object"==typeof exports?exports.app=t():e.app=t()}(window,(function(){return function(e){var t={};function o(i){if(t[i])return t[i].exports;var s=t[i]={i:i,l:!1,exports:{}};return e[i].call(s.exports,s,s.exports,o),s.l=!0,s.exports}return o.m=e,o.c=t,o.d=function(e,t,i){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(o.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)o.d(i,s,function(t){return e[t]}.bind(null,s));return i},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t,o){e.exports=o(1)},function(e,t,o){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),o(2),o(3);var s,n,r,l,a,d,c=i(o(4)),p={selectedItem:null,selectedUrl:null,boxOpened:!1,houseID:null};function u(){r&&(r.width=window.innerWidth,r.height=window.innerHeight),l&&(l.width=window.innerWidth,l.height=window.innerHeight)}function h(){n=document.querySelector("video"),p.selectedItem?(s.classList.add("hide"),n.classList.add("hide"),r.classList.remove("hide"),l.contentWindow.postMessage({src:p.selectedItem,href:p.selectedUrl},window.location.href)):(s.classList.remove("hide"),n.classList.remove("hide"),r.classList.add("hide"))}window.addEventListener("resize",(function(){u()})),window.addEventListener("DOMContentLoaded",(function(){s=document.querySelector("a-scene"),r=document.getElementById("overlay"),l=document.getElementById("viewer"),a=document.querySelector("[ar-raycaster]"),d=document.querySelector("#cursor"),document.getElementById("houses").setAttribute("housebuilder",{houseData:c.default}),s.addEventListener("loaded",(function(){console.log("loaded")})),s.addEventListener("box-opened",(function(e){var t=e.detail.id,o=e.detail.url;p.selectedUrl=o||null;var i=document.getElementById(t+"0-asset");console.log(i),i&&(p.selectedItem=i.getAttribute("src")),p.boxOpened=!0,h()}),!1),s.addEventListener("box-closing",(function(){p.boxOpened=!1,h()}),!1),s.addEventListener("box-id-selected",(function(e){var t=e.detail.id;p.houseID=t,console.log("I got the message: "+t)})),a.addEventListener("raycaster-intersection",(function(e){console.log("hit one "+e.detail.intersections[0]),d.setAttribute("color","yellow"),d.setAttribute("position",e.detail.intersections[0].point),d.setAttribute("visible","true")})),a.addEventListener("raycaster-intersection-cleared",(function(){d.setAttribute("visible","false")})),u()}))},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=AFRAME.registerComponent("housebuilder",{schema:{houseData:{type:"array"}},buildHouses:function(){},init:function(){console.log("Housebuilder init"),console.log(this.data.houseData),this.buildHouses()},addEventListeners:function(){},removeEventListeners:function(){},bindMethods:function(){}})},function(e,t,o){"use strict";var i,s;Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.CLOSED="closed",e.OPENING="opening",e.OPENED="opened",e.CLOSING="closing"}(i||(i={})),function(e){e.OPEN="open",e.OPENED="opened",e.CLOSE="close",e.CLOSED="closed"}(s||(s={})),t.default=AFRAME.registerComponent("box",{schema:{boxID:{type:"string"},link:{type:"string"}},animationStateService:null,state:null,init:function(){var e,t,o,n,r,l=this;this.bindMethods(),this.addEventListeners(),this.data.counter=0,this.state=i.CLOSED;var a=XState.Machine({id:"box",initial:this.state,states:(e={},e[i.CLOSED]={on:(t={},t[s.OPEN]=i.OPENING,t)},e[i.OPENING]={on:(o={},o[s.OPENED]=i.OPENED,o)},e[i.OPENED]={on:(n={},n[s.CLOSE]=i.CLOSING,n)},e[i.CLOSING]={on:(r={},r[s.CLOSED]=i.CLOSED,r)},e)});this.animationStateService=XState.interpret(a).onTransition((function(e){return l.animationStateChanged(e.value)})).start()},getAnimationString:function(e,t,o,i){return"property: "+e+"; from: "+t+"; to: "+o+"; dur: "+i+"; loop: once; autoplay: true;"},animationStateChanged:function(e){switch(this.state=e,this.state){case i.OPENING:this.el.setAttribute("animation-mixer","clip: opening; clampWhenFinished: true; loop: once;"),this.el.sceneEl.emit("box-opening",this,!1);break;case i.CLOSING:this.el.setAttribute("animation-mixer","clip: closing; clampWhenFinished: true; loop: once;"),this.el.sceneEl.emit("box-closing",this,!1)}},animationFinished:function(){switch(this.state){case i.OPENING:this.animationStateService.send(s.OPENED),this.el.sceneEl.emit("box-opened",{id:this.data.boxID,url:this.data.boxURL},!1),this.el.sceneEl.emit("box-id-selected",{id:this.data.boxID},!1);break;case i.CLOSING:this.animationStateService.send(s.CLOSED),this.el.sceneEl.emit("box-closed",this,!1)}},clicked:function(e){switch(e.preventDefault(),console.log("clicked: "+this.data.boxID),this.state){case i.CLOSED:this.animationStateService.send(s.OPEN);break;case i.OPENED:this.animationStateService.send(s.CLOSE)}},addEventListeners:function(){var e=this;this.el.addEventListener("animation-finished",this.animationFinished,!1),this.el.addEventListener("click",this.clicked,!1),this.el.sceneEl.addEventListener("closed-viewer",(function(){e.state==i.OPENED&&e.animationStateService.send(s.CLOSE)}),!0)},removeEventListeners:function(){this.el.removeEventListener("animation-finished",this.animationFinished,!1),this.el.removeEventListener("click",this.clicked,!1)},bindMethods:function(){this.addEventListeners=this.addEventListeners.bind(this),this.removeEventListeners=this.removeEventListeners.bind(this),this.animationStateChanged=this.animationStateChanged.bind(this),this.animationFinished=this.animationFinished.bind(this),this.clicked=this.clicked.bind(this)},tick:function(){},remove:function(){this.el.removeObject3D("mesh"),this.removeEventListeners()}})},function(e){e.exports=[{id:"af",posX:-.3,posY:0,posZ:2.4,rotX:0,rotY:-90,rotZ:0,scale:.04,collidable:!0,url:"https://www.brighton-hove.gov.uk/sites/brighton-hove.gov.uk/files/LLHA%20New%20Church%20Road%2C%2035%2C%20Aldrington%20House%20Lady%20Chichester%20Hospital%20v2%20180615.pdf"},{id:"af2",posX:.9,posY:0,posZ:-2.5,rotX:0,rotY:90,rotZ:0,scale:.04,collidable:!1},{id:"ag",posX:-1.2,posY:0,posZ:.3,rotX:0,rotY:0,rotZ:0,scale:.04,collidable:!0,url:"https://en.wikipedia.org/wiki/St_Andrew%27s_Church,_Waterloo_Street,_Hove"},{id:"ah",posX:.6,posY:0,posZ:-1.2,rotX:0,rotY:-90,rotZ:0,scale:.04,collidable:!0,url:"https://en.wikipedia.org/wiki/Hove_railway_station"},{id:"alice",posX:-.6,posY:0,posZ:.3,rotX:0,rotY:180,rotZ:0,scale:.025,collidable:!1},{id:"aw",posX:-1.2,posY:0,posZ:-3.5,rotX:0,rotY:90,rotZ:0,scale:.04,collidable:!0},{id:"bg",posX:2.1,posY:0,posZ:-3.5,rotX:0,rotY:-120,rotZ:0,scale:.04,collidable:!0,url:"https://en.wikipedia.org/wiki/Cardinal_Newman_Catholic_School,_Hove"},{id:"cha",posX:-1.5,posY:0,posZ:3.5,rotX:0,rotY:180,rotZ:0,scale:.04,collidable:!0},{id:"ct",posX:-.6,posY:0,posZ:1.2,rotX:0,rotY:180,rotZ:0,scale:.04,collidable:!1,url:"https://en.wikipedia.org/wiki/Hove_Museum_and_Art_Gallery"},{id:"dls",posX:-.3,posY:0,posZ:.9,rotX:0,rotY:-90,rotZ:0,scale:.04,collidable:!0},{id:"eb",posX:.9,posY:0,posZ:.6,rotX:0,rotY:180,rotZ:0,scale:.04,collidable:!0,url:"https://www.tripadvisor.co.uk/Restaurant_Review-g652380-d3508036-Reviews-China_Inn_Restaurant-Hove_East_Sussex_England.html"},{id:"ef",posX:-1.2,posY:0,posZ:2.7,rotX:0,rotY:180,rotZ:0,scale:.04,collidable:!1,url:"http://hovehistory.blogspot.com/2015/11/hove-lagoon.html"},{id:"fc",posX:1.2,posY:0,posZ:-2,rotX:0,rotY:90,rotZ:0,scale:.04,collidable:!0},{id:"fh",posX:-1.3,posY:0,posZ:-.3,rotX:0,rotY:-90,rotZ:0,scale:.04,collidable:!0,url:"https://www.brighton-hove.gov.uk/content/leisure-and-libraries/arts-and-culture/public-art-cut-and-sediment"},{id:"fs",posX:-1.8,posY:0,posZ:-.3,rotX:0,rotY:-90,rotZ:0,scale:.04,collidable:!0,url:"http://hovehistory.blogspot.com/2015/10/hove-library.html"},{id:"ga",posX:2.4,posY:0,posZ:2.4,rotX:0,rotY:180,rotZ:0,scale:.04,collidable:!0,url:"https://www.huntington.org/"},{id:"jd",posX:-.9,posY:0,posZ:-3,rotX:0,rotY:90,rotZ:0,scale:.04,collidable:!0},{id:"lb",posX:-.9,posY:0,posZ:2.4,rotX:0,rotY:180,rotZ:0,scale:.04,collidable:!1,url:"http://hovehistory.blogspot.com/2018/05/aldrington-recreation-ground-wish-park.html"},{id:"lk",posX:-.7,posY:0,posZ:-.6,rotX:0,rotY:180,rotZ:0,scale:.04,collidable:!1},{id:"lp",posX:-.1,posY:0,posZ:-.6,rotX:0,rotY:90,rotZ:0,scale:.04,collidable:!0,url:"http://www.wicks.org/pulp/part1.html"},{id:"ls",posX:.2,posY:0,posZ:-1.2,rotX:0,rotY:0,rotZ:0,scale:.04,collidable:!0},{id:"lt",posX:-.6,posY:0,posZ:-2.1,rotX:0,rotY:90,rotZ:0,scale:.04,collidable:!0},{id:"ma",posX:.6,posY:0,posZ:-2,rotX:0,rotY:90,rotZ:0,scale:.04,collidable:!0},{id:"md",posX:1.5,posY:0,posZ:-1.2,rotX:0,rotY:180,rotZ:0,scale:.04,collidable:!0},{id:"nl",posX:1.5,posY:0,posZ:-.6,rotX:0,rotY:180,rotZ:0,scale:.04,collidable:!0},{id:"ollie",posX:0,posY:0,posZ:3.5,rotX:0,rotY:-90,rotZ:0,scale:.04,collidable:!0},{id:"pb",posX:2.4,posY:0,posZ:3.5,rotX:0,rotY:180,rotZ:0,scale:.04,collidable:!1},{id:"rc",posX:.3,posY:0,posZ:1.5,rotX:0,rotY:0,rotZ:0,scale:.04,collidable:!1},{id:"rmj",posX:0,posY:0,posZ:1.8,rotX:0,rotY:-90,rotZ:0,scale:.04,collidable:!0},{id:"rw",posX:-.5,posY:0,posZ:-1.2,rotX:0,rotY:180,rotZ:0,scale:.04,collidable:!0},{id:"ss",posX:-1.8,posY:0,posZ:.6,rotX:0,rotY:-90,rotZ:0,scale:.04,collidable:!0},{id:"za",posX:-.3,posY:0,posZ:-1.8,rotX:0,rotY:90,rotZ:0,scale:.04,collidable:!0}]}])}));