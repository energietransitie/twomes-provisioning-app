(this.webpackJsonpTwomes=this.webpackJsonpTwomes||[]).push([[1],{101:function(e,t,n){var a={"./ion-action-sheet.entry.js":[140,6],"./ion-alert.entry.js":[141,7],"./ion-app_8.entry.js":[142,8],"./ion-avatar_3.entry.js":[143,18],"./ion-back-button.entry.js":[144,19],"./ion-backdrop.entry.js":[145,43],"./ion-button_2.entry.js":[146,20],"./ion-card_5.entry.js":[147,21],"./ion-checkbox.entry.js":[148,22],"./ion-chip.entry.js":[149,23],"./ion-col_3.entry.js":[150,44],"./ion-datetime_3.entry.js":[151,11],"./ion-fab_3.entry.js":[152,24],"./ion-img.entry.js":[153,45],"./ion-infinite-scroll_2.entry.js":[154,46],"./ion-input.entry.js":[155,25],"./ion-item-option_3.entry.js":[156,26],"./ion-item_8.entry.js":[157,27],"./ion-loading.entry.js":[158,28],"./ion-menu_3.entry.js":[159,29],"./ion-modal.entry.js":[160,9],"./ion-nav_2.entry.js":[161,15],"./ion-popover.entry.js":[162,10],"./ion-progress-bar.entry.js":[163,30],"./ion-radio_2.entry.js":[164,31],"./ion-range.entry.js":[165,32],"./ion-refresher_2.entry.js":[166,12],"./ion-reorder_2.entry.js":[167,17],"./ion-ripple-effect.entry.js":[168,47],"./ion-route_4.entry.js":[169,33],"./ion-searchbar.entry.js":[170,34],"./ion-segment_2.entry.js":[171,35],"./ion-select_3.entry.js":[172,36],"./ion-slide_2.entry.js":[173,48],"./ion-spinner.entry.js":[174,14],"./ion-split-pane.entry.js":[175,49],"./ion-tab-bar_2.entry.js":[176,37],"./ion-tab_2.entry.js":[177,16],"./ion-text.entry.js":[178,38],"./ion-textarea.entry.js":[179,39],"./ion-toast.entry.js":[180,40],"./ion-toggle.entry.js":[181,13],"./ion-virtual-scroll.entry.js":[182,50]};function r(e){if(!n.o(a,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=a[e],r=t[0];return n.e(t[1]).then((function(){return n(r)}))}r.keys=function(){return Object.keys(a)},r.id=101,e.exports=r},103:function(e,t,n){var a={"./ion-icon.entry.js":[184,57]};function r(e){if(!n.o(a,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=a[e],r=t[0];return n.e(t[1]).then((function(){return n(r)}))}r.keys=function(){return Object.keys(a)},r.id=103,e.exports=r},108:function(e,t,n){},109:function(e,t,n){},127:function(e,t,n){},128:function(e,t,n){},129:function(e,t,n){},130:function(e,t,n){},131:function(e,t,n){},132:function(e,t,n){},133:function(e,t,n){},134:function(e,t,n){},136:function(e,t,n){},137:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(44),c=n.n(o),s=n(40),l=n(1),i=n(92),u=n(10),m=(n(108),n(14)),p=n(3),f=n.n(p),d=n(4),E=n(90).a.Storage;function h(){function e(){return(e=Object(d.a)(f.a.mark((function e(t){var n,a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.get({key:t});case 2:return n=e.sent,a=n.value,e.abrupt("return",a);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function t(){return(t=Object(d.a)(f.a.mark((function e(t,n){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.set({key:t,value:n});case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return{getItem:function(t){return e.apply(this,arguments)},setItem:function(e,n){return t.apply(this,arguments)}}}var b=h().getItem,g=h().setItem,j=function(){var e=Object(a.useState)(!1),t=Object(u.a)(e,2),n=t[0],o=t[1];return Object(a.useEffect)((function(){n||(b("instructionsCompleted").then((function(e){null==e?(o(!0),g("instructionsCompleted","false"),window.location.href="/instructions"):"false"===e&&(o(!0),window.location.href="/instructions")})),o(!0))}),[]),r.a.createElement(l.o,null,r.a.createElement(l.i,null,r.a.createElement(l.v,{className:"gradientBackgroundColor"},r.a.createElement(l.u,{slot:"start"},"Home"),r.a.createElement(l.e,{slot:"end"},r.a.createElement(l.d,{href:"/settings"},r.a.createElement(l.j,{icon:m.o,color:"dark"}))))),r.a.createElement(l.h,null,r.a.createElement(l.f,{className:"sensorcard"},r.a.createElement(l.g,null,r.a.createElement(l.k,{lines:"none"},r.a.createElement(l.b,{slot:"start"},r.a.createElement(l.j,{icon:m.c,color:"success"})),r.a.createElement(l.l,null,"Uw sensoren zijn verbonden"))))))},v=(n(109),n(37)),y=n.n(v),w=n(58),O=y.a.create({baseURL:"schietopfuturetech",headers:{}});O.interceptors.response.use((function(e){return e.data=w.cloneDeep(e.data),e}));var k=n(58),S=y.a.create({baseURL:"https://www.random.org",headers:{}});S.interceptors.response.use((function(e){return e.data=k.cloneDeep(e.data),e}));var I=S,N=n(58),x=y.a.create({baseURL:"192.168.4.1",headers:{}});x.interceptors.response.use((function(e){return e.data=N.cloneDeep(e.data),e}));var _={getLocalWeather:function(){return I.get("localweather? geen idee")},getRandomNumber:function(){return I.get("/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new")}},C=n(52),F=n.n(C),B=h().setItem,U=h().getItem,D=n(126),V=function(){F.a.locale("nl",D);return r.a.createElement(l.o,null,r.a.createElement(l.i,null,r.a.createElement(l.v,{className:"gradientBackgroundColor"},r.a.createElement(l.u,null,"Dashboard"),r.a.createElement(l.e,{slot:"end"},r.a.createElement(l.d,{href:"/settings"},r.a.createElement(l.j,{icon:m.o,color:"dark"}))))),r.a.createElement(l.h,{fullscreen:!0},r.a.createElement(l.f,{className:"card"},r.a.createElement(l.g,null,r.a.createElement(l.k,{lines:"none",className:"carditem"},r.a.createElement(l.l,null,"ChartJS")))),r.a.createElement(l.d,{onClick:function(){_.getRandomNumber().then((function(e){var t={apidata:e.data.toString(),timestamp:F()().format("hh:mm:ss DD-MM-YYYY")};B("randomnumber",JSON.stringify(t))}),(function(e){U("randomnumber").then((function(e){var t=JSON.parse(e);console.log("no wifi, old value:"+t.apidata),console.log("timestamp: "+t.timestamp)}))}))}},"Get Random Number")))},G=(n(127),function(e){var t=e.name;return r.a.createElement("div",{className:"container"},r.a.createElement("strong",null,t),r.a.createElement("p",null,"Explore ",r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://ionicframework.com/docs/components"},"UI Components")))}),M=(n(128),function(){return r.a.createElement(l.o,null,r.a.createElement(l.i,null,r.a.createElement(l.v,{className:"gradientBackgroundColor"},r.a.createElement(l.u,null,"Sensors"),r.a.createElement(l.e,{slot:"end"},r.a.createElement(l.d,{href:"/settings"},r.a.createElement(l.j,{icon:m.o,color:"dark"}))))),r.a.createElement(l.h,{fullscreen:!0},r.a.createElement(l.i,{collapse:"condense"},r.a.createElement(l.v,null,r.a.createElement(l.u,{size:"large"},"Sensors"))),r.a.createElement(G,{name:"Sensors"})))}),W=n(39),L=(n(129),function(){var e=Object(a.useState)(" "),t=Object(u.a)(e,2),n=t[0],o=t[1],c=Object(a.useState)([]),s=Object(u.a)(c,2),i=s[0],m=s[1];Object(l.E)((function(){p(),f()}));var p=function(){W.a.getConnectedSSID().then((function(e){console.log(e),o(e)}),(function(e){console.log("Error: "+e)}))},f=function(){W.a.scan().then((function(e){console.log(e.length,"networks found! "),m(e);for(var t=0;t<e.length;t++)console.log("SSID: ".concat(e[t].SSID," Signaal: ").concat(e[t].level))})).catch((function(e){console.log("Error getting results!",e),W.a.timeout(5e3).then((function(){}))}))};return r.a.createElement(l.h,null,r.a.createElement(l.f,null,r.a.createElement("h2",null,"Op dit moment verbonden: ",r.a.createElement("b",null,n)),r.a.createElement("h3",null,"Wil je een ander netwerk gebruiken? Selecteer dan een ander netwerk."),r.a.createElement(l.m,null,i.map((function(e){return r.a.createElement(l.k,null,r.a.createElement(l.b,{slot:"start"},r.a.createElement("img",{src:"public\\assets\\icon\\.icon.png"})),r.a.createElement(l.l,{color:"white"},r.a.createElement("h2",null,e.SSID),r.a.createElement("h3",null,e.capabilities)))})))))}),z=function(){return Object(l.E)((function(){document.getElementById("tabBar").style.display="none"})),Object(l.F)((function(){document.getElementById("tabBar").style.display="flex"})),r.a.createElement(l.o,null,r.a.createElement(l.i,null,r.a.createElement(l.v,null,r.a.createElement(l.e,{slot:"start"},r.a.createElement(l.c,{defaultHref:"/home",text:""})))),r.a.createElement(l.h,null,r.a.createElement(l.u,null),r.a.createElement(L,null)))},T=function(e){var t=e.showLoading;return r.a.createElement(l.n,{isOpen:t,message:"Een ogenblik geduld..."})},H=(n(130),function(e){var t=e.stepUpFunction,n=e.finishFunction,o=e.lastStep,c=Object(a.useState)(0),s=Object(u.a)(c,2);s[0],s[1];return r.a.createElement(l.f,{className:"instructions-card"},r.a.createElement(l.g,{className:"instructions-card-content"},r.a.createElement(l.l,null,"Instructie OTGW"),o?r.a.createElement(l.d,{className:"instructions-next-button",onClick:function(){return n()}},"Afronden"):r.a.createElement(l.d,{className:"instructions-next-button",onClick:function(){return t()}},"Volgende")))}),P=(n(131),function(e){var t=e.stepUpFunction;return r.a.createElement(l.f,{className:"instructions-card"},r.a.createElement(l.g,{className:"instructions-card-content"},r.a.createElement(l.l,null,"Instructie P1-stick"),r.a.createElement(l.d,{className:"instructions-next-button",onClick:function(){return t()}},"Volgende")))}),A=(n(132),function(e){var t=e.stepUpFunction,n=e.finishFunction,a=e.lastStep;return r.a.createElement(l.f,{className:"instructions-card"},r.a.createElement(l.g,{className:"instructions-card-content"},r.a.createElement(l.l,null,"Instructie Sensoren"),a?r.a.createElement(l.d,{className:"instructions-next-button",onClick:function(){return n()}},"Afronden"):r.a.createElement(l.d,{className:"instructions-next-button",onClick:function(){return t()}},"Volgende")))}),J=(n(133),function(e){var t=e.stepUpFunction;return r.a.createElement(l.f,{className:"instructions-card"},r.a.createElement(l.g,{className:"instructions-card-content"},r.a.createElement(l.l,null,"Instructie wifi configureren"),r.a.createElement(l.d,{className:"instructions-next-button",onClick:function(){return t()}},"Volgende")))}),R=(n(134),n(25)),Y=h().getItem,q=h().setItem,$=function(){var e=Object(a.useState)("1111"),t=Object(u.a)(e,1)[0],n=Object(a.useState)(!1),o=Object(u.a)(n,2),c=o[0],s=o[1],i=Object(a.useState)("1"),m=Object(u.a)(i,2),p=m[0],f=m[1],d=Object(a.useState)(!1),E=Object(u.a)(d,2),h=E[0],b=E[1],g=Object(a.useState)([]),j=Object(u.a)(g,2),v=j[0],y=j[1];Object(l.E)((function(){document.getElementById("tabBar").style.display="none"})),Object(l.F)((function(){document.getElementById("tabBar").style.display="flex"})),Object(a.useEffect)((function(){h||Y("instructionStep").then((function(e){null!==e&&f(e),b(!0)}))}),[h]),Object(a.useEffect)((function(){if(t&&!c){var e=[];switch(t.split("")[0]){case"1":e.push(R.a.OTGWstep);break;case"2":e.push(R.a.P1step),e.push(R.a.Sensorstep);break;case"3":e.push(R.a.OTGWstep),e.push(R.a.P1step),e.push(R.a.Sensorstep)}e.push(R.a.WIFIstep),e.sort(),f(e[0]),y(e),q("instructionStep",e[0]),s(!0)}}),[t]);var w=function(){var e=v[v.indexOf(p)+1];f(e),q("instructionStep",e)},O=function(){q("instructionsCompleted","true"),window.location.href="/home"};return h&&c?r.a.createElement(l.o,null,r.a.createElement(l.i,null,r.a.createElement(l.v,{className:"gradientBackgroundColor"},r.a.createElement(l.u,{slot:"start"},"Instrucies"))),r.a.createElement(l.h,null,p===R.a.OTGWstep&&r.a.createElement(H,{stepUpFunction:w,finishFunction:O,lastStep:"1"===t.split("")[0]}),p===R.a.P1step&&r.a.createElement(P,{stepUpFunction:w}),p===R.a.Sensorstep&&r.a.createElement(A,{stepUpFunction:w,finishFunction:O,lastStep:"1"!==t.split("")[0]}),p===R.a.WIFIstep&&r.a.createElement(J,{stepUpFunction:w}))):r.a.createElement(l.o,null,r.a.createElement(l.h,null,r.a.createElement(T,{showLoading:!0})))};n(84);function K(){return{HomeIcon:function(){return r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",id:"icon",className:"ionicon",viewBox:"0 0 512 512"},r.a.createElement("linearGradient",{id:"svgGradient"},r.a.createElement("stop",{offset:"0%","stop-color":"var(--color-stop-1)"}),r.a.createElement("stop",{offset:"100%","stop-color":"var(--color-stop-2)"})),r.a.createElement("title",null,"Home"),r.a.createElement("path",{d:"M261.56 101.28a8 8 0 00-11.06 0L66.4 277.15a8 8 0 00-2.47 5.79L63.9 448a32 32 0 0032 32H192a16 16 0 0016-16V328a8 8 0 018-8h80a8 8 0 018 8v136a16 16 0 0016 16h96.06a32 32 0 0032-32V282.94a8 8 0 00-2.47-5.79z","stroke-linecap":"round","stroke-linejoin":"round"}),r.a.createElement("path",{d:"M490.91 244.15l-74.8-71.56V64a16 16 0 00-16-16h-48a16 16 0 00-16 16v32l-57.92-55.38C272.77 35.14 264.71 32 256 32c-8.68 0-16.72 3.14-22.14 8.63l-212.7 203.5c-6.22 6-7 15.87-1.34 22.37A16 16 0 0043 267.56L250.5 69.28a8 8 0 0111.06 0l207.52 198.28a16 16 0 0022.59-.44c6.14-6.36 5.63-16.86-.76-22.97z","stroke-linecap":"round","stroke-linejoin":"round"}))},DashboardIcon:function(){return r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:"ionicon",id:"icon",viewBox:"0 0 512 512"},r.a.createElement("title",null,"Stats Chart"),r.a.createElement("linearGradient",{id:"svgGradient"},r.a.createElement("stop",{offset:"0%","stop-color":"var(--color-stop-1)"}),r.a.createElement("stop",{offset:"100%","stop-color":"var(--color-stop-2)"})),r.a.createElement("path",{d:"M104 496H72a24 24 0 01-24-24V328a24 24 0 0124-24h32a24 24 0 0124 24v144a24 24 0 01-24 24zM328 496h-32a24 24 0 01-24-24V232a24 24 0 0124-24h32a24 24 0 0124 24v240a24 24 0 01-24 24zM440 496h-32a24 24 0 01-24-24V120a24 24 0 0124-24h32a24 24 0 0124 24v352a24 24 0 01-24 24zM216 496h-32a24 24 0 01-24-24V40a24 24 0 0124-24h32a24 24 0 0124 24v432a24 24 0 01-24 24z"}))},SensorIcon:function(){return r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:"ionicon",id:"icon",viewBox:"0 0 512 512"},r.a.createElement("title",null,"Thermometer"),r.a.createElement("linearGradient",{id:"svgGradient"},r.a.createElement("stop",{offset:"0%","stop-color":"var(--color-stop-1)"}),r.a.createElement("stop",{offset:"100%","stop-color":"var(--color-stop-2)"})),r.a.createElement("path",{d:"M320 287.18V81c0-35.12-27.89-64.42-63-64.95a64.08 64.08 0 00-65 64v207.13a8 8 0 01-3.18 6.37A113.48 113.48 0 00144 384a112 112 0 00224 0 113.48 113.48 0 00-44.82-90.45 8 8 0 01-3.18-6.37zM254.07 432a48 48 0 01-22-89.54 16 16 0 008-13.84V112.45c0-8.61 6.62-16 15.23-16.43A16 16 0 01272 112v216.58a16.18 16.18 0 008.15 13.94A48 48 0 01254.07 432z"}))}}}n(135),n(136);var Q=K().HomeIcon(),X=K().DashboardIcon(),Z=K().SensorIcon(),ee=function(){return r.a.createElement(l.a,null,r.a.createElement(i.a,null,r.a.createElement(l.t,null,r.a.createElement(l.q,null,r.a.createElement(s.b,{path:"/home",component:j,exact:!0}),r.a.createElement(s.b,{path:"/dashboard",component:V,exact:!0}),r.a.createElement(s.b,{path:"/sensors",component:M}),r.a.createElement(s.b,{path:"/settings",component:z,exact:!0}),r.a.createElement(s.b,{path:"/instructions",component:$,exact:!0}),r.a.createElement(s.b,{path:"/",render:function(){return r.a.createElement(s.a,{to:"/home"})},exact:!0})),r.a.createElement(l.r,{slot:"bottom",id:"tabBar"},r.a.createElement(l.s,{tab:"home",href:"/home"},Q),r.a.createElement(l.s,{tab:"dashboard",href:"/dashboard"},X),r.a.createElement(l.s,{tab:"sensors",href:"/sensors"},Z)))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(ee,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},25:function(e){e.exports=JSON.parse('{"a":{"OTGWstep":"4","P1step":"2","Sensorstep":"3","WIFIstep":"1"}}')},84:function(e,t,n){},95:function(e,t,n){e.exports=n(137)}},[[95,4,5]]]);
//# sourceMappingURL=main.6f44ea65.chunk.js.map