import{u as w}from"./useModal-CsQiLMZV.js";import"./ApiSelect.vue_vue_type_script_setup_true_lang-DbIwa9ZG.js";import"./dayjs.min-BRRCE1Ga.js";import{r as h,bK as y,c as F,$ as M,a5 as b,G as _}from"./index-r7n5qp17.js";import{_ as C}from"./schema-form.vue_vue_type_script_setup_true_lang-DPj-4fWB.js";function G(){const[i]=w();return[async({modalProps:n,formProps:a})=>{const c=h(),f=t=>{var e;(e=n==null?void 0:n.onCancel)==null||e.call(n,t)},s=async()=>{var t,e;try{const u=await((t=c.value)==null?void 0:t.submit());await r(u)}catch(u){return(e=n==null?void 0:n.onFail)==null||e.call(n,{}),Promise.reject(u)}},r=async t=>{var e;await((e=n==null?void 0:n.onFinish)==null?void 0:e.call(n,t)),i.hide()};return await i.show({destroyOnClose:!0,...y(n,["onFinish","onFail"]),onCancel:f,onOk:s,content:()=>{const t=Object.assign({},{showActionButtonGroup:!1},a);return F(C,M({ref:c},t),null)}}),await b(),[_(c)]},i]}export{G as u};
