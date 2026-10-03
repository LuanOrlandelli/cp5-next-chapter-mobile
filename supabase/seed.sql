-- Catálogo fictício coerente com o protótipo. Valores em centavos.
insert into public.products(id,brand,model,detail,price,condition,year,size,category,authenticated,position) values
('chanel-classic','Chanel','Classic Flap','Classic Flap Medium — Caviar',890000,'Excelente',2021,'M','Bolsas',true,1),
('lv-neverfull','Louis Vuitton','Neverfull MM','Neverfull MM — Monogram',540000,'Excelente',2022,'M','Bolsas',true,2),
('dior-lady','Dior','Lady Dior','Lady Dior Medium — Cannage',920000,'Bom',2020,'M','Bolsas',true,3),
('gucci-marmont','Gucci','Marmont Small','GG Marmont Small — Matelassé',410000,'Excelente',2023,'P','Bolsas',true,4)
on conflict(id) do update set brand=excluded.brand,model=excluded.model,detail=excluded.detail,price=excluded.price,condition=excluded.condition,year=excluded.year,size=excluded.size,category=excluded.category,authenticated=excluded.authenticated,position=excluded.position;