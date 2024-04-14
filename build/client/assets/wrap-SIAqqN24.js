import{j as n}from"./jsx-runtime-BfF-YriY.js";const i=`
@keyframes bounce {
  0%, 100% {
    transform: scale(0) translateX(100%);
  }
  40% {
    transform: scale(1.0) translateX(0);
  }
}`;function x({color:s="cyan",dotSize:e=10,dotCount:t=5,speed:r="4s"}){const o=Array.from({length:t});return n.jsxs(n.Fragment,{children:[n.jsx("style",{children:i}),n.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:o.map((l,a)=>n.jsx("div",{style:{width:`${e}px`,height:`${e}px`,margin:"0 6px",backgroundColor:s,borderRadius:"50%",boxShadow:"2px 2px 2px black",display:"inline-block",animation:`bounce ${r} ${.5*a}s infinite ease-in-out both`}},a))})]})}function m({children:s,className:e="",style:t}){return n.jsx("div",{className:`flex flex-wrap ${e}`,style:t,children:s})}export{x as B,m as W};
