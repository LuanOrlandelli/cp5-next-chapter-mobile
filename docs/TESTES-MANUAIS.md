# Roteiro de testes e demonstração

## Preparação
Node 24 LTS, `npm ci` e `npm run web`. Abrir `http://localhost:8081` em uma janela de 390 × 844. Para modo Local, não configurar variáveis Supabase e reiniciar o Expo após mudar a configuração. Para manter o histórico, usar o mesmo navegador, host e porta. A navegação recomeça na Splash após recarregar.

Executar cenários que precisam de saldo inicial em uma sessão de teste separada. Não limpar os dados da sessão pessoal para tentar recuperar um envio: isso remove a identificação anônima guardada no navegador. `--clear` limpa o cache do Expo, não os dados do site. Em modo Supabase, o envio fica associado ao usuário da sessão; em modo Local, ao armazenamento da origem. Os cenários abaixo são um roteiro, não uma declaração de que todos já foram executados em aparelho.

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
| T10 | Adicionar quarta foto e enviar | Confirmação com código e fonte de dados; card rosa aparece em Perfil e persiste após recarregar |
| T11 | Negar permissão da galeria no aparelho | Explicação; formulário continua utilizável |
| T12 | Abrir Trade-in em sessão nova | Saldo R$ 1.240 e duas peças elegíveis com fotos ilustrativas |
| T13 | Usar crédito, abrir Chanel e comprar | Crédito R$ 1.240; diferença R$ 7.660; saldo final zero |
| T14 | Desligar uso do crédito no checkout | Diferença é o preço inteiro; saldo preservado |
| T15 | Confirmar compra e recarregar | Um pedido e saldo atualizado permanecem no Perfil |
| T16 | Abrir Exchange Program e Realizar uma nova troca; selecionar Speedy e confirmar | Explicação, seleção e confirmação; card com status Solicitada aparece no histórico |
| T17 | Tentar solicitar troca da mesma peça | Peça deixa a lista de seleção; backend rejeita duplicata |
| T18 | Usar Voltar em todos os fluxos | Retorno à tela anterior sem perda do histórico persistido |
| T19 | Viewports 360, 390 e desktop | Conteúdo utilizável e sem rolagem horizontal |
| T20 | Configurar Supabase inválido | Erro visível com Tentar novamente; nenhum sucesso fictício |
| T21 | Supabase válido + script de verificação | Catálogo, carteira, curadoria, pedidos e trocas no banco; fotos privadas |
| T22 | Usuários Supabase diferentes | Não visualizam carteira, pedidos, fotos ou favoritos do outro |
| T23 | Clicar em qualquer parte do card de peça enviada no Perfil | Abre nome, status, conservação, estimativa, código, data e galeria |
| T24 | Selecionar as miniaturas da galeria de envio | Foto ampliada e contador correspondem à miniatura escolhida; Voltar retorna ao Perfil |
| T25 | Abrir fotos de um envio no Supabase | URLs assinadas autorizadas exibem as fotos do proprietário; nova tentativa ou reabertura renova os links |
| T26 | Falha de carregamento das fotos | Erro visível e botão Carregar fotos novamente; detalhes textuais permanecem acessíveis |
| T27 | Clicar em card rosa de troca pelo Perfil e pelo programa | Foto da peça, status, estimativa, código e data; Voltar retorna à origem correta |
| T28 | Abrir histórico no Exchange Program após solicitar troca | Contagem e card correspondem ao Perfil; Trocas realizadas permanece zero na demonstração sem conclusão administrativa |
| T29 | Abrir programa sem solicitações | Mensagens de histórico vazio; Realizar uma nova troca continua disponível |
| T30 | Recarregar no mesmo endereço e navegador | Histórico persistido; trocar porta ou janela anônima pode abrir outra sessão sem apagar o banco |

## Android Studio ou Expo Go (complementar)
1. Instalar Android Studio e criar/iniciar um AVD, ou instalar Expo Go compatível com SDK 57 no aparelho.
2. Executar `npm run android` para o emulador; ou `npm start` e ler o QR Code no Expo Go.
3. Executar T01–T18, incluindo permissão de galeria, teclado e hardware Back.
4. Capturar tela ou vídeo do aparelho se utilizado na apresentação.

A entrega usa o navegador Windows como ambiente de simulação, opção aceita no enunciado. Android/iOS não são declarados como testados sem execução efetiva nesses dispositivos.

## Roteiro para apresentação (2–3 minutos)
Mostrar Splash e catálogo com fotos padronizadas; abrir Chanel e favorito; enviar uma Prada com quatro fotos; no Perfil, abrir o card rosa e alternar as fotos; abrir Trade-in e Realizar uma nova troca; registrar uma solicitação e abrir seu card no histórico; usar crédito numa compra; recarregar no mesmo endereço para comprovar persistência. Mostrar README, testes e tabelas Supabase. Explicar que pagamento e estimativas são simulados e que a curadoria administrativa não conclui as trocas no protótipo.

## Ambiente automatizado
- `npm run typecheck`: tipos TypeScript.
- `npm test`: doze testes de domínio e fixtures.
- `npm run test:db`: SQL, RLS e funções no PostgreSQL embarcado, com nove subcenários.
- `npm run test:e2e`: seis testes Chromium, incluindo upload, galeria, cards e histórico de trocas; usa dados locais isolados por contexto e porta temporária, normalmente 8082. Se essa porta estiver ocupada, configurar `E2E_PORT` para os testes; manter o uso pessoal do app em 8081.
- `npm run evidence`: copia vídeos dos testes para `docs/evidence`.
- `npm run build:web`: exporta aplicativo para `dist`.
- `npm run test:supabase`: verifica um projeto Supabase real configurado no `.env`.

Playwright grava vídeos em `test-results` e relatório HTML em `playwright-report`, pastas ignoradas no Git. As capturas e três vídeos selecionados em `docs/evidence` fazem parte da entrega. Execute `npx playwright install chromium` após a primeira instalação de dependências.
