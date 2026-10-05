# Como conectar a Next Chapter ao Supabase

Este guia configura o banco, a identificação anônima e o armazenamento de fotos usados pelo aplicativo. A integração já está implementada no código: basta configurar o projeto Supabase e o arquivo `.env`.

**Se você já executou `schema.sql` e `seed.sql` no seu projeto, continue no passo 3. Não precisa criar outro projeto nem apagar seus dados.**

## 1. Criar ou abrir o projeto Supabase

1. Acesse o [painel do Supabase](https://supabase.com/dashboard) e entre na sua conta.
2. Abra o projeto que você já usa para a Next Chapter. Para uma configuração nova, clique em **New project**.
3. Escolha a organização, informe um nome como `next-chapter`, defina a senha do banco e selecione a região São Paulo, se disponível.
4. Mantenha a **Data API** habilitada e aguarde a criação do projeto.

Não é necessário associar o Supabase ao GitHub para conectar o aplicativo. A conexão é feita pela URL e pela chave pública. A senha do banco não será usada no `.env` do app.

## 2. Criar as tabelas e inserir o catálogo

1. No VS Code, abra [supabase/schema.sql](supabase/schema.sql) e copie todo o conteúdo.
2. No painel Supabase, abra **SQL Editor → New query**.
3. Cole o conteúdo e clique em **Run**.
4. Espere a mensagem **Success. No rows returned**. Ela indica sucesso; esse comando não precisa retornar linhas.
5. Faça uma nova consulta, copie todo o conteúdo de [supabase/seed.sql](supabase/seed.sql) e execute.
6. Abra **Table Editor → products**. Devem existir quatro produtos: Chanel, Louis Vuitton, Dior e Gucci.

O schema também cria carteiras, peças elegíveis, favoritos, vendas, pedidos, trocas, funções, políticas de acesso e o bucket privado `sale-photos`. Não é preciso montar essas estruturas manualmente.

O SQL Editor pode avisar sobre operações destrutivas porque o arquivo remove e recria políticas e um trigger. O script deste repositório não contém exclusão de tabelas ou registros; aplique-o no projeto de demonstração correto. Se houve sucesso nas duas consultas, siga adiante.

## 3. Habilitar a identificação anônima

1. Abra **Authentication**.
2. Procure **Sign In / Providers**, ou a configuração equivalente de métodos de entrada.
3. Ative **Allow anonymous sign-ins / Anonymous Sign-Ins** e salve.

O aplicativo cria uma sessão automaticamente, sem pedir e-mail ou senha. Essa sessão tem um identificador de usuário, usado para separar seus envios, fotos e compras dos demais usuários. Isso é autenticação anônima, mesmo sem tela de login. Veja a [documentação oficial de sessões anônimas](https://supabase.com/docs/guides/auth/auth-anonymous).

Se o projeto exigir CAPTCHA, este protótipo não possui a interface para enviar o token. Esse caso exige implementar CAPTCHA antes de usar tal configuração; não troque as políticas do banco para permitir acesso irrestrito.

## 4. Copiar URL e chave pública

1. No projeto Supabase, abra **Connect** ou as configurações **API / API Keys**.
2. Copie a **Project URL**, semelhante a `https://SEU-PROJETO.supabase.co`.
3. Copie a chave **publishable**, normalmente iniciada por `sb_publishable_`. A chave pública legada **anon** também pode ser usada.

Não use senha do banco, `service_role`, secret key ou chave `sb_secret_` no aplicativo. As chaves públicas são destinadas ao cliente; a proteção dos dados depende das políticas RLS. Referência: [chaves de API do Supabase](https://supabase.com/docs/guides/getting-started/api-keys).

## 5. Preencher o `.env` na pasta correta

O arquivo deve ficar **na mesma pasta que `package.json` e `App.tsx`**:

```text
CP5-Mobile/
  CP4-mobile-final-main/
    App.tsx
    package.json
    .env.example
    .env              ← configurar este arquivo
```

1. Copie `.env.example` e renomeie a cópia para `.env`. Se `.env` já existe, edite-o.
2. Preencha as duas linhas com os valores do mesmo projeto Supabase:

```env
EXPO_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_SUA_CHAVE_PUBLICA
```

**Use exatamente esses nomes.** Este projeto lê `EXPO_PUBLIC_SUPABASE_ANON_KEY`, inclusive quando seu valor é uma chave publishable. Não use `NEXT_PUBLIC_` nem renomeie a variável para `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY` sem alterar o código.

O `.env.example` continua com valores vazios e pode ser versionado. O `.env` fica apenas no computador e está ignorado pelo Git. Não publique capturas dele.

## 6. Reiniciar e abrir o aplicativo

No terminal do VS Code, entre na pasta do projeto:

```powershell
cd C:\Users\luano\Downloads\CP5-Mobile\CP4-mobile-final-main
```

Se ainda não instalou as dependências:

```powershell
npm.cmd ci
```

Se o Expo estiver rodando nesse terminal, pressione **Ctrl+C**. Depois execute:

```powershell
npm.cmd run web -- --clear
```

Abra **http://localhost:8081**, toque em **Começar** e abra **Perfil / Meu capítulo**. Abaixo do título deve aparecer **Dados: Supabase**. Se aparece **Dados: Local**, o Expo não recebeu as variáveis: confira a pasta do `.env` e reinicie.

O indicador mostra o modo selecionado. Para comprovar leitura e gravação no banco, faça os passos 7 e 8.

## 7. Conferir a conexão pela interface

1. Verifique se o catálogo mostra os quatro produtos.
2. Vá a **Vender minha bolsa**, preencha marca/modelo, escolha conservação e selecione quatro fotos.
3. Envie para curadoria e abra **Perfil**. O envio deve aparecer em um card rosa.
4. Clique no card e confira as fotos da galeria.
5. Recarregue o aplicativo no mesmo navegador e endereço, volte ao Perfil e confira se o envio permanece.
6. No Supabase, abra **Table Editor → sales** e localize o código do envio mostrado pelo aplicativo.
7. Abra **Storage → sale-photos** e navegue pela pasta do usuário e do envio para conferir os arquivos.

Para conferir os demais fluxos, solicite uma troca e procure o registro em `exchanges`; realize uma compra simulada e confira `orders` e o saldo em `wallets`.

As fotos do catálogo são arquivos locais do aplicativo, por isso não aparecem nesse bucket. O Storage recebe as fotos que você envia no formulário de venda.

## 8. Executar a verificação automática

Em outro terminal, na mesma pasta do projeto:

```powershell
npm.cmd run test:supabase
```

O script lê o `.env` e testa a conexão real: sessões anônimas, catálogo, carteiras, favoritos, venda, fotos privadas, compra com crédito, troca, bloqueio de duplicatas e isolamento entre usuários.

Ao finalizar com sucesso, mostra:

```text
Integração real Supabase verificada. Usuários e registros de teste permanecem no projeto dedicado de demonstração.
```

Esse teste cria dois usuários anônimos e dados fictícios separados da sessão do aplicativo. Os registros permanecem no banco. Use o projeto acadêmico de demonstração; não é necessário executar o teste a cada abertura do app.

## Problemas comuns

| Problema | O que conferir |
| --- | --- |
| Perfil mostra Dados: Local | `.env` ao lado do `package.json`, nomes exatos das duas variáveis e Expo reiniciado |
| Erro de URL ou chave | Valores completos, do mesmo projeto; usar chave pública, sem placeholders |
| Anonymous sign-ins are disabled | Habilitar Anonymous Sign-Ins em Authentication |
| Tabela ou função não encontrada | Executar o `schema.sql` completo no mesmo projeto da URL do `.env` |
| Catálogo vazio | Executar `seed.sql` e conferir quatro linhas em `products` |
| Erro de RLS ou acesso negado | Conferir sessão anônima e execução completa do schema; manter RLS habilitada |
| Fotos não enviadas | Bucket `sale-photos`, políticas do schema, quantidade de 4 a 8 fotos e tamanho máximo de 6 MB por arquivo |
| Falha de rede | Conferir internet e se o projeto Supabase está ativo |
| Porta 8081 ocupada | Encerrar o servidor anterior deste projeto antes de iniciar outro |
| Histórico diferente após mudar de navegador/porta | Outra origem ou janela anônima inicia outra sessão; retornar ao navegador/endereço original |

Não apague o armazenamento do navegador para tentar recuperar uma venda: isso pode remover a identificação da sessão. `--clear` limpa o cache do Expo, não os dados do navegador. Os dados criados no modo Local não são migrados automaticamente para Supabase.

## Conferência final

- [ ] Schema e seed executados no projeto correto.
- [ ] Anonymous Sign-Ins habilitado.
- [ ] `.env` preenchido na pasta do aplicativo.
- [ ] Expo reiniciado e Perfil mostrando Dados: Supabase.
- [ ] Venda encontrada em `sales` e fotos no Storage.
- [ ] Histórico permanece ao recarregar no mesmo navegador/endereço.
- [ ] `npm.cmd run test:supabase` finaliza com sucesso.

Esses itens são um roteiro para quem configurar o projeto, não novas pendências da entrega. A integração real deste aplicativo já foi verificada em 04/10/2026.

Referência complementar: [guia oficial Supabase com Expo/React Native](https://supabase.com/docs/guides/getting-started/quickstarts/expo-react-native). Ao seguir exemplos externos, preserve os nomes de variáveis usados neste repositório.
