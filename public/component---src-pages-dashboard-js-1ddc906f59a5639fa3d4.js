"use strict";(self.webpackChunkadmin_panel=self.webpackChunkadmin_panel||[]).push([[643],{3808:function(e,t,n){n.d(t,{Cm:function(){return i},VB:function(){return o},bV:function(){return m},tT:function(){return u},x4:function(){return r}});const a="https://api.interpol.sd-lab.nl/api",r=async e=>{try{const t=await fetch("https://api.interpol.sd-lab.nl/api/create-session",{method:"POST",body:e,credentials:"include"}),n=await t.text();if(!t.ok)throw new Error("HTTP error! status: "+t.status);const a=JSON.parse(n);return a.error?(console.error("Login error:",a.error),a.error):(console.log("Login successful:",a.message),!0)}catch(t){console.error("Error creating session:",t)}},l=async e=>{try{const t=await fetch(a+"/students-by-group?id="+e);return await t.json()}catch(t){return console.error(t),[]}},c=async e=>{try{const t=await fetch(a+"/challenges-by-group?id="+e);return await t.json()}catch(t){return console.error(t),[]}},s=async e=>{try{const t=await fetch(a+"/challenge-by-id?id="+e);return await t.json()}catch(t){return console.error(t),[]}},o=async e=>{try{const t=await fetch(a+"/remove-student?id="+e,{method:"DELETE",credentials:"include"});if(!t.ok)throw new Error("HTTP error! status: "+t.status);return await t.json()}catch(t){return console.error(t),[]}},i=async(e,t)=>{try{const n=await fetch(a+"/create-team",{method:"POST",body:e}),r=await n.text();JSON.parse(r).message&&t(!0)}catch(n){console.error("Error creating team:",n)}},u=async e=>{try{console.log(e);const t=await fetch(a+"/remove-group?group_id="+e,{method:"DELETE",credentials:"include"});if(!t.ok)throw new Error("HTTP error! status: "+t.status);return await t.json()}catch(t){return console.error(t),[]}},m=async()=>{try{const e=await fetch(a+"/check-type",{method:"GET",credentials:"include"});if(!e.ok)throw new Error("HTTP error! status: "+e.status);const t=await e.json();return console.log(t),t&&t.error?(console.error("Error checking session:",t.error),!1):"DOCENT"===t}catch(e){return console.error("Error checking session:",e),!1}};t.ZP=()=>{let e=[];return(async()=>{const t=await(async()=>{try{const e=await fetch(a+"/groups");return await e.json()}catch(e){return console.error(e),[]}})();if(t.length>0)for(const n of t){let t=n;const a=await l(n.id);t.students=a;const r=await c(n.id);for(const e of r)await s(e.challenge_id).then((t=>{e.name=t[0].name,e.minimum_points=t[0].minimum_points,e.time_limit=t[0].time_limit})).catch((e=>console.error(e)));t.challenges=r,e.push(t)}else console.warn("No groups found.");return e})()}},5780:function(e,t,n){n.r(t),n.d(t,{Head:function(){return w},default:function(){return v}});var a=n(7294),r=n(7896),l=n(3808);var c=e=>{let{filters:t,setFilters:n,setOpenModal:l}=e;return a.createElement("section",{id:"filter"},a.createElement("input",{type:"text",placeholder:"Zoek door groepen..",onChange:e=>{(e=>{n({...t,searchGroup:e.target.value})})(e)},value:t.searchGroup}),a.createElement("input",{type:"text",placeholder:"Zoek door studenten..",onChange:e=>{(e=>{n({...t,searchStudent:e.target.value})})(e)},value:t.searchStudent}),a.createElement("button",{onClick:()=>{l(!0)}},"Groep toevoegen"),a.createElement("button",{className:"logout",onClick:()=>{(async()=>{try{const e=await fetch("https://api.interpol.sd-lab.nl/api/logout.php",{method:"POST",credentials:"include"});if(!e.ok)throw new Error("HTTP error! status: "+e.status);const t=await e.json();console.log("Logout successful:",t.message),(0,r.navigate)("/")}catch(e){console.error("Error logging out:",e)}})()}},"Uitloggen"))},s=n(5785),o=n(3253),i=n.n(o);var u=e=>{let{modalIsOpen:t,afterOpenModal:n,closeModal:r,customStyles:l,contentLabel:c,children:s}=e;const{0:o,1:u}=(0,a.useState)(!1);return(0,a.useEffect)((()=>{u(!0)}),[]),o?a.createElement(i(),{isOpen:t,onAfterOpen:n,onRequestClose:r,style:l,contentLabel:c},s):null};var m=e=>{let{onClick:t,className:n}=e;return a.createElement("svg",{onClick:t,calssName:n,fill:"red",height:"18",viewBox:"0 0 1000 1000",xmlns:"http://www.w3.org/2000/svg"},a.createElement("path",{d:"M767 336H233q-12 0-21 9t-9 21l38 505q1 13 12 21.5t30 8.5h434q18 0 29-8.5t13-21.5l38-505q0-12-9-21t-21-9zM344 841q-10 0-18-9t-8-21l-26-386q0-12 9-20.5t21-8.5 21 8.5 9 20.5l18 386q0 12-7.5 21t-18.5 9zm182-31q0 13-7.5 22t-18.5 9-18.5-9-7.5-22l-4-385q0-12 9-20.5t21-8.5 21 8.5 9 20.5zm156 1q0 12-8 21t-18 9q-11 0-18.5-9t-7.5-21l18-386q0-12 9-20.5t21-8.5 21 8.5 9 20.5zm101-605l-179-30q-12-2-15-15l-8-33q-4-20-14-26-6-3-22-3h-90q-16 0-23 3-10 6-13 26l-8 33q-2 13-15 15l-179 30q-19 3-31.5 14.5T173 249v28q0 9 6.5 15t15.5 6h610q9 0 15.5-6t6.5-15v-28q0-17-12.5-28.5T783 206z"}))};var d=e=>{let{apiUrl:t,group:n,openModal:r,closeModal:c}=e;const{0:o,1:i}=(0,a.useState)([]);(0,a.useEffect)((()=>{i([])}),[r]);return a.createElement(u,{modalIsOpen:r===n.id,afterOpenModal:null,closeModal:c,customStyles:{content:{top:"50%",left:"50%",right:"auto",bottom:"auto",marginRight:"-50%",transform:"translate(-50%, -50%)"}},contentLabel:"Edit group"},a.createElement("div",{className:"editGroup"},a.createElement("section",{className:"groupSection"},a.createElement("div",{className:"groupImage"},a.createElement("img",{src:""+(t+n.image_url),alt:n.name})),a.createElement("div",null,a.createElement("input",{type:"text",placeholder:n.name}),a.createElement("input",{type:"text",placeholder:n.class}))),a.createElement("ul",{className:"editStudents"},n.students.map(((e,t)=>a.createElement("li",{key:t},a.createElement("input",{type:"number",placeholder:e.student_number}),a.createElement("input",{type:"text",placeholder:e.name}),a.createElement(m,{className:"trashcan",onClick:()=>{var t,a,r;t=e.student_number,a=n.id,r=e.name,alert("Weet je zeker dat je "+r+" wilt verwijderen uit deze groep?"),(0,l.VB)(t),console.log(t,a)}})))),o.map(((e,t)=>a.createElement("li",{key:t},a.createElement("input",{type:"number",placeholder:e.student_number}),a.createElement("input",{type:"text",placeholder:e.name}),a.createElement(m,{className:"trashcan",onClick:()=>{i(o.filter(((e,n)=>n!==t)))}}))))),a.createElement("div",{className:"editButtons"},a.createElement("button",{onClick:()=>{i([].concat((0,s.Z)(o),[{name:"",student_number:""}]))}},"Student toevoegen"),a.createElement("button",{onClick:()=>{console.log("opslaan")}},"Opslaan"))))};var p=e=>{let{onClick:t,className:n}=e;return a.createElement("svg",{onClick:t,className:n,height:"18",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},a.createElement("path",{d:"M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z",fill:"#0F0F0F"}))};var h=e=>{let{onClick:t,className:n}=e;return a.createElement("svg",{onClick:t,className:n,height:"18",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},a.createElement("path",{d:"M4 12.6111L8.92308 17.5L20 6.5",stroke:"#000000","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}))};var E=e=>{let{onClick:t,className:n}=e;return a.createElement("svg",{onClick:t,className:n,height:"18",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},a.createElement("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M21 8C21 6.34315 19.6569 5 18 5H10C8.34315 5 7 6.34315 7 8V20C7 21.6569 8.34315 23 10 23H18C19.6569 23 21 21.6569 21 20V8ZM19 8C19 7.44772 18.5523 7 18 7H10C9.44772 7 9 7.44772 9 8V20C9 20.5523 9.44772 21 10 21H18C18.5523 21 19 20.5523 19 20V8Z",fill:"#0F0F0F"}),a.createElement("path",{d:"M6 3H16C16.5523 3 17 2.55228 17 2C17 1.44772 16.5523 1 16 1H6C4.34315 1 3 2.34315 3 4V18C3 18.5523 3.44772 19 4 19C4.55228 19 5 18.5523 5 18V4C5 3.44772 5.44772 3 6 3Z",fill:"#0F0F0F"}))};var g=e=>{let{groups:t}=e;const n="https://api.interpol.sd-lab.nl/",{0:r,1:c}=(0,a.useState)(null),{0:o,1:i}=(0,a.useState)([]),u=()=>c(null),m=(e,t)=>{navigator.clipboard.writeText(t),e.stopPropagation(),e.target.closest("li").querySelector(".checkmark").classList.add("show"),e.target.closest("li").querySelector(".copy").classList.add("hide"),setTimeout((()=>{e.target.closest("li").querySelector(".checkmark").classList.remove("show"),e.target.closest("li").querySelector(".copy").classList.remove("hide")}),2e3)};return a.createElement(a.Fragment,null,a.createElement("section",{id:"groupHeaders"},a.createElement("div",{className:"groupsHeader"},a.createElement("h1",null,"Groepen")),a.createElement("div",{className:"studentsHeader"},a.createElement("h1",null,"Studentnummer"),a.createElement("h1",null,"Naam")),a.createElement("div",{className:"challengesHeader"},a.createElement("h1",null,"Uitdagingen")),a.createElement("div",{className:"challengeKeysHeader"},a.createElement("h1",null,"Code"))),a.createElement("section",{id:"groups"},a.createElement("ul",{id:"group-tabs"},t&&t.map(((e,t)=>a.createElement(a.Fragment,null,a.createElement("li",{className:"group",key:t,onClick:()=>{var t;t=e.id,c(t)}},a.createElement("section",{className:"groupSection"},a.createElement("div",{className:"groupImage"},a.createElement("img",{src:""+(n+e.image_url),alt:e.name})),a.createElement("div",null,a.createElement("h2",null,e.name),a.createElement("p",null,e.class),a.createElement("button",{className:"deleteGroup",onClick:t=>{((e,t,n,a)=>{e.stopPropagation(),confirm("Weet je zeker dat je groep "+t+" uit klas "+n+" wilt verwijderen?")&&(0,l.tT)(a).then((e=>{setTimeout((()=>{window.location.reload()}),0)}))})(t,e.name,e.class,e.id)}},"Verwijder groep"))),a.createElement("section",{className:"studentsSection"},a.createElement("ul",null,e.students.map(((e,t)=>a.createElement("li",{key:t},a.createElement("p",null,e.student_number),a.createElement("p",null,e.name)))))),a.createElement("section",{className:"challengesSection"},a.createElement("ul",null,e.challenges.map(((e,t)=>a.createElement("li",{key:t},a.createElement("h3",null,e.name),a.createElement("div",null,e.completed?a.createElement("span",null,a.createElement(h,{className:"green"})):a.createElement("span",null,a.createElement(p,{className:"red"})))))))),a.createElement("section",{className:"challengeKeys"},a.createElement("ul",{key:t},e.challenges.map(((e,t)=>a.createElement("li",{key:t},a.createElement("h3",{className:o.includes(e.keycode)?"visible":"invisible",onClick:t=>{var n,a;n=t,a=e.keycode,o.includes(a)?i(o.filter((e=>e!==a))):i([].concat((0,s.Z)(o),[a])),n.stopPropagation()}},e.keycode),a.createElement(E,{className:"copy",onClick:t=>{m(t,e.keycode)}}),a.createElement(h,{className:"checkmark green hide",onClick:t=>{m(t,e.keycode)}}))))))),a.createElement(d,{group:e,openModal:r,closeModal:u,apiUrl:n})))))))};var f=e=>{let{openModal:t,closeModal:n}=e;const{0:r,1:c}=(0,a.useState)(!1),{0:o,1:i}=(0,a.useState)(!1),{0:d,1:p}=(0,a.useState)([0]),{0:h,1:E}=(0,a.useState)(null),{0:g,1:f}=(0,a.useState)(null),{0:v,1:w}=(0,a.useState)(null),{0:y,1:k}=(0,a.useState)(!1),C=(0,a.useRef)(null),b=(0,a.useRef)(null),N=(0,a.useRef)(null),S=(0,a.useRef)(null),q=(0,a.useRef)(null),L=(0,a.useRef)(null);function T(){if(b&&b.current&&S&&S.current){const e=b.current.getContext("2d");e.fillStyle="#000",e.fillRect(0,0,b.current.offsetHeight,b.current.offsetWidth);const t=b.current.toDataURL("image/png");S.current.setAttribute("src",t)}}(0,a.useEffect)((()=>{r&&(async()=>{try{T();const e=await navigator.mediaDevices.getUserMedia({video:!0,audio:!1});if(!N||!N.current)return;N.current.srcObject=e,N.current.addEventListener("loadedmetadata",(()=>{N.current.play()}))}catch(e){console.error(e)}N&&N.current&&N.current.addEventListener("canplay",(()=>{o||(f(N.current.videoHeight/(N.current.videoWidth/h)),isNaN(g)&&f(h/(4/3)),N.current.setAttribute("width",h),N.current.setAttribute("height",g),b.current.setAttribute("width",h),b.current.setAttribute("height",g),i(!0))}),!1)})()}),[r]),(0,a.useEffect)((()=>{E(200)}),[]),(0,a.useEffect)((()=>{y&&n()}),[y]);return a.createElement(u,{modalIsOpen:t,afterOpenModal:null,closeModal:n,customStyles:{content:{top:"50%",left:"50%",right:"auto",bottom:"auto",marginRight:"-50%",transform:"translate(-50%, -50%)"}},contentLabel:"New group"},a.createElement("div",{className:"newGroup"},r?a.createElement("div",{className:"camera",ref:C},a.createElement("video",{ref:N,id:"video"},"Video stream not available."),a.createElement("div",{className:"buttonWrapper"},a.createElement("button",{onClick:e=>{(e=>{if(b&&b.current&&S&&S.current&&N&&N.current){const e=b.current.getContext("2d");if(h&&g){b.current.width=h,b.current.height=g,e.drawImage(N.current,0,0,h,g);const t=b.current.toDataURL("image/png");w(t),S.current.setAttribute("src",t)}else T()}e.preventDefault()})(e)},ref:q,type:"button",id:"startbutton",className:"btn"},a.createElement("span",null,"Take photo")),a.createElement("button",{onClick:()=>{c(!1)},type:"button",id:"savebutton",className:"btn"},a.createElement("span",null,"Save photo"))),a.createElement("div",{className:"output"},a.createElement("div",{className:"imgWrapper"},a.createElement("img",{ref:S,id:"photo",alt:"Team image"})),a.createElement("canvas",{id:"canvas",ref:b}))):a.createElement("form",{onSubmit:e=>{(async e=>{e.preventDefault();const t=new FormData;t.append("image",v),t.append("name",e.target.elements.teamName.value),t.append("class",e.target.elements.klas.value.toLowerCase());let n=L.current.children;n=Array.from(n).map((e=>({name:e.querySelector('input[type="text"]').value,number:e.querySelector('input[type="number"]').value}))),t.append("students",JSON.stringify(n)),(0,l.Cm)(t,k).then((()=>{setTimeout((()=>{window.location.reload()}),0)}))})(e)}},a.createElement("input",{type:"hidden",id:"image",name:"image",value:v,required:!0}),a.createElement("section",{className:"groupSection"},a.createElement("div",{className:"groupImage",onClick:()=>{c(!0)},onKeyDown:()=>{c(!0)}},a.createElement("img",{src:v,alt:"Team"})),a.createElement("div",null,a.createElement("input",{type:"text",id:"teamName",name:"teamName",placeholder:"Team naam",required:!0}),a.createElement("input",{type:"text",id:"klas",name:"klas",placeholder:"Klas",required:!0}))),a.createElement("ul",{className:"addStudents",ref:L},d.map(((e,t)=>a.createElement("li",{key:t},a.createElement("input",{type:"number",placeholder:"Studentnummer",required:!0}),a.createElement("input",{type:"text",placeholder:"Student naam",required:!0}),a.createElement(m,{className:"trashcan",onClick:()=>{p(d.filter(((e,n)=>n!==t)))}}))))),a.createElement("div",{className:"addButtons"},a.createElement("button",{onClick:e=>{e.preventDefault(),p([].concat((0,s.Z)(d),[{name:"",student_number:""}]))}},"Student toevoegen"),a.createElement("button",{type:"submit"},"Opslaan")))))};var v=()=>{const{0:e,1:t}=(0,a.useState)([]),{0:n,1:s}=(0,a.useState)([]),{0:o,1:i}=(0,a.useState)({searchGroup:"",searchStudent:""}),{0:u,1:m}=(0,a.useState)(!1),{0:d,1:p}=(0,a.useState)(!1);return(0,a.useEffect)((()=>{(0,l.bV)().then((e=>{m(e),e||(0,r.navigate)("/")}))}),[]),(0,a.useEffect)((()=>{if(u){(async()=>{const e=await(0,l.ZP)();t(e),s(e)})()}}),[u]),(0,a.useEffect)((()=>{i({...o,searchStudent:""});const t=o.searchGroup.toLowerCase(),n=e.filter((e=>e.name.toLowerCase().includes(t)));s(n)}),[o.searchGroup]),(0,a.useEffect)((()=>{i({...o,searchGroup:""});const t=o.searchStudent.toLowerCase(),n=e.filter((e=>e.students.some((e=>e.name.toLowerCase().includes(t)))));s(n)}),[o.searchStudent]),a.createElement(a.Fragment,null,u&&a.createElement("main",null,a.createElement(c,{filters:o,setFilters:i,setOpenModal:p}),a.createElement(g,{groups:n}),a.createElement(f,{openModal:d,closeModal:()=>p(!1)})))};const w=()=>a.createElement("title",null,"Admin panel")}}]);
//# sourceMappingURL=component---src-pages-dashboard-js-1ddc906f59a5639fa3d4.js.map