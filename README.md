# Next Chapter — Mobile Development e IoT

**Toda peça merece um próximo capítulo.** Aplicativo acadêmico de compra, venda e troca de bolsas de luxo seminovas, construído em **React Native + Expo + TypeScript**. Entrega dos Checkpoints 4 e 5: seis telas inspiradas nas referências do Figma, protótipo navegável, dados mockados persistidos, integração Supabase implementada, testes e evidências de simulação no navegador Windows.

> Status em 04/10/2026: protótipo com dez telas, persistência local ou Supabase, cards de vendas e trocas e consulta de fotos. Repositório publicado no GitHub e integração real verificada. Os 15 prints foram conferidos e o acesso ao vídeo e ao Figma foi confirmado pelo grupo em janela anônima. O logo foi reconstruído a partir da captura; o original é necessário para fidelidade exata.

## Integrantes
| Nome | RM |
| --- | --- |
| Luan Orlandelli | 554747 |
| Jorge Luiz | 554418 |
| Arthur Bobadilla | 555056 |
| Albert Katri | 556544 |
| Bruno Biletsky | 554739 |
| Paulo Akira | 556840 |

## Proposta
Bolsas de luxo sem uso podem circular novamente, mas compradores e vendedores precisam de confiança, informações claras e uma experiência simples. A Next Chapter combina catálogo, venda assistida com curadoria e troca por crédito. Público-alvo: interessados em luxo circular e proprietários que desejam renovar sua coleção. Receita proposta: comissão sobre vendas e taxa administrativa nas trocas. O projeto não realiza cobranças nem autenticação comercial de peças.

[Escopo completo](docs/ESCOPO.md) · [Marca, paleta, tipografia, pitch e negócio](docs/MARCA-E-PITCH.md)

## Executar no Windows / navegador
Pré-requisito: **Node.js 24 LTS** com npm. Na pasta deste README:

```bash
npm ci
npm run web
```

Acesse **http://localhost:8081**: `npm run web` fixa essa porta. O navegador apresenta uma coluna mobile de até 390 px. Se a porta estiver ocupada, encerre o servidor anterior deste projeto antes de reiniciar. Sem variáveis Supabase, o app usa JSON local e armazenamento persistente no navegador.

Use sempre o mesmo endereço e navegador para manter a sessão. Trocar a porta, usar `127.0.0.1` ou abrir uma janela anônima pode apresentar outro histórico. `npm run web -- --clear` limpa o cache do Expo, não a sessão nem os dados do navegador. Após alterar `.env`, reinicie o Expo.

Para emulador Android iniciado no Android Studio: `npm run android`. Para aparelho com Expo Go compatível com SDK 57: `npm start` e leia o QR Code. A validação desta entrega ocorreu no navegador Windows; não se afirma execução Android/iOS sem evidência.

## Funcionalidades
- Splash e catálogo com quatro bolsas coerentes com o protótipo.
- Busca por marca/modelo, navegação e detalhe de todos os produtos.
- Favoritos persistidos e Perfil com saldo, compras e cards rosas clicáveis de peças enviadas e trocas.
- Venda: seleção real de 4 a 8 fotos, marca/modelo, conservação e estimativa simulada.
- Trade-in com R$ 1.240 de crédito inicial fictício e duas peças elegíveis.
- Detalhes de uma peça enviada: status, conservação, estimativa, código, data e galeria com foto ampliada e miniaturas selecionáveis.
- Exchange Program com histórico de solicitações, seção de trocas realizadas e botão **Realizar uma nova troca**, com seleção de peça e prevenção de duplicatas.
- Detalhes da troca: foto ilustrativa da peça, status, estimativa de crédito, código e data; retorno ao Perfil ou ao Exchange Program.
- Checkout simulado com uso parcial de crédito, saldo atualizado e pedido persistido.
- Supabase: catálogo, carteira, favoritos, curadorias, pedidos, trocas e fotos em Storage privado.

As fotos ilustrativas dos quatro produtos e das duas peças elegíveis são arquivos locais empacotados, padronizados com fundo branco e enquadramento centralizado. Fontes e descrição das edições com IA em [assets/products/README.md](assets/products/README.md). As fotos enviadas pelo usuário ficam no navegador em modo Local ou no Storage privado em modo Supabase; a galeria usa links assinados de uma hora para acesso autorizado.

