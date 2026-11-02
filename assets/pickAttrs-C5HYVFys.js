import{c as e,o as t,s as n}from"./_Map-VqvNan0D.js";import{t as r}from"./extends-CvVTau-c.js";var i=`[object String]`;function a(r){return typeof r==`string`||!t(r)&&n(r)&&e(r)==i}var o=`accept acceptcharset accesskey action allowfullscreen allowtransparency
alt async autocomplete autofocus autoplay capture cellpadding cellspacing challenge
charset checked classid classname colspan cols content contenteditable contextmenu
controls coords crossorigin data datetime default defer dir disabled download draggable
enctype form formaction formenctype formmethod formnovalidate formtarget frameborder
headers height hidden high href hreflang htmlfor for httpequiv icon id inputmode integrity
is keyparams keytype kind label lang list loop low manifest marginheight marginwidth max maxlength media
mediagroup method min minlength multiple muted name novalidate nonce open
optimum pattern placeholder poster preload radiogroup readonly rel required
reversed role rowspan rows sandbox scope scoped scrolling seamless selected
shape size sizes span spellcheck src srcdoc srclang srcset start step style
summary tabindex target title type usemap value width wmode wrap onCopy onCut onPaste onCompositionend onCompositionstart onCompositionupdate onKeydown
    onKeypress onKeyup onFocus onBlur onChange onInput onSubmit onClick onContextmenu onDoubleclick onDblclick
    onDrag onDragend onDragenter onDragexit onDragleave onDragover onDragstart onDrop onMousedown
    onMouseenter onMouseleave onMousemove onMouseout onMouseover onMouseup onSelect onTouchcancel
    onTouchend onTouchmove onTouchstart onTouchstartPassive onTouchmovePassive onScroll onWheel onAbort onCanplay onCanplaythrough
    onDurationchange onEmptied onEncrypted onEnded onError onLoadeddata onLoadedmetadata
    onLoadstart onPause onPlay onPlaying onProgress onRatechange onSeeked onSeeking onStalled onSuspend onTimeupdate onVolumechange onWaiting onLoad onError`.split(/[\s\n]+/),s=`aria-`,c=`data-`;function l(e,t){return e.indexOf(t)===0}function u(e){let t=arguments.length>1&&arguments[1]!==void 0&&arguments[1],n;n=t===!1?{aria:!0,data:!0,attr:!0}:t===!0?{aria:!0}:r({},t);let i={};return Object.keys(e).forEach(t=>{(n.aria&&(t===`role`||l(t,s))||n.data&&l(t,c)||n.attr&&(o.includes(t)||o.includes(t.toLowerCase())))&&(i[t]=e[t])}),i}export{a as n,u as t};