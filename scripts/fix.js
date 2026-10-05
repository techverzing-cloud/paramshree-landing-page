const fs=require('fs');
const p='D:/paramshree-landing/src/components/sections/AboutSection.tsx';
let s=fs.readFileSync(p,'utf8');
s=s.replace(/\s+$/g,'\n');
fs.writeFileSync(p,s,'utf8');
console.log('ok');
