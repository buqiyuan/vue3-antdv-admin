import"./ApiSelect.vue_vue_type_script_setup_true_lang-DbIwa9ZG.js";import"./dayjs.min-BRRCE1Ga.js";import{d as m,r as u,q as c,v as d,c as p,F as n,x as f,G as s,$ as b,O as _,n as v}from"./index-r7n5qp17.js";import{_ as P}from"./schema-form.vue_vue_type_script_setup_true_lang-DPj-4fWB.js";import{C as g}from"./index-B3UruOCA.js";import{_ as y}from"./index-bg43Xrpq.js";import"./index-C9b-YaLx.js";import"./DownOutlined-PThacIE9.js";import"./isMobile-BbN7I0i_.js";import"./index-BT-siGKo.js";import"./collapseMotion-CYC7R_75.js";import"./debounce-Cw9_YRIz.js";import"./useMergedState-DH0d-QpP.js";import"./RightOutlined-C9KYgkia.js";import"./LeftOutlined-wvPpOnYM.js";import"./index-BK_Ez8ho.js";import"./cloneDeep-DJF4EuRH.js";import"./useFlexGapSupport-Dnu-U-EB.js";import"./hasIn-BbpCNcKV.js";import"./_arrayIncludesWith-DbV0gfeD.js";import"./QuestionCircleOutlined-Bp-nR2Sd.js";import"./_castArrayLikeObject-DIHMe4QR.js";import"./useRefs-Bo1CD1Ea.js";import"./index-D44MJVpE.js";import"./index-DNuk-Aq4.js";import"./_baseUniq-C5gIlH1G.js";import"./move-D7OxoiJJ.js";import"./index-BxPTfUct.js";import"./index-Rgyfe9bE.js";import"./CheckOutlined-CdlE2Q-w.js";import"./index-DmQdIBhw.js";import"./index-kZpAikaj.js";import"./is-CfxXRRgT.js";import"./isNumber-wid8KQSf.js";import"./index-BuJP2gaw.js";import"./dateUtil-D74EpsqT.js";import"./pick-BmOZqCpW.js";import"./index-C5S0InbA.js";import"./PlusOutlined-Cqb3K3za.js";const h=[{field:"field1.dd.cc",component:"Input",label:"字段1",colProps:{span:8},required:!0},{field:"field2",component:"Input",label:"字段2",colProps:{span:8},required:!0},{field:"id",label:"id",required:!0,defaultValue:0,component:"InputNumber",vShow:!1},{field:"field3",component:"DatePicker",label:"字段3",colProps:{span:8},required:!0},{field:"field33",component:"DatePicker",label:"字段33",colProps:{span:8},componentProps:{valueFormat:"YYYY-MM-DD"},rules:[{required:!0,type:"string"}]},{field:"field4",component:"Select",label:"字段4",colProps:{span:8},componentProps:{mode:"multiple",options:[{label:"选项1",value:"1",key:"1"},{label:"选项2",value:"2",key:"2"}]},rules:[{required:!0,message:"请输入aa",type:"array"}]},{field:"field441",component:"Input",label:"自定义校验",colProps:{span:8},rules:[{required:!0,validator:async(l,e)=>e?e==="1"?Promise.reject("值不能为1"):Promise.resolve():Promise.reject("值不能为空"),trigger:"change"}]},{field:"field5",component:"CheckboxGroup",label:"字段5",colProps:{span:8},componentProps:{options:[{label:"选项1",value:"1"},{label:"选项2",value:"2"}]},rules:[{required:!0}]},{field:"field7",component:"RadioGroup",label:"字段7",colProps:{span:8},componentProps:{options:[{label:"选项1",value:"1"},{label:"选项2",value:"2"}]},rules:[{required:!0,message:"覆盖默认生成的校验信息"}]},{field:"field8",component:"Input",label:"后端异步验证",colProps:{span:8},helpMessage:["本字段演示异步验证","本地规则：必须填写","后端规则：不能包含admin"],rules:[{required:!0,message:"请输入数据"},{validator(l,e=""){const{promise:t,resolve:i,reject:r}=Promise.withResolvers();return setTimeout(()=>{e.includes("admin")?r("该字段不能包含admin关键字"):i()},100),t}}]}],q=m({name:"DemosFormRuleForm",__name:"index",setup(l){const e=u(),t={schemas:h,labelWidth:120,actionColOptions:{span:24}};function i(r){var o;(o=e.value)==null||o.validate().then(()=>{_.success(JSON.stringify(r))})}return(r,o)=>{const a=g;return c(),d("div",null,[p(s(y),{message:"验证表单",description:"动态验证表单",type:"info","show-icon":"",style:{"margin-bottom":"12px"}},{description:n(()=>o[0]||(o[0]=[f("a",{class:"text-blue-500",target:"_blank",href:"https://github.com/buqiyuan/vue3-antdv-admin/blob/main/src/views/demos/form/rule-form/index.vue"}," 查看源码 ",-1)])),_:1}),p(a,null,{default:n(()=>[p(s(P),b({ref_key:"dynamicForm",ref:e},t,{onSubmit:i}),null,16)]),_:1})])}}}),se=v(q,[["__scopeId","data-v-0551fdf8"]]);export{se as default};