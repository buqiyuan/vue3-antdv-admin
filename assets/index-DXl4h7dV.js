import{f as u}from"./dateUtil-D74EpsqT.js";import{T as x}from"./index-D44MJVpE.js";import{c as f,d as w,q as C,C as k,F as c,H as g,G as h,at as l,B as P}from"./index-r7n5qp17.js";import{u as v}from"./dynamic-table-BKlfQmi-.js";import"./ApiSelect.vue_vue_type_script_setup_true_lang-DbIwa9ZG.js";import"./dayjs.min-BRRCE1Ga.js";import"./index.vue_vue_type_style_index_0_lang-CCz3QAXN.js";import{u as R}from"./useFormModal-BdTInWDn.js";import"./index-B4OvyGZO.js";import"./index-DNuk-Aq4.js";import"./_baseUniq-C5gIlH1G.js";import"./_arrayIncludesWith-DbV0gfeD.js";import"./collapseMotion-CYC7R_75.js";import"./move-D7OxoiJJ.js";import"./RightOutlined-C9KYgkia.js";import"./VerticalRightOutlined-BmPp6WQS.js";import"./cloneDeep-DJF4EuRH.js";import"./schema-form.vue_vue_type_script_setup_true_lang-DPj-4fWB.js";import"./isNumber-wid8KQSf.js";import"./is-CfxXRRgT.js";import"./index-BK_Ez8ho.js";import"./useFlexGapSupport-Dnu-U-EB.js";import"./hasIn-BbpCNcKV.js";import"./debounce-Cw9_YRIz.js";import"./QuestionCircleOutlined-Bp-nR2Sd.js";import"./_castArrayLikeObject-DIHMe4QR.js";import"./index-kZpAikaj.js";import"./DownOutlined-PThacIE9.js";import"./index-BuJP2gaw.js";import"./pick-BmOZqCpW.js";import"./FullscreenOutlined-CP2DD_0m.js";import"./index-BNEy2SYJ.js";import"./LeftOutlined-wvPpOnYM.js";import"./zh_CN-CAyhejr6.js";import"./index-BT-siGKo.js";import"./useMergedState-DH0d-QpP.js";import"./index-DyHh5v29.js";import"./EnterOutlined-BloAfoEJ.js";import"./CheckOutlined-CdlE2Q-w.js";import"./CopyOutlined-q6vv2eD2.js";import"./index-C9b-YaLx.js";import"./isMobile-BbN7I0i_.js";import"./useRefs-Bo1CD1Ea.js";import"./index-BxPTfUct.js";import"./index-Rgyfe9bE.js";import"./index-DmQdIBhw.js";import"./useModal-CsQiLMZV.js";const T=[{title:"#",dataIndex:"id",width:55,hideInSearch:!0},{title:"角色名称",width:200,dataIndex:"name"},{title:"角色值",width:180,dataIndex:"value"},{title:"状态",dataIndex:"status",width:80,formItemProps:{component:"Select",componentProps:{options:[{label:"启用",value:1},{label:"禁用",value:0}]}},customRender:({record:r})=>{const m=~~r.status===1;return f(x,{color:m?"green":"red"},{default:()=>[m?"启用":"停用"]})}},{title:"备注",dataIndex:"remark"},{title:"创建时间",dataIndex:"createdAt",hideInSearch:!0,customRender:({record:r})=>u(r.createdAt)},{title:"更新时间",dataIndex:"updatedAt",hideInSearch:!0,customRender:({record:r})=>u(r.createdAt)}],S=[{field:"name",component:"Input",label:"角色名称",rules:[{required:!0,type:"string"}],colProps:{span:12}},{field:"value",component:"Input",label:"角色值",rules:[{required:!0,type:"string"}],colProps:{span:12}},{field:"status",label:"状态",component:"RadioGroup",defaultValue:1,componentProps:{options:[{label:"启用",value:1},{label:"停用",value:0}]}},{field:"remark",component:"InputTextArea",label:"备注"},{field:"menuIds",component:"Tree",label:"菜单权限",componentProps:{checkable:!0,vModelKey:"checkedKeys",fieldNames:{title:"name",key:"id"},style:{height:"350px",paddingTop:"5px",overflow:"auto",borderRadius:"6px",border:"1px solid #dcdfe6",resize:"vertical"}}}],ke=w({name:"SystemPermissionRole",__name:"index",setup(r){const[m,s]=v(),[b]=R(),d=(e,t,i=[])=>t.reduce((o,a)=>{var n;return(n=a.children)!=null&&n.length?d(e,a.children,i):e.includes(a.id)&&o.push(a.id),o},i),p=async e=>{const[t]=await b({modalProps:{title:`${e.id?"编辑":"新增"}角色`,width:"50%",onFinish:async o=>{e.id&&(o.roleId=e.id);const a=t==null?void 0:t.compRefMap.get("menuIds"),n={...o,menuIds:[...a.halfCheckedKeys,...a.checkedKeys]};e.id?await l.systemRole.roleUpdate({id:e.id},n):await l.systemRole.roleCreate(n),s==null||s.reload()}},formProps:{labelWidth:100,schemas:S}}),i=await l.systemMenu.menuList({});if(t==null||t.updateSchema([{field:"menuIds",componentProps:{treeData:i}}]),e.id){const o=await l.systemRole.roleInfo({id:e.id});t==null||t.setFieldsValue({...e,menuIds:d(o.menuIds,i)})}},y=async e=>{await l.systemRole.roleDelete({id:e.id}),s==null||s.reload()},I=[...T,{title:"操作",width:130,dataIndex:"ACTION",hideInSearch:!0,fixed:"right",actions:({record:e})=>[{label:"编辑",auth:{perm:"system:role:update",effect:"disable"},onClick:()=>{p(e)}},{label:"删除",auth:"system:role:delete",popConfirm:{title:"你确定要删除吗？",placement:"left",onConfirm:()=>y(e)}}]}];return(e,t)=>{const i=P("a-button");return C(),k(h(m),{"row-key":"id","header-title":"角色管理","title-tooltip":"超级管理员默认拥有所有资源访问权限且不支持修改","data-request":h(l).systemRole.roleList,columns:I,bordered:"",size:"small"},{toolbar:c(()=>[f(i,{type:"primary",disabled:!e.$auth("system:role:create"),onClick:t[0]||(t[0]=o=>p({}))},{default:c(()=>t[1]||(t[1]=[g(" 新增 ")])),_:1},8,["disabled"])]),_:1},8,["data-request"])}}});export{ke as default};
