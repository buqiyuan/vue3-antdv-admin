import{r as m,e as N,dr as c,c as l,e8 as P,B as X,d as Y,aC as Z,w as ee,o as ae,q as d,C as S,F as i,G as n,H as E,v as $,T as te,L as ne,cO as le,J as H,M as oe,at as I,al as se}from"./index-r7n5qp17.js";import{_ as ie,g as re}from"./file-operate-button-list.vue_vue_type_script_setup_true_lang-DJrW5V0K.js";import{_ as me}from"./file-preview-drawer.vue_vue_type_script_setup_true_lang-BZZqdhOH.js";import{f as ue,p as pe}from"./index-BuJP2gaw.js";import{f as ce}from"./dateUtil-D74EpsqT.js";import"./index.vue_vue_type_style_index_0_lang-CCz3QAXN.js";import{u as fe}from"./useFormModal-BdTInWDn.js";import{c as de}from"./createContextMenu-CwPXnvPw.js";import{u as ve}from"./dynamic-table-BKlfQmi-.js";import"./ApiSelect.vue_vue_type_script_setup_true_lang-DbIwa9ZG.js";import"./dayjs.min-BRRCE1Ga.js";import{S as U}from"./index-BNEy2SYJ.js";import{F as he}from"./index-BT-siGKo.js";import{B as F}from"./index-DXWgEMlH.js";import{b as B}from"./index-DyHh5v29.js";import{C as ge}from"./index-B3UruOCA.js";import"./file-upload-drawer.vue_vue_type_script_setup_true_lang-BI5_yW5h.js";import"./index-BxPTfUct.js";import"./index-BK_Ez8ho.js";import"./cloneDeep-DJF4EuRH.js";import"./useFlexGapSupport-Dnu-U-EB.js";import"./hasIn-BbpCNcKV.js";import"./_arrayIncludesWith-DbV0gfeD.js";import"./debounce-Cw9_YRIz.js";import"./QuestionCircleOutlined-Bp-nR2Sd.js";import"./collapseMotion-CYC7R_75.js";import"./_castArrayLikeObject-DIHMe4QR.js";import"./index-Rgyfe9bE.js";import"./CheckOutlined-CdlE2Q-w.js";import"./useRefs-Bo1CD1Ea.js";import"./useMergedState-DH0d-QpP.js";import"./index-DN4_SIkU.js";import"./isNumeric-DjvBa-1E.js";import"./index-B4OvyGZO.js";import"./index-DNuk-Aq4.js";import"./_baseUniq-C5gIlH1G.js";import"./move-D7OxoiJJ.js";import"./RightOutlined-C9KYgkia.js";import"./CopyOutlined-q6vv2eD2.js";import"./index-BvR_hmrv.js";import"./isNumber-wid8KQSf.js";import"./LeftOutlined-wvPpOnYM.js";import"./index-p-416BN9.js";import"./is-CfxXRRgT.js";import"./FullscreenOutlined-CP2DD_0m.js";import"./useModal-CsQiLMZV.js";import"./schema-form.vue_vue_type_script_setup_true_lang-DPj-4fWB.js";import"./index-kZpAikaj.js";import"./DownOutlined-PThacIE9.js";import"./pick-BmOZqCpW.js";import"./VerticalRightOutlined-BmPp6WQS.js";import"./zh_CN-CAyhejr6.js";import"./index-C9b-YaLx.js";import"./isMobile-BbN7I0i_.js";import"./index-D44MJVpE.js";import"./index-DmQdIBhw.js";import"./EnterOutlined-BloAfoEJ.js";import"./index-C5S0InbA.js";import"./PlusOutlined-Cqb3K3za.js";const ye=p=>p?ue(p):"-",ke=()=>{const p=m([]),v=m(""),k=N(()=>!c(v.value)),T=N(()=>[{title:"文件名",dataIndex:"name",align:"left"},{title:"大小",width:120,align:"center",dataIndex:"fsize",customRender:({record:a})=>l("span",null,[ye(a.fsize)])},{title:"上传时间",dataIndex:"putTime",align:"center",width:220,customRender({text:a}){return a?ce(a):"-"}},{title:"所属目录",dataIndex:"belongTo",align:"center",width:220,hideInTable:!k.value,customRender:({record:a})=>l(X("a-button"),{type:"link",disabled:a.type==="file"&&P("netdisk:manage:info"),onClick:()=>C(a)},{default:()=>[a.belongTo?a.belongTo:"根目录"]})}]),C=a=>{v.value="",c(a.belongTo)?p.value=[]:p.value=a.belongTo.split("/")};return{columns:T,currentPathList:p,localSearchKey:v,isSearching:k}},be=["innerHTML"],_e={key:1},La=Y({name:"NetDiskManage",__name:"manage",setup(p){const[v,k]=ve(),[T]=fe(),{columns:C,currentPathList:a,localSearchKey:u,isSearching:b}=ke(),w=m(),h=m([]),g=m(""),x=m(!1),D=m(!1),K=m(!1),f=m(!1),M=m([]),O=Z({selectedRowKeys:[],onChange:(e,t)=>{O.selectedRowKeys=e,M.value=t.map(r=>({type:r.type,name:r.name}))}}),V=N(()=>c(g.value)),y=()=>{let e="";return a.value.length>0&&(e=`${a.value.join("/")}/`),e},J=(e,t)=>t==="dir"?"file-type-dir":pe(e),j=e=>e.replace(new RegExp(`${u.value}`,"g"),`<span style='color: red;'>${u.value}</span>`),q=e=>{x.value!==e&&(x.value=e)},L=()=>{g.value=" ",h.value=[],M.value=[],f.value&&(f.value=!1),R()},R=async()=>{var r;if(f.value,f.value)return;D.value=!0,f.value=!0;const e=y(),t=await I.netDiskManage.netDiskManageList({path:e,key:u.value,marker:((r=g.value)==null?void 0:r.trim())||""}).finally(()=>D.value=!1);if(c(g))h.value=t.list||[];else{const o=t.list.filter(s=>s.type==="file"?!0:!h.value.find(_=>_.type==="file"?!1:_.name===s.name));c(o)||h.value.push(...o)}g.value=t.marker,f.value=!1},z=e=>{b.value||(e===-1&&a.value.length>0?a.value=[]:e>=0&&a.value.length-1!==e&&(a.value=a.value.slice(0,e+1)))},A=e=>{var t,r;if(e.type==="dir")if(b.value){const o=c(e.belongTo)?[]:e.belongTo.split("/");o.push(e.name),u.value="",a.value=o}else a.value.push(e.name);else b.value?(t=w.value)==null||t.open(e.name,c(e.belongTo)?"":`${e.belongTo}/`):(r=w.value)==null||r.open(e.name,y())},G=async e=>{try{K.value=!0;const t=await I.netDiskManage.netDiskManageDownload({path:y(),name:e.name});window.open(`${t}?attname=${encodeURIComponent(e.name)}`)}finally{K.value=!1}},W=async e=>{await T({modalProps:{title:"重命名",width:700,onFinish:async t=>{await I.netDiskManage.netDiskManageRename({type:e.type,toName:t.toName,name:e.name,path:y()},{successMsg:"修改成功"}),L()}},formProps:{labelWidth:100,schemas:re(e)}})},Q=e=>({onContextmenu:t=>{de({event:t,items:[{label:"下载",disabled:e.type==="dir"||!P("netdisk:manage:download"),handler:()=>{G(e)}},{label:"重命名",disabled:!P("netdisk:manage:rename"),handler:()=>{W(e)}}]})}});return ee([a,u],()=>{L()},{deep:!0}),ae(()=>{R(),k.onInfiniteScroll(()=>{V.value||R()})}),(e,t)=>{const r=se;return d(),S(n(ge),{class:"h-full"},{title:i(()=>[l(n(U),null,{default:i(()=>[l(n(he)),l(n(F),null,{default:i(()=>[l(n(F).Item,null,{default:i(()=>[l(n(B).Link,{onClick:t[0]||(t[0]=o=>z(-1))},{default:i(()=>t[2]||(t[2]=[E("根目录")])),_:1})]),_:1}),(d(!0),$(ne,null,te(n(a),(o,s)=>(d(),S(n(F).Item,{key:s},{default:i(()=>[l(n(B).Link,{onClick:_=>z(s)},{default:i(()=>[E(H(o),1)]),_:2},1032,["onClick"])]),_:2},1024))),128))]),_:1})]),_:1})]),extra:i(()=>[l(ie,{"search-key":n(u),"onUpdate:searchKey":t[1]||(t[1]=o=>le(u)?u.value=o:null),"selected-file-list":M.value,"update-operate-status":q,"parse-path":y,onChanged:L},null,8,["search-key","selected-file-list"])]),default:i(()=>[l(n(v),{"data-source":h.value,columns:n(C),"custom-row":Q,"auto-height":!0,pagination:!1,search:!1,"show-tool-bar":!1,loading:D.value,"row-selection":O},{bodyCell:i(({column:o,record:s})=>[o.key==="name"?(d(),S(n(B).Link,{key:0,disabled:s.type==="file"&&e.$auth("netdisk:manage:info"),onClick:_=>A(s)},{default:i(()=>[l(n(U),null,{default:i(()=>[l(r,{name:J(s.name,s.type)},null,8,["name"]),n(b)?(d(),$("span",{key:0,innerHTML:j(s.name)},null,8,be)):(d(),$("span",_e,H(s.name),1))]),_:2},1024)]),_:2},1032,["disabled","onClick"])):oe("",!0)]),_:1},8,["data-source","columns","loading","row-selection"]),l(me,{ref_key:"previewDrawerRef",ref:w},null,512)]),_:1})}}});export{La as default};