Os selos de autenticação, preços, estimativas e peças são dados de demonstração. Solicitar troca não concede crédito nem conclui a troca automaticamente. O banco atual registra o status **Solicitada**; não há fluxo administrativo de aprovação/conclusão. A seção **Trocas realizadas** fica vazia nesta demonstração. Não há gateway de pagamento ou frete.

## Banco de dados — Supabase
1. Criar um projeto Supabase de teste.
2. Executar `supabase/schema.sql` e `supabase/seed.sql` no SQL Editor.
3. Habilitar Anonymous Sign-Ins em Authentication.
4. Copiar `.env.example` para `.env` e preencher URL e chave pública anon/publishable.
5. Reiniciar Expo e executar `npm run test:supabase`.

[Guia detalhado do banco, tabelas, RLS e verificação real](docs/SUPABASE.md). Nunca incluir service_role ou senha do banco no cliente. `.env` não entra no Git. Em modo Supabase, uma falha de conexão aparece como erro; o app não muda silenciosamente para dados locais.

## Testes

```bash
npm run typecheck
npm test
npm run test:db
npx playwright install chromium
npm run test:e2e
npm run evidence
npm run build:web
```

Os testes de domínio cobrem crédito, estimativas, validação e busca. Os testes SQL executam schema, seed e políticas em PostgreSQL embarcado com auth/storage mínimos de teste. Os seis testes Playwright executam navegação, troca, favoritos, busca, compra, fotos e persistência no Chromium. Esses testes locais não substituem a verificação do Supabase real.

[Roteiro manual e apresentação](docs/TESTES-MANUAIS.md) · [Relatório de validação e evidências](docs/VALIDACAO.md)

## Telas e fluxos
1. Splash / Introdução.
2. Home / Catálogo.
3. Detalhe do produto.
4. Vender minha bolsa.
5. Exchange & Trade-in.
6. Exchange Program.

7. Perfil / Meu capítulo.
8. Checkout simulado.
9. Detalhe de uma peça enviada.
10. Detalhe de uma solicitação de troca.

As quatro telas complementares reutilizam a identidade dos seis layouts originais. [Mapa de navegação](docs/FLUXOS.md) · [Decisões técnicas e bibliotecas](docs/DECISOES-TECNICAS.md)

## Estrutura

```text
App.tsx                    Navegação e coordenação do estado
index.ts                   Entrada Expo
src/components/            Componentes visuais e marca
src/screens/               Dez telas, incluindo detalhes de envio e troca
src/data/products.json     Catálogo mockado
src/domain/rules.ts        Regras testáveis
src/services/              Persistência local e Supabase
src/theme.ts               Paleta e tipografia
supabase/                  Schema, RLS, funções e seed
scripts/                   Verificação Supabase e evidências
tests/                     Domínio, banco e testes de navegador
docs/                      CP4, CP5, roteiros e evidências
```

