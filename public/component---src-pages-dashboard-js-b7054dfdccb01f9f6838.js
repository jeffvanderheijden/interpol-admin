"use strict";(self.webpackChunkadmin_panel=self.webpackChunkadmin_panel||[]).push([[643],{3808:function(e,t,n){n.d(t,{b:function(){return r}});const a="https://api.jeffvanderheijden.nl/api",r=async()=>{try{const e=await fetch(a+"/check-type",{method:"GET",credentials:"include"});if(!e.ok)throw new Error("HTTP error! status: "+e.status);const t=await e.json();return t&&t.error?(console.error("Error checking session:",t.error),!1):"DOCENT"===t}catch(e){return console.error("Error checking session:",e),!1}};t.Z=()=>{let e=[];const t=async e=>{try{const t=await fetch(a+"/students-by-group?id="+e);return await t.json()}catch(t){return console.error(t),[]}},n=async e=>{try{const t=await fetch(a+"/challenges-by-group?id="+e);return await t.json()}catch(t){return console.error(t),[]}},r=async e=>{try{const t=await fetch(a+"/challenge-by-id?id="+e);return await t.json()}catch(t){return console.error(t),[]}};return(async()=>{const l=await(async()=>{try{const e=await fetch(a+"/groups");return await e.json()}catch(e){return console.error(e),[]}})();if(l.length>0)for(const a of l){let l=a;const c=await t(a.id);l.students=c;const s=await n(a.id);for(const e of s)await r(e.challenge_id).then((t=>{e.name=t[0].name,e.minimum_points=t[0].minimum_points,e.time_limit=t[0].time_limit})).catch((e=>console.error(e)));l.challenges=s,e.push(l)}else console.warn("No groups found.");return e})()}},632:function(e,t,n){n.r(t),n.d(t,{Head:function(){return u},default:function(){return o}});var a=n(7294),r=n(7896),l=n(3808);var c=e=>{let{filters:t,setFilters:n}=e;return a.createElement("section",{id:"filter"},a.createElement("input",{type:"text",placeholder:"Zoek door groepen..",onChange:e=>{(e=>{n({...t,searchGroup:e.target.value})})(e)},value:t.searchGroup}),a.createElement("input",{type:"text",placeholder:"Zoek door studenten..",onChange:e=>{(e=>{n({...t,searchStudent:e.target.value})})(e)},value:t.searchStudent}),a.createElement("button",{onClick:()=>{(async()=>{try{const e=await fetch("https://api.interpol.sd-lab.nl/api/logout.php",{method:"POST",credentials:"include"});if(!e.ok)throw new Error("HTTP error! status: "+e.status);const t=await e.json();console.log("Logout successful:",t.message),(0,r.navigate)("/")}catch(e){console.error("Error logging out:",e)}})()}},"Uitloggen"))};var s=e=>{let{groups:t}=e;return a.createElement(a.Fragment,null,a.createElement("section",{id:"groupHeaders"},a.createElement("div",{className:"groupsHeader"},a.createElement("h1",null,"Groepen")),a.createElement("div",{className:"studentsHeader"},a.createElement("h1",null,"Studentnummer"),a.createElement("h1",null,"Naam")),a.createElement("div",{className:"challengesHeader"},a.createElement("h1",null,"Uitdagingen")),a.createElement("div",{className:"challengeKeysHeader"},a.createElement("h1",null,"Code"))),a.createElement("section",{id:"groups"},a.createElement("ul",{id:"group-tabs"},t&&t.map(((e,t)=>a.createElement("li",{className:"group",key:t},a.createElement("section",{className:"groupSection"},a.createElement("div",{className:"groupImage"},a.createElement("img",{src:"https://api.interpol.sd-lab.nl/"+e.image_url,alt:e.name})),a.createElement("div",null,a.createElement("h2",null,e.name),a.createElement("p",null,e.class))),a.createElement("section",{className:"studentsSection"},a.createElement("ul",null,e.students.map(((e,t)=>a.createElement("li",{key:t},a.createElement("p",null,e.student_number),a.createElement("p",null,e.name)))))),a.createElement("section",{className:"challengesSection"},e.challenges.map(((e,t)=>a.createElement("ul",{key:t},a.createElement("li",null,a.createElement("h3",null,e.name),a.createElement("div",null,e.completed?a.createElement("span",null,"V"):a.createElement("span",null,"X"))))))),a.createElement("section",{className:"challengeKeys"},e.challenges.map(((e,t)=>a.createElement("ul",{key:t},a.createElement("li",null,a.createElement("h3",null,e.keycode))))))))))))};var o=()=>{const{0:e,1:t}=(0,a.useState)([]),{0:n,1:o}=(0,a.useState)([]),{0:u,1:i}=(0,a.useState)({searchGroup:"",searchStudent:""}),{0:m,1:d}=(0,a.useState)(!1);return(0,a.useEffect)((()=>{(0,l.b)().then((e=>{d(e),e||(0,r.navigate)("/")}))}),[]),(0,a.useEffect)((()=>{if(m){(async()=>{const e=await(0,l.Z)();t(e),o(e)})()}}),[m]),(0,a.useEffect)((()=>{i({...u,searchStudent:""});const t=u.searchGroup.toLowerCase(),n=e.filter((e=>e.name.toLowerCase().includes(t)));o(n)}),[u.searchGroup]),(0,a.useEffect)((()=>{i({...u,searchGroup:""});const t=u.searchStudent.toLowerCase(),n=e.filter((e=>e.students.some((e=>e.name.toLowerCase().includes(t)))));o(n)}),[u.searchStudent]),a.createElement(a.Fragment,null,m&&a.createElement("main",null,a.createElement(c,{filters:u,setFilters:i}),a.createElement(s,{groups:n})))};const u=()=>a.createElement("title",null,"Admin panel")}}]);
//# sourceMappingURL=component---src-pages-dashboard-js-b7054dfdccb01f9f6838.js.map