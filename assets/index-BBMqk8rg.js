import{f as h}from"./dateUtil-D74EpsqT.js";import{at as p,d as b,q as C,v as w,c as m,F as r,x,G as s,H as l,B as D}from"./index-r7n5qp17.js";import{f as I}from"./common-CXHHAMbq.js";import{u as k}from"./dynamic-table-BKlfQmi-.js";import"./ApiSelect.vue_vue_type_script_setup_true_lang-DbIwa9ZG.js";import"./dayjs.min-BRRCE1Ga.js";import"./index.vue_vue_type_style_index_0_lang-CCz3QAXN.js";import{u as N}from"./useFormModal-BdTInWDn.js";import"./index-B4OvyGZO.js";import"./index-DNuk-Aq4.js";import"./_baseUniq-C5gIlH1G.js";import"./_arrayIncludesWith-DbV0gfeD.js";import"./collapseMotion-CYC7R_75.js";import"./move-D7OxoiJJ.js";import"./RightOutlined-C9KYgkia.js";import"./VerticalRightOutlined-BmPp6WQS.js";import"./cloneDeep-DJF4EuRH.js";import"./schema-form.vue_vue_type_script_setup_true_lang-DPj-4fWB.js";import"./isNumber-wid8KQSf.js";import"./is-CfxXRRgT.js";import"./index-BK_Ez8ho.js";import"./useFlexGapSupport-Dnu-U-EB.js";import"./hasIn-BbpCNcKV.js";import"./debounce-Cw9_YRIz.js";import"./QuestionCircleOutlined-Bp-nR2Sd.js";import"./_castArrayLikeObject-DIHMe4QR.js";import"./index-kZpAikaj.js";import"./DownOutlined-PThacIE9.js";import"./index-BuJP2gaw.js";import"./pick-BmOZqCpW.js";import"./FullscreenOutlined-CP2DD_0m.js";import"./index-BNEy2SYJ.js";import"./LeftOutlined-wvPpOnYM.js";import"./zh_CN-CAyhejr6.js";import"./index-BT-siGKo.js";import"./useMergedState-DH0d-QpP.js";import"./index-DyHh5v29.js";import"./EnterOutlined-BloAfoEJ.js";import"./CheckOutlined-CdlE2Q-w.js";import"./CopyOutlined-q6vv2eD2.js";import"./index-C9b-YaLx.js";import"./isMobile-BbN7I0i_.js";import"./useRefs-Bo1CD1Ea.js";import"./index-D44MJVpE.js";import"./index-BxPTfUct.js";import"./index-Rgyfe9bE.js";import"./index-DmQdIBhw.js";import"./useModal-CsQiLMZV.js";const _=[{title:"部门名称",dataIndex:"name",align:"left"},{title:"排序",dataIndex:"orderNo",width:50,hideInSearch:!0},{title:"创建时间",dataIndex:"createdAt",width:200,hideInSearch:!0,customRender:({record:a})=>h(a.createdAt)}],P=[{field:"name",component:"Input",label:"部门名称",rules:[{required:!0,type:"string"}]},{field:"parentId",component:"TreeSelect",label:"上级部门",componentProps:{fieldNames:{label:"name",value:"id"},getPopupContainer:()=>document.body,request:async({schema:a,formModel:n})=>{const o=await p.systemDept.deptList({});return a.value.componentProps.treeDefaultExpandedKeys=I(o,n.parentId),o}}},{field:"orderNo",label:"排序",component:"InputNumber",required:!0,componentProps:{style:{width:"100%"}}}],q={class:"flex gap-2 ml-2"},It=b({name:"SystemDept",__name:"index",setup(a){const[n,o]=k(),[f]=N(),u=async t=>{var i;const[e]=await f({modalProps:{title:`${t.id?"编辑":"新增"}部门`,width:"50%",onFinish:async d=>{t.id?await p.systemDept.deptUpdate({id:t.id},d):await p.systemDept.deptCreate(d),o==null||o.reload()}},formProps:{labelWidth:100,schemas:P}});e==null||e.setFieldsValue({...t,parentId:(i=t.parent)==null?void 0:i.id})},c=async t=>{await p.systemDept.deptDelete({id:t.id}),o==null||o.reload()},y=[..._,{title:"操作",width:130,dataIndex:"ACTION",hideInSearch:!0,fixed:"right",actions:({record:t})=>[{label:"编辑",auth:{perm:"system:dept:update",effect:"disable"},onClick:()=>u(t)},{label:"删除",auth:"system:dept:delete",popConfirm:{title:"你确定要删除吗？",placement:"left",onConfirm:()=>c(t)}}]}];return(t,e)=>{const i=D("a-button");return C(),w("div",null,[m(s(n),{"row-key":"id","header-title":"部门管理","data-request":s(p).systemDept.deptList,columns:y,bordered:"",size:"small"},{afterHeaderTitle:r(()=>[x("div",q,[m(i,{onClick:s(o).expandAll},{default:r(()=>e[1]||(e[1]=[l("展开全部")])),_:1},8,["onClick"]),m(i,{onClick:s(o).collapseAll},{default:r(()=>e[2]||(e[2]=[l("折叠全部")])),_:1},8,["onClick"])])]),toolbar:r(()=>[m(i,{type:"primary",disabled:!t.$auth("system:dept:create"),onClick:e[0]||(e[0]=d=>u({}))},{default:r(()=>e[3]||(e[3]=[l(" 新增 ")])),_:1},8,["disabled"])]),_:1},8,["data-request"])])}}});export{It as default};