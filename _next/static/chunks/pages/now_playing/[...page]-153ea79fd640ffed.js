(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[535],{4712:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/now_playing/[...page]",function(){return n(1885)}])},8269:function(t,e,n){"use strict";n.d(e,{Z:function(){return p}});var i=n(5893),c=n(1163),s=n(7294),r=n(6756),l=n(1664),o=n.n(l),u=n(2982),a=n(5675),d=n.n(a);function p(t){let e=(0,c.useRouter)(),n=null==e.query.page?1:parseInt(e.query.page[0]),[l,a]=(0,s.useState)(),[p,h]=(0,s.useState)();async function f(){let e=await (await fetch("/api/movies/".concat(t.type,"/page=").concat(n))).json();a(e.results),h(e.total_pages)}(0,s.useEffect)(()=>{f()},[n]);let x=(t,n)=>{e.push("/movies/".concat(n,"/").concat(t))};return(0,i.jsxs)("div",{children:[(0,i.jsx)(r.Z,{title:t.title}),(0,i.jsx)("div",{children:(0,i.jsx)("span",{children:t.title})}),l?null==l?void 0:l.map(t=>(0,i.jsxs)("div",{onClick:()=>x(t.id,t.title),children:[(0,i.jsx)(d(),{src:"https://image.tmdb.org/t/p/w500/".concat(t.poster_path),className:"poster",alt:"poster"}),(0,i.jsx)(o(),{href:"/movies/".concat(t.original_title,"/").concat(t.id),legacyBehavior:!0,children:(0,i.jsx)("a",{children:t.original_title})},t.id)]},t.id)):(0,i.jsx)("div",{children:"Loading"}),(0,i.jsx)(u.Z,{type:t.type,page:n,totalPage:p})]})}},2982:function(t,e,n){"use strict";n.d(e,{Z:function(){return r}});var i=n(5893),c=n(1163),s=n(7294);function r(t){let e=(0,c.useRouter)(),[n,r]=(0,s.useState)(1),[l,o]=(0,s.useState)([]),u=t.page,a=t.totalPage,d=n=>{e.push("/".concat(t.type,"/").concat(n))};return(0,s.useEffect)(()=>{void 0===a&&(a=0);let t=(u-1)/5*5+1,e=[];for(let n=0;n<5;n++)t+n<=a&&e.push(t+n);r(t),o(e)},[u,a]),(0,i.jsxs)("div",{children:[(0,i.jsx)("ul",{children:1===n?(0,i.jsx)("li",{onClick:()=>{d(n-5)},children:"prev"}):(0,i.jsx)("li",{children:"prev"})}),l.map(t=>(0,i.jsx)("li",{onClick:()=>{d(t)},children:(0,i.jsx)("div",{children:t})},t)),5===l.length?(0,i.jsx)("li",{onClick:()=>{d(n+5)},children:"next"}):null]})}},6756:function(t,e,n){"use strict";n.d(e,{Z:function(){return r}});var i=n(5893),c=n(9008),s=n.n(c);function r(t){let{title:e}=t;return(0,i.jsx)(s(),{children:(0,i.jsxs)("title",{children:[e," | Next Movies"]})})}},1885:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return s}});var i=n(5893),c=n(8269);function s(){return(0,i.jsxs)("div",{children:[(0,i.jsx)(c.Z,{type:"now_playing",title:"Now In Theaters"}),";"]})}},9008:function(t,e,n){t.exports=n(2636)}},function(t){t.O(0,[675,774,888,179],function(){return t(t.s=4712)}),_N_E=t.O()}]);