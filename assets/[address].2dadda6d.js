import{_ as p,a as m,b}from"./index.3d5e53ba.js";import{o as l,c as n,d as f,w as k,i as r,f as y,a,t as _,p as x,k as g}from"./vendor.548eab8a.js";const v={data(){return{balance:null,balance_staked:null,public_key:this.$route.params.address,shorten_public_key:!0}},mounted(){document.title=this.$route.params.address+" - Address - Explorer - Pea",this.loop()},unmounted(){clearInterval(this.interval)},methods:{loop(){this.fetchData(),this.interval=setInterval(()=>{this.fetchData()},3e3)},fetchData(){!this.$route.params.address||(fetch(window.localStorage.getItem("api")+"/balance/"+this.$route.params.address).then(e=>e.json()).then(e=>{this.balance=e}),fetch(window.localStorage.getItem("api")+"/balance_staked/"+this.$route.params.address).then(e=>e.json()).then(e=>{this.balance_staked=e}))},balance_to_string(e){let o=18,t="0".repeat(o);t+=e;let i=t.length-o;for(t=[t.slice(0,i),".",t.slice(i)].join("");t.startsWith("0");)t=t.slice(1);return t.startsWith(".")&&(t="0"+t),t},shorten(e){return e.slice(0,12)+"..."+e.slice(-8)}},watch:{"$route.params":{handler(){this.fetchData()},immediate:!0}}},c=e=>(x("data-v-74453c36"),e=e(),g(),e),w={class:"mx-auto w-full h-full flex flex-col justify-center prose sm:prose-lg md:max-w-7xl grid md:grid-cols-2 gap-2 sm:gap-6"},I=c(()=>a("h2",{class:"mx-auto uppercase",style:{"font-weight":"300"}},"address",-1)),j={class:"mx-auto"},B={key:0},D=c(()=>a("td",null,"Public\xA0key",-1)),S={key:1},C={key:1},N=c(()=>a("td",null,"Balance",-1)),V={key:2},E=c(()=>a("td",null,"Balance\xA0staked",-1)),P=c(()=>a("div",{class:"my-40"},null,-1));function W(e,o,t,i,s,d){const u=b,h=m;return l(),n("div",w,[s.balance!==null&&s.balance_staked!==null?(l(),f(h,{key:0,class:"col-span-full text-justify md:text-left"},{default:k(()=>[y(u,{class:"mt-2"}),I,a("table",j,[s.public_key!==null?(l(),n("tr",B,[D,s.shorten_public_key?(l(),n("td",{key:0,onClick:o[0]||(o[0]=A=>s.shorten_public_key=!1)},_(d.shorten(s.public_key)),1)):(l(),n("td",S,_(s.public_key),1))])):r("",!0),s.balance!==null?(l(),n("tr",C,[N,a("td",null,_(d.balance_to_string(s.balance)),1)])):r("",!0),s.balance_staked!==null?(l(),n("tr",V,[E,a("td",null,_(d.balance_to_string(s.balance_staked)),1)])):r("",!0)]),P]),_:1})):r("",!0)])}var F=p(v,[["render",W],["__scopeId","data-v-74453c36"]]);export{F as default};