## Referência visual
[Figma fornecido pelo grupo](https://www.figma.com/design/JpMUPu4txwKTUpDvjHxelR/Next-Chapter-%E2%80%94-App-Prototype?node-id=0-1&t=NfwugDCNd9QBRdyS-1), atualizado em 04/10/2026. A implementação usa as duas capturas fornecidas, pois o arquivo não pôde ser acessado pela ferramenta. Fontes e tokens são aproximações; o símbolo não é o SVG original. Alterações solicitadas pelo grupo: fotos padronizadas, cards rosas de vendas e trocas, galerias de detalhes e histórico no Exchange Program. O ícone vetorial de troca fica dentro do círculo oliva e o botão principal diz “Realizar uma nova troca”.

## Repositório GitHub

[CP5 Next Chapter Mobile](https://github.com/LuanOrlandelli/cp5-next-chapter-mobile) — repositório público na conta LuanOrlandelli, com visibilidade confirmada pela API do GitHub em 04/10/2026. Código, README, SQL, testes e evidências estão versionados e disponíveis ao professor/grupo.

Para atualizar a publicação: executar git add ., git commit e git push. As instruções abaixo também permitem publicar uma cópia em outra conta.

### Publicar uma cópia
O Git local deve ser inicializado na pasta deste README. Criar um repositório vazio na conta do grupo, obter a URL e executar:

```bash
git remote add origin https://github.com/SEU-USUARIO/next-chapter-mobile.git
git push -u origin main
```

Se ainda não houver commit local, executar antes: `git add .` e `git commit -m "feat: prototipo Next Chapter CP4 e CP5"`. Depois conferir no GitHub o README, os documentos, os SQL e `docs/evidence`. Não versionar node_modules, .env ou pastas de build/teste temporárias. A publicação na conta indicada foi realizada e verificada.

## Conferência para entrega
[Checklist CP4/CP5 com evidências e pendências](docs/CHECKLIST-ENTREGA.md). Integração real Supabase verificada e repositório público. O projeto é acadêmico; não representa uma operação comercial ativa.

## Prints da versão final

Os **15 prints foram adicionados e conferidos em 04/10/2026** na pasta **`assets/evidencias/`**. Os links abaixo abrem as capturas da versão atual do aplicativo e do Supabase. Para substituir alguma captura, salve um PNG com o mesmo nome e faça commit/push.

Use o app em `http://localhost:8081`, no mesmo navegador, com uma janela mobile próxima de 390 × 844. Faça uma venda com quatro fotos, solicite uma troca e realize uma compra simulada para preencher os históricos antes das capturas. Se necessário, role a tela e use captura de página inteira para mostrar o conteúdo.

### Telas e fluxos do aplicativo — passo 2

| Print | O que mostrar | Arquivo / link |
| --- | --- | --- |
| Tela inicial / Splash | Logo, nome e botão Começar | [assets/evidencias/01-tela-inicial.png](assets/evidencias/01-tela-inicial.png) |
| Home / Catálogo | Quatro bolsas com fotos padronizadas, preços e navegação | [assets/evidencias/02-catalogo.png](assets/evidencias/02-catalogo.png) |
| Detalhe do produto | Foto, marca, modelo, preço, informações e Comprar agora | [assets/evidencias/03-detalhe-produto.png](assets/evidencias/03-detalhe-produto.png) |
| Vender minha bolsa | Formulário com seleção de fotos, marca/modelo, conservação e estimativa | [assets/evidencias/04-vender-bolsa.png](assets/evidencias/04-vender-bolsa.png) |
| Exchange & Trade-in | Crédito e fotos da Speedy e da Selma | [assets/evidencias/05-trade-in.png](assets/evidencias/05-trade-in.png) |
| Exchange Program | Ícone no círculo, histórico com card de solicitação e Realizar uma nova troca | [assets/evidencias/06-exchange-program.png](assets/evidencias/06-exchange-program.png) |
| Nova solicitação de troca | Modal com etapas, seleção da peça e botão de confirmação | [assets/evidencias/07-nova-troca.png](assets/evidencias/07-nova-troca.png) |
| Checkout | Bolsa, crédito disponível, opção de usar crédito, valor e confirmação de compra simulada | [assets/evidencias/08-checkout.png](assets/evidencias/08-checkout.png) |
| Perfil / Meu capítulo | Dados: Supabase, saldo e cards rosas de peças enviadas e trocas | [assets/evidencias/09-perfil.png](assets/evidencias/09-perfil.png) |
| Detalhe da peça enviada | Foto ampliada, miniaturas, status, estado, estimativa e código | [assets/evidencias/10-detalhe-venda.png](assets/evidencias/10-detalhe-venda.png) |
| Detalhe da troca | Foto da peça, status Solicitada, crédito estimado, código e data | [assets/evidencias/11-detalhe-troca.png](assets/evidencias/11-detalhe-troca.png) |

A seção Trocas realizadas pode mostrar zero: a demonstração registra solicitações e não executa a conclusão administrativa. Não é necessário inventar uma troca concluída para o print. Se o Perfil não couber em uma imagem, faça uma captura de página inteira.

### Integração Supabase — passo 3

Abra o projeto Supabase correspondente ao `.env`. As capturas devem mostrar os registros da demonstração que você acabou de realizar, não apenas uma tabela vazia.

| Print | O que mostrar | Arquivo / link |
| --- | --- | --- |
| Catálogo no banco | Table Editor → products, com os quatro produtos | [assets/evidencias/12-supabase-products.png](assets/evidencias/12-supabase-products.png) |
| Venda no banco | Table Editor → sales, com a peça enviada e o código correspondente ao Perfil | [assets/evidencias/13-supabase-sales.png](assets/evidencias/13-supabase-sales.png) |
| Solicitação de troca no banco | Table Editor → exchanges, com peça, status e data | [assets/evidencias/14-supabase-exchanges.png](assets/evidencias/14-supabase-exchanges.png) |
| Fotos persistidas | Storage → sale-photos → pasta do usuário → código do envio, com os quatro arquivos | [assets/evidencias/15-supabase-storage.png](assets/evidencias/15-supabase-storage.png) |

Não inclua a tela do `.env`, senhas, tokens ou chaves nas capturas. O banco e o Storage continuam privados conforme as políticas do aplicativo; publicar esses prints de dados fictícios não altera as permissões.

Conferência: a venda `muu9babb-t4r6gcs6` aparece no Perfil, nos detalhes da Prada e na tabela `sales`; a solicitação da Speedy aparece no programa, no Perfil, nos detalhes e em `exchanges`. O print do Storage mostra quatro arquivos de outro envio de teste, `muuahn7r-ue4lhmai`, também presente em `sales`. Ele comprova o armazenamento, mas não representa as fotos da Prada. O checkout foi capturado antes da compra, com crédito desativado; essa sessão ainda mostra zero compras no Perfil. A compra com crédito está demonstrada pelas evidências automatizadas anteriores e pode ser incluída no vídeo final.

### Vídeo e Figma — passos 2 e 4

Links do vídeo e do Figma inseridos; acesso em janela anônima confirmado pelo grupo em 04/10/2026.

- **Vídeo de demonstração:** [Assistir à demonstração no Google Drive](https://drive.google.com/file/d/1G6LfKHhAdkCW3e-8JkhPuDJJDvbkFPOv/view?usp=sharing), enviado pelo grupo em 04/10/2026. Acesso em janela anônima confirmado pelo grupo em 04/10/2026. O conteúdo do vídeo não foi revisado pela ferramenta.
- **Figma da entrega:** [Next Chapter — App Prototype](https://www.figma.com/design/JpMUPu4txwKTUpDvjHxelR/Next-Chapter-%E2%80%94-App-Prototype?node-id=0-1&t=NfwugDCNd9QBRdyS-1). Acesso em janela anônima confirmado pelo grupo em 04/10/2026.

O vídeo deve mostrar o aplicativo funcionando: navegação, envio com fotos, abertura dos cards e da galeria, solicitação de troca, histórico, compra com crédito e recarregamento para comprovar persistência. Termine mostrando os registros correspondentes no Supabase. O endereço atualizado do Figma também está na seção Referência visual. O grupo confirmou que ambos os links abrem em janela anônima.

### Conferência dos links e publicação

- [x] Todos os 15 PNG acima foram salvos, conferidos e incluídos no repositório.
- [x] Link do vídeo preenchido.
- [x] Acesso ao vídeo confirmado pelo grupo em janela anônima em 04/10/2026.
- [ ] Conferir se o conteúdo do vídeo demonstra os fluxos descritos acima.
- [x] Link final do Figma preenchido e acesso confirmado pelo grupo em janela anônima em 04/10/2026.
- [x] Repositório GitHub público, com acesso sem convite confirmado em 04/10/2026.

Adicionar os arquivos e links permite preencher as evidências, mas não concede acesso automaticamente ao GitHub, Drive ou Figma. Teste os links e marque os itens depois dessa conferência.

Na pasta deste README, após salvar os prints e preencher os links:

```bash
git add README.md assets/evidencias docs/CHECKLIST-ENTREGA.md
git commit -m "docs: adicionar evidencias finais da entrega"
git push origin main
```

As evidências anteriores de testes continuam em [docs/evidence](docs/evidence/index.html). Os prints manuais acima usam uma pasta separada para não serem sobrescritos ao executar os testes. Um ZIP atualizado, se exigido, continua sendo uma etapa adicional.
