!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("app",[],t):"object"==typeof exports?exports.app=t():e.app=t()}(window,(function(){return function(e){var t={};function o(s){if(t[s])return t[s].exports;var n=t[s]={i:s,l:!1,exports:{}};return e[s].call(n.exports,n,n.exports,o),n.l=!0,n.exports}return o.m=e,o.c=t,o.d=function(e,t,s){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(o.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(s,n,function(t){return e[t]}.bind(null,n));return s},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t,o){e.exports=o(1)},function(e,t,o){"use strict";var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),o(2),o(3);var n,r,i,d,l=s(o(4)),u={selectedItem:null,selectedUrl:null,houseOpened:!1,houseID:null};function a(){i&&(i.width=window.innerWidth,i.height=window.innerHeight),d&&(d.width=window.innerWidth,d.height=window.innerHeight)}function c(){r=document.querySelector("video"),u.selectedItem?(n.classList.add("hide"),r.classList.add("hide"),i.classList.remove("hide"),d.contentWindow.postMessage({src:u.selectedItem,href:u.selectedUrl},window.location.href)):(n.classList.remove("hide"),r.classList.remove("hide"),i.classList.add("hide"))}window.addEventListener("resize",(function(){a()})),window.addEventListener("DOMContentLoaded",(function(){n=document.querySelector("a-scene"),i=document.getElementById("overlay"),d=document.getElementById("viewer"),n.setAttribute("housebuilder",{houseData:l.default}),n.addEventListener("loaded",(function(){console.log("loaded")})),n.addEventListener("house-opened",(function(e){var t=e.detail.id,o=e.detail.url;u.selectedUrl=o||null;var s=document.getElementById(t+"0-asset");console.log(s),s&&(u.selectedItem=s.getAttribute("src")),u.houseOpened=!0,c()}),!1),n.addEventListener("house-closing",(function(){u.houseOpened=!1,c()}),!1),n.addEventListener("house-id-selected",(function(e){var t=e.detail.id;u.houseID=t,console.log("I got the message: "+t)})),a()}))},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=AFRAME.registerComponent("housebuilder",{schema:{houseData:{type:"array"}},createModel:function(e){var t=document.createElement("a-entity");return t.setAttribute("id",e.id),t.setAttribute("gltf-model","#"+e.id+"-asset"),t.setAttribute("animation-mixer",{clip:"closed"}),t.setAttribute("position",e.posX+" "+e.posY+" "+e.posZ),e.collidable&&(t.setAttribute("class","collidable"),t.setAttribute("house",{houseID:e.id})),t.object3D.scale.set(e.scale,e.scale,e.scale),t},drawLine:function(e,t){var o=document.createElement("a-entity");o.setAttribute("line","start","0,0,0");var s=e.toString()+", 0, "+t.toString();return console.log(s),o},buildHouses:function(){var e=this,t=document.querySelector("a-assets"),o=document.getElementById("house models");null==o&&console.error("no model parent found");var s=0;this.data.houseData.forEach((function(n){var r=document.createElement("a-asset-item");r.setAttribute("id",n.id+"-asset"),r.setAttribute("src","/assets/housesNew/"+n.id+".glb"),r.setAttribute("position",n.posX+" "+n.posY+" "+n.posZ),r.setAttribute("rotation",n.rotX+" "+n.rotY+" "+n.rotZ),r.setAttribute("scale",n.scale+" "+n.scale+" "+n.scale),t.appendChild(r),o.appendChild(e.createModel(n)).appendChild(e.drawLine(n.posX,n.posY)),s++})),console.log("spawned "+s+"houses!")},init:function(){console.log("init housebuilder"),this.bindMethods(),this.addEventListeners(),this.buildHouses()},addEventListeners:function(){},removeEventListeners:function(){},bindMethods:function(){this.addEventListeners=this.addEventListeners.bind(this),this.removeEventListeners=this.removeEventListeners.bind(this)},remove:function(){this.removeEventListeners()}})},function(e,t){},function(e){e.exports=[{id:"m1",posX:-.9,posY:0,posZ:-1.2,rotX:0,rotY:0,rotZ:0,scale:.05},{id:"m2",posX:4,posY:0,posZ:-5,rotX:0,rotY:0,rotZ:0,scale:.05},{id:"m3",posX:1.5,posY:0,posZ:-2.5,rotX:0,rotY:0,rotZ:0,scale:.05},{id:"m5",posX:-.1,posY:0,posZ:-.3,rotX:0,rotY:0,rotZ:0,scale:.05},{id:"m6",posX:4,posY:0,posZ:-3,rotX:0,rotY:0,rotZ:180,scale:.05},{id:"m8",posX:-1.5,posY:0,posZ:.5,rotX:0,rotY:0,rotZ:0,scale:.05},{id:"m9",posX:4.5,posY:0,posZ:-4.5,rotX:0,rotY:0,rotZ:0,scale:.05},{id:"m10",posX:-1,posY:0,posZ:0,rotX:0,rotY:0,rotZ:0,scale:.05},{id:"m16",posX:2,posY:0,posZ:-3,rotX:0,rotY:0,rotZ:0,scale:.05},{id:"m17",posX:0,posY:0,posZ:-2,rotX:0,rotY:0,rotZ:0,scale:.05},{id:"m18",posX:.6,posY:0,posZ:2.4,rotX:0,rotY:0,rotZ:0,scale:.05},{id:"m20",posX:.5,posY:0,posZ:1.75,rotX:0,rotY:0,rotZ:0,scale:.05},{id:"m21",posX:1.75,posY:0,posZ:-1.75,rotX:0,rotY:0,rotZ:0,scale:.05},{id:"m22",posX:4,posY:0,posZ:-4,rotX:0,rotY:0,rotZ:0,scale:.05},{id:"m23",posX:4.5,posY:0,posZ:-3.5,rotX:0,rotY:0,rotZ:0,scale:.05}]}])}));