# Checklist CP4 e CP5

## CP4 — Idealização
| Item / peso | Evidência | Status |
| --- | --- | --- |
| Problema, público e proposta (20%) | ESCOPO.md | Implementado |
| Documentação / README / escopo (25%) | README.md e docs/ | Implementado e publicado |
| Repositório GitHub organizado | Código, README, integrantes e guias | Publicado; repositório público, confirmado em 04/10/2026 |
| Marca e identidade (25%) | MARCA-E-PITCH.md, assets/next-chapter-mark.svg e theme.ts | Implementado; logo e tokens aproximados |
| Pitch / negócio / diferencial (15%) | MARCA-E-PITCH.md | Documentado |
| Estrutura técnica inicial (15%) | Expo, TypeScript, componentes, telas, dados e serviços | Implementado e verificado |
| Protótipo visual | Figma do grupo e seis capturas de execução | Referências preservadas no README |

## CP5 — Protótipo
| Item / peso | Evidência | Status |
| --- | --- | --- |
| Navegação, telas e fluxos (30%) | Dez telas: seis referências, Perfil, Checkout, detalhe de envio e detalhe de troca; testes E2E | Implementado; fluxos alterados verificados |
| Dados mockados coerentes (15%) | products.json, carteira e peças elegíveis | Implementado e testado |
| Ambiente de testes (15%) | Domínio, SQL, Playwright e roteiro manual | Configurado e executado |
| Documentação atualizada (20%) | README, FLUXOS, DECISOES-TECNICAS, TESTES-MANUAIS | Implementado e publicado |
| Integração de banco | Supabase client, schema, RLS, funções, seed, Storage | Implementada e verificada no Supabase real em 04/10/2026 |
| Simulação funcionando (20%) | Quinze prints manuais, vídeos automatizados e vídeo final no Drive vinculado no README | Prints conferidos; acesso ao vídeo confirmado pelo grupo; revisão do conteúdo pendente |

## Antes de entregar

Nomes e links das 15 capturas finais, além dos campos de vídeo/Figma: [Prints da versão final no README](../README.md#prints-da-versão-final). Salvar os PNG em `assets/evidencias/`, preencher os links, fazer commit/push e conferir o acesso antes de marcar os itens. A existência de links preparados não significa que as evidências já foram adicionadas.

- [x] Configurar o projeto Supabase e habilitar sessão anônima.
- [x] Executar `npm run test:supabase` com credenciais públicas de um projeto dedicado — aprovado em 04/10/2026.
- [x] Anexar capturas do Table Editor demonstrando registros persistidos no Supabase — products, sales e exchanges; Storage também incluído.
- [x] Atualizar e conferir os 15 prints da versão atual, incluindo cards rosas, galeria de venda, detalhes e histórico de trocas — 04/10/2026.
- [x] Preencher o link do vídeo final no README — enviado pelo grupo em 04/10/2026.
- [ ] Conferir se o vídeo final mostra os fluxos atuais; conteúdo não pôde ser aberto pela ferramenta.
- [x] Publicar e conferir o repositório GitHub: https://github.com/LuanOrlandelli/cp5-next-chapter-mobile.
- [x] Disponibilizar o repositório ao professor/grupo — público, confirmado pela API do GitHub em 04/10/2026.
- [x] Preencher o link atualizado do Figma no README — 04/10/2026.
- [x] Testar os links finais de vídeo e Figma sem login — o grupo confirmou que ambos abrem em janela anônima em 04/10/2026.
- [ ] Substituir logo reconstruído por export original e confirmar tokens/fontes caso seja exigida igualdade visual exata.
- [x] Documentar escopo, marca, pitch, arquitetura e navegação.
- [x] Atualizar documentação com dez telas, botão Realizar uma nova troca, cards, fotos privadas, sessão anônima e limitações de curadoria — 04/10/2026.
- [x] Executar protótipo e testes no navegador.
- [x] Salvar capturas e vídeos da execução.
- [ ] Gerar ZIP da versão final, se esse formato for exigido, sem `.env`, dependências ou resultados temporários de testes.

A publicação remota foi executada. A integração Supabase real foi verificada pela execução bem-sucedida do script em 04/10/2026. Não há nota presumida; este checklist mapeia os requisitos enviados pelo professor.

O protótipo solicita trocas, mas não executa aprovação/conclusão administrativa ou liberação de novo crédito. A seção Trocas realizadas está vazia por esse motivo. Login com senha, pagamento real e emulador Android não são exigidos no enunciado fornecido; a execução comprovada usa o navegador.
