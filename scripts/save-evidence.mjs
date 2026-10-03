import { readdir, copyFile, mkdir, writeFile } from 'node:fs/promises';
await mkdir('docs/evidence',{recursive:true});
const folders=await readdir('test-results',{withFileTypes:true});
const labels=[['app-percurso','09-navegacao.webm'],['app-compra','10-compra.webm'],['app-venda','11-curadoria.webm']];
for(const [prefix,target] of labels) { const folder=folders.find(f=>f.isDirectory()&&f.name.startsWith(prefix)); if(folder) { await copyFile(`test-results/${folder.name}/video.webm`,`docs/evidence/${target}`); console.log(`Salvo: docs/evidence/${target}`); } }
await writeFile('docs/evidence/manifest.json',JSON.stringify({generatedAt:new Date().toISOString(),platform:process.platform,browser:'Chromium / Playwright',viewport:{width:390,height:844},mode:'Local',screens:8,videos:3},null,2));