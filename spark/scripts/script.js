!function(n){var t={};function o(e){if(t[e])return t[e].exports;var r=t[e]={i:e,l:!1,exports:{}};return n[e].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=n,o.c=t,o.d=function(n,t,e){o.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:e})},o.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},o.t=function(n,t){if(1&t&&(n=o(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var e=Object.create(null);if(o.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var r in n)o.d(e,r,function(t){return n[t]}.bind(null,r));return e},o.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return o.d(t,"a",t),t},o.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},o.p="",o(o.s=4)}([function(n,t){n.exports=require("Scene")},function(n,t){n.exports=require("Diagnostics")},function(n,t){n.exports=require("TouchGestures")},function(n,t){n.exports=require("Reactive")},function(n,t,o){const e=o(0),r=(o(1),o(5)),a=o(6);e.root.find("command").hidden=!0;e.root.find("Argon").hidden=!0,r.home(),a.command()},function(n,t,o){const e=o(0),r=o(1),a=o(2),i=o(3);n.exports={home:function(){Promise.all([e.root.findFirst("start_button"),e.root.findFirst("home_text"),e.root.findFirst("command"),e.root.findByPath("planeTracker0/Argon"),e.root.findByPath("**/canvas0/Argon_home"),e.root.findByPath("**/canvas1/road*"),e.root.findFirst("gameover"),e.root.findFirst("canvas2"),e.root.findFirst("goal")]).then((function(n){const t=n[0],o=n[1],e=n[2],s=n[3][0],l=n[4][0],f=n[5],u=n[6],c=n[7],d=n[8];a.onTap(t).subscribe((function(n){t.hidden=!0,o.hidden=!0,e.hidden=!1,s.hidden=!1,l.hidden=!0,u.hidden=!0;let a=0,m=-500,h=function(n){let t=[0,0,0,1,2],o=[0,0,0,1],e=[0,0,0,2],r=[0];for(;r.length<n;){let n=r[r.length-1],a=0;r.length>1&&(a=r[r.length-2]);let i=0;0===n&&0===a?i=t[Math.floor(Math.random()*t.length)]:0===n&&1===a?i=o[Math.floor(Math.random()*o.length)]:0===n&&2===a?i=e[Math.floor(Math.random()*e.length)]:1===n?i=o[Math.floor(Math.random()*o.length)]:2===n&&(i=e[Math.floor(Math.random()*e.length)]),r.push(i)}return r}(9);var p;r.log(h),h.forEach((n,t)=>{0===n?m+=500:1===n?a-=500:2===n&&(a+=500),f[t].transform.x=a,f[t].transform.y=m}),f.forEach(n=>{n.hidden=!1}),c.transform.x=75e-5*a,c.transform.z=-1*m*75e-5,d.hidden=!1,(p=s).transform.x=0,p.transform.y=-.08,p.transform.z=0,p.transform.rotationY=i.acos(-1)}))}))}}},function(n,t,o){const e=o(0),r=o(1),a=o(2),i=o(3),s=o(7),l=o(8);function f(n){n.rotationY=i.asin(1)}function u(n){n.rotationY=i.asin(-1)}function c(n){n.rotationY=i.acos(-1)}function d(){Promise.all([e.root.findByPath("planeTracker0/Argon"),e.root.findByPath("**/canvas1/road*"),e.root.findFirst("command")]).then((function(n){const t=n[0][0],o=n[1],r=(n[2],t.transform.x.mul(1450).pinLastValue()),a=t.transform.z.mul(-1450).pinLastValue();let i=!1;for(let n of o){const t=n.transform.x.pinLastValue(),o=n.transform.y.pinLastValue();if(r>=t-250&&r<=t+250&&a>=o-250&&a<=o+250){i=!0;break}}i||Promise.all([e.root.findByPath("planeTracker0/Argon"),e.root.findByPath("**/canvas1/road*"),e.root.findFirst("command"),e.root.findFirst("gameover"),e.root.findFirst("start_button")]).then((function(n){const t=n[0][0],o=n[1],e=n[2],r=n[3],a=n[4];t.hidden=!0,o.forEach((function(n){n.hidden=!0})),e.hidden=!0,r.hidden=!1,a.hidden=!1}))}))}function m(){Promise.all([e.root.findByPath("planeTracker0/Argon"),e.root.findFirst("canvas2")]).then((function(n){const t=n[0][0],o=n[1];t.transform.z.pinLastValue()>=o.transform.y.pinLastValue()-.05&&t.transform.z.pinLastValue()<=o.transform.y.pinLastValue()+.05&&t.transform.x.pinLastValue()>=o.transform.x.pinLastValue()-.05&&t.transform.x.pinLastValue()<=o.transform.x.pinLastValue()+.05?o():r.log("Not goal yet")}))}n.exports={command:function(){Promise.all([e.root.findFirst("Argon"),e.root.findByPath("**/canvas0/command/*")]).then((function(n){const t=n[0],o=n[1];!function(n,t){const o=t.transform;for(let t=0;t<n.length;t++)a.onTap(n[t]).subscribe((function(n){if(0===t){f(o);let n=!0;l.inputs.setBoolean("myBoolean",n);const t=s.setInterval((function(){o.x=i.val(o.x.pinLastValue()+.01)}),20);s.setTimeout((function(){s.clearInterval(t),n=!1,l.inputs.setBoolean("myBoolean",n),d()}),200)}else if(1===t){u(o);let n=!0;l.inputs.setBoolean("myBoolean",n);const t=s.setInterval((function(){o.x=i.val(o.x.pinLastValue()-.01)}),20);s.setTimeout((function(){s.clearInterval(t),n=!1,l.inputs.setBoolean("myBoolean",n),d()}),200)}else{c(o);let n=!0;l.inputs.setBoolean("myBoolean",n);const t=s.setInterval((function(){o.z=i.val(o.z.pinLastValue()-.01)}),20);s.setTimeout((function(){s.clearInterval(t),n=!1,l.inputs.setBoolean("myBoolean",n),d()}),200)}}))}(o,t),function(n,t){for(let o=0;o<n.length;o++){const e=t.transform;a.onLongPress(n[o]).subscribe((function(n){if(0===o){f(e);let t=!0;l.setBooleanValue("myBoolean",t);const o=s.setInterval((function(){e.x=i.val(e.x.pinLastValue()+.03),d(),m()}),50);n.state.monitor().subscribe((function(n){if("ENDED"===n.newValue){s.clearInterval(o);let n=!1;l.setBooleanValue("myBoolean",n)}}))}else if(1===o){u(e);let t=!0;l.setBooleanValue("myBoolean",t);const o=s.setInterval((function(){e.x=i.val(e.x.pinLastValue()-.03),d(),m()}),50);n.state.monitor().subscribe((function(n){if("ENDED"===n.newValue){s.clearInterval(o);let n=!1;l.setBooleanValue("myBoolean",n)}}))}else{c(e);let t=!0;l.setBooleanValue("myBoolean",t);const o=s.setInterval((function(){e.z=i.val(e.z.pinLastValue()-.03),d(),m()}),50);n.state.monitor().subscribe((function(n){"ENDED"===n.newValue&&(s.clearInterval(o),t=!1,l.setBooleanValue("myBoolean",t))}))}}))}}(o,t)}))}}},function(n,t){n.exports=require("Time")},function(n,t){n.exports=require("Patches")}]);