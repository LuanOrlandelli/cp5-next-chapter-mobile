# Roteiro de testes e demonstração

## Preparação
Node 24 LTS, `npm ci` e `npm run web`. Usar navegador com janela mobile de 390 × 844. Para modo local, não configurar variáveis Supabase. Limpar os dados do site apenas antes de iniciar o cenário, para restaurar a carteira fictícia. A navegação recomeça na Splash após recarregar.

## Cenários
| ID | Ação | Resultado esperado |
| --- | --- | --- |
| T01 | Abrir app e Começar | Splash, depois quatro cards no catálogo |
| T02 | Selecionar Todas e Bolsas | Seleção rosa; mesmos quatro produtos, todos são bolsas |
| T03 | Buscar louis | Apenas Louis Vuitton; termo inexistente mostra mensagem |
| T04 | Abrir cada card | Marca, modelo, preço e metadados correspondem ao JSON |
| T05 | Favoritar Chanel e recarregar | Favorito permanece em Perfil; remover desfaz |
| T06 | Abrir Vender e enviar vazio | Marca/modelo obrigatório; nada registrado |
| T07 | Preencher marca/modelo sem fotos | Mensagem exige mínimo de quatro fotos |
| T08 | Selecionar Novo, Excelente, Bom, Usado | Estimativa muda; Excelente exibe R$ 3.500–R$ 4.200 |
| T09 | Selecionar 4 fotos e remover uma | Miniaturas visíveis; envio com 3 fotos é bloqueado |
| T10 | Adicionar quarta foto e enviar | Confirmação; curadoria aparece em Perfil e persiste após recarregar |
| T11 | Negar permissão da galeria no aparelho | Explicação; formulário continua utilizável |
| T12 | Abrir Trade-in | Saldo R$ 1.240 e duas peças elegíveis |
| T13 | Usar crédito, abrir Chanel e comprar | Crédito R$ 1.240; diferença R$ 7.660; saldo final zero |
| T14 | Desligar uso do crédito no checkout | Diferença é o preço inteiro; saldo preservado |
| T15 | Confirmar compra e recarregar | Um pedido e saldo atualizado permanecem no Perfil |
| T16 | Solicitar troca da Speedy | Programa explica etapas; confirmação registra Solicitação |
| T17 | Tentar solicitar troca da mesma peça | Peça deixa a lista de seleção; backend rejeita duplicata |
| T18 | Usar Voltar em todos os fluxos | Retorno à tela anterior sem perda do histórico persistido |
| T19 | Viewports 360, 390 e desktop | Conteúdo utilizável e sem rolagem horizontal |
| T20 | Configurar Supabase inválido | Erro visível com Tentar novamente; nenhum sucesso fictício |
| T21 | Supabase válido + script de verificação | Catálogo, carteira, curadoria, pedidos e trocas no banco; fotos privadas |
| T22 | Usuários Supabase diferentes | Não visualizam carteira, pedidos, fotos ou favoritos do outro |

## Android Studio ou Expo Go (complementar)
1. Instalar Android Studio e criar/iniciar um AVD, ou instalar Expo Go compatível com SDK 57 no aparelho.
2. Executar `npm run android` para o emulador; ou `npm start` e ler o QR Code no Expo Go.
3. Executar T01–T18, incluindo permissão de galeria, teclado e hardware Back.
4. Capturar tela ou vídeo do aparelho se utilizado na apresentação.

A entrega usa o navegador Windows como ambiente de simulação, opção aceita no enunciado. Android/iOS não são declarados como testados sem execução efetiva nesses dispositivos.

## Roteiro para apresentação (2–3 minutos)
Mostrar Splash e catálogo; abrir Chanel e favorito; vender uma Prada com quatro fotos; abrir Trade-in e programa; registrar uma troca; usar crédito numa compra; abrir Perfil e recarregar para comprovar persistência. Por fim mostrar README, testes e tabelas Supabase se a conexão remota estiver configurada.

## Ambiente automatizado
- `npm run typecheck`: tipos TypeScript.
- `npm test`: doze testes de domínio e fixtures.
- `npm run test:db`: SQL, RLS e funções no PostgreSQL embarcado, com nove subcenários.
- `npm run test:e2e`: seis percursos Chromium, incluindo upload e persistência; usa dados locais isolados por contexto.
- `npm run evidence`: copia vídeos dos testes para `docs/evidence`.
- `npm run build:web`: exporta aplicativo para `dist`.
- `npm run test:supabase`: verifica um projeto Supabase real configurado no `.env`.

Playwright grava vídeos em `test-results` e relatório HTML em `playwright-report`, pastas ignoradas no Git. As capturas e três vídeos selecionados em `docs/evidence` fazem parte da entrega. Execute `npx playwright install chromium` após a primeira instalação de dependências.