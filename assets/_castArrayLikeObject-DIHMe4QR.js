import{bQ as d,bR as L,cz as u}from"./index-r7n5qp17.js";import{b as A,a as j}from"./_arrayIncludesWith-DbV0gfeD.js";var k=Math.min;function a(n,v,i){for(var I=i?A:j,r=n[0].length,l=n.length,e=l,b=Array(l),c=1/0,f=[];e--;){var t=n[e];c=k(t.length,c),b[e]=!i&&r>=120&&t.length>=120?new d(e&&t):void 0}t=n[0];var w=-1,g=b[0];n:for(;++w<r&&f.length<c;){var h=t[w],s=h;if(h=i||h!==0?h:0,!(g?L(g,s):I(f,s,i))){for(e=l;--e;){var x=b[e];if(!(x?L(x,s):I(n[e],s,i)))continue n}g&&g.push(s),f.push(h)}}return f}function z(n){return u(n)?n:[]}export{a as b,z as c};
