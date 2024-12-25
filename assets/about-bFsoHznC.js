import{C as u}from"./index-B3UruOCA.js";import{D as s}from"./index-p-416BN9.js";import{T as f}from"./index-D44MJVpE.js";import{d as w,q as c,v as m,c as t,F as n,G as e,H as g,J as v,L as y,T as b,C as h}from"./index-r7n5qp17.js";import"./index-C5S0InbA.js";import"./index-DNuk-Aq4.js";import"./_baseUniq-C5gIlH1G.js";import"./_arrayIncludesWith-DbV0gfeD.js";import"./collapseMotion-CYC7R_75.js";import"./useRefs-Bo1CD1Ea.js";import"./pick-BmOZqCpW.js";import"./hasIn-BbpCNcKV.js";import"./isMobile-BbN7I0i_.js";import"./useMergedState-DH0d-QpP.js";import"./PlusOutlined-Cqb3K3za.js";var j={pkg:{name:"vue3-antdv-admin",version:"2.0.0",packageManager:"pnpm@9.4.0",type:"module",engines:{node:">=18",pnpm:">=9.0.2"},author:{name:"buqiyuan",email:"1743369777@qq.com",url:"https://github.com/buqiyuan"},scripts:{preinstall:"npx only-allow pnpm",postinstall:"pnpm nx:build",bootstrap:"pnpm install",serve:"npm run dev",dev:"vite dev",build:"rimraf dist && cross-env NODE_ENV=production vite build","build:watch":"rimraf dist && cross-env NODE_ENV=production vite build --watch","build:pkg":'pnpm -r --paralle --filter="./packages/*" run build',"nx:build":"nx run-many -t build --exclude @admin-pkg/components","nx:build:watch":"nx watch --all -- nx run \\$NX_PROJECT_NAME:build",preview:"npm run build --watch && vite preview","preview:dist":"vite preview",openapi:"npx tsx openapi.config.ts","clean:cache":"npx rimraf node_modules/.cache/ && npx rimraf node_modules/.vite","clean:lib":"npx rimraf node_modules packages/*/node_modules",lint:"pnpm lint:eslint && pnpm lint:prettier && pnpm lint:stylelint","lint:eslint":'eslint --cache --max-warnings 0  "{src,mocks}/**/*.{vue,ts,tsx}" --fix',"lint:prettier":'prettier --write  "src/**/*.{js,json,tsx,css,less,scss,vue,html,md}"',"lint:stylelint":'stylelint --cache --fix "**/*.{vue,less,postcss,css,scss}" --cache --cache-location node_modules/.cache/stylelint/',"lint:lint-staged":"lint-staged",prepare:"husky",release:"git push && git push origin --tags","gen:changelog":"conventional-changelog -p angular -i CHANGELOG.md -s && git add CHANGELOG.md",reinstall:"rimraf pnpm-lock.yaml && rimraf package.lock.json && pnpm clean:lib && npm run bootstrap","test:gzip":"npx http-server dist --cors --gzip -c-1","test:br":"npx http-server dist --cors --brotli -c-1"},dependencies:{"@ant-design/icons-vue":"~7.0.1","@iconify/vue":"^4.2.0","@tinymce/tinymce-vue":"^6.1.0","@vueuse/core":"~12.2.0","ant-design-vue":"~4.2.6",axios:"~1.7.9","crypto-js":"^4.2.0",dayjs:"~1.11.13",echarts:"^5.5.1","file-saver":"~2.0.5","lodash-es":"~4.17.21",mitt:"~3.0.1",nprogress:"~1.0.0-1",pinia:"~2.2.4","pinia-plugin-persistedstate":"^4.1.1","qiniu-js":"^3.4.2",qs:"~6.13.0",sortablejs:"~1.15.6",tinymce:"^7.6.0",vue:"~3.5.13","vue-echarts":"^7.0.3","vue-i18n":"~10.0.4","vue-router":"~4.4.5","vue-types":"~5.1.3","vue-virtual-scroller":"2.0.0-beta.8",xlsx:"~0.18.5"},devDependencies:{"@admin-pkg/components":"workspace:*","@admin-pkg/vite-plugin-http2-proxy":"workspace:*","@admin-pkg/vite-plugin-msw":"workspace:*","@admin-pkg/vite-plugin-tinymce-resource":"workspace:*","@commitlint/cli":"~19.5.0","@commitlint/config-conventional":"~19.5.0","@faker-js/faker":"^9.0.3","@iconify-json/ant-design":"^1.2.5","@iconify-json/ep":"^1.2.2","@iconify/json":"^2.2.288","@types/crypto-js":"^4.2.2","@types/lodash-es":"~4.17.12","@types/node":"~22.7.4","@types/qs":"^6.9.16","@types/sortablejs":"^1.15.8","@typescript-eslint/eslint-plugin":"~8.18.2","@typescript-eslint/parser":"~8.18.2","@umijs/openapi":"^1.13.0","@vitejs/plugin-vue":"~5.2.1","@vitejs/plugin-vue-jsx":"~4.1.1","@vue/tsconfig":"^0.7.0",commitizen:"~4.3.1","conventional-changelog-cli":"~4.1.0","core-js":"^3.39.0","cross-env":"~7.0.3",eslint:"~9.17.0","eslint-config-prettier":"~9.1.0","eslint-define-config":"~2.1.0","eslint-plugin-import":"~2.31.0","eslint-plugin-prettier":"~5.2.1","eslint-plugin-unused-imports":"^4.1.4","eslint-plugin-vue":"~9.32.0",husky:"~9.1.7",less:"~4.2.1","lint-staged":"~15.2.11",msw:"^2.4.9",nx:"^20.3.0",postcss:"~8.4.49","postcss-html":"~1.7.0","postcss-less":"~6.0.0",prettier:"~3.4.2",rimraf:"~5.0.9",stylelint:"~16.12.0","stylelint-config-property-sort-order-smacss":"^10.0.0","stylelint-config-recommended":"~14.0.1","stylelint-config-recommended-vue":"~1.5.0","stylelint-config-standard":"~36.0.1","stylelint-order":"~6.0.4","stylelint-prettier":"^5.0.2",typescript:"~5.7.2",unocss:"^0.65.3","unplugin-vue-components":"~0.28.0",vite:"~6.0.5","vite-plugin-checker":"~0.8.0","vite-plugin-inspect":"^0.10.6","vite-plugin-mkcert":"^1.17.6","vite-plugin-svg-icons":"~2.0.1","vite-plugin-vue-inspector":"^5.3.1","vue-eslint-parser":"~9.4.3","vue-tsc":"~2.2.0"},__npminstall_done:!1,repository:{type:"git",url:"https://github.com/buqiyuan/vue3-antdv-admin"},homepage:"https://buqiyuan.gitee.io/vue3-antdv-admin",keywords:["vue","ant-design-vue","vue3","ts","tsx","admin","typescript"],license:"MIT",target:"web",pnpm:{overrides:{},peerDependencyRules:{allowedVersions:{}}}},lastBuildTime:"2024-12-25 21:16:22"};const z=w({name:"About",__name:"about",setup(D){const{pkg:i,lastBuildTime:x}=j,_={...i.dependencies,...i.devDependencies},a=({url:r="",text:p})=>{const o=/^http(s)?:/.test(r)?r:`https://www.npmjs.com/package/${r}`;return t("a",{href:o,target:"_blank"},[p])},d=r=>{var p;return((p=_[r].match(/\d+/))==null?void 0:p[0])||""},k=`
    的前端项目是基于 Vue${d("vue")}.x、
    Vite${d("vite")}.x、
    Ant-Design-Vue${d("ant-design-vue")}.x 、
    TypeScript${d("typescript")}.x 开发，
    内置了动态路由、权限验证、并提供了常用的功能组件，帮助你快速搭建企业级中后台产品原型。
    原则上不会限制任何代码用于商用。
  `;return(r,p)=>(c(),m("div",null,[t(e(u),null,{default:n(()=>[t(e(u).Meta,{title:"关于"},{description:n(()=>[t(a,{url:e(i).author.url,text:e(i).name},null,8,["url","text"]),g(v(k))]),_:1})]),_:1}),t(e(u),{class:"mt-3"},{default:n(()=>[t(e(s),{title:"项目信息",column:2,bordered:""},{default:n(()=>[t(e(s).Item,{label:"版本"},{default:n(()=>[t(e(f),{color:"processing"},{default:n(()=>[g(v(e(i).version),1)]),_:1})]),_:1}),t(e(s).Item,{label:"最后编译时间"},{default:n(()=>[t(e(f),{color:"processing"},{default:n(()=>[g(v(e(x)),1)]),_:1})]),_:1}),t(e(s).Item,{label:"GitHub"},{default:n(()=>[t(a,{url:e(i).repository.url,text:"GitHub"},null,8,["url"])]),_:1}),t(e(s).Item,{label:"预览地址"},{default:n(()=>[t(a,{url:e(i).homepage,text:"预览地址"},null,8,["url"])]),_:1})]),_:1})]),_:1}),t(e(u),{class:"mt-3"},{default:n(()=>[t(e(s),{title:"生产环境依赖",bordered:""},{default:n(()=>[(c(!0),m(y,null,b(e(i).dependencies,(o,l)=>(c(),h(e(s).Item,{key:l,label:l},{default:n(()=>[t(a,{url:l,text:o},null,8,["url","text"])]),_:2},1032,["label"]))),128))]),_:1})]),_:1}),t(e(u),{class:"mt-3"},{default:n(()=>[t(e(s),{title:"开发环境依赖",bordered:""},{default:n(()=>[(c(!0),m(y,null,b(e(i).devDependencies,(o,l)=>(c(),h(e(s).Item,{key:l,label:l},{default:n(()=>[t(a,{url:l,text:o},null,8,["url","text"])]),_:2},1032,["label"]))),128))]),_:1})]),_:1})]))}});export{z as default};
