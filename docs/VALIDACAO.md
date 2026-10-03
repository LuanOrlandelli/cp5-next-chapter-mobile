# Validação — 02 e 03/10/2026

Ambiente efetivamente usado: Windows, Node 24.13.0, npm 11.6.2, Expo SDK 57 e Chromium via Playwright. Dados locais mockados. Viewport principal: 390 × 844; responsividade adicional em 360 e 1280 px.

| Verificação | Resultado |
| --- | --- |
| TypeScript (`npm run typecheck`) | Aprovado após inclusão dos tipos Node para testes |
| Regras de negócio (`npm test`) | 12 testes aprovados |
| SQL (`npm run test:db`) | 9 subcenários aprovados; runner contabiliza 10 testes com o teste pai |
| Interface (`npm run test:e2e`) | 6 testes aprovados |
| Expo Doctor | 21/21 verificações aprovadas |
| Exportação web (`npm run build:web`) | Build gerado em dist |
| Capturas do navegador | 8 imagens PNG |
| Vídeos de execução | 3 arquivos WebM preservados |
| Repositório GitHub | Publicado em https://github.com/LuanOrlandelli/cp5-next-chapter-mobile (privado) |
| Supabase remoto | Pendente: projeto/variáveis não fornecidos |
| Android/iOS | Não executado; simulação da entrega feita no navegador |

## Cobertura efetiva
- As seis telas principais e retorno entre fluxos.
- Solicitação de troca e prevenção de peça duplicada.
- Favoritos e persistência após recarregar.
- Busca com resultado e estado vazio.
- Compra com crédito de R$ 1.240 numa Chanel de R$ 8.900; diferença de R$ 7.660; saldo final zero; histórico persistido.
- Venda: campos obrigatórios, conservação, quatro arquivos de imagem selecionados no navegador e curadoria persistida.
- Ausência de rolagem horizontal no catálogo em mobile e desktop.
- Erro de dados locais com recuperação por Tentar novamente.
- SQL reaplicável, saldo sem recomposição, pedidos idempotentes, transações, RLS de usuários, curadoria e políticas do Storage.

Os testes de banco executam as funções e políticas reais do schema em PGlite/PostgreSQL, mas auth/storage são estruturas mínimas de teste. Não executam a API HTTP, o serviço Auth ou uploads do Supabase real. Essa comprovação é feita por `npm run test:supabase` depois de configurar o projeto.

## Evidências
[Abrir galeria com prints e vídeos](evidence/index.html).

| Tela | Captura |
| --- | --- |
| Splash | [01-splash.png](evidence/01-splash.png) |
| Catálogo | [02-home.png](evidence/02-home.png) |
| Detalhe | [03-detalhe.png](evidence/03-detalhe.png) |
| Venda | [04-vender.png](evidence/04-vender.png) |
| Trade-in | [05-trade-in.png](evidence/05-trade-in.png) |
| Programa | [06-exchange-program.png](evidence/06-exchange-program.png) |
| Checkout | [07-checkout.png](evidence/07-checkout.png) |
| Perfil | [08-perfil.png](evidence/08-perfil.png) |

Vídeos: [navegação](evidence/09-navegacao.webm), [compra](evidence/10-compra.webm), [curadoria](evidence/11-curadoria.webm). `evidence/manifest.json` registra a data UTC de geração e o ambiente; a data de apresentação deste relatório usa o fuso America/Sao_Paulo.

## Limites de fidelidade
As capturas originais serviram de referência. Logo reconstruído em SVG, Inter e cores aproximadas; equivalência visual exata depende dos assets/tokens originais do Figma. O programa ganhou controles funcionais no rodapé e há telas complementares de checkout/perfil. Não foi possível realizar comparação automatizada de pixels com as capturas originais, que não estavam disponíveis como arquivos no workspace.
## Dependências
A auditoria npm desta instalação apontou 23 alertas (7 moderados e 16 altos) em dependências. A compatibilidade Expo foi aprovada; os alertas de segurança não são eliminados por essa checagem. Revisar as dependências antes de usar o projeto em produção.
