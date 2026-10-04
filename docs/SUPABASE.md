# Configuração e verificação do banco

A integração de aplicação, SQL, funções e Storage está implementada. As verificações SQL locais usam PostgreSQL embarcado (PGlite) com esquemas mínimos de auth/storage para validar sintaxe, transações e RLS. Isso não comprova conexão a um projeto Supabase real.

## 1. Criar projeto
No [Supabase Dashboard](https://supabase.com/dashboard), crie um projeto de demonstração. Use apenas peças e fotos fictícias nesta entrega. No SQL Editor, execute primeiro `supabase/schema.sql` e depois `supabase/seed.sql`. O schema não exclui tabelas ou dados; pode ser reaplicado no projeto dedicado. Não aplicar indiscriminadamente a um banco de outro produto.

## 2. Habilitar sessão anônima
Em Authentication → Sign In / Providers, habilite Anonymous Sign-Ins. A sessão anônima cria uma identidade em `auth.users`, com o papel authenticated e RLS por usuário. Se o projeto exigir CAPTCHA, a chamada `signInAnonymously()` precisará receber um captchaToken; este protótipo não implementa essa interface. Configure o projeto de teste de acordo e reforce proteção antes de disponibilizá-lo publicamente.

## 3. Variáveis públicas
Copie `.env.example` para `.env` e preencha:

```env
EXPO_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_PUBLICA_ANON_OU_PUBLISHABLE
```

Obtenha URL e chave pública no painel Connect/API do projeto. Nunca usar senha Postgres, secret key ou service_role no aplicativo. `.env` está ignorado pelo Git. As duas variáveis são obrigatórias para ativar o modo Supabase; sem nenhuma variável o modo de demonstração permanece local; configuração parcial ou inválida gera erro.

## 4. Reiniciar Expo

```bash
npm run web -- --clear
```

Abra o app, toque em Começar e entre em Perfil. Deve aparecer Dados: Supabase. Confira a existência da carteira e das peças do usuário no Table Editor. Se surgir erro, confira schema, seed, variáveis e habilitação de sessão anônima. Uma falha remota é exibida no catálogo com Tentar novamente.

## 5. Verificação automatizada real

```bash
npm run test:supabase
```

O script cria duas sessões anônimas em um projeto dedicado, consulta o catálogo, cria favoritos, envia quatro fotos de teste ao bucket privado, registra uma curadoria, compra com crédito e solicita uma troca. Verifica RLS entre usuários, recalculo da estimativa, idempotência do pedido, saldo sem recomposição e rejeição de troca duplicada. Deixa usuários e registros de demonstração no projeto; não exclui dados ao final. O comando falha claramente se as variáveis estiverem ausentes. Registrar sua saída e uma captura do Table Editor para evidenciar a conexão na entrega.

## Modelo
| Tabela | Conteúdo | Escrita pelo cliente |
| --- | --- | --- |
| products | Catálogo fictício | Não |
| wallets | Saldo por usuário | Somente função de compra/inicialização |
| eligible_pieces | Peças elegíveis | Somente inicialização |
| favorites | Relação usuário/produto | Inserir/remover próprios |
| sales | Curadorias, fotos, estimativas | Inserir própria; trigger calcula estimativa |
| orders | Compras simuladas | Função transacional e idempotente |
| exchanges | Solicitações de troca | Função e chave única por usuário/peça |

`initialize_demo`: cria carteira com 124000 centavos uma única vez e as duas peças elegíveis. `place_demo_order`: usa preço do catálogo, bloqueia a carteira, aplica no máximo o saldo e registra pedido. `request_demo_exchange`: valida a propriedade da peça, impede duplicatas e registra solicitação sem conceder crédito.

O bucket privado `sale-photos` admite JPEG, PNG, WebP, HEIC e HEIF até 6 MB. Caminho: `<auth.uid>/<saleId>/<índice>`. Políticas isolam arquivos por pasta de usuário. O app envia arquivos e, se o registro de curadoria falhar, tenta remover os uploads parciais.

## Verificação real concluída — 04/10/2026
O projeto foi configurado e o script npm run test:supabase passou contra o serviço real em 04/10/2026. A saída está em docs/evidence/12-supabase-integration.txt. O grupo adicionou capturas do Table Editor para produtos, vendas e trocas e uma captura do Storage em `assets/evidencias`, vinculadas no README.

Referências: [Expo/React Native](https://supabase.com/docs/guides/getting-started/quickstarts/expo-react-native), [sessão anônima](https://supabase.com/docs/guides/auth/auth-anonymous), [RLS](https://supabase.com/docs/guides/database/postgres/row-level-security).
## Sessão no navegador e conferência de vendas

Use sempre `http://localhost:8081`. O comando `npm run web` fixa essa porta; testes automatizados usam uma porta temporária independente. A sessão anônima é preservada pelo armazenamento do navegador e depende da origem: trocar porta, usar `127.0.0.1`, outro navegador ou aba anônima pode abrir outro usuário e outro histórico. Isso não exclui os registros anteriores do Supabase. Não limpe o armazenamento para tentar recuperar uma sessão anterior. A opção `--clear` limpa o cache do Expo, não a sessão do navegador.

Após enviar uma peça, a confirmação informa se foi salva no Supabase ou no navegador e mostra o código do envio. O card rosa do Perfil também mostra esse código e a data; clicar nele abre os detalhes e as fotos. No Supabase, abra Table Editor → `sales` para conferir `id`, `brand_model`, `user_id` e `created_at`. As fotos ficam no bucket privado `sale-photos`, com os caminhos na coluna `photos`. Um envio em modo Local não é transferido automaticamente ao configurar o Supabase.

Em 04/10/2026 foi verificado também o fluxo pela interface em `localhost:8081`, usando uma sessão de teste separada: upload de quatro fotos, inserção em `public.sales`, leitura do registro pela API, download dos quatro arquivos privados e permanência do envio no Perfil após recarregar. ID do registro de verificação: `muua0aw8-durdnz65`. Um segundo teste confirmou a galeria e a seleção de fotos privadas na interface, com registro `muuahn7r-ue4lhmai`. Esses registros pertencem às sessões de teste, não à sessão pessoal do grupo.

As fotos da curadoria podem ser consultadas no detalhe do envio pelo Perfil. O app gera URLs assinadas de uma hora para os caminhos do bucket privado `sale-photos`, usando a sessão do proprietário e respeitando as políticas de acesso existentes. Reabrir a tela ou tentar novamente renova esses links. Em modo Local, a galeria usa as fotos persistidas no navegador.

## Histórico de trocas

O Perfil e o Exchange Program leem os mesmos registros de `exchanges`, isolados por usuário. Os cards abrem detalhes com identificação da peça, status, código e data; a estimativa vem de `eligible_pieces`. O botão Realizar uma nova troca chama o fluxo de solicitação existente.

O schema atual só permite `Solicitada`, e `request_demo_exchange` grava esse status. A interface tem uma seção para trocas realizadas, mas não há aprovação administrativa ou função de conclusão nesta entrega. Portanto, a seção fica vazia. Para implementar uma etapa de conclusão futura, será necessário atualizar a restrição de status do banco e criar um fluxo administrativo autorizado; alterar somente a interface não conclui uma troca.

As fotos dos quatro produtos e das duas peças elegíveis são assets locais associados aos IDs. Não estão em colunas do banco nem usam links externos em tempo de execução. Isso é diferente das fotos de curadoria, enviadas ao Storage privado pelo usuário.
