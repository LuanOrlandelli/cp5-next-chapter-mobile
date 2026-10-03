-- Next Chapter / CP5. Executar no SQL Editor de um projeto Supabase novo.
-- Dados financeiros em centavos; operações exclusivamente de demonstração.
begin;
create table if not exists public.products (
 id text primary key, brand text not null, model text not null, detail text not null,
 price integer not null check (price > 0), condition text not null check (condition in ('Novo','Excelente','Bom','Usado')),
 year integer not null, size text not null, category text not null default 'Bolsas', authenticated boolean not null default true, position integer not null
);
create table if not exists public.wallets (
 user_id uuid primary key references auth.users(id) on delete cascade, credit integer not null default 124000 check (credit >= 0)
);
create table if not exists public.eligible_pieces (
 user_id uuid not null references auth.users(id) on delete cascade, id text not null, name text not null,
 credit integer not null check (credit >= 0), position integer not null, primary key (user_id,id)
);
create table if not exists public.favorites (
 user_id uuid not null references auth.users(id) on delete cascade,
 product_id text not null references public.products(id), primary key (user_id,product_id)
);
create table if not exists public.sales (
 id text primary key, user_id uuid not null references auth.users(id) on delete cascade,
 brand_model text not null check (length(trim(brand_model)) between 3 and 120),
 condition text not null check (condition in ('Novo','Excelente','Bom','Usado')),
 photos text[] not null check (cardinality(photos) between 4 and 8),
 estimate_low integer not null check (estimate_low >= 0), estimate_high integer not null check (estimate_high >= estimate_low),
 status text not null default 'Em curadoria' check (status = 'Em curadoria'), created_at timestamptz not null default now()
);
create table if not exists public.orders (
 id text primary key, user_id uuid not null references auth.users(id) on delete cascade,
 product_id text not null references public.products(id), product_name text not null,
 total integer not null check (total > 0), credit_used integer not null check (credit_used >= 0),
 paid integer not null check (paid >= 0 and paid + credit_used = total), created_at timestamptz not null default now()
);
create table if not exists public.exchanges (
 id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
 piece_id text not null, piece_name text not null, status text not null default 'Solicitada' check (status = 'Solicitada'),
 created_at timestamptz not null default now(), unique (user_id,piece_id),
 foreign key (user_id,piece_id) references public.eligible_pieces(user_id,id)
);
create index if not exists sales_user_created on public.sales(user_id,created_at desc);
create index if not exists orders_user_created on public.orders(user_id,created_at desc);
create index if not exists exchanges_user_created on public.exchanges(user_id,created_at desc);
alter table public.products enable row level security;
alter table public.wallets enable row level security;
alter table public.eligible_pieces enable row level security;
alter table public.favorites enable row level security;
alter table public.sales enable row level security;
alter table public.orders enable row level security;
alter table public.exchanges enable row level security;
revoke all on public.products, public.wallets, public.eligible_pieces, public.favorites, public.sales, public.orders, public.exchanges from anon, authenticated;
grant select on public.products to anon, authenticated;
grant select on public.wallets, public.eligible_pieces, public.favorites, public.sales, public.orders, public.exchanges to authenticated;
grant insert, delete on public.favorites to authenticated;
-- upsert precisa de update; RLS mantém a propriedade da linha.
grant update on public.favorites to authenticated;
grant insert on public.sales to authenticated;
drop policy if exists catalog_read on public.products;
create policy catalog_read on public.products for select to anon,authenticated using (true);
drop policy if exists wallet_read on public.wallets;
create policy wallet_read on public.wallets for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists pieces_read on public.eligible_pieces;
create policy pieces_read on public.eligible_pieces for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists favorites_own on public.favorites;
create policy favorites_own on public.favorites for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
drop policy if exists sales_read on public.sales;
create policy sales_read on public.sales for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists sales_insert on public.sales;
create policy sales_insert on public.sales for insert to authenticated with check (
 (select auth.uid()) = user_id and not exists (select 1 from unnest(photos) photo where photo not like user_id::text || '/' || id || '/%')
);
drop policy if exists orders_read on public.orders;
create policy orders_read on public.orders for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists exchanges_read on public.exchanges;
create policy exchanges_read on public.exchanges for select to authenticated using ((select auth.uid()) = user_id);
create or replace function public.calculate_sale_estimate() returns trigger language plpgsql set search_path = public,pg_temp as $$
declare multiplier numeric;
begin
 multiplier := case new.condition when 'Novo' then 1.15 when 'Excelente' then 1 when 'Bom' then 0.8 when 'Usado' then 0.6 else 0 end;
 new.estimate_low := round(350000 * multiplier); new.estimate_high := round(420000 * multiplier);
 new.status := 'Em curadoria'; new.created_at := now(); return new;
