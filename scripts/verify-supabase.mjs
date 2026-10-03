// Verificação contra um projeto REAL. Cria duas sessões anônimas de teste.
import assert from 'node:assert/strict';
import { createClient } from '@supabase/supabase-js';
const url=process.env.EXPO_PUBLIC_SUPABASE_URL, key=process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
if(!url || !key) { console.error('Configure .env com URL e chave pública do Supabase antes de executar.'); process.exit(1); }
const options={auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}};
const a=createClient(url,key,options),b=createClient(url,key,options);
function check(result) { if(result.error) throw result.error; return result.data; }
try {
 const userA=check(await a.auth.signInAnonymously()).user; check(await b.auth.signInAnonymously());
 console.log('OK: duas sessões anônimas autenticadas.');
 const products=check(await a.from('products').select('*').order('position')); assert.equal(products.length,4);
 check(await a.rpc('initialize_demo')); check(await b.rpc('initialize_demo')); console.log('OK: catálogo e carteiras inicializados.');
 const id=`verify-${Date.now()}`,product=products[0];
 check(await a.from('favorites').insert({user_id:userA.id,product_id:product.id}));
 assert.equal(check(await b.from('favorites').select('*').eq('user_id',userA.id)).length,0);
 console.log('OK: favoritos isolados por RLS.');
 const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Y9Zl1sAAAAASUVORK5CYII=','base64'),paths=[];
 for(let i=0;i<4;i++) { const path=`${userA.id}/${id}/${i}`; check(await a.storage.from('sale-photos').upload(path,png,{contentType:'image/png'})); paths.push(path); }
 check(await a.from('sales').insert({id,user_id:userA.id,brand_model:'Prada Re-Edition 2005',condition:'Excelente',photos:paths,estimate_low:1,estimate_high:2}));
 const sale=check(await a.from('sales').select('*').eq('id',id).single()); assert.equal(sale.estimate_low,350000); assert.equal(sale.estimate_high,420000);
 const denied=await b.storage.from('sale-photos').download(paths[0]); assert.ok(denied.error); console.log('OK: curadoria, estimativa e fotos privadas.');
 const order=check(await a.rpc('place_demo_order',{product:product.id,apply_credit:true,request_id:id}));
 assert.equal(order.credit_used,124000); assert.equal(order.paid,product.price-124000);
 check(await a.rpc('place_demo_order',{product:product.id,apply_credit:true,request_id:id}));
 assert.equal(check(await a.from('orders').select('*').eq('id',id)).length,1);
 check(await a.rpc('initialize_demo')); assert.equal(check(await a.from('wallets').select('credit').single()).credit,0);
 console.log('OK: compra idempotente e crédito persistente.');
 check(await a.rpc('request_demo_exchange',{piece:'lv-speedy'})); assert.ok((await a.rpc('request_demo_exchange',{piece:'lv-speedy'})).error);
 assert.equal(check(await b.from('orders').select('*').eq('id',id)).length,0); console.log('OK: troca, duplicata rejeitada e isolamento de pedidos.');
 console.log('Integração real Supabase verificada. Usuários e registros de teste permanecem no projeto dedicado de demonstração.');
} catch(error) { console.error('Falha na integração:',error.message); process.exitCode=1; }
finally { await a.auth.signOut(); await b.auth.signOut(); }