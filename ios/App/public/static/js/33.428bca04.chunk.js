(this.webpackJsonpTwomes=this.webpackJsonpTwomes||[]).push([[33],{169:function(t,e,n){"use strict";n.r(e),n.d(e,"ion_route",(function(){return v})),n.d(e,"ion_route_redirect",(function(){return b})),n.d(e,"ion_router",(function(){return G})),n.d(e,"ion_router_link",(function(){return M}));var r=n(19),a=n(3),o=n.n(a),i=n(4),u=n(20),c=n(30),s=n(6),h=n(8),l=n(16),f=n(17),p=n(18),d=n(186),v=function(){function t(e){Object(s.a)(this,t),Object(l.o)(this,e),this.ionRouteDataChanged=Object(l.g)(this,"ionRouteDataChanged",7),this.url=""}return Object(h.a)(t,[{key:"onUpdate",value:function(t){this.ionRouteDataChanged.emit(t)}},{key:"onComponentProps",value:function(t,e){if(t!==e){var n=t?Object.keys(t):[],r=e?Object.keys(e):[];if(n.length===r.length){var a,o=Object(c.a)(n);try{for(o.s();!(a=o.n()).done;){var i=a.value;if(t[i]!==e[i])return void this.onUpdate(t)}}catch(u){o.e(u)}finally{o.f()}}else this.onUpdate(t)}}},{key:"connectedCallback",value:function(){this.ionRouteDataChanged.emit()}}],[{key:"watchers",get:function(){return{url:["onUpdate"],component:["onUpdate"],componentProps:["onComponentProps"]}}}]),t}(),b=function(){function t(e){Object(s.a)(this,t),Object(l.o)(this,e),this.ionRouteRedirectChanged=Object(l.g)(this,"ionRouteRedirectChanged",7)}return Object(h.a)(t,[{key:"propDidChange",value:function(){this.ionRouteRedirectChanged.emit()}},{key:"connectedCallback",value:function(){this.ionRouteRedirectChanged.emit()}}],[{key:"watchers",get:function(){return{from:["propDidChange"],to:["propDidChange"]}}}]),t}(),g=function(t){return"/"+t.filter((function(t){return t.length>0})).join("/")},y=function(t){var e,n=[],r=Object(c.a)(t);try{for(r.s();!(e=r.n()).done;){var a,o=e.value,i=Object(c.a)(o.path);try{for(i.s();!(a=i.n()).done;){var u=a.value;if(":"===u[0]){var s=o.params&&o.params[u.slice(1)];if(!s)return null;n.push(s)}else""!==u&&n.push(u)}}catch(h){i.e(h)}finally{i.f()}}}catch(h){r.e(h)}finally{r.f()}return n},k=function(t){if(null==t)return[""];var e=t.split("?")[0].split("/").map((function(t){return t.trim()})).filter((function(t){return t.length>0}));return 0===e.length?[""]:e},m=function(t){console.group("[ion-core] ROUTES[".concat(t.length,"]"));var e,n=Object(c.a)(t);try{var r=function(){var t=e.value,n=[];t.forEach((function(t){return n.push.apply(n,Object(u.a)(t.path))}));var r=t.map((function(t){return t.id}));console.debug("%c ".concat(g(n)),"font-weight: bold; padding-left: 20px","=>\t","(".concat(r.join(", "),")"))};for(n.s();!(e=n.n()).done;)r()}catch(a){n.e(a)}finally{n.f()}console.groupEnd()},w=function(t){console.group("[ion-core] REDIRECTS[".concat(t.length,"]"));var e,n=Object(c.a)(t);try{for(n.s();!(e=n.n()).done;){var r=e.value;r.to&&console.debug("FROM: ","$c ".concat(g(r.from)),"font-weight: bold"," TO: ","$c ".concat(g(r.to)),"font-weight: bold")}}catch(a){n.e(a)}finally{n.f()}console.groupEnd()},j=function(){var t=Object(i.a)(o.a.mark((function t(e,n,r,a){var i,u,c,s,h,l=arguments;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(i=l.length>4&&void 0!==l[4]&&l[4],u=l.length>5?l[5]:void 0,t.prev=2,c=R(e),!(a>=n.length)&&c){t.next=6;break}return t.abrupt("return",i);case 6:return t.next=8,c.componentOnReady();case 8:return s=n[a],t.next=11,c.setRouteId(s.id,s.params,r,u);case 11:return(h=t.sent).changed&&(r="root",i=!0),t.next=15,j(h.element,n,r,a+1,i,u);case 15:if(i=t.sent,!h.markVisible){t.next=19;break}return t.next=19,h.markVisible();case 19:return t.abrupt("return",i);case 22:return t.prev=22,t.t0=t.catch(2),console.error(t.t0),t.abrupt("return",!1);case 26:case"end":return t.stop()}}),t,null,[[2,22]])})));return function(e,n,r,a){return t.apply(this,arguments)}}(),O=function(){var t=Object(i.a)(o.a.mark((function t(e){var n,r,a,i;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n=[],a=e;case 2:if(!(r=R(a))){t.next=17;break}return t.next=7,r.getRouteId();case 7:if(!(i=t.sent)){t.next=14;break}a=i.element,i.element=void 0,n.push(i),t.next=15;break;case 14:return t.abrupt("break",20);case 15:t.next=18;break;case 17:return t.abrupt("break",20);case 18:t.next=2;break;case 20:return t.abrupt("return",{ids:n,outlet:r});case 21:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),x=":not([no-router]) ion-nav, :not([no-router]) ion-tabs, :not([no-router]) ion-router-outlet",R=function(t){if(t){if(t.matches(x))return t;var e=t.querySelector(x);return e||void 0}},C=function(t,e){return e.find((function(e){return function(t,e){var n=e.from;if(void 0===e.to)return!1;if(n.length>t.length)return!1;for(var r=0;r<n.length;r++){var a=n[r];if("*"===a)return!0;if(a!==t[r])return!1}return n.length===t.length}(t,e)}))},P=function(t,e){for(var n=Math.min(t.length,e.length),r=0;r<n&&t[r].toLowerCase()===e[r].id;r++);return r},E=function(t,e){for(var n,r=new U(t),a=!1,o=0;o<e.length;o++){var i=e[o].path;if(""===i[0])a=!0;else{var u,s=Object(c.a)(i);try{for(s.s();!(u=s.n()).done;){var h=u.value,l=r.next();if(":"===h[0]){if(""===l)return null;((n=n||[])[o]||(n[o]={}))[h.slice(1)]=l}else if(l!==h)return null}}catch(f){s.e(f)}finally{s.f()}a=!1}}return!a||a===(""===r.next())?n?e.map((function(t,e){return{id:t.id,path:t.path,params:S(t.params,n[e])}})):e:null},S=function(t,e){return!t&&e?e:t&&!e?t:t&&e?Object.assign(Object.assign({},t),e):void 0},D=function(t,e){var n,r=null,a=0,o=t.map((function(t){return t.id})),i=Object(c.a)(e);try{for(i.s();!(n=i.n()).done;){var u=n.value,s=P(o,u);s>a&&(r=u,a=s)}}catch(h){i.e(h)}finally{i.f()}return r?r.map((function(e,n){return{id:e.id,path:e.path,params:S(e.params,t[n]&&t[n].params)}})):null},L=function(t,e){var n,r=null,a=0,o=Object(c.a)(e);try{for(o.s();!(n=o.n()).done;){var i=n.value,u=E(t,i);if(null!==u){var s=N(u);s>a&&(a=s,r=u)}}}catch(h){o.e(h)}finally{o.f()}return r},N=function(t){var e,n=1,r=1,a=Object(c.a)(t);try{for(a.s();!(e=a.n()).done;){var o,i=e.value,u=Object(c.a)(i.path);try{for(u.s();!(o=u.n()).done;){var s=o.value;":"===s[0]?n+=Math.pow(1,r):""!==s&&(n+=Math.pow(2,r)),r++}}catch(h){u.e(h)}finally{u.f()}}}catch(h){a.e(h)}finally{a.f()}return n},U=function(){function t(e){Object(s.a)(this,t),this.path=e.slice()}return Object(h.a)(t,[{key:"next",value:function(){return this.path.length>0?this.path.shift():""}}]),t}(),T=function(t){return Array.from(t.children).filter((function(t){return"ION-ROUTE-REDIRECT"===t.tagName})).map((function(t){var e=I(t,"to");return{from:k(I(t,"from")),to:null==e?void 0:k(e)}}))},A=function(t){return _(W(t))},W=function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e;return Array.from(n.children).filter((function(t){return"ION-ROUTE"===t.tagName&&t.component})).map((function(n){var r=I(n,"component");if(null==r)throw new Error("component missing in ion-route");return{path:k(I(n,"url")),id:r.toLowerCase(),params:n.componentProps,beforeLeave:n.beforeLeave,beforeEnter:n.beforeEnter,children:t(e,n)}}))},I=function(t,e){return e in t?t[e]:t.hasAttribute(e)?t.getAttribute(e):null},_=function(t){var e,n=[],r=Object(c.a)(t);try{for(r.s();!(e=r.n()).done;){var a=e.value;H([],n,a)}}catch(o){r.e(o)}finally{r.f()}return n},H=function t(e,n,r){var a=e.slice();if(a.push({id:r.id,path:r.path,params:r.params,beforeLeave:r.beforeLeave,beforeEnter:r.beforeEnter}),0!==r.children.length){var o,i=Object(c.a)(r.children);try{for(i.s();!(o=i.n()).done;){t(a,n,o.value)}}catch(u){i.e(u)}finally{i.f()}}else n.push(a)},G=function(){function t(e){Object(s.a)(this,t),Object(l.o)(this,e),this.ionRouteWillChange=Object(l.g)(this,"ionRouteWillChange",7),this.ionRouteDidChange=Object(l.g)(this,"ionRouteDidChange",7),this.previousPath=null,this.busy=!1,this.state=0,this.lastState=0,this.root="/",this.useHash=!0}return Object(h.a)(t,[{key:"componentWillLoad",value:function(){var t=Object(i.a)(o.a.mark((function t(){return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.debug("[ion-router] router will load"),t.next=3,R(document.body)?Promise.resolve():new Promise((function(t){window.addEventListener("ionNavWillLoad",t,{once:!0})}));case 3:return console.debug("[ion-router] found nav"),t.next=6,this.onRoutesChanged();case 6:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"componentDidLoad",value:function(){window.addEventListener("ionRouteRedirectChanged",Object(p.k)(this.onRedirectChanged.bind(this),10)),window.addEventListener("ionRouteDataChanged",Object(p.k)(this.onRoutesChanged.bind(this),100))}},{key:"onPopState",value:function(){var t=Object(i.a)(o.a.mark((function t(){var e,n,r;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=this.historyDirection(),n=this.getPath(),t.next=4,this.runGuards(n);case 4:if(!0===(r=t.sent)){t.next=8;break}return"object"===typeof r&&(n=k(r.redirect)),t.abrupt("return",!1);case 8:return console.debug("[ion-router] URL changed -> update nav",n,e),t.abrupt("return",this.writeNavStateRoot(n,e));case 10:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"onBackButton",value:function(t){var e=this;t.detail.register(0,(function(t){e.back(),t()}))}},{key:"canTransition",value:function(){var t=Object(i.a)(o.a.mark((function t(){var e;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.runGuards();case 2:if(!0===(e=t.sent)){t.next=9;break}if("object"!==typeof e){t.next=8;break}return t.abrupt("return",e.redirect);case 8:return t.abrupt("return",!1);case 9:return t.abrupt("return",!0);case 10:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"push",value:function(){var t=Object(i.a)(o.a.mark((function t(e){var n,r,a,i,u,c=arguments;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=c.length>1&&void 0!==c[1]?c[1]:"forward",r=c.length>2?c[2]:void 0,e.startsWith(".")&&(e=new URL(e,window.location.href).pathname),console.debug("[ion-router] URL pushed -> updating nav",e,n),a=k(e),i=e.split("?")[1],t.next=8,this.runGuards(a);case 8:if(!0===(u=t.sent)){t.next=16;break}if("object"!==typeof u){t.next=15;break}a=k(u.redirect),i=u.redirect.split("?")[1],t.next=16;break;case 15:return t.abrupt("return",!1);case 16:return this.setPath(a,n,i),t.abrupt("return",this.writeNavStateRoot(a,n,r));case 18:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"back",value:function(){return window.history.back(),Promise.resolve(this.waitPromise)}},{key:"printDebug",value:function(){var t=Object(i.a)(o.a.mark((function t(){return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:console.debug("CURRENT PATH",this.getPath()),console.debug("PREVIOUS PATH",this.previousPath),m(A(this.el)),w(T(this.el));case 4:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"navChanged",value:function(){var t=Object(i.a)(o.a.mark((function t(e){var n,r,a,i,u,c;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!this.busy){t.next=3;break}return console.warn("[ion-router] router is busy, navChanged was cancelled"),t.abrupt("return",!1);case 3:return t.next=5,O(window.document.body);case 5:if(n=t.sent,r=n.ids,a=n.outlet,i=A(this.el),u=D(r,i)){t.next=13;break}return console.warn("[ion-router] no matching URL for ",r.map((function(t){return t.id}))),t.abrupt("return",!1);case 13:if(c=y(u)){t.next=17;break}return console.warn("[ion-router] router could not match path because some required param is missing"),t.abrupt("return",!1);case 17:return console.debug("[ion-router] nav changed -> update URL",r,c),this.setPath(c,e),t.next=21,this.safeWriteNavState(a,u,"root",c,null,r.length);case 21:return t.abrupt("return",!0);case 22:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"onRedirectChanged",value:function(){var t=this.getPath();t&&C(t,T(this.el))&&this.writeNavStateRoot(t,"root")}},{key:"onRoutesChanged",value:function(){return this.writeNavStateRoot(this.getPath(),"root")}},{key:"historyDirection",value:function(){var t=window;null===t.history.state&&(this.state++,t.history.replaceState(this.state,t.document.title,t.document.location&&t.document.location.href));var e=t.history.state,n=this.lastState;return this.lastState=e,e>n||e>=n&&n>0?"forward":e<n?"back":"root"}},{key:"writeNavStateRoot",value:function(){var t=Object(i.a)(o.a.mark((function t(e,n,r){var a,i,u,c,s;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e){t.next=3;break}return console.error("[ion-router] URL is not part of the routing set"),t.abrupt("return",!1);case 3:if(a=T(this.el),i=C(e,a),u=null,i&&(this.setPath(i.to,n),u=i.from,e=i.to),c=A(this.el),s=L(e,c)){t.next=12;break}return console.error("[ion-router] the path does not match any route"),t.abrupt("return",!1);case 12:return t.abrupt("return",this.safeWriteNavState(document.body,s,n,e,u,0,r));case 13:case"end":return t.stop()}}),t,this)})));return function(e,n,r){return t.apply(this,arguments)}}()},{key:"safeWriteNavState",value:function(){var t=Object(i.a)(o.a.mark((function t(e,n,r,a,i){var u,c,s,h,l=arguments;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return u=l.length>5&&void 0!==l[5]?l[5]:0,c=l.length>6?l[6]:void 0,t.next=4,this.lock();case 4:return s=t.sent,h=!1,t.prev=6,t.next=9,this.writeNavState(e,n,r,a,i,u,c);case 9:h=t.sent,t.next=15;break;case 12:t.prev=12,t.t0=t.catch(6),console.error(t.t0);case 15:return s(),t.abrupt("return",h);case 17:case"end":return t.stop()}}),t,this,[[6,12]])})));return function(e,n,r,a,o){return t.apply(this,arguments)}}()},{key:"lock",value:function(){var t=Object(i.a)(o.a.mark((function t(){var e,n;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e=this.waitPromise,this.waitPromise=new Promise((function(t){return n=t})),void 0===e){t.next=5;break}return t.next=5,e;case 5:return t.abrupt("return",n);case 6:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"runGuards",value:function(){var t=Object(i.a)(o.a.mark((function t(){var e,n,r,a,i,u,c,s,h,l=arguments;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e=l.length>0&&void 0!==l[0]?l[0]:this.getPath(),n=l.length>1&&void 0!==l[1]?l[1]:k(this.previousPath),e&&n){t.next=4;break}return t.abrupt("return",!0);case 4:if(r=A(this.el),a=L(e,r),i=L(n,r),u=a&&a[a.length-1].beforeEnter,!(c=i&&i[i.length-1].beforeLeave)){t.next=15;break}return t.next=12,c();case 12:t.t0=t.sent,t.next=16;break;case 15:t.t0=!0;case 16:if(!1!==(s=t.t0)&&"object"!==typeof s){t.next=19;break}return t.abrupt("return",s);case 19:if(!u){t.next=25;break}return t.next=22,u();case 22:t.t1=t.sent,t.next=26;break;case 25:t.t1=!0;case 26:if(!1!==(h=t.t1)&&"object"!==typeof h){t.next=29;break}return t.abrupt("return",h);case 29:return t.abrupt("return",!0);case 30:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"writeNavState",value:function(){var t=Object(i.a)(o.a.mark((function t(e,n,r,a,i){var u,c,s,h,l=arguments;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(u=l.length>5&&void 0!==l[5]?l[5]:0,c=l.length>6?l[6]:void 0,!this.busy){t.next=5;break}return console.warn("[ion-router] router is busy, transition was cancelled"),t.abrupt("return",!1);case 5:return this.busy=!0,(s=this.routeChangeEvent(a,i))&&this.ionRouteWillChange.emit(s),t.next=10,j(e,n,r,u,!1,c);case 10:return h=t.sent,this.busy=!1,h&&console.debug("[ion-router] route changed",a),s&&this.ionRouteDidChange.emit(s),t.abrupt("return",h);case 15:case"end":return t.stop()}}),t,this)})));return function(e,n,r,a,o){return t.apply(this,arguments)}}()},{key:"setPath",value:function(t,e,n){this.state++,function(t,e,n,r,a,o,i){var c=g([].concat(Object(u.a)(k(e)),Object(u.a)(r)));n&&(c="#"+c),void 0!==i&&(c=c+"?"+i),"forward"===a?t.pushState(o,"",c):t.replaceState(o,"",c)}(window.history,this.root,this.useHash,t,e,this.state,n)}},{key:"getPath",value:function(){return function(t,e,n){var r=t.pathname;if(n){var a=t.hash;r="#"===a[0]?a.slice(1):""}return function(t,e){if(t.length>e.length)return null;if(t.length<=1&&""===t[0])return e;for(var n=0;n<t.length;n++)if(t[n].length>0&&t[n]!==e[n])return null;return e.length===t.length?[""]:e.slice(t.length)}(k(e),k(r))}(window.location,this.root,this.useHash)}},{key:"routeChangeEvent",value:function(t,e){var n=this.previousPath,r=g(t);return this.previousPath=r,r===n?null:{from:n,redirectedFrom:e?g(e):null,to:r}}},{key:"el",get:function(){return Object(l.k)(this)}}]),t}(),M=function(){function t(e){var n=this;Object(s.a)(this,t),Object(l.o)(this,e),this.routerDirection="forward",this.onClick=function(t){Object(d.d)(n.href,t,n.routerDirection,n.routerAnimation)}}return Object(h.a)(t,[{key:"render",value:function(){var t,e=Object(f.b)(this),n={href:this.href,rel:this.rel,target:this.target};return Object(l.j)(l.c,{onClick:this.onClick,class:Object(d.a)(this.color,(t={},Object(r.a)(t,e,!0),Object(r.a)(t,"ion-activatable",!0),t))},Object(l.j)("a",Object.assign({},n),Object(l.j)("slot",null)))}}]),t}();M.style=":host{--background:transparent;--color:var(--ion-color-primary, #3880ff);background:var(--background);color:var(--color)}:host(.ion-color){color:var(--ion-color-base)}a{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit}"},186:function(t,e,n){"use strict";n.d(e,"a",(function(){return c})),n.d(e,"b",(function(){return s})),n.d(e,"c",(function(){return u})),n.d(e,"d",(function(){return l}));var r=n(3),a=n.n(r),o=n(4),i=n(19),u=function(t,e){return null!==e.closest(t)},c=function(t,e){return"string"===typeof t&&t.length>0?Object.assign(Object(i.a)({"ion-color":!0},"ion-color-".concat(t),!0),e):e},s=function(t){var e={};return function(t){return void 0!==t?(Array.isArray(t)?t:t.split(" ")).filter((function(t){return null!=t})).map((function(t){return t.trim()})).filter((function(t){return""!==t})):[]}(t).forEach((function(t){return e[t]=!0})),e},h=/^[a-z][a-z0-9+\-.]*:/,l=function(){var t=Object(o.a)(a.a.mark((function t(e,n,r,o){var i;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(null==e||"#"===e[0]||h.test(e)){t.next=5;break}if(!(i=document.querySelector("ion-router"))){t.next=5;break}return null!=n&&n.preventDefault(),t.abrupt("return",i.push(e,r,o));case 5:return t.abrupt("return",!1);case 6:case"end":return t.stop()}}),t)})));return function(e,n,r,a){return t.apply(this,arguments)}}()}}]);
//# sourceMappingURL=33.428bca04.chunk.js.map