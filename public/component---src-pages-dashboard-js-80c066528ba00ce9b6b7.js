"use strict";(self.webpackChunkadmin_panel=self.webpackChunkadmin_panel||[]).push([[643],{3468:function(e,t,n){n.r(t),n.d(t,{Head:function(){return f},default:function(){return g}});var a=n(7294),l=n(7896);const r="https://api.jeffvanderheijden.nl/api",c=async e=>{try{const t=await fetch(r+"/students-by-group?id="+e);return await t.json()}catch(t){return console.error(t),[]}},s=async e=>{try{const t=await fetch(r+"/challenges-by-group?id="+e);return await t.json()}catch(t){return console.error(t),[]}},o=async e=>{try{const t=await fetch(r+"/challenge-by-id?id="+e);return await t.json()}catch(t){return console.error(t),[]}};var u=()=>{let e=[];return(async()=>{const t=await(async()=>{try{const e=await fetch(r+"/groups");return await e.json()}catch(e){return console.error(e),[]}})();if(t.length>0)for(const n of t){let t=n;const a=await c(n.id);t.students=a;const l=await s(n.id);for(const e of l)await o(e.challenge_id).then((t=>{e.name=t[0].name,e.minimum_points=t[0].minimum_points,e.time_limit=t[0].time_limit})).catch((e=>console.error(e)));t.challenges=l,e.push(t)}else console.warn("No groups found.");return e})()};var m=e=>{let{filters:t,setFilters:n}=e;return a.createElement("section",{id:"filter"},a.createElement("input",{type:"text",placeholder:"Zoek door groepen..",onChange:e=>{(e=>{n({...t,searchGroup:e.target.value})})(e)},value:t.searchGroup}),a.createElement("input",{type:"text",placeholder:"Zoek door studenten..",onChange:e=>{(e=>{n({...t,searchStudent:e.target.value})})(e)},value:t.searchStudent}),a.createElement("button",{onClick:()=>{(async()=>{try{const e=await fetch("https://api.interpol.sd-lab.nl/api/logout.php",{method:"POST",credentials:"include"});if(!e.ok)throw new Error("HTTP error! status: "+e.status);const t=await e.json();console.log("Logout successful:",t.message),(0,l.navigate)("/")}catch(e){console.error("Error logging out:",e)}})()}},"Uitloggen"))},i=n(5785),d=n(3253),p=n.n(d);var E=e=>{let{modalIsOpen:t,afterOpenModal:n,closeModal:l,customStyles:r,contentLabel:c,children:s}=e;const{0:o,1:u}=(0,a.useState)(!1);return(0,a.useEffect)((()=>{u(!0)}),[]),o?a.createElement(p(),{isOpen:t,onAfterOpen:n,onRequestClose:l,style:r,contentLabel:c},s):null};var h=e=>{let{groups:t}=e;const n="https://api.jeffvanderheijden.nl/",{0:l,1:r}=(0,a.useState)(null),{0:c,1:s}=(0,a.useState)([]),o=()=>r(null),u={content:{top:"50%",left:"50%",right:"auto",bottom:"auto",marginRight:"-50%",transform:"translate(-50%, -50%)"}};return a.createElement(a.Fragment,null,a.createElement("section",{id:"groupHeaders"},a.createElement("div",{className:"groupsHeader"},a.createElement("h1",null,"Groepen")),a.createElement("div",{className:"studentsHeader"},a.createElement("h1",null,"Studentnummer"),a.createElement("h1",null,"Naam")),a.createElement("div",{className:"challengesHeader"},a.createElement("h1",null,"Uitdagingen")),a.createElement("div",{className:"challengeKeysHeader"},a.createElement("h1",null,"Code"))),a.createElement("section",{id:"groups"},a.createElement("ul",{id:"group-tabs"},t&&t.map(((e,t)=>a.createElement(a.Fragment,null,a.createElement("li",{className:"group",key:t,onClick:()=>{var t;t=e.id,r(t)}},a.createElement("section",{className:"groupSection"},a.createElement("div",{className:"groupImage"},a.createElement("img",{src:""+(n+e.image_url),alt:e.name})),a.createElement("div",null,a.createElement("h2",null,e.name),a.createElement("p",null,e.class))),a.createElement("section",{className:"studentsSection"},a.createElement("ul",null,e.students.map(((e,t)=>a.createElement("li",{key:t},a.createElement("p",null,e.student_number),a.createElement("p",null,e.name)))))),a.createElement("section",{className:"challengesSection"},e.challenges.map(((e,t)=>a.createElement("ul",{key:t},a.createElement("li",null,a.createElement("h3",null,e.name),a.createElement("div",null,e.completed?a.createElement("span",null,"V"):a.createElement("span",null,"X"))))))),a.createElement("section",{className:"challengeKeys"},e.challenges.map(((e,t)=>a.createElement("ul",{key:t},a.createElement("li",null,a.createElement("h3",null,e.keycode))))))),a.createElement(E,{modalIsOpen:l===e.id,afterOpenModal:null,closeModal:o,customStyles:u,contentLabel:"Edit group"},a.createElement("div",{className:"editGroup"},a.createElement("section",{className:"groupSection"},a.createElement("div",{className:"groupImage"},a.createElement("img",{src:""+(n+e.image_url),alt:e.name})),a.createElement("div",null,a.createElement("h2",null,e.name),a.createElement("p",null,e.class))),a.createElement("ul",{className:"editStudents"},e.students.map(((e,t)=>a.createElement("li",{key:t},a.createElement("input",{type:"number",placeholder:e.student_number}),a.createElement("input",{type:"text",placeholder:e.name})))),c.map(((e,t)=>a.createElement("li",{key:t},a.createElement("input",{type:"number",placeholder:e.student_number}),a.createElement("input",{type:"text",placeholder:e.name}))))),a.createElement("button",{onClick:()=>{s([].concat((0,i.Z)(c),[{name:"",student_number:""}]))},className:"btn"},"Student toevoegen")))))))))};var g=()=>{const{0:e,1:t}=(0,a.useState)([]),{0:n,1:l}=(0,a.useState)([]),{0:r,1:c}=(0,a.useState)({searchGroup:"",searchStudent:""}),{0:s,1:o}=(0,a.useState)(!0);return(0,a.useEffect)((()=>{if(s){(async()=>{const e=await u();t(e),l(e)})()}}),[s]),(0,a.useEffect)((()=>{c({...r,searchStudent:""});const t=r.searchGroup.toLowerCase(),n=e.filter((e=>e.name.toLowerCase().includes(t)));l(n)}),[r.searchGroup]),(0,a.useEffect)((()=>{c({...r,searchGroup:""});const t=r.searchStudent.toLowerCase(),n=e.filter((e=>e.students.some((e=>e.name.toLowerCase().includes(t)))));l(n)}),[r.searchStudent]),a.createElement(a.Fragment,null,s&&a.createElement("main",null,a.createElement(m,{filters:r,setFilters:c}),a.createElement(h,{groups:n})))};const f=()=>a.createElement("title",null,"Admin panel")}}]);
//# sourceMappingURL=component---src-pages-dashboard-js-80c066528ba00ce9b6b7.js.map