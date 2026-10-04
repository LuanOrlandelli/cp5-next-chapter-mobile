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
O projeto foi configurado e o script npm run test:supabase passou contra o serviço real em 04/10/2026. A saída está em docs/evidence/12-supabase-integration.txt. Anexar também uma captura do Table Editor para a apresentação acadêmica.

Referências: [Expo/React Native](https://supabase.com/docs/guides/getting-started/quickstarts/expo-react-native), [sessão anônima](https://supabase.com/docs/guides/auth/auth-anonymous), [RLS](https://supabase.com/docs/guides/database/postgres/row-level-security).