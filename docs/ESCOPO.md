# Escopo — Next Chapter

## Problema
Bolsas de luxo sem uso mantêm valor, mas vender ou trocar uma peça exige confiança na autenticidade, avaliação do estado e negociação. Compradores de peças seminovas precisam de informações claras sobre origem, conservação e preço. Vendedores precisam de um canal de curadoria que diminua o trabalho de anunciar e negociar.

## Público-alvo
Pessoas interessadas em luxo circular, especialmente compradores de bolsas seminovas e proprietários que desejam vender ou renovar sua coleção. Personas conceituais: uma compradora que busca uma peça autenticada com menor custo e uma proprietária que prefere transformar uma bolsa sem uso em crédito. Não são resultados de pesquisa de mercado.

## Proposta de valor
Compra, venda assistida e troca de bolsas de luxo seminovas em uma experiência mobile, com informações de conservação, curadoria e proposta de autenticação. Toda peça merece um próximo capítulo.

## Objetivos acadêmicos
- CP4: documentar problema, público, proposta, marca, pitch, negócio e arquitetura inicial.
- CP5: demonstrar navegação e fluxos com dados mockados, configurar testes, implementar integração Supabase e produzir evidência de execução no navegador.

## Escopo funcional desta entrega
1. Splash com entrada no app.
2. Catálogo de quatro bolsas, busca por marca/modelo, filtros e navegação inferior.
3. Detalhe com conservação, ano, tamanho, autenticação simulada e favorito.
4. Venda com marca/modelo, quatro a oito fotos da galeria, conservação e estimativa simulada.
5. Trade-in com saldo inicial demonstrativo de R$ 1.240, peças elegíveis e uso de crédito no checkout.
6. Exchange Program com informações e solicitação de troca.
7. Checkout de demonstração: aplica crédito disponível, calcula diferença e registra pedido sem pagamento real.
8. Perfil demonstrativo: favoritos, carteira, vendas, compras e trocas persistidos.
9. Repositório de dados local e adaptador Supabase com SQL, RLS e armazenamento privado de fotos.

## Regras
- Valores monetários são inteiros em centavos.
- Catálogo e selos de autenticação são fixtures fictícias; não houve avaliação real das marcas ou das peças.
- Saldo inicial de R$ 1.240 representa crédito anterior fictício. Os R$ 620 e R$ 310 indicados nas peças são propostas futuras; não compõem nem aumentam automaticamente esse saldo.
- Estimativa-base Excelente: R$ 3.500 a R$ 4.200. Novo: 115%; Bom: 80%; Usado: 60%. A fórmula não representa cotação de mercado.
- Venda exige marca/modelo com 3 a 120 caracteres e 4 a 8 fotos de até 6 MB cada. Recomenda-se frente, verso, interior e etiqueta.
- Solicitar troca registra o pedido; aprovação, taxa e concessão de novo crédito ficam para uma etapa posterior de curadoria.
- Uma mesma peça não admite duas solicitações simultâneas de troca nesta demonstração.
- Compra admite uso parcial do crédito e nunca deixa saldo negativo. Pedidos têm chave de idempotência.

## Limites
Sem gateway de pagamento, frete, chat, operação administrativa, autenticação comercial de bolsas ou integração IoT. Os requisitos enviados não exigem dispositivo IoT. A sessão anônima Supabase identifica cada instalação/navegador; não substitui cadastro e recuperação de conta para produção.

## Critérios de aceite
Os seis layouts de referência devem estar reconhecíveis; os botões dos fluxos devem executar ações; os dados devem sobreviver a recarregamentos; os testes e as evidências devem ser reproduzíveis. O requisito de banco conectado só é concluído após configurar e testar um projeto Supabase real. O requisito de publicação GitHub só é concluído quando existir um remoto acessível e o código/documentação forem enviados.