# Checklist CP4 e CP5

## CP4 — Idealização
| Item / peso | Evidência | Status |
| --- | --- | --- |
| Problema, público e proposta (20%) | ESCOPO.md | Implementado |
| Documentação / README / escopo (25%) | README.md e docs/ | Implementado e publicado |
| Repositório GitHub organizado | Código, README, integrantes e guias | Publicado; repositório privado |
| Marca e identidade (25%) | MARCA-E-PITCH.md, assets/next-chapter-mark.svg e theme.ts | Implementado; logo e tokens aproximados |
| Pitch / negócio / diferencial (15%) | MARCA-E-PITCH.md | Documentado |
| Estrutura técnica inicial (15%) | Expo, TypeScript, componentes, telas, dados e serviços | Implementado e verificado |
| Protótipo visual | Figma do grupo e seis capturas de execução | Referências preservadas no README |

## CP5 — Protótipo
| Item / peso | Evidência | Status |
| --- | --- | --- |
| Navegação, telas e fluxos (30%) | 6 telas + Perfil/Checkout; testes E2E | Implementado e testado |
| Dados mockados coerentes (15%) | products.json, carteira e peças elegíveis | Implementado e testado |
| Ambiente de testes (15%) | Domínio, SQL, Playwright e roteiro manual | Configurado e executado |
| Documentação atualizada (20%) | README, FLUXOS, DECISOES-TECNICAS, TESTES-MANUAIS | Implementado e publicado |
| Integração de banco | Supabase client, schema, RLS, funções, seed, Storage | Código e SQL implementados; conexão real pendente |
| Simulação funcionando (20%) | Chromium no Windows; 8 PNG e 3 WebM | Executada e comprovada |

## Antes de entregar
- [ ] Configurar o projeto Supabase e habilitar sessão anônima.
- [ ] Executar `npm run test:supabase` com credenciais públicas de um projeto dedicado.
- [ ] Anexar captura do Table Editor demonstrando registros persistidos no Supabase.
- [x] Publicar e conferir o repositório GitHub: https://github.com/LuanOrlandelli/cp5-next-chapter-mobile.
- [ ] Conceder acesso ao repositório privado para o professor/grupo.
- [ ] Substituir logo reconstruído por export original e confirmar tokens/fontes caso seja exigida igualdade visual exata.
- [x] Documentar escopo, marca, pitch, arquitetura e navegação.
- [x] Executar protótipo e testes no navegador.
- [x] Salvar capturas e vídeos da execução.

A publicação remota foi executada. A integração Supabase real permanece pendente e não deve ser declarada concluída somente pela existência dos scripts. Não há nota presumida; este checklist mapeia os requisitos enviados pelo professor.