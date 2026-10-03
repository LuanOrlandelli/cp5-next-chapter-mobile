import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { PGlite } from '@electric-sql/pglite';
const userA = '00000000-0000-4000-8000-000000000001';
const userB = '00000000-0000-4000-8000-000000000002';
test('SQL Supabase em PostgreSQL embarcado (auth/storage mínimos de teste)', async t => {
 const db = new PGlite();
 try {
  await db.exec(`create role anon; create role authenticated; create schema auth; create schema storage;
   create table auth.users(id uuid primary key);
   create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
   create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);
   create table storage.objects(id uuid primary key default gen_random_uuid(),bucket_id text,name text);
   create function storage.foldername(name text) returns text[] language sql immutable as $$ select (string_to_array(name,'/'))[1:cardinality(string_to_array(name,'/')) - 1] $$;
   alter table storage.objects enable row level security;
   grant usage on schema public,auth,storage to anon,authenticated;
   grant select,insert,delete on storage.objects to authenticated;
   insert into auth.users values('${userA}'),('${userB}');`);
  await t.test('schema e seed executam sem erro e podem ser reaplicados', async () => {
   for(let i=0;i<2;i++) { await db.exec(await readFile('supabase/schema.sql','utf8')); await db.exec(await readFile('supabase/seed.sql','utf8')); }
   const result=await db.query('select * from public.products'); assert.equal(result.rows.length,4);
  });
  async function asUser(uid: string) { await db.exec('reset role'); await db.query("select set_config('request.jwt.claim.sub',$1,false)",[uid]); await db.exec('set role authenticated'); }
  await asUser(userA);
  await t.test('carteira inicial e peças elegíveis pertencem ao usuário', async () => {
   await db.query('select public.initialize_demo()'); const wallet=await db.query<{credit:number}>('select credit from public.wallets'); assert.equal(wallet.rows[0].credit,124000);
   assert.equal((await db.query('select * from public.eligible_pieces')).rows.length,2);
  });
  await t.test('compra usa preço do banco, debita crédito e é idempotente', async () => {
   const {rows}=await db.query<{result:{total:number;credit_used:number;paid:number}}>("select public.place_demo_order('chanel-classic',true,'test-order-1') result");
   assert.equal(rows[0].result.total,890000); assert.equal(rows[0].result.credit_used,124000); assert.equal(rows[0].result.paid,766000);
   await db.query("select public.place_demo_order('chanel-classic',true,'test-order-1')"); assert.equal((await db.query('select * from public.orders')).rows.length,1);
   await db.query('select public.initialize_demo()'); assert.equal((await db.query<{credit:number}>('select credit from public.wallets')).rows[0].credit,0);
  });
  await t.test('cliente não altera carteira diretamente', async () => { await assert.rejects(db.query('update public.wallets set credit=999999'),/permission denied/i); });
  await t.test('troca não credita saldo e rejeita duplicata/peça desconhecida', async () => {
   await db.query("select public.request_demo_exchange('lv-speedy')");
   await assert.rejects(db.query("select public.request_demo_exchange('lv-speedy')"),/já solicitou/);
   await assert.rejects(db.query("select public.request_demo_exchange('desconhecida')"),/não encontrada/);
   assert.equal((await db.query<{credit:number}>('select credit from public.wallets')).rows[0].credit,0);
  });
  await t.test('curadoria recalcula estimativa e valida fotos do proprietário', async () => {
   const paths=Array.from({length:4},(_,i)=>`${userA}/test-sale/${i}`);
   await db.query("insert into public.sales(id,user_id,brand_model,condition,photos,estimate_low,estimate_high) values('test-sale',$1,'Prada Re-Edition','Excelente',$2,1,2)",[userA,paths]);
   const {rows}=await db.query<{estimate_low:number;estimate_high:number}>('select estimate_low,estimate_high from public.sales'); assert.equal(rows[0].estimate_low,350000); assert.equal(rows[0].estimate_high,420000);
   await assert.rejects(db.query("insert into public.sales(id,user_id,brand_model,condition,photos,estimate_low,estimate_high) values('bad-sale',$1,'Prada','Bom',$2,1,2)",[userA,paths.map(p=>p.replace(userA,userB))]),/row-level security/i);
  });
  await t.test('RLS isola carteira, pedidos, trocas e curadorias entre usuários', async () => {
   await asUser(userB); await db.query('select public.initialize_demo()');
   assert.equal((await db.query<{credit:number}>('select credit from public.wallets')).rows[0].credit,124000);
   for(const table of ['orders','exchanges','sales']) assert.equal((await db.query(`select * from public.${table}`)).rows.length,0);
   await assert.rejects(db.query("select public.place_demo_order('chanel-classic',true,'test-order-1')"),/já utilizado/);
  });
  await t.test('Storage só admite escrita na pasta do próprio usuário', async () => {
   await db.query("insert into storage.objects(bucket_id,name) values('sale-photos',$1)",[`${userB}/photo/0`]);
   await assert.rejects(db.query("insert into storage.objects(bucket_id,name) values('sale-photos',$1)",[`${userA}/photo/0`]),/row-level security/i);
  });
  await t.test('sem sessão não há acesso às funções de compra', async () => { await db.exec('reset role'); await db.exec('set role anon'); await assert.rejects(db.query("select public.place_demo_order('chanel-classic',true,'anon-order')"),/permission denied/i); });
 } finally { await db.close(); }
});