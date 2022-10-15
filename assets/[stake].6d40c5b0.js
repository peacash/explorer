import{_ as c,a as p,b as f}from"./index.23ad8ec0.js";import{_ as k}from"./Field.0147a8f8.js";import{o,c as r,a as l,t as h,f as a,F as v,d as g,w as x,i as w}from"./vendor.2c4a5551.js";const y={props:{stake:Object}},$=l("h2",{class:"mx-auto uppercase",style:{"font-weight":"300"}},"stake",-1),j={class:"mx-auto uppercase pb-12",style:{"font-weight":"500"}};function D(s,u,e,i,n,_){const t=k;return o(),r(v,null,[$,l("h4",j,h(s.$route.params.stake),1),a(t,{value:new Date(e.stake.timestamp*1e3).toLocaleString()},null,8,["value"]),a(t,{value:e.stake.deposit?"Deposit":"Withdraw"},null,8,["value"]),a(t,{name:"Address:",value:e.stake.public_key,to:"/address/"+e.stake.public_key},null,8,["value","to"]),a(t,{name:"Amount:",value:e.stake.amount},null,8,["value"]),a(t,{name:"Fee:",value:e.stake.fee},null,8,["value"]),a(t,{name:"Signature:",value:e.stake.signature},null,8,["value"])],64)}var S=c(y,[["render",D]]);const b={data(){return{stake:null}},methods:{fetchData(){!this.$route.params.stake||fetch(window.localStorage.getItem("api")+"/stake/"+this.$route.params.stake).then(s=>s.json()).then(s=>{this.stake=s})}},mounted(){document.title="Stake - Pea",this.fetchData()},watch:{"$route.params":{handler(){this.fetchData()},immediate:!0}}},B={class:"mx-auto w-full h-full flex flex-col justify-center prose sm:prose-lg md:max-w-7xl grid md:grid-cols-2 gap-2 sm:gap-6"},F=l("div",{class:"my-40"},null,-1);function N(s,u,e,i,n,_){const t=f,m=S,d=p;return o(),r("div",B,[n.stake!==null?(o(),g(d,{key:0,class:"col-span-full text-justify md:text-left"},{default:x(()=>[a(t,{class:"mt-2"}),a(m,{stake:n.stake},null,8,["stake"]),F]),_:1})):w("",!0)])}var E=c(b,[["render",N]]);export{E as default};
