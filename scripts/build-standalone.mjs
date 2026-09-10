import {build} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss';
import {readFile,writeFile,mkdir,mkdtemp,rm} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const temp=await mkdtemp(path.join(root,'.standalone-'));
try {
 const assets={};
 for(const file of ['taxi-hero.png','products/mini.jpg','products/touch.jpg','products/mirror.jpg','products/contact-phone.png','products/contact-tablet.png'])assets['/'+file]='data:image/'+(file.endsWith('.jpg')?'jpeg':'png')+';base64,'+(await readFile(path.join(root,'public',file))).toString('base64');
 let page=await readFile(path.join(root,'app/page.tsx'),'utf8');
 page=page.replace('src="/taxi-hero.png"','src={offlineAssets["/taxi-hero.png"]}').replaceAll('src={`/products/${m.id}.jpg`}','src={offlineAssets[`/products/${m.id}.jpg`]}').replaceAll('src={`/products/${meter}.jpg`}','src={offlineAssets[`/products/${meter}.jpg`]}').replace("src={d.id === 'phone' ? '/products/contact-phone.png' : '/products/contact-tablet.png'}","src={offlineAssets[d.id === 'phone' ? '/products/contact-phone.png' : '/products/contact-tablet.png']}");
 await writeFile(path.join(temp,'Page.tsx'),'const offlineAssets:Record<string,string>='+JSON.stringify(assets)+';\n'+page);
 await writeFile(path.join(temp,'entry.tsx'),`import React from 'react';import {createRoot} from 'react-dom/client';import Home from './Page';import ${JSON.stringify(path.join(root,'app/globals.css'))};createRoot(document.getElementById('root')!).render(<Home/>);`);
 const result=await build({root,configFile:false,publicDir:false,plugins:[react()],resolve:{alias:{'@':root}},define:{'process.env.NODE_ENV':'"production"'},css:{postcss:{plugins:[tailwindcss()]}},build:{write:false,minify:true,lib:{entry:path.join(temp,'entry.tsx'),name:'TaxaOn',formats:['iife']},cssCodeSplit:false,rollupOptions:{output:{inlineDynamicImports:true}}}});
 const outputs=(Array.isArray(result)?result:[result]).flatMap(r=>r.output);
 const js=outputs.filter(o=>o.type==='chunk').map(o=>o.code).join('\n');
 const css=outputs.filter(o=>o.type==='asset'&&o.fileName.endsWith('.css')).map(o=>o.source).join('\n');
 if(!js||!css)throw new Error('Missing standalone script or stylesheet');
 const html='<!doctype html><html lang="fi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>TaxaOn — MeterOn configurator</title><style>'+css.replace(/<\/style/gi,'<\\/style')+'</style></head><body><div id="root"></div><noscript>Ota JavaScript käyttöön käyttääksesi konfiguraattoria.</noscript><script>'+js.replace(/<\/script/gi,'<\\/script')+'</script></body></html>';
 await mkdir(path.join(root,'standalone'),{recursive:true});
 await writeFile(path.join(root,'standalone/index.html'),html);
 console.log('Standalone HTML saved: '+path.join(root,'standalone/index.html')+' ('+(Buffer.byteLength(html)/1024/1024).toFixed(1)+' MB)');
} finally {await rm(temp,{recursive:true,force:true});}
