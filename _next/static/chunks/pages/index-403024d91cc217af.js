(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(2603)}])},6756:function(t,e,n){"use strict";n.d(e,{Z:function(){return o}});var i=n(5893),s=n(9008),c=n.n(s);function o(t){let{title:e}=t;return(0,i.jsx)(c(),{children:(0,i.jsxs)("title",{children:[e," | Next Movies"]})})}},2603:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return h}});var i=n(5893),s=n(1664),c=n.n(s),o=n(1163),r=n(7294),a=n(6756),u=n(5675),l=n.n(u);function h(){let[t,e]=(0,r.useState)(0),n=(0,o.useRouter)(),[s,u]=(0,r.useState)([]);async function h(){let t=await (await fetch("/api/movies")).json();u(t.results)}(0,r.useEffect)(()=>{h(),e(Math.floor(19*Math.random()))},[h]);let[d]=(0,r.useState)(s.map(t=>t.backdrop_path)),[p]=(0,r.useState)(s.map(t=>t.original_title)),f=(t,e)=>{n.push("/movies/".concat(e,"/").concat(t))};return(0,i.jsxs)("div",{children:[(0,i.jsx)(a.Z,{title:"Home"}),(0,i.jsxs)("div",{children:[(0,i.jsx)(l(),{src:"https://image.tmdb.org/t/p/w780/".concat(d[t]),style:{width:"780px",height:"440px"},alt:"mainPoster"}),(0,i.jsx)("h1",{children:p[t]})]}),null==s?void 0:s.map(t=>(0,i.jsxs)("div",{onClick:()=>f(t.id,t.title),children:[(0,i.jsx)(l(),{src:"https://image.tmdb.org/t/p/w500/".concat(t.poster_path),alt:"poster"}),(0,i.jsx)(c(),{href:"/movies/".concat(t.original_title,"/").concat(t.id),children:(0,i.jsx)("h4",{children:t.original_title})})]},t.id))]})}},9008:function(t,e,n){t.exports=n(2636)}},function(t){t.O(0,[675,774,888,179],function(){return t(t.s=8312)}),_N_E=t.O()}]);