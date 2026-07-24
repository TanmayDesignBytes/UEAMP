const postcss = require('postcss');
const pxtorem = require('postcss-pxtorem');
const fs = require('fs');
const css = fs.readFileSync('app/globals.css','utf8');
const plugin = pxtorem({
  rootValue: 16, unitPrecision: 5,
  propList: ["*", "!border", "!border-width", "!outline", "!box-shadow", "!text-shadow"],
  selectorBlackList: [/^html$/], minPixelValue: 2, mediaQuery: false, exclude: /node_modules/i,
});
const out = postcss([plugin]).process(css, {from:undefined}).css;
const show=(l,re)=>{const m=out.match(re);console.log(l+':', m?m[0].replace(/\s+/g,' '):'NOT FOUND');};
show('html root font-size (must stay px)', /html\s*\{\s*font-size:[^;]+/);
show('a fixed width converted', /width:\s*22\.5625rem/);
show('login-content padding (31px 24px)->', /\.login-content\s*\{[^}]*padding:[^;]+/);
console.log('1px hairlines kept (count):', (out.match(/\b1px\b/g)||[]).length);
console.log('box-shadow rules still px (count):', (out.match(/box-shadow:[^;]*px/g)||[]).length);
show('media 900px breakpoint kept', /@media \(min-width: 900px\)/);
console.log('total px remaining:', (out.match(/[0-9.]+px/g)||[]).length);
console.log('total rem produced:', (out.match(/[0-9.]+rem/g)||[]).length);
