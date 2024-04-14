import{r as n,j as t}from"./jsx-runtime-BfF-YriY.js";import{L as d}from"./layoutContainer-GjrKoGyE.js";import{g as y,h as f,j as x,k as g,n as S,M as w,L as j,O as k,S as L}from"./components-BL27QBWM.js";import"./flex-COvQVarW.js";/**
 * @remix-run/react v2.6.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let a="positions";function M({getKey:o,...l}){let{isSpaMode:c}=y(),r=f(),p=x();g({getKey:o,storageKey:a});let h=n.useMemo(()=>{if(!o)return null;let e=o(r,p);return e!==r.key?e:null},[]);if(c)return null;let m=((e,u)=>{if(!window.history.state||!window.history.state.key){let s=Math.random().toString(32).slice(2);window.history.replaceState({key:s},"")}try{let i=JSON.parse(sessionStorage.getItem(e)||"{}")[u||window.history.state.key];typeof i=="number"&&window.scrollTo(0,i)}catch(s){console.error(s),sessionStorage.removeItem(e)}}).toString();return n.createElement("script",S({},l,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${m})(${JSON.stringify(a)}, ${JSON.stringify(h)})`}}))}const v=()=>[{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"},{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Waiting+for+the+Sunrise&display=swap"}];function E(){return t.jsxs("html",{lang:"en",children:[t.jsxs("head",{children:[t.jsx("meta",{charSet:"utf-8"}),t.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),t.jsx(w,{}),t.jsx(j,{})]}),t.jsx("body",{children:t.jsxs(d,{className:"bg-col-880",children:[t.jsx(k,{}),t.jsx(M,{}),t.jsx(L,{})]})})]})}export{E as default,v as links};
