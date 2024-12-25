import{g as c,f as h,t as k}from"./columns-x_plG1Yu.js";import{P as T}from"./PlusOutlined-Cqb3K3za.js";import{I as _}from"./index-BvR_hmrv.js";import{d as F}from"./debounce-Cw9_YRIz.js";import{T as O}from"./index-D44MJVpE.js";import{c as l,H as m,d as q,r as E,e as R,q as V,v as j,F as r,G as p,O as P}from"./index-r7n5qp17.js";import{u as U}from"./dynamic-table-BKlfQmi-.js";import{S as u}from"./ApiSelect.vue_vue_type_script_setup_true_lang-DbIwa9ZG.js";import"./dayjs.min-BRRCE1Ga.js";import{w as g}from"./common-CXHHAMbq.js";import{C as D}from"./index-B3UruOCA.js";import{_ as I}from"./index-bg43Xrpq.js";import"./isNumber-wid8KQSf.js";import"./useMergedState-DH0d-QpP.js";import"./LeftOutlined-wvPpOnYM.js";import"./RightOutlined-C9KYgkia.js";import"./index-B4OvyGZO.js";import"./index-DNuk-Aq4.js";import"./_baseUniq-C5gIlH1G.js";import"./_arrayIncludesWith-DbV0gfeD.js";import"./collapseMotion-CYC7R_75.js";import"./move-D7OxoiJJ.js";import"./VerticalRightOutlined-BmPp6WQS.js";import"./cloneDeep-DJF4EuRH.js";import"./schema-form.vue_vue_type_script_setup_true_lang-DPj-4fWB.js";import"./is-CfxXRRgT.js";import"./index-BK_Ez8ho.js";import"./useFlexGapSupport-Dnu-U-EB.js";import"./hasIn-BbpCNcKV.js";import"./QuestionCircleOutlined-Bp-nR2Sd.js";import"./_castArrayLikeObject-DIHMe4QR.js";import"./index-kZpAikaj.js";import"./DownOutlined-PThacIE9.js";import"./index-BuJP2gaw.js";import"./dateUtil-D74EpsqT.js";import"./pick-BmOZqCpW.js";import"./FullscreenOutlined-CP2DD_0m.js";import"./index-BNEy2SYJ.js";import"./zh_CN-CAyhejr6.js";import"./index-BT-siGKo.js";import"./index-DyHh5v29.js";import"./EnterOutlined-BloAfoEJ.js";import"./CheckOutlined-CdlE2Q-w.js";import"./CopyOutlined-q6vv2eD2.js";import"./index-C9b-YaLx.js";import"./isMobile-BbN7I0i_.js";import"./useRefs-Bo1CD1Ea.js";import"./index-BxPTfUct.js";import"./index-Rgyfe9bE.js";import"./index-DmQdIBhw.js";import"./index-C5S0InbA.js";const N=[{title:"姓名",dataIndex:"name",sorter:!0,defaultEditable:!0,editable:({index:e})=>e>0,formItemProps:{defaultValue:"李白",rules:[{required:!0,message:"请输入姓名"}]},editFormItemProps:{extendSearchFormProps:!1,rules:[{required:!0,message:"请输入姓名"}]}},{title:"性别",dataIndex:"gender",formItemProps:{component:"Select",componentProps:({formInstance:e,formModel:o})=>({options:[{label:"男",value:1},{label:"女",value:0}],onChange(){e==null||e.updateSchema({field:"clothes",componentProps:{options:c(o.gender)}}),o.clothes=""}})},editFormItemProps:{extendSearchFormProps:!0,rules:[{required:!0,type:"number",message:"请选择性别"}],componentProps:({formInstance:e,formModel:o,tableRowKey:a})=>({onChange(){e==null||e.updateSchema({field:`${a}.clothes`,componentProps:{options:c(o.gender)}}),o.clothes=""}})},customRender:({record:e})=>["女","男"][e.gender]},{title:"衣服",dataIndex:"clothes",formItemProps:{component:"Select",componentProps:({formModel:e})=>({options:c(e.gender)})}},{title:"图片",dataIndex:"img",hideInSearch:!0,formItemProps:{component:"Upload",defaultValue:[{uid:"-1",name:"image.png",status:"done",url:"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"}],componentProps:{maxCount:1,listType:"picture-card",action:"https://www.mocky.io/v2/5cc8019d300000980a055e76"},componentSlots:({formModel:e})=>({default:()=>{var o;return(o=e.img)!=null&&o.length?"":l("div",null,[l(T,null,null),l("div",{class:"mt-8px"},[m("Upload")])])}})},customRender:({record:e})=>l(_,{width:100,src:e.img},null)},{title:"价格",dataIndex:"price",editFormItemProps:{component:"InputNumber",rules:[{required:!0,message:"请输入价格！"}]},customRender:({record:e})=>`${e.price}元`},{title:"状态",dataIndex:"status",formItemProps:{component:"Select",componentProps:({formInstance:e,schema:o})=>({showSearch:!0,filterOption:!1,request:()=>h(),onSearch:F(async a=>{o.value.loading=!0;const s={field:o.value.field,componentProps:{options:[]}};e==null||e.updateSchema([s]);const d=await h(a).finally(()=>o.value.loading=!1);s.componentProps.options=d,e==null||e.updateSchema([s])},500),onChange(a){e.setFieldsValue({status:a})}})},editFormItemProps:{rules:[{required:!0,type:"number",message:"请选择状态"}]},customRender:({record:e})=>l(O,{color:e.status==1?"red":"default"},{default:()=>[["已售罄","热卖中"][e.status]]})}],De=q({name:"EditRowTable",__name:"index",setup(e){const[o]=U(),a=E("cell"),s=async t=>(await g(500),{...t,items:k}),d=R(()=>[...N,{title:"操作",hideInTable:a.value==="cell",width:200,dataIndex:"ACTION",actions:({record:t},i)=>{const{startEditable:n,cancelEditable:b,isEditable:S,getEditFormModel:x,validateRow:C}=i;return S(t.id)?[{label:"保存",onClick:async()=>{var v;const f=await C(t.id);P.loading({content:"保存中...",key:t.id}),x(t.id),await g(2e3),b(t.id),P.success({content:"保存成功!",key:t.id,duration:2}),Object.assign(t,{...f,img:((v=f.img[0])==null?void 0:v.thumbUrl)||t.img})}},{label:"取消",onClick:()=>{b(t.id)}}]:[{label:"编辑",onClick:()=>{n(t.id,t)}}]}}]),y=(t,i,n)=>{},w=async(t,i,n)=>{await g(2e3),Object.assign(n,i)};return(t,i)=>(V(),j("div",null,[l(p(I),{message:"可编辑行表格",type:"info","show-icon":""},{description:r(()=>i[1]||(i[1]=[m(" 可编辑行表格-可编辑行表格使用示例 ")])),_:1}),l(p(D),{title:"可编辑行表格基本使用示例",style:{"margin-top":"20px"}},{default:r(()=>[l(p(o),{size:"small",bordered:"","data-request":s,columns:d.value,"editable-type":a.value,"on-save":w,"on-cancel":y,"row-key":"id"},{toolbar:r(()=>[l(p(u),{ref:"select",value:a.value,"onUpdate:value":i[0]||(i[0]=n=>a.value=n)},{default:r(()=>[l(p(u).Option,{value:"single"},{default:r(()=>i[2]||(i[2]=[m("单行编辑")])),_:1}),l(p(u).Option,{value:"multiple"},{default:r(()=>i[3]||(i[3]=[m("多行编辑")])),_:1}),l(p(u).Option,{value:"cell"},{default:r(()=>i[4]||(i[4]=[m("可编辑单元格")])),_:1})]),_:1},8,["value"])]),_:1},8,["columns","editable-type"])]),_:1})]))}});export{De as default};
