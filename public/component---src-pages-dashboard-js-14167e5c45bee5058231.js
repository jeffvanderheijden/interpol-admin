"use strict";(self.webpackChunkadmin_panel=self.webpackChunkadmin_panel||[]).push([[643],{3808:function(e,t,n){n.d(t,{bV:function(){return s}});const a="https://api.interpol.sd-lab.nl/api",l=async e=>{try{const t=await fetch(a+"/students-by-group?id="+e);return await t.json()}catch(t){return console.error(t),[]}},r=async e=>{try{const t=await fetch(a+"/challenges-by-group?id="+e);return await t.json()}catch(t){return console.error(t),[]}},c=async e=>{try{const t=await fetch(a+"/challenge-by-id?id="+e);return await t.json()}catch(t){return console.error(t),[]}},s=async()=>{try{const e=await fetch(a+"/check-type",{method:"GET",credentials:"include"});if(!e.ok)throw new Error("HTTP error! status: "+e.status);const t=await e.json();return t&&t.error?(console.error("Error checking session:",t.error),!1):"DOCENT"===t}catch(e){return console.error("Error checking session:",e),!1}};t.ZP=()=>{let e=[];return(async()=>{const t=await(async()=>{try{const e=await fetch(a+"/groups");return await e.json()}catch(e){return console.error(e),[]}})();if(t.length>0)for(const n of t){let t=n;const a=await l(n.id);t.students=a;const s=await r(n.id);for(const e of s)await c(e.challenge_id).then((t=>{e.name=t[0].name,e.minimum_points=t[0].minimum_points,e.time_limit=t[0].time_limit})).catch((e=>console.error(e)));t.challenges=s,e.push(t)}else console.warn("No groups found.");return e})()}},2052:function(e,t,n){n.r(t),n.d(t,{Head:function(){return p},default:function(){return d}});var a=n(7294),l=n(7896),r=n(3808);var c=e=>{let{filters:t,setFilters:n}=e;return a.createElement("section",{id:"filter"},a.createElement("input",{type:"text",placeholder:"Zoek door groepen..",onChange:e=>{(e=>{n({...t,searchGroup:e.target.value})})(e)},value:t.searchGroup}),a.createElement("input",{type:"text",placeholder:"Zoek door studenten..",onChange:e=>{(e=>{n({...t,searchStudent:e.target.value})})(e)},value:t.searchStudent}),a.createElement("button",{onClick:()=>{(async()=>{try{const e=await fetch("https://api.interpol.sd-lab.nl/api/logout.php",{method:"POST",credentials:"include"});if(!e.ok)throw new Error("HTTP error! status: "+e.status);const t=await e.json();console.log("Logout successful:",t.message),(0,l.navigate)("/")}catch(e){console.error("Error logging out:",e)}})()}},"Uitloggen"))},s=n(5785),o=n(3253),u=n.n(o);var i=e=>{let{modalIsOpen:t,afterOpenModal:n,closeModal:l,customStyles:r,contentLabel:c,children:s}=e;const{0:o,1:i}=(0,a.useState)(!1);return(0,a.useEffect)((()=>{i(!0)}),[]),o?a.createElement(u(),{isOpen:t,onAfterOpen:n,onRequestClose:l,style:r,contentLabel:c},s):null};var m=e=>{let{groups:t}=e;const n="https://api.interpol.sd-lab.nl/",{0:l,1:r}=(0,a.useState)(null),{0:c,1:o}=(0,a.useState)([]),u=()=>r(null),m={content:{top:"50%",left:"50%",right:"auto",bottom:"auto",marginRight:"-50%",transform:"translate(-50%, -50%)"}};(0,a.useEffect)((()=>{o([])}),[l]);return a.createElement(a.Fragment,null,a.createElement("section",{id:"groupHeaders"},a.createElement("div",{className:"groupsHeader"},a.createElement("h1",null,"Groepen")),a.createElement("div",{className:"studentsHeader"},a.createElement("h1",null,"Studentnummer"),a.createElement("h1",null,"Naam")),a.createElement("div",{className:"challengesHeader"},a.createElement("h1",null,"Uitdagingen")),a.createElement("div",{className:"challengeKeysHeader"},a.createElement("h1",null,"Code"))),a.createElement("section",{id:"groups"},a.createElement("ul",{id:"group-tabs"},t&&t.map(((e,t)=>a.createElement(a.Fragment,null,a.createElement("li",{className:"group",key:t,onClick:()=>{var t;t=e.id,r(t)}},a.createElement("section",{className:"groupSection"},a.createElement("div",{className:"groupImage"},a.createElement("img",{src:""+(n+e.image_url),alt:e.name})),a.createElement("div",null,a.createElement("h2",null,e.name),a.createElement("p",null,e.class))),a.createElement("section",{className:"studentsSection"},a.createElement("ul",null,e.students.map(((e,t)=>a.createElement("li",{key:t},a.createElement("p",null,e.student_number),a.createElement("p",null,e.name)))))),a.createElement("section",{className:"challengesSection"},e.challenges.map(((e,t)=>a.createElement("ul",{key:t},a.createElement("li",null,a.createElement("h3",null,e.name),a.createElement("div",null,e.completed?a.createElement("span",null,"V"):a.createElement("span",null,"X"))))))),a.createElement("section",{className:"challengeKeys"},e.challenges.map(((e,t)=>a.createElement("ul",{key:t},a.createElement("li",null,a.createElement("h3",null,e.keycode))))))),a.createElement(i,{modalIsOpen:l===e.id,afterOpenModal:null,closeModal:u,customStyles:m,contentLabel:"Edit group"},a.createElement("div",{className:"editGroup"},a.createElement("section",{className:"groupSection"},a.createElement("div",{className:"groupImage"},a.createElement("img",{src:""+(n+e.image_url),alt:e.name})),a.createElement("div",null,a.createElement("input",{type:"text",placeholder:e.name}),a.createElement("input",{type:"text",placeholder:e.class}))),a.createElement("ul",{className:"editStudents"},e.students.map(((t,n)=>a.createElement("li",{key:n},a.createElement("input",{type:"number",placeholder:t.student_number}),a.createElement("input",{type:"text",placeholder:t.name}),a.createElement("button",{onClick:()=>{var n,a;n=t.student_number,a=e.id,console.log(n,a)}},"X")))),c.map(((e,t)=>a.createElement("li",{key:t},a.createElement("input",{type:"number",placeholder:e.student_number}),a.createElement("input",{type:"text",placeholder:e.name}),a.createElement("button",{onClick:()=>{o(c.filter(((e,n)=>n!==t)))}},"X"))))),a.createElement("button",{onClick:()=>{o([].concat((0,s.Z)(c),[{name:"",student_number:""}]))}},"Student toevoegen")))))))))};var d=()=>{const{0:e,1:t}=(0,a.useState)([]),{0:n,1:s}=(0,a.useState)([]),{0:o,1:u}=(0,a.useState)({searchGroup:"",searchStudent:""}),{0:i,1:d}=(0,a.useState)(!1);return(0,a.useEffect)((()=>{(0,r.bV)().then((e=>{d(e),e||(0,l.navigate)("/")}))}),[]),(0,a.useEffect)((()=>{if(i){(async()=>{const e=await(0,r.ZP)();t(e),s(e)})()}}),[i]),(0,a.useEffect)((()=>{u({...o,searchStudent:""});const t=o.searchGroup.toLowerCase(),n=e.filter((e=>e.name.toLowerCase().includes(t)));s(n)}),[o.searchGroup]),(0,a.useEffect)((()=>{u({...o,searchGroup:""});const t=o.searchStudent.toLowerCase(),n=e.filter((e=>e.students.some((e=>e.name.toLowerCase().includes(t)))));s(n)}),[o.searchStudent]),a.createElement(a.Fragment,null,i&&a.createElement("main",null,a.createElement(c,{filters:o,setFilters:u}),a.createElement(m,{groups:n})))};const p=()=>a.createElement("title",null,"Admin panel")}}]);
//# sourceMappingURL=component---src-pages-dashboard-js-14167e5c45bee5058231.js.map