// Publica somente esta entrega; credenciais ficam no gerenciador do Git e nunca são impressas.
import { execFileSync } from 'node:child_process';
const gitEnv={...process.env,GCM_INTERACTIVE:'Never',GIT_TERMINAL_PROMPT:'0'};
let credential;
try { credential=execFileSync('git',['credential','fill'],{input:'protocol=https\nhost=github.com\n\n',encoding:'utf8',env:gitEnv,stdio:['pipe','pipe','pipe']}); }
catch { console.error('Conta GitHub sem credencial utilizável. Conecte a conta e informe um remoto para publicar.'); process.exit(1); }
const token=credential.split(/\r?\n/).find(line=>line.startsWith('password='))?.slice(9);
if(!token) { console.error('Credencial GitHub indisponível.'); process.exit(1); }
const headers={Accept:'application/vnd.github+json',Authorization:`Bearer ${token}`,'Content-Type':'application/json','User-Agent':'next-chapter-cp5'};
async function api(path,method='GET',body) { const response=await fetch(`https://api.github.com${path}`,{method,headers,body:body?JSON.stringify(body):undefined}); return {status:response.status,data:await response.json()}; }
try {
 const account=await api('/user'); if(account.status!==200) throw new Error('Não foi possível validar a conta GitHub conectada.');
 const name='cp5-next-chapter-mobile',owner=account.data.login,path=`/repos/${owner}/${name}`;
 const lookup=await api(path);
 if(![200,404].includes(lookup.status)) throw new Error(`Não foi possível consultar o repositório (HTTP ${lookup.status}).`);
 if(process.argv.includes('--check')) { console.log(JSON.stringify({account:owner,repository:`https://github.com/${owner}/${name}`,exists:lookup.status===200,visibility:lookup.data.private?'private':lookup.status===200?'public':'private (a criar)'},null,2)); process.exit(0); }
 let repository=lookup.data;
 if(lookup.status===404) {
  const created=await api('/user/repos','POST',{name,description:'Next Chapter — aplicativo React Native/Expo. Entrega CP4 e CP5 de Mobile Development e IoT.',private:true,auto_init:false});
  if(created.status!==201) throw new Error(`GitHub recusou criar o repositório (HTTP ${created.status}): ${created.data.message || 'permissão insuficiente'}`);
  repository=created.data;
 }
 const localOrigin=(()=>{try{return execFileSync('git',['remote','get-url','origin'],{encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim();}catch{return '';}})();
 if(localOrigin && localOrigin!==repository.clone_url) throw new Error('O remoto origin aponta para outro repositório; publicação interrompida.');
 if(!localOrigin) {
  const commits=await api(`${path}/commits?per_page=1`);
  if(commits.status===200 && commits.data.length) throw new Error(`O repositório ${repository.html_url} já contém trabalho. Não foi alterado.`);
  execFileSync('git',['remote','add','origin',repository.clone_url],{env:gitEnv,stdio:'inherit'});
 }
 execFileSync('git',['push','-u','origin','main'],{env:gitEnv,stdio:'inherit'});
 console.log(`Publicado: ${repository.html_url} (${repository.private?'privado':'público'})`);
} catch(error) { console.error(error.message); process.exitCode=1; }