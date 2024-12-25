import{d as oe,s as Ke,o as pe,_ as s,c as f,k as B,b1 as V,dH as Ue,d2 as We,a as Fe,cP as Ve,aC as Ee,w as de,r as ue,j as we,dI as Xe,dJ as qe,dK as Je,b as Oe,I as Ge,dL as Ne,e as ne,h as Qe,b0 as re,a5 as be,ap as Ye,aR as he,d7 as ae,b8 as U,L as ve,bi as Ze,b4 as et,aa as se,dM as tt,dN as nt}from"./index-r7n5qp17.js";import{E as ot}from"./EnterOutlined-BloAfoEJ.js";import{C as it}from"./CheckOutlined-CdlE2Q-w.js";import{C as lt}from"./CopyOutlined-q6vv2eD2.js";import{u as rt}from"./useMergedState-DH0d-QpP.js";const ke=e=>({color:e.colorLink,textDecoration:"none",outline:"none",cursor:"pointer",transition:`color ${e.motionDurationSlow}`,"&:focus, &:hover":{color:e.colorLinkHover},"&:active":{color:e.colorLinkActive}});var at=function(e,n){var o={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&n.indexOf(t)<0&&(o[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,t=Object.getOwnPropertySymbols(e);i<t.length;i++)n.indexOf(t[i])<0&&Object.prototype.propertyIsEnumerable.call(e,t[i])&&(o[t[i]]=e[t[i]]);return o};const st={border:0,background:"transparent",padding:0,lineHeight:"inherit",display:"inline-block"},xe=oe({compatConfig:{MODE:3},name:"TransButton",inheritAttrs:!1,props:{noStyle:{type:Boolean,default:void 0},onClick:Function,disabled:{type:Boolean,default:void 0},autofocus:{type:Boolean,default:void 0}},setup(e,n){let{slots:o,emit:t,attrs:i,expose:d}=n;const a=Ke(),l=v=>{const{keyCode:S}=v;S===V.ENTER&&v.preventDefault()},g=v=>{const{keyCode:S}=v;S===V.ENTER&&t("click",v)},C=v=>{t("click",v)},y=()=>{a.value&&a.value.focus()},k=()=>{a.value&&a.value.blur()};return pe(()=>{e.autofocus&&y()}),d({focus:y,blur:k}),()=>{var v;const{noStyle:S,disabled:P}=e,I=at(e,["noStyle","disabled"]);let $={};return S||($=s({},st)),P&&($.pointerEvents="none"),f("div",B(B(B({role:"button",tabindex:0,ref:a},I),i),{},{onClick:C,onKeydown:l,onKeyup:g,style:s(s({},$),i.style||{})}),[(v=o.default)===null||v===void 0?void 0:v.call(o)])}}}),ct=(e,n,o,t)=>{const{sizeMarginHeadingVerticalEnd:i,fontWeightStrong:d}=t;return{marginBottom:i,color:o,fontWeight:d,fontSize:e,lineHeight:n}},dt=e=>{const n=[1,2,3,4,5],o={};return n.forEach(t=>{o[`
      h${t}&,
      div&-h${t},
      div&-h${t} > textarea,
      h${t}
    `]=ct(e[`fontSizeHeading${t}`],e[`lineHeightHeading${t}`],e.colorTextHeading,e)}),o},ut=e=>{const{componentCls:n}=e;return{"a&, a":s(s({},ke(e)),{textDecoration:e.linkDecoration,"&:active, &:hover":{textDecoration:e.linkHoverDecoration},[`&[disabled], &${n}-disabled`]:{color:e.colorTextDisabled,cursor:"not-allowed","&:active, &:hover":{color:e.colorTextDisabled},"&:active":{pointerEvents:"none"}}})}},pt=()=>({code:{margin:"0 0.2em",paddingInline:"0.4em",paddingBlock:"0.2em 0.1em",fontSize:"85%",background:"rgba(150, 150, 150, 0.1)",border:"1px solid rgba(100, 100, 100, 0.2)",borderRadius:3},kbd:{margin:"0 0.2em",paddingInline:"0.4em",paddingBlock:"0.15em 0.1em",fontSize:"90%",background:"rgba(150, 150, 150, 0.06)",border:"1px solid rgba(100, 100, 100, 0.2)",borderBottomWidth:2,borderRadius:3},mark:{padding:0,backgroundColor:Ue[2]},"u, ins":{textDecoration:"underline",textDecorationSkipInk:"auto"},"s, del":{textDecoration:"line-through"},strong:{fontWeight:600},"ul, ol":{marginInline:0,marginBlock:"0 1em",padding:0,li:{marginInline:"20px 0",marginBlock:0,paddingInline:"4px 0",paddingBlock:0}},ul:{listStyleType:"circle",ul:{listStyleType:"disc"}},ol:{listStyleType:"decimal"},"pre, blockquote":{margin:"1em 0"},pre:{padding:"0.4em 0.6em",whiteSpace:"pre-wrap",wordWrap:"break-word",background:"rgba(150, 150, 150, 0.1)",border:"1px solid rgba(100, 100, 100, 0.2)",borderRadius:3,code:{display:"inline",margin:0,padding:0,fontSize:"inherit",fontFamily:"inherit",background:"transparent",border:0}},blockquote:{paddingInline:"0.6em 0",paddingBlock:0,borderInlineStart:"4px solid rgba(100, 100, 100, 0.2)",opacity:.85}}),ft=e=>{const{componentCls:n}=e,t=We(e).inputPaddingVertical+1;return{"&-edit-content":{position:"relative","div&":{insetInlineStart:-e.paddingSM,marginTop:-t,marginBottom:`calc(1em - ${t}px)`},[`${n}-edit-content-confirm`]:{position:"absolute",insetInlineEnd:e.marginXS+2,insetBlockEnd:e.marginXS,color:e.colorTextDescription,fontWeight:"normal",fontSize:e.fontSize,fontStyle:"normal",pointerEvents:"none"},textarea:{margin:"0!important",MozTransition:"none",height:"1em"}}}},yt=e=>({"&-copy-success":{"\n    &,\n    &:hover,\n    &:focus":{color:e.colorSuccess}}}),mt=()=>({"\n  a&-ellipsis,\n  span&-ellipsis\n  ":{display:"inline-block",maxWidth:"100%"},"&-single-line":{whiteSpace:"nowrap"},"&-ellipsis-single-line":{overflow:"hidden",textOverflow:"ellipsis","a&, span&":{verticalAlign:"bottom"}},"&-ellipsis-multiple-line":{display:"-webkit-box",overflow:"hidden",WebkitLineClamp:3,WebkitBoxOrient:"vertical"}}),gt=e=>{const{componentCls:n,sizeMarginHeadingVerticalStart:o}=e;return{[n]:s(s(s(s(s(s(s(s(s({color:e.colorText,wordBreak:"break-word",lineHeight:e.lineHeight,[`&${n}-secondary`]:{color:e.colorTextDescription},[`&${n}-success`]:{color:e.colorSuccess},[`&${n}-warning`]:{color:e.colorWarning},[`&${n}-danger`]:{color:e.colorError,"a&:active, a&:focus":{color:e.colorErrorActive},"a&:hover":{color:e.colorErrorHover}},[`&${n}-disabled`]:{color:e.colorTextDisabled,cursor:"not-allowed",userSelect:"none"},"\n        div&,\n        p\n      ":{marginBottom:"1em"}},dt(e)),{[`
      & + h1${n},
      & + h2${n},
      & + h3${n},
      & + h4${n},
      & + h5${n}
      `]:{marginTop:o},"\n      div,\n      ul,\n      li,\n      p,\n      h1,\n      h2,\n      h3,\n      h4,\n      h5":{"\n        + h1,\n        + h2,\n        + h3,\n        + h4,\n        + h5\n        ":{marginTop:o}}}),pt()),ut(e)),{[`
        ${n}-expand,
        ${n}-edit,
        ${n}-copy
      `]:s(s({},ke(e)),{marginInlineStart:e.marginXXS})}),ft(e)),yt(e)),mt()),{"&-rtl":{direction:"rtl"}})}},Ie=Fe("Typography",e=>[gt(e)],{sizeMarginHeadingVerticalStart:"1.2em",sizeMarginHeadingVerticalEnd:"0.5em"}),bt=()=>({prefixCls:String,value:String,maxlength:Number,autoSize:{type:[Boolean,Object]},onSave:Function,onCancel:Function,onEnd:Function,onChange:Function,originContent:String,direction:String,component:String}),ht=oe({compatConfig:{MODE:3},name:"Editable",inheritAttrs:!1,props:bt(),setup(e,n){let{emit:o,slots:t,attrs:i}=n;const{prefixCls:d}=Ve(e),a=Ee({current:e.value||"",lastKeyCode:void 0,inComposition:!1,cancelFlag:!1});de(()=>e.value,m=>{a.current=m});const l=ue();pe(()=>{var m;if(l.value){const u=(m=l.value)===null||m===void 0?void 0:m.resizableTextArea,h=u==null?void 0:u.textArea;h.focus();const{length:b}=h.value;h.setSelectionRange(b,b)}});function g(m){l.value=m}function C(m){let{target:{value:u}}=m;a.current=u.replace(/[\r\n]/g,""),o("change",a.current)}function y(){a.inComposition=!0}function k(){a.inComposition=!1}function v(m){const{keyCode:u}=m;u===V.ENTER&&m.preventDefault(),!a.inComposition&&(a.lastKeyCode=u)}function S(m){const{keyCode:u,ctrlKey:h,altKey:b,metaKey:O,shiftKey:L}=m;a.lastKeyCode===u&&!a.inComposition&&!h&&!b&&!O&&!L&&(u===V.ENTER?(I(),o("end")):u===V.ESC&&(a.current=e.originContent,o("cancel")))}function P(){I()}function I(){o("save",a.current.trim())}const[$,R]=Ie(d);return()=>{const m=we({[`${d.value}`]:!0,[`${d.value}-edit-content`]:!0,[`${d.value}-rtl`]:e.direction==="rtl",[e.component?`${d.value}-${e.component}`:""]:!0},i.class,R.value);return $(f("div",B(B({},i),{},{class:m}),[f(Xe,{ref:g,maxlength:e.maxlength,value:a.current,onChange:C,onKeydown:v,onKeyup:S,onCompositionstart:y,onCompositionend:k,onBlur:P,rows:1,autoSize:e.autoSize===void 0||e.autoSize},null),t.enterIcon?t.enterIcon({className:`${e.prefixCls}-edit-content-confirm`}):f(ot,{class:`${e.prefixCls}-edit-content-confirm`},null)]))}}}),vt=3,xt=8;let E;const ce={padding:0,margin:0,display:"inline",lineHeight:"inherit"};function Pe(e,n){e.setAttribute("aria-hidden","true");const o=window.getComputedStyle(n),t=Je(o);e.setAttribute("style",t),e.style.position="fixed",e.style.left="0",e.style.height="auto",e.style.minHeight="auto",e.style.maxHeight="auto",e.style.paddingTop="0",e.style.paddingBottom="0",e.style.borderTopWidth="0",e.style.borderBottomWidth="0",e.style.top="-999999px",e.style.zIndex="-1000",e.style.textOverflow="clip",e.style.whiteSpace="normal",e.style.webkitLineClamp="none"}function Ct(e){const n=document.createElement("div");Pe(n,e),n.appendChild(document.createTextNode("text")),document.body.appendChild(n);const o=n.getBoundingClientRect().height;return document.body.removeChild(n),o}const St=(e,n,o,t,i)=>{E||(E=document.createElement("div"),E.setAttribute("aria-hidden","true"),document.body.appendChild(E));const{rows:d,suffix:a=""}=n,l=Ct(e),g=Math.round(l*d*100)/100;Pe(E,e);const C=qe({render(){return f("div",{style:ce},[f("span",{style:ce},[o,a]),f("span",{style:ce},[t])])}});C.mount(E);function y(){return Math.round(E.getBoundingClientRect().height*100)/100-.1<=g}if(y())return C.unmount(),{content:o,text:E.innerHTML,ellipsis:!1};const k=Array.prototype.slice.apply(E.childNodes[0].childNodes[0].cloneNode(!0).childNodes).filter(u=>{let{nodeType:h,data:b}=u;return h!==xt&&b!==""}),v=Array.prototype.slice.apply(E.childNodes[0].childNodes[1].cloneNode(!0).childNodes);C.unmount();const S=[];E.innerHTML="";const P=document.createElement("span");E.appendChild(P);const I=document.createTextNode(i+a);P.appendChild(I),v.forEach(u=>{E.appendChild(u)});function $(u){P.insertBefore(u,I)}function R(u,h){let b=arguments.length>2&&arguments[2]!==void 0?arguments[2]:0,O=arguments.length>3&&arguments[3]!==void 0?arguments[3]:h.length,L=arguments.length>4&&arguments[4]!==void 0?arguments[4]:0;const A=Math.floor((b+O)/2),ie=h.slice(0,A);if(u.textContent=ie,b>=O-1)for(let H=O;H>=b;H-=1){const W=h.slice(0,H);if(u.textContent=W,y()||!W)return H===h.length?{finished:!1,vNode:h}:{finished:!0,vNode:W}}return y()?R(u,h,A,O,A):R(u,h,b,A,L)}function m(u){if(u.nodeType===vt){const b=u.textContent||"",O=document.createTextNode(b);return $(O),R(O,b)}return{finished:!1,vNode:null}}return k.some(u=>{const{finished:h,vNode:b}=m(u);return b&&S.push(b),h}),{content:S,text:E.innerHTML,ellipsis:!0}};var Tt=function(e,n){var o={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&n.indexOf(t)<0&&(o[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,t=Object.getOwnPropertySymbols(e);i<t.length;i++)n.indexOf(t[i])<0&&Object.prototype.propertyIsEnumerable.call(e,t[i])&&(o[t[i]]=e[t[i]]);return o};const Et=()=>({prefixCls:String,direction:String,component:String}),w=oe({name:"ATypography",inheritAttrs:!1,props:Et(),setup(e,n){let{slots:o,attrs:t}=n;const{prefixCls:i,direction:d}=Oe("typography",e),[a,l]=Ie(i);return()=>{var g;const C=s(s({},e),t),{prefixCls:y,direction:k,component:v="article"}=C,S=Tt(C,["prefixCls","direction","component"]);return a(f(v,B(B({},S),{},{class:we(i.value,{[`${i.value}-rtl`]:d.value==="rtl"},t.class,l.value)}),{default:()=>[(g=o.default)===null||g===void 0?void 0:g.call(o)]}))}}}),wt=()=>{const e=document.getSelection();if(!e.rangeCount)return function(){};let n=document.activeElement;const o=[];for(let t=0;t<e.rangeCount;t++)o.push(e.getRangeAt(t));switch(n.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":n.blur();break;default:n=null;break}return e.removeAllRanges(),function(){e.type==="Caret"&&e.removeAllRanges(),e.rangeCount||o.forEach(function(t){e.addRange(t)}),n&&n.focus()}},Ce={"text/plain":"Text","text/html":"Url",default:"Text"},Ot="Copy to clipboard: #{key}, Enter";function Nt(e){const n=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return e.replace(/#{\s*key\s*}/g,n)}function kt(e,n){let o,t,i,d,a,l=!1;n||(n={});const g=n.debug||!1;try{if(t=wt(),i=document.createRange(),d=document.getSelection(),a=document.createElement("span"),a.textContent=e,a.style.all="unset",a.style.position="fixed",a.style.top=0,a.style.clip="rect(0, 0, 0, 0)",a.style.whiteSpace="pre",a.style.webkitUserSelect="text",a.style.MozUserSelect="text",a.style.msUserSelect="text",a.style.userSelect="text",a.addEventListener("copy",function(y){if(y.stopPropagation(),n.format)if(y.preventDefault(),typeof y.clipboardData>"u"){g&&console.warn("unable to use e.clipboardData"),g&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();const k=Ce[n.format]||Ce.default;window.clipboardData.setData(k,e)}else y.clipboardData.clearData(),y.clipboardData.setData(n.format,e);n.onCopy&&(y.preventDefault(),n.onCopy(y.clipboardData))}),document.body.appendChild(a),i.selectNodeContents(a),d.addRange(i),!document.execCommand("copy"))throw new Error("copy command was unsuccessful");l=!0}catch(C){g&&console.error("unable to copy using execCommand: ",C),g&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(n.format||"text",e),n.onCopy&&n.onCopy(window.clipboardData),l=!0}catch(y){g&&console.error("unable to copy using clipboardData: ",y),g&&console.error("falling back to prompt"),o=Nt("message"in n?n.message:Ot),window.prompt(o,e)}}finally{d&&(typeof d.removeRange=="function"?d.removeRange(i):d.removeAllRanges()),a&&document.body.removeChild(a),t()}return l}var It={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"}}]},name:"edit",theme:"outlined"};function Se(e){for(var n=1;n<arguments.length;n++){var o=arguments[n]!=null?Object(arguments[n]):{},t=Object.keys(o);typeof Object.getOwnPropertySymbols=="function"&&(t=t.concat(Object.getOwnPropertySymbols(o).filter(function(i){return Object.getOwnPropertyDescriptor(o,i).enumerable}))),t.forEach(function(i){Pt(e,i,o[i])})}return e}function Pt(e,n,o){return n in e?Object.defineProperty(e,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[n]=o,e}var fe=function(n,o){var t=Se({},n,o.attrs);return f(Ge,Se({},t,{icon:It}),null)};fe.displayName="EditOutlined";fe.inheritAttrs=!1;var $t=function(e,n){var o={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&n.indexOf(t)<0&&(o[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,t=Object.getOwnPropertySymbols(e);i<t.length;i++)n.indexOf(t[i])<0&&Object.prototype.propertyIsEnumerable.call(e,t[i])&&(o[t[i]]=e[t[i]]);return o};const Dt=Ne("webkitLineClamp"),_t=Ne("textOverflow"),Te="...",X=()=>({editable:{type:[Boolean,Object],default:void 0},copyable:{type:[Boolean,Object],default:void 0},prefixCls:String,component:String,type:String,disabled:{type:Boolean,default:void 0},ellipsis:{type:[Boolean,Object],default:void 0},code:{type:Boolean,default:void 0},mark:{type:Boolean,default:void 0},underline:{type:Boolean,default:void 0},delete:{type:Boolean,default:void 0},strong:{type:Boolean,default:void 0},keyboard:{type:Boolean,default:void 0},content:String,"onUpdate:content":Function}),q=oe({compatConfig:{MODE:3},name:"TypographyBase",inheritAttrs:!1,props:X(),setup(e,n){let{slots:o,attrs:t,emit:i}=n;const{prefixCls:d,direction:a}=Oe("typography",e),l=Ee({copied:!1,ellipsisText:"",ellipsisContent:null,isEllipsis:!1,expanded:!1,clientRendered:!1,expandStr:"",copyStr:"",copiedStr:"",editStr:"",copyId:void 0,rafId:void 0,prevProps:void 0,originContent:""}),g=ue(),C=ue(),y=ne(()=>{const r=e.ellipsis;return r?s({rows:1,expandable:!1},typeof r=="object"?r:null):{}});pe(()=>{l.clientRendered=!0,A()}),Qe(()=>{clearTimeout(l.copyId),re.cancel(l.rafId)}),de([()=>y.value.rows,()=>e.content],()=>{be(()=>{O()})},{flush:"post",deep:!0}),Ye(()=>{e.content===void 0&&(he(!e.editable),he(!e.ellipsis))});function k(){var r;return e.ellipsis||e.editable?e.content:(r=ae(g.value))===null||r===void 0?void 0:r.innerText}function v(r){const{onExpand:c}=y.value;l.expanded=!0,c==null||c(r)}function S(r){r.preventDefault(),l.originContent=e.content,b(!0)}function P(r){I(r),b(!1)}function I(r){const{onChange:c}=m.value;r!==e.content&&(i("update:content",r),c==null||c(r))}function $(){var r,c;(c=(r=m.value).onCancel)===null||c===void 0||c.call(r),b(!1)}function R(r){r.preventDefault(),r.stopPropagation();const{copyable:c}=e,p=s({},typeof c=="object"?c:null);p.text===void 0&&(p.text=k()),kt(p.text||""),l.copied=!0,be(()=>{p.onCopy&&p.onCopy(r),l.copyId=setTimeout(()=>{l.copied=!1},3e3)})}const m=ne(()=>{const r=e.editable;return r?s({},typeof r=="object"?r:null):{editing:!1}}),[u,h]=rt(!1,{value:ne(()=>m.value.editing)});function b(r){const{onStart:c}=m.value;r&&c&&c(),h(r)}de(u,r=>{var c;r||(c=C.value)===null||c===void 0||c.focus()},{flush:"post"});function O(r){if(r){const{width:c,height:p}=r;if(!c||!p)return}re.cancel(l.rafId),l.rafId=re(()=>{A()})}const L=ne(()=>{const{rows:r,expandable:c,suffix:p,onEllipsis:x,tooltip:T}=y.value;return p||T||e.editable||e.copyable||c||x?!1:r===1?_t:Dt}),A=()=>{const{ellipsisText:r,isEllipsis:c}=l,{rows:p,suffix:x,onEllipsis:T}=y.value;if(!p||p<0||!ae(g.value)||l.expanded||e.content===void 0||L.value)return;const{content:D,text:z,ellipsis:j}=St(ae(g.value),{rows:p,suffix:x},e.content,ye(!0),Te);(r!==z||l.isEllipsis!==j)&&(l.ellipsisText=z,l.ellipsisContent=D,l.isEllipsis=j,c!==j&&T&&T(j))};function ie(r,c){let{mark:p,code:x,underline:T,delete:D,strong:z,keyboard:j}=r,F=c;function _(Z,N){if(!Z)return;const ee=function(){return F}();F=f(N,null,{default:()=>[ee]})}return _(z,"strong"),_(T,"u"),_(D,"del"),_(x,"code"),_(p,"mark"),_(j,"kbd"),F}function H(r){const{expandable:c,symbol:p}=y.value;if(!c||!r&&(l.expanded||!l.isEllipsis))return null;const x=(o.ellipsisSymbol?o.ellipsisSymbol():p)||l.expandStr;return f("a",{key:"expand",class:`${d.value}-expand`,onClick:v,"aria-label":l.expandStr},[x])}function W(){if(!e.editable)return;const{tooltip:r,triggerType:c=["icon"]}=e.editable,p=o.editableIcon?o.editableIcon():f(fe,{role:"button"},null),x=o.editableTooltip?o.editableTooltip():l.editStr,T=typeof x=="string"?x:"";return c.indexOf("icon")!==-1?f(se,{key:"edit",title:r===!1?"":x},{default:()=>[f(xe,{ref:C,class:`${d.value}-edit`,onClick:S,"aria-label":T},{default:()=>[p]})]}):null}function $e(){if(!e.copyable)return;const{tooltip:r}=e.copyable,c=l.copied?l.copiedStr:l.copyStr,p=o.copyableTooltip?o.copyableTooltip({copied:l.copied}):c,x=typeof p=="string"?p:"",T=l.copied?f(it,null,null):f(lt,null,null),D=o.copyableIcon?o.copyableIcon({copied:!!l.copied}):T;return f(se,{key:"copy",title:r===!1?"":p},{default:()=>[f(xe,{class:[`${d.value}-copy`,{[`${d.value}-copy-success`]:l.copied}],onClick:R,"aria-label":x},{default:()=>[D]})]})}function De(){const{class:r,style:c}=t,{maxlength:p,autoSize:x,onEnd:T}=m.value;return f(ht,{class:r,style:c,prefixCls:d.value,value:e.content,originContent:l.originContent,maxlength:p,autoSize:x,onSave:P,onChange:I,onCancel:$,onEnd:T,direction:a.value,component:e.component},{enterIcon:o.editableEnterIcon})}function ye(r){return[H(r),W(),$e()].filter(c=>c)}return()=>{var r;const{triggerType:c=["icon"]}=m.value,p=e.ellipsis||e.editable?e.content!==void 0?e.content:(r=o.default)===null||r===void 0?void 0:r.call(o):o.default?o.default():e.content;return u.value?De():f(tt,{componentName:"Text",children:x=>{const T=s(s({},e),t),{type:D,disabled:z,content:j,class:F,style:_}=T,Z=$t(T,["type","disabled","content","class","style"]),{rows:N,suffix:ee,tooltip:le}=y.value,{edit:_e,copy:Be,copied:Re,expand:Ae}=x;l.editStr=_e,l.copyStr=Be,l.copiedStr=Re,l.expandStr=Ae;const je=U(Z,["prefixCls","editable","copyable","ellipsis","mark","code","delete","underline","strong","keyboard","onUpdate:content"]),te=L.value,Le=N===1&&te,me=N&&N>1&&te;let M=p,He;if(N&&l.isEllipsis&&!l.expanded&&!te){const{title:ge}=Z;let K=ge||"";!ge&&(typeof p=="string"||typeof p=="number")&&(K=String(p)),K=K==null?void 0:K.slice(String(l.ellipsisContent||"").length),M=f(ve,null,[Ze(l.ellipsisContent),f("span",{title:K,"aria-hidden":"true"},[Te]),ee])}else M=f(ve,null,[p,ee]);M=ie(e,M);const ze=le&&N&&l.isEllipsis&&!l.expanded&&!te,Me=o.ellipsisTooltip?o.ellipsisTooltip():le;return f(et,{onResize:O,disabled:!N},{default:()=>[f(w,B({ref:g,class:[{[`${d.value}-${D}`]:D,[`${d.value}-disabled`]:z,[`${d.value}-ellipsis`]:N,[`${d.value}-single-line`]:N===1&&!l.isEllipsis,[`${d.value}-ellipsis-single-line`]:Le,[`${d.value}-ellipsis-multiple-line`]:me},F],style:s(s({},_),{WebkitLineClamp:me?N:void 0}),"aria-label":He,direction:a.value,onClick:c.indexOf("text")!==-1?S:()=>{}},je),{default:()=>[ze?f(se,{title:le===!0?p:Me},{default:()=>[f("span",null,[M])]}):M,ye()]})]})}},null)}}});var Bt=function(e,n){var o={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&n.indexOf(t)<0&&(o[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,t=Object.getOwnPropertySymbols(e);i<t.length;i++)n.indexOf(t[i])<0&&Object.prototype.propertyIsEnumerable.call(e,t[i])&&(o[t[i]]=e[t[i]]);return o};const Rt=()=>U(s(s({},X()),{ellipsis:{type:Boolean,default:void 0}}),["component"]),J=(e,n)=>{let{slots:o,attrs:t}=n;const i=s(s({},e),t),{ellipsis:d,rel:a}=i,l=Bt(i,["ellipsis","rel"]),g=s(s({},l),{rel:a===void 0&&l.target==="_blank"?"noopener noreferrer":a,ellipsis:!!d,component:"a"});return delete g.navigate,f(q,g,o)};J.displayName="ATypographyLink";J.inheritAttrs=!1;J.props=Rt();const At=()=>U(X(),["component"]),G=(e,n)=>{let{slots:o,attrs:t}=n;const i=s(s(s({},e),{component:"div"}),t);return f(q,i,o)};G.displayName="ATypographyParagraph";G.inheritAttrs=!1;G.props=At();const jt=()=>s(s({},U(X(),["component"])),{ellipsis:{type:[Boolean,Object],default:void 0}}),Q=(e,n)=>{let{slots:o,attrs:t}=n;const{ellipsis:i}=e,d=s(s(s({},e),{ellipsis:i&&typeof i=="object"?U(i,["expandable","rows"]):i,component:"span"}),t);return f(q,d,o)};Q.displayName="ATypographyText";Q.inheritAttrs=!1;Q.props=jt();var Lt=function(e,n){var o={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&n.indexOf(t)<0&&(o[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,t=Object.getOwnPropertySymbols(e);i<t.length;i++)n.indexOf(t[i])<0&&Object.prototype.propertyIsEnumerable.call(e,t[i])&&(o[t[i]]=e[t[i]]);return o};const Ht=nt(1,2,3,4,5),zt=()=>s(s({},U(X(),["component","strong"])),{level:Number}),Y=(e,n)=>{let{slots:o,attrs:t}=n;const{level:i=1}=e,d=Lt(e,["level"]);let a;Ht.includes(i)?a=`h${i}`:a="h1";const l=s(s(s({},d),{component:a}),t);return f(q,l,o)};Y.displayName="ATypographyTitle";Y.inheritAttrs=!1;Y.props=zt();w.Text=Q;w.Title=Y;w.Paragraph=G;w.Link=J;w.Base=q;w.install=function(e){return e.component(w.name,w),e.component(w.Text.displayName,Q),e.component(w.Title.displayName,Y),e.component(w.Paragraph.displayName,G),e.component(w.Link.displayName,J),e};export{fe as E,Y as T,Q as a,w as b,ke as o};