end $$;
drop trigger if exists sale_estimate on public.sales;
create trigger sale_estimate before insert on public.sales for each row execute function public.calculate_sale_estimate();
create or replace function public.initialize_demo() returns void language plpgsql security definer set search_path = public,pg_temp as $$
declare uid uuid := auth.uid();
begin
 if uid is null then raise exception 'Sessão necessária.'; end if;
 insert into public.wallets(user_id) values(uid) on conflict do nothing;
 insert into public.eligible_pieces(user_id,id,name,credit,position) values
  (uid,'lv-speedy','Louis Vuitton Speedy 30',62000,1), (uid,'mk-selma','Michael Kors Selma',31000,2) on conflict do nothing;
end $$;
create or replace function public.place_demo_order(product text, apply_credit boolean, request_id text) returns jsonb language plpgsql security definer set search_path = public,pg_temp as $$
declare uid uuid := auth.uid(); balance integer; bag public.products%rowtype; result public.orders%rowtype; applied integer;
begin
 if uid is null then raise exception 'Sessão necessária.'; end if;
 if request_id is null or length(request_id) not between 3 and 100 then raise exception 'Identificador inválido.'; end if;
 select credit into balance from public.wallets where user_id = uid for update;
 if not found then raise exception 'Inicialize a carteira antes da compra.'; end if;
 select * into result from public.orders where id = request_id;
 if found then
  if result.user_id <> uid or result.product_id <> product then raise exception 'Identificador de pedido já utilizado.'; end if;
  return to_jsonb(result);
 end if;
 select * into bag from public.products where id = product;
 if not found then raise exception 'Produto não encontrado.'; end if;
 applied := case when apply_credit then least(balance,bag.price) else 0 end;
 update public.wallets set credit = credit - applied where user_id = uid;
 insert into public.orders(id,user_id,product_id,product_name,total,credit_used,paid)
 values(request_id,uid,bag.id,bag.brand || ' ' || bag.model,bag.price,applied,bag.price-applied) returning * into result;
 return to_jsonb(result);
end $$;
create or replace function public.request_demo_exchange(piece text) returns uuid language plpgsql security definer set search_path = public,pg_temp as $$
declare uid uuid := auth.uid(); item public.eligible_pieces%rowtype; request uuid;
begin
 if uid is null then raise exception 'Sessão necessária.'; end if;
 select * into item from public.eligible_pieces where user_id = uid and id = piece;
 if not found then raise exception 'Peça não encontrada.'; end if;
 if exists(select 1 from public.exchanges where user_id = uid and piece_id = piece) then raise exception 'Você já solicitou a troca desta peça.'; end if;
 insert into public.exchanges(user_id,piece_id,piece_name) values(uid,piece,item.name) returning id into request;
 return request;
end $$;
revoke all on function public.initialize_demo(), public.place_demo_order(text,boolean,text), public.request_demo_exchange(text), public.calculate_sale_estimate() from public,anon;
grant execute on function public.initialize_demo(), public.place_demo_order(text,boolean,text), public.request_demo_exchange(text) to authenticated;
-- Bucket privado: somente o dono acessa suas fotos.
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('sale-photos','sale-photos',false,6291456,array['image/jpeg','image/png','image/webp','image/heic','image/heif']) on conflict(id) do nothing;
drop policy if exists sale_photos_insert on storage.objects;
create policy sale_photos_insert on storage.objects for insert to authenticated with check (bucket_id = 'sale-photos' and (storage.foldername(name))[1] = (select auth.uid())::text);
drop policy if exists sale_photos_read on storage.objects;
create policy sale_photos_read on storage.objects for select to authenticated using (bucket_id = 'sale-photos' and (storage.foldername(name))[1] = (select auth.uid())::text);
drop policy if exists sale_photos_delete on storage.objects;
create policy sale_photos_delete on storage.objects for delete to authenticated using (bucket_id = 'sale-photos' and (storage.foldername(name))[1] = (select auth.uid())::text);
commit;