# Next Chapter — Mobile Development e IoT

**Toda peça merece um próximo capítulo.** Aplicativo acadêmico de compra, venda e troca de bolsas de luxo seminovas, construído em **React Native + Expo + TypeScript**. Entrega dos Checkpoints 4 e 5: seis telas inspiradas nas referências do Figma, protótipo navegável, dados mockados persistidos, integração Supabase implementada, testes e evidências de simulação no navegador Windows.

> Status: protótipo local implementado e testado. Repositório publicado no GitHub. Conexão real com Supabase verificada em 04/10/2026; consultar o checklist antes da entrega. O logo foi reconstruído a partir da captura e precisa do arquivo original para fidelidade exata.

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

Acesse a URL local exibida pelo Expo (normalmente http://localhost:8081). O navegador apresenta uma coluna mobile de até 390 px. Sem variáveis Supabase, o app usa JSON local e armazenamento persistente no navegador, suficiente para demonstrar todos os fluxos.

Para emulador Android iniciado no Android Studio: `npm run android`. Para aparelho com Expo Go compatível com SDK 57: `npm start` e leia o QR Code. A validação desta entrega ocorreu no navegador Windows; não se afirma execução Android/iOS sem evidência.

## Funcionalidades
- Splash e catálogo com quatro bolsas coerentes com o protótipo.
- Busca por marca/modelo, navegação e detalhe de todos os produtos.
- Favoritos persistidos e perfil com histórico.
- Venda: seleção real de 4 a 8 fotos, marca/modelo, conservação e estimativa simulada.
- Trade-in com R$ 1.240 de crédito inicial fictício e duas peças elegíveis.
- Exchange Program com explicação, seleção e solicitação de troca sem duplicata.
- Checkout simulado com uso parcial de crédito, saldo atualizado e pedido persistido.
- Supabase: catálogo, carteira, favoritos, curadorias, pedidos, trocas e fotos em Storage privado.

As áreas areia das fotos do catálogo reproduzem os placeholders das capturas. Os selos de autenticação, preços, estimativas e peças são dados de demonstração. Solicitar troca não concede crédito automaticamente; não há gateway de pagamento, frete ou backend de curadoria.

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

Perfil e checkout complementam os seis layouts para concluir os fluxos. [Mapa de navegação](docs/FLUXOS.md) · [Decisões técnicas e bibliotecas](docs/DECISOES-TECNICAS.md)

## Estrutura

```text
App.tsx                    Navegação e coordenação do estado
index.ts                   Entrada Expo
src/components/            Componentes visuais e marca
src/screens/               Seis telas + Perfil e Checkout
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
[Figma fornecido pelo grupo](https://www.figma.com/design/JpMUPu4txwKTUpDvjHxelR/Next-Chapter-%E2%80%94-App-Prototype--c%C3%B3pia-?node-id=0-1). A implementação usa as duas capturas fornecidas, pois o arquivo não pôde ser acessado. Fontes e tokens são aproximações; o símbolo não é o SVG original. O programa recebeu controles funcionais na área inferior originalmente vazia.

## Repositório GitHub

[CP5 Next Chapter Mobile](https://github.com/LuanOrlandelli/cp5-next-chapter-mobile) — repositório privado publicado na conta LuanOrlandelli. Conceder acesso ao professor/grupo ou ajustar a visibilidade na conta antes da avaliação. Código, README, SQL, testes e evidências estão versionados.

Para atualizar a publicação: executar git add ., git commit e git push. As instruções abaixo também permitem publicar uma cópia em outra conta.

### Publicar uma cópia
O Git local deve ser inicializado na pasta deste README. Criar um repositório vazio na conta do grupo, obter a URL e executar:

```bash
git remote add origin https://github.com/SEU-USUARIO/next-chapter-mobile.git
git push -u origin main
```

Se ainda não houver commit local, executar antes: `git add .` e `git commit -m "feat: prototipo Next Chapter CP4 e CP5"`. Depois conferir no GitHub o README, os documentos, os SQL e `docs/evidence`. Não versionar node_modules, .env ou pastas de build/teste temporárias. A publicação na conta indicada foi realizada e verificada.

## Conferência para entrega
[Checklist CP4/CP5 com evidências e pendências](docs/CHECKLIST-ENTREGA.md). Integração real Supabase verificada. Conceder acesso ao repositório para o professor antes da entrega. O projeto é acadêmico; não representa uma operação comercial ativa.