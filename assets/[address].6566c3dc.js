import{_ as l,a as p,b as h}from"./index.e58e6b42.js";import{_ as f}from"./Field.1ae75b3d.js";import{o,c as r,a as c,t as b,f as s,F as x,d as k,w as g,i as v}from"./vendor.2c4a5551.js";const $={props:{balance:Number,balance_staked:Number}},w=c("h2",{class:"mx-auto uppercase",style:{"font-weight":"300"}},"address",-1),j={class:"mx-auto uppercase pb-12",style:{"font-weight":"500"}};function y(e,d,n,_,a,i){const t=f;return o(),r(x,null,[w,c("h4",j,b(e.$route.params.address),1),s(t,{name:"Balance:",value:n.balance},null,8,["value"]),s(t,{name:"Staked:\xA0",value:n.balance_staked},null,8,["value"])],64)}var B=l($,[["render",y]]);const D={data(){return{balance:null,balance_staked:null}},methods:{fetchData(){!this.$route.params.address||(fetch(window.localStorage.getItem("api")+"/balance/"+this.$route.params.address).then(e=>e.json()).then(e=>{this.balance=e}),fetch(window.localStorage.getItem("api")+"/balance_staked/"+this.$route.params.address).then(e=>e.json()).then(e=>{this.balance_staked=e}))}},mounted(){document.title=this.$route.params.address+" - Address - Explorer - Pea",this.fetchData()},watch:{"$route.params":{handler(){this.fetchData()},immediate:!0}}},N={class:"mx-auto w-full h-full flex flex-col justify-center prose sm:prose-lg md:max-w-7xl grid md:grid-cols-2 gap-2 sm:gap-6"},F=c("div",{class:"my-40"},null,-1);function S(e,d,n,_,a,i){const t=h,m=B,u=p;return o(),r("div",N,[a.balance!==null&&a.balance_staked!==null?(o(),k(u,{key:0,class:"col-span-full text-justify md:text-left"},{default:g(()=>[s(t,{class:"mt-2"}),s(m,{balance:a.balance,balance_staked:a.balance_staked},null,8,["balance","balance_staked"]),F]),_:1})):v("",!0)])}var E=l(D,[["render",S]]);export{E as default};
