import{j as e}from"./jsx-runtime-BfF-YriY.js";import{B as n}from"./box-BdT0KxCu.js";import{F as c}from"./flex-COvQVarW.js";import{I as h}from"./image-DzzBi0M2.js";import{T as l,a as s}from"./transition-DVSgZb6N.js";import{V as x}from"./vStack-xcuHHABo.js";function p({item:t,index:o,itemRefs:a}){const r=["bg-300-linear1op50 text-col-900 text-stroke-7-900 lightTextShadow","bg-100-linear2op50 text-col-900 text-stroke-7-900 lightTextShadow","bg-600-radial3op25 text-col-100 text-stroke-7-100 textShadow","bg-800-diagonal1op75 text-col-900 text-stroke-7-900 lightTextShadow","bg-900-diagonal1op75 text-col-100 text-stroke-7-100 textShadow"],d=o%2===0?r[0]:o%3===0?r[4]:o%5===0?r[3]:o%7===0?r[2]:r[1];return e.jsx(l,{duration:.6,delay:.5,children:e.jsx("div",{"data-id":t.id,ref:i=>a.current[o]=i,className:"h-[30vh] w-[25vh] p-[2vh]",children:e.jsxs(x,{gap:"gap-[3vh]",className:`w-full h-full border-150-lg font-cursive ${d} flex justify-center items-center lightGlowMd`,children:[e.jsx(s,{className:"text-xxxl-tight tracking-wider",children:t.text}),e.jsx(s,{className:"text-xxl-tight",children:"😀"})]})},t.id)})}function j({children:t}){return e.jsx(c,{className:"h-[6vh] w-[75vw] border-500-md bg-col-400 rounded-3vh justify-center items-center text-xl-tight lightTextShadow text-col-900 font-semibold shadowNarrowTight",children:t})}function b({item:t,index:o,itemRefs:a}){return e.jsx(l,{duration:.6,children:e.jsx("div",{"data-id":t.id,ref:r=>a.current[o]=r,className:`${t.height} w-[98vw] sm:w-[80vw] md:w-[50vw] xl:w-[33.3vw] fullHD:w-[25vw] p-[1.5vh] overflow-hidden`,children:e.jsxs(n,{className:"w-full h-full overflow-hidden rounded-[3vh] shadowWideLoose",children:[" ",e.jsx(h,{src:t.image,alt:"random",w:"w-full",className:"w-full h-full object-cover object-center border-970-sm rounded-[3vh]"})]})},t.id)})}export{j as L,b as M,p as T};
