# Validação — 02 a 04/10/2026

Ambiente efetivamente usado: Windows, Node 24.13.0, npm 11.6.2, Expo SDK 57 e Chromium via Playwright. Dados locais mockados nos testes automatizados de interface e integração Supabase real nas verificações remotas separadas. Viewport principal: 390 × 844; responsividade adicional em 360 e 1280 px.

| Verificação | Resultado |
| --- | --- |
| TypeScript (`npm run typecheck`) | Aprovado após inclusão dos tipos Node para testes |
| Regras de negócio (`npm test`) | 12 testes aprovados |
| SQL (`npm run test:db`) | 9 subcenários aprovados; runner contabiliza 10 testes com o teste pai |
| Interface (`npm run test:e2e`) | Seis testes aprovados anteriormente; cenários de venda e troca reexecutados após as respectivas alterações, com aprovação |
| Expo Doctor | 21/21 verificações aprovadas |
| Exportação web (`npm run build:web`) | Build gerado em dist |
| Capturas do navegador | 8 imagens PNG |
| Vídeos de execução | 3 arquivos WebM preservados |
| Repositório GitHub | Publicado em https://github.com/LuanOrlandelli/cp5-next-chapter-mobile (privado) |
| Supabase remoto | Integração real aprovada em 04/10/2026 por npm run test:supabase |
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

## Integração real — 04/10/2026
Executado npm run test:supabase contra o projeto configurado no .env. Código de saída 0. Aprovados: sessões anônimas, catálogo e carteiras, favoritos isolados por RLS, curadoria com estimativa recalculada, uploads privados, compra idempotente, crédito persistente, troca e rejeição de duplicatas, isolamento de pedidos. O teste criou duas sessões independentes e registros fictícios no banco. Não alterou o saldo da sessão usada no navegador pelo grupo. URL e chaves não foram incluídas no relatório.

[Saída do teste](evidence/12-supabase-integration.txt). Capturas do Table Editor adicionadas pelo grupo em 04/10/2026: [produtos](../assets/evidencias/12-supabase-products.png), [vendas](../assets/evidencias/13-supabase-sales.png) e [trocas](../assets/evidencias/14-supabase-exchanges.png).

## Fotos no catálogo — 04/10/2026
A pedido do grupo, foram adicionadas e padronizadas fotos ilustrativas locais para Chanel, Louis Vuitton, Dior, Gucci, Speedy e Selma. As quatro primeiras aparecem no catálogo, detalhe e checkout; as duas últimas no Trade-in e no detalhe de troca. As versões padronizadas foram editadas com IA; referências e procedimento em [assets/products/README.md](../assets/products/README.md).

## Alterações funcionais verificadas — 04/10/2026
- Perfil: cards rosas inteiramente clicáveis para peças enviadas e trocas.
- Detalhe de envio: seleção entre quatro fotos, estado, status, estimativa, código e data. Cenário de venda aprovado após a inclusão da galeria e novamente após a conversão do título em card.
- Supabase real: envio pela interface, registro em `sales`, download dos quatro arquivos privados e histórico após recarregar. Uma segunda verificação abriu a galeria com links assinados e selecionou a quarta foto.
- Exchange Program: histórico, mensagens de estado vazio e botão Realizar uma nova troca; ícone vetorial dentro do círculo oliva.
- Detalhe de troca: abertura pelo Perfil e pelo histórico, foto da peça e retorno à origem; cenário de navegação/troca aprovado após as alterações.
- TypeScript aprovado após as mudanças funcionais. Não se afirma nova execução completa do build, Expo Doctor ou de todas as suítes após cada ajuste visual.

Os testes de interface usam dados locais e porta temporária configurável por `E2E_PORT`, normalmente 8082; o uso pessoal do app permanece em `localhost:8081`. O roteiro manual inclui a galeria, os cards e a privacidade, mas não equivale a comprovação de execução em Android/iOS.

## Prints finais conferidos — 04/10/2026
Os 15 PNG adicionados pelo grupo em `assets/evidencias` foram abertos e conferidos: dez telas, modal de nova troca, três tabelas do Supabase e Storage. A lista completa está no [README](../README.md#prints-da-versão-final).

Os cards atuais e as galerias estão registrados. A venda `muu9babb-t4r6gcs6` corresponde ao Perfil, aos detalhes da Prada e à tabela `sales`; a solicitação da Speedy corresponde às telas e à tabela `exchanges`. O Storage mostra os quatro arquivos de outro envio de teste, `muuahn7r-ue4lhmai`, também presente no banco. Não se afirma que essas imagens do Storage sejam da Prada.

O formulário de venda foi capturado vazio; o checkout, antes da confirmação e com crédito desativado; a sessão do Perfil não tem compra registrada. Os testes e vídeos anteriores comprovam os fluxos de envio e compra. O vídeo final deve complementar os prints mostrando preenchimento, uso de crédito, persistência e navegação. O link externo do vídeo e a conferência de acesso ao Figma/GitHub permanecem pendentes.
