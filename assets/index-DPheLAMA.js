import"./ApiSelect.vue_vue_type_script_setup_true_lang-DbIwa9ZG.js";import"./dayjs.min-BRRCE1Ga.js";import{d as _,r as v,q as h,v as P,c as t,G as r,x as y,F as a,H as n,$ as F,O as S,B as k,n as w}from"./index-r7n5qp17.js";import{_ as C}from"./schema-form.vue_vue_type_script_setup_true_lang-DPj-4fWB.js";import{C as g}from"./index-B3UruOCA.js";import{_ as x}from"./index-bg43Xrpq.js";import"./index-C9b-YaLx.js";import"./DownOutlined-PThacIE9.js";import"./isMobile-BbN7I0i_.js";import"./index-BT-siGKo.js";import"./collapseMotion-CYC7R_75.js";import"./debounce-Cw9_YRIz.js";import"./useMergedState-DH0d-QpP.js";import"./RightOutlined-C9KYgkia.js";import"./LeftOutlined-wvPpOnYM.js";import"./index-BK_Ez8ho.js";import"./cloneDeep-DJF4EuRH.js";import"./useFlexGapSupport-Dnu-U-EB.js";import"./hasIn-BbpCNcKV.js";import"./_arrayIncludesWith-DbV0gfeD.js";import"./QuestionCircleOutlined-Bp-nR2Sd.js";import"./_castArrayLikeObject-DIHMe4QR.js";import"./useRefs-Bo1CD1Ea.js";import"./index-D44MJVpE.js";import"./index-DNuk-Aq4.js";import"./_baseUniq-C5gIlH1G.js";import"./move-D7OxoiJJ.js";import"./index-BxPTfUct.js";import"./index-Rgyfe9bE.js";import"./CheckOutlined-CdlE2Q-w.js";import"./index-DmQdIBhw.js";import"./index-kZpAikaj.js";import"./is-CfxXRRgT.js";import"./isNumber-wid8KQSf.js";import"./index-BuJP2gaw.js";import"./dateUtil-D74EpsqT.js";import"./pick-BmOZqCpW.js";import"./index-C5S0InbA.js";import"./PlusOutlined-Cqb3K3za.js";const B=[{field:"field1",component:"Input",label:"字段1",colProps:{span:8},vShow:({formModel:e})=>!!e.field5},{field:"field2",component:"Input",label:"字段2",colProps:{span:8},vShow:({formModel:e})=>!!e.field6},{field:"field3",component:"DatePicker",label:"字段3",colProps:{span:8},dynamicDisabled:({formModel:e})=>!!e.field7},{field:"field4",component:"Select",label:"字段4",colProps:{span:8},dynamicRules:({formModel:e})=>e.field8?[{required:!0,message:"字段4必填"}]:[],componentProps:{options:[{label:"选项1",value:"1",key:"1"},{label:"选项2",value:"2",key:"2"}]}},{field:"field11",component:"DatePicker",label:"字段11",colProps:{span:8}},{field:"field5",component:"Switch",label:"是否显示字段1(css控制)",colProps:{span:8},labelWidth:200},{field:"field6",component:"Switch",label:"是否显示字段2(dom控制)",colProps:{span:8},labelWidth:200},{field:"field7",component:"Switch",label:"是否禁用字段3",colProps:{span:8},labelWidth:200},{field:"field8",component:"Switch",label:"字段4是否必填",colProps:{span:8},componentProps:({formInstance:e})=>({onChange(i){requestAnimationFrame(()=>{i?e==null||e.validateFields():e==null||e.clearValidate()})}}),labelWidth:200}],N={class:"mb-4"},D=_({name:"DemosFormDynamicForm",__name:"index",setup(e){const i=v(),m={schemas:B,labelWidth:120,actionColOptions:{span:24}};function s(){var o,l;(o=i.value)==null||o.formModel,(l=i.value)==null||l.validate().then(()=>S.success("验证通过！"))}function d(){var o;(o=i.value)==null||o.updateSchema({field:"field3",label:"字段3 New"})}function c(){var o;(o=i.value)==null||o.updateSchema([{field:"field3",label:"字段3 New++"},{field:"field4",label:"字段4 New++"}])}function f(){var o;(o=i.value)==null||o.appendSchemaByField({field:"field10",label:"字段10",component:"Input",colProps:{span:8}},"field3")}function u(){var o;(o=i.value)==null||o.removeSchemaByField("field11")}return(o,l)=>{const p=k("a-button"),b=g;return h(),P("div",null,[t(r(x),{message:"动态表单示例",type:"info","show-icon":"",style:{"margin-bottom":"12px"}}),y("div",N,[t(p,{class:"mr-2",onClick:d},{default:a(()=>l[0]||(l[0]=[n(" 更改字段3label ")])),_:1}),t(p,{class:"mr-2",onClick:c},{default:a(()=>l[1]||(l[1]=[n(" 同时更改字段3,4label ")])),_:1}),t(p,{class:"mr-2",onClick:f},{default:a(()=>l[2]||(l[2]=[n(" 往字段3后面插入字段10 ")])),_:1}),t(p,{class:"mr-2",onClick:u},{default:a(()=>l[3]||(l[3]=[n(" 删除字段11 ")])),_:1})]),t(b,null,{default:a(()=>[t(r(C),F({ref_key:"dynamicForm",ref:i},m,{onSubmit:s}),null,16)]),_:1})])}}}),_e=w(D,[["__scopeId","data-v-9bed21df"]]);export{_e as default};
