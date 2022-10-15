import{_ as r,a as p,b as f}from"./index.e58e6b42.js";import{_ as h}from"./Field.1ae75b3d.js";import{o,c as i,a as c,t as v,f as e,F as x,d as g,w as y,i as w}from"./vendor.2c4a5551.js";const b={props:{transaction:Object}},k=c("h2",{class:"mx-auto uppercase",style:{"font-weight":"300"}},"transaction",-1),$={class:"mx-auto uppercase pb-12",style:{"font-weight":"500"}};function j(n,l,t,u,s,_){const a=h;return o(),i(x,null,[k,c("h4",$,v(n.$route.params.transaction),1),e(a,{value:new Date(t.transaction.timestamp*1e3).toLocaleString()},null,8,["value"]),e(a,{name:"Input address:",value:t.transaction.public_key_input,to:"/address/"+t.transaction.public_key_input},null,8,["value","to"]),e(a,{name:"Output address:",value:t.transaction.public_key_output,to:"/address/"+t.transaction.public_key_output},null,8,["value","to"]),e(a,{name:"Amount:",value:t.transaction.amount},null,8,["value"]),e(a,{name:"Fee:",value:t.transaction.fee},null,8,["value"]),e(a,{name:"Signature:",value:t.transaction.signature},null,8,["value"])],64)}var D=r(b,[["render",j]]);const B={data(){return{transaction:null}},methods:{fetchData(){!this.$route.params.transaction||fetch(window.localStorage.getItem("api")+"/transaction/"+this.$route.params.transaction).then(n=>n.json()).then(n=>{this.transaction=n})}},mounted(){document.title=this.$route.params.transaction+" - Transaction - Explorer - Pea",this.fetchData()},watch:{"$route.params":{handler(){this.fetchData()},immediate:!0}}},F={class:"mx-auto w-full h-full flex flex-col justify-center prose sm:prose-lg md:max-w-7xl grid md:grid-cols-2 gap-2 sm:gap-6"},S=c("div",{class:"my-40"},null,-1);function N(n,l,t,u,s,_){const a=f,m=D,d=p;return o(),i("div",F,[s.transaction!==null?(o(),g(d,{key:0,class:"col-span-full text-justify md:text-left"},{default:y(()=>[e(a,{class:"mt-2"}),e(m,{transaction:s.transaction},null,8,["transaction"]),S]),_:1})):w("",!0)])}var I=r(B,[["render",N]]);export{I as default};
