import{_ as f}from"./schema-form.vue_vue_type_script_setup_true_lang-DPj-4fWB.js";import{r as h,w as l,G as c,a5 as i,dr as d,c as w,$ as R}from"./index-r7n5qp17.js";function P(a){const n=h({});async function o(){await i();const e=c(n);return d(e)&&console.error("未获取表单实例!"),e}l(()=>a,async()=>{var e;if(a){await i();const r=await o();(e=r.setSchemaFormProps)==null||e.call(r,a)}},{immediate:!0,deep:!0,flush:"post"});const m=new Proxy(n,{get(e,r){return Reflect.has(e,r)?c(e):e.value&&Reflect.has(e.value,r)?Reflect.get(e.value,r):async(...s)=>{var u;const t=await o();return(u=t==null?void 0:t[r])==null?void 0:u.call(t,...s)}}});return[(e,{attrs:r,slots:s})=>w(f,R({ref:n},{...r,...a,...e}),s),c(m)]}export{P as u};