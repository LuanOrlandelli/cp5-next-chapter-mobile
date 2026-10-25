# Next Chapter — CP4, CP5 e CP6

**Mobile Development e IoT · React Native + Expo + TypeScript**

**Toda peça merece um próximo capítulo.** Aplicativo acadêmico de compra, venda e troca de bolsas de luxo seminovas. O projeto reúne dez telas, dados fictícios, persistência local ou Supabase, testes, simulação web e geração de APK Android pelo GitHub Actions.

## Acesso rápido

| Quero… | Onde encontrar |
| --- | --- |
| Entender a proposta | [Sobre o aplicativo](#proposta-do-aplicativo) |
| Abrir no computador | [Como rodar localmente](#como-rodar-localmente) |
| Configurar o banco | [Integração com Supabase](#integração-com-supabase) |
| Gerar um novo APK | [Como gerar o APK](#como-gerar-o-apk) |
| Baixar e instalar no celular | [Como baixar e instalar o APK](#como-baixar-e-instalar-o-apk) |
| Executar as verificações | [Testes e validação](#testes-e-validação) |
| Ver as telas | [Prints da versão final](#prints-da-versão-final) |
| Abrir vídeo e Figma | [Links da apresentação](#links-da-apresentação) |

## Evolução por checkpoint

| Etapa | Conteúdo do projeto |
| --- | --- |
| CP4 — Idealização | Problema, público-alvo, proposta de valor, marca, pitch, modelo de negócio e referência no Figma |
| CP5 — Protótipo funcional | Telas navegáveis, dados mockados, persistência Supabase, testes e evidências no navegador |
| CP6 — Aplicativo Android | Workflow de geração de APK, download pelo GitHub Actions e instalação no celular |

A seção CP6 descreve a evolução Android realizada neste repositório. Os critérios oficiais do CP6 não foram fornecidos, portanto esta tabela não declara atendimento a um enunciado ainda não recebido.

## Integrantes

| Nome | RM |
| --- | --- |
| Luan Orlandelli | 554747 |
| Jorge Luiz | 554418 |
| Arthur Bobadilla | 555056 |
| Albert Katri | 556544 |
| Bruno Biletsky | 554739 |
| Paulo Akira | 556840 |

## Proposta do aplicativo

Bolsas de luxo sem uso podem circular novamente, mas comprar ou vender uma peça seminova exige confiança, avaliação de conservação e informações claras. A Next Chapter reúne catálogo, venda assistida por curadoria e troca em uma experiência mobile.

O público-alvo são compradores interessados em luxo circular e proprietários que desejam vender ou renovar sua coleção. A proposta de valor combina informações sobre as peças, envio de fotos para avaliação e acompanhamento dos pedidos em um só aplicativo.

O modelo de negócio proposto é acesso gratuito ao catálogo, comissão sobre vendas concluídas e taxa administrativa nas trocas. Uma comissão inicial de 15% é uma hipótese a validar: uma venda de R$ 5.400 geraria R$ 810 de receita bruta antes dos custos. O diferencial proposto é combinar venda assistida, catálogo especializado e Exchange, com foco em bolsas de luxo seminovas. A viabilidade comercial ainda depende de pesquisa com compradores e vendedores.

**Pitch:** a Next Chapter transforma bolsas de luxo sem uso em novas histórias. Quem compra encontra peças com conservação informada; quem vende envia fotos e acompanha a curadoria; quem deseja renovar sua coleção solicita uma troca. O protótipo demonstra esses fluxos com dados fictícios e integração real com Supabase.

## Funcionalidades e navegação

| Tela | Funcionalidade |
| --- | --- |
| Splash | Identidade da marca e entrada pelo botão Começar |
| Home / Catálogo | Quatro bolsas com fotos, preços, busca por marca/modelo e navegação inferior |
| Detalhe do produto | Foto, descrição, estado, ano, tamanho, favorito e Comprar agora |
| Vender minha bolsa | Marca/modelo, conservação, seleção de 4 a 8 fotos e estimativa de venda |
| Exchange & Trade-in | Crédito disponível, peças elegíveis com fotos e acesso ao programa |
| Exchange Program | Histórico de solicitações e botão Realizar uma nova troca |
| Perfil / Meu capítulo | Saldo, favoritos, compras e cards rosas clicáveis de vendas e trocas |
| Checkout | Compra simulada, aplicação opcional de crédito e cálculo da diferença |
| Detalhe da peça enviada | Status, conservação, estimativa, código, data e galeria com miniaturas |
| Detalhe da troca | Foto ilustrativa, status, crédito estimado, código e data |

- **Compra:** Splash → Catálogo → Produto → Checkout → confirmação → Perfil.
- **Venda:** Catálogo → Vender → fotos e dados → enviar → Perfil → card da venda → galeria.
- **Troca:** Trade-in → Exchange Program → Realizar uma nova troca → selecionar peça → confirmar → histórico → detalhe.
- **Favoritos:** Produto → favoritar → Perfil. Os dados permanecem após recarregar no mesmo navegador e endereço.

O botão Voltar retorna à origem do fluxo, inclusive ao abrir detalhes pelo Perfil ou pelo histórico do programa.

### Dados e regras da demonstração

| Produto do catálogo | Preço fictício |
| --- | --- |
| Chanel Classic Flap | R$ 8.900 |
| Louis Vuitton Neverfull MM | R$ 5.400 |
| Dior Lady Dior | R$ 9.200 |
| Gucci Marmont Small | R$ 4.100 |

O saldo inicial fictício é R$ 1.240; as peças elegíveis são Louis Vuitton Speedy 30 e Michael Kors Selma, com estimativas de R$ 620 e R$ 310. Essas estimativas não aumentam automaticamente o saldo.

Venda exige marca/modelo com 3 a 120 caracteres e 4 a 8 fotos de até 6 MB cada. A estimativa-base para conservação Excelente é R$ 3.500–R$ 4.200; Novo aplica 115%, Bom 80% e Usado 60%. São cálculos demonstrativos, sem cotação real de mercado. Valores são armazenados em centavos.

A compra admite crédito parcial e nunca deixa saldo negativo. Pedidos são idempotentes para evitar duplicação. Uma peça não admite duas solicitações de troca. A solicitação recebe status **Solicitada**, sem conceder crédito automaticamente.

O protótipo não realiza pagamentos, frete, autenticação comercial das bolsas ou aprovação administrativa. A seção **Trocas realizadas** permanece vazia porque não há fluxo de conclusão nesta entrega. Preços, selos e peças são fictícios. Não há integração com dispositivo IoT; os requisitos fornecidos aceitam simulação no navegador.

## Links da apresentação

- [Repositório público no GitHub](https://github.com/LuanOrlandelli/cp5-next-chapter-mobile).
- [Vídeo de demonstração no Google Drive](https://drive.google.com/file/d/1G6LfKHhAdkCW3e-8JkhPuDJJDvbkFPOv/view?usp=sharing).
- [Protótipo no Figma](https://www.figma.com/design/JpMUPu4txwKTUpDvjHxelR/Next-Chapter-%E2%80%94-App-Prototype?node-id=0-1&t=NfwugDCNd9QBRdyS-1).

O grupo confirmou em 04/10/2026 que vídeo e Figma abrem em janela anônima. O repositório está público.

## Como rodar localmente

### 1. Preparar o ambiente

Instale **Node.js 24 LTS com npm** e baixe ou clone o repositório. Abra no terminal a pasta que contém `package.json` e `App.tsx`.

No Windows, para o caminho usado neste projeto:

```powershell
cd C:\Users\luano\Downloads\CP5-Mobile\CP4-mobile-final-main
npm.cmd ci
```

Execute `npm.cmd ci` na primeira instalação ou após alterações nas dependências. Em outros sistemas, use `npm` no lugar de `npm.cmd`.

### 2. Abrir a pré-visualização no navegador

```powershell
npm.cmd run web
```

Abra **http://localhost:8081**. O navegador apresenta uma coluna mobile de até 390 px. Mantenha o terminal aberto; para encerrar o servidor, pressione **Ctrl+C**.

Se a porta estiver ocupada, encerre o servidor anterior do projeto antes de iniciar outro. Para reiniciar limpando o cache do Expo:

```powershell
npm.cmd run web -- --clear
```

### 3. Escolher o modo de dados

- **Local:** sem as duas variáveis Supabase, usa catálogo JSON e AsyncStorage. É suficiente para experimentar os fluxos sem configurar banco.
- **Supabase:** configure o `.env` conforme a seção seguinte e reinicie o Expo. O Perfil deve mostrar **Dados: Supabase**.

Use o mesmo navegador, host e porta para manter o histórico. Outra porta, navegador ou janela anônima pode iniciar outra sessão. `--clear` limpa o cache do Expo, sem apagar o armazenamento do navegador.

### 4. Alternativas para desenvolvimento Android

| Ambiente | Como iniciar |
| --- | --- |
| Emulador Android Studio | Inicie um AVD e execute `npm.cmd run android` |
| Expo Go compatível com SDK 57 | Execute `npm.cmd start` e leia o QR Code; computador e celular devem estar na mesma rede |
| APK instalado | Siga [Como baixar e instalar o APK](#como-baixar-e-instalar-o-apk); não precisa iniciar servidor |

## Integração com Supabase

Para configurar com instruções detalhadas e resolver dúvidas, consulte o [passo a passo de conexão com Supabase](GUIA-SUPABASE.md).

1. Criar um projeto de demonstração no Supabase.
2. Executar [schema.sql](supabase/schema.sql) e depois [seed.sql](supabase/seed.sql) no SQL Editor.
3. Habilitar **Anonymous Sign-Ins** em Authentication.
4. Copiar [.env.example](.env.example) para `.env` e preencher:

```env
EXPO_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_PUBLICA_ANON_OU_PUBLISHABLE
```

5. Reiniciar o Expo, abrir Perfil e verificar **Dados: Supabase**.
6. Executar `npm run test:supabase` para verificar a integração real.

O `.env` não é versionado. Use apenas URL e chave pública no cliente; senha do banco e chave `service_role` não entram no aplicativo. Configuração parcial ou falha remota apresenta erro, sem mudar silenciosamente para dados locais.

| Tabela | Dados |
| --- | --- |
| `products` | Catálogo fictício |
| `wallets` | Crédito por usuário |
| `eligible_pieces` | Peças elegíveis |
| `favorites` | Produtos favoritos |
| `sales` | Curadorias, estimativas e caminhos das fotos |
| `orders` | Compras simuladas |
| `exchanges` | Solicitações de troca |

A sessão anônima identifica cada usuário, e políticas **RLS** isolam seus registros. `initialize_demo` cria o saldo uma única vez; `place_demo_order` calcula a compra e atualiza a carteira em transação; `request_demo_exchange` valida a peça e impede duplicatas. O banco recalcula a estimativa de venda por trigger.

As fotos do catálogo são assets locais associados aos IDs. As fotos enviadas pelo usuário ficam no bucket privado **sale-photos**, em pastas por usuário/envio; a galeria usa URLs assinadas de uma hora. Perder a sessão anônima não apaga a venda do banco, mas impede acessar seu histórico nessa nova sessão. Cadastro e recuperação de conta são evoluções futuras.

## Como gerar o APK

O arquivo [.github/workflows/android-apk.yml](.github/workflows/android-apk.yml) configura a compilação no GitHub Actions, sem conta Expo/EAS. O APK incorpora o JavaScript e funciona sem Expo Go ou computador ligado.

### 1. Definir se o APK usará Supabase

Por padrão, sem variáveis no GitHub, o APK usa **dados locais**. Para usar o Supabase:

1. Abra o repositório no GitHub.
2. Entre em **Settings → Secrets and variables → Actions → Variables**.
3. Crie duas **Repository variables**:

| Nome | Valor |
| --- | --- |
| `EXPO_PUBLIC_SUPABASE_URL` | URL do seu projeto Supabase |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | Chave pública anon/publishable do mesmo projeto |

O `.env` do computador não é enviado ao GitHub. Configure as duas variáveis ou deixe ambas vazias. As variáveis públicas são incorporadas ao APK; nunca use senha do banco, `service_role` ou secret key. Alterar essas variáveis exige gerar outro APK.

### 2. Iniciar a compilação

**Manualmente:**

1. Abra [Actions → Gerar APK Android](https://github.com/LuanOrlandelli/cp5-next-chapter-mobile/actions/workflows/android-apk.yml).
2. Clique em **Run workflow**, selecione a branch `main` e confirme em **Run workflow**.
3. Aguarde a execução terminar com o símbolo verde.

**Automaticamente:** commit e push na `main` com alterações nos caminhos de código, assets ou configuração definidos no workflow iniciam outra compilação. Não é necessário criar release. Alterar somente o README ou o guia Supabase não inicia build.

### 3. Entender o que o workflow faz

1. Configura Node.js, Java e Android SDK.
2. Instala as dependências e executa TypeScript e testes de regras.
3. Gera o projeto nativo com Expo Prebuild.
4. Compila o APK release pelo Gradle e verifica a assinatura.
5. Publica o APK e o arquivo de checksum em **Artifacts**.

O build é destinado à demonstração e usa a assinatura de desenvolvimento do template Expo. Publicação na Play Store exige assinatura própria. Falha em uma execução permanece no histórico; a versão corrigida aparece como uma nova execução.

## Como baixar e instalar o APK

### 1. Baixar pelo GitHub

1. Entre na sua conta do GitHub e abra [Actions → Gerar APK Android](https://github.com/LuanOrlandelli/cp5-next-chapter-mobile/actions/workflows/android-apk.yml).
2. Escolha a **execução mais recente concluída com sucesso**, marcada em verde. Se a versão mais recente ainda estiver rodando, espere terminar para obter as alterações novas.
3. Abra **Summary** e role até **Artifacts**, no final da página.
4. Clique em **next-chapter-android-apk** para baixar o **ZIP**.

É necessário estar conectado ao GitHub para baixar artifacts. Eles ficam disponíveis por **30 dias**. Para obter outro arquivo após a expiração, gere um novo build. Não precisa criar release ou repetir uma execução para baixar um artifact ainda disponível.

### 2. Extrair o arquivo

Extraia o ZIP. Dentro dele estarão:

```text
next-chapter.apk    Aplicativo para instalar no Android
SHA256SUMS.txt      Referência para verificar a integridade do arquivo
```

O ZIP não é o aplicativo: instale o **APK extraído**.

### 3. Instalar no Android

1. Se baixou no computador, envie `next-chapter.apk` para o celular, por USB ou outro meio.
2. Abra o APK no celular.
3. Se solicitado pelo Android, permita a instalação por essa origem.
4. Toque em **Instalar** e depois abra **Next Chapter** na lista de aplicativos.

Não precisa Expo Go, Android Studio ou servidor Metro. O modo Supabase precisa de internet. O APK não é instalável no iPhone.

### 4. Atualizar uma instalação existente

O aplicativo não recebe mudanças automaticamente. Baixe e instale o APK da nova execução verde. Se o Android impedir a atualização por assinatura diferente, pode ser necessário desinstalar a versão anterior; isso remove a sessão e os dados locais. Não desinstale apenas para recuperar histórico.

## Arquitetura e bibliotecas

React Native + Expo SDK 57 + TypeScript compartilham a interface com o navegador por React Native Web. `App.tsx` controla uma pilha simples de navegação e o estado; componentes, telas, regras e persistência ficam separados. A navegação não sincroniza a URL nem implementa deep links.

```text
App.tsx                    Navegação e estado
src/screens/               Dez telas
src/components/            Componentes reutilizáveis e marca
src/theme.ts               Cores e tipografia
src/data/                  Catálogo JSON e mapeamento de fotos
src/domain/rules.ts        Regras de negócio
src/services/              Persistência local e Supabase
supabase/                  Schema, funções, RLS e seed
tests/                     Testes de domínio, banco e interface
scripts/                   Verificação remota e evidências
assets/evidencias/         Prints da apresentação
docs/evidence/             Evidências automatizadas
```

| Biblioteca | Finalidade |
| --- | --- |
| React Native Web / React DOM | Execução no navegador |
| Expo ImagePicker | Seleção de fotos |
| AsyncStorage | Dados locais e sessão persistente |
| Supabase JS | Banco, autenticação anônima e Storage |
| React Native SVG | Logo e ícone de troca |
| Expo Font / Inter | Tipografia empacotada |
| Safe Area Context | Áreas seguras do aparelho |
| tsx / node:test | Testes de regras |
| PGlite | Testes SQL em PostgreSQL embarcado |
| Playwright | Testes de interface, prints e vídeos |

## Testes e validação

```bash
npm run typecheck
npm test
npm run test:db
npx playwright install chromium
npm run test:e2e
npm run evidence
npm run test:supabase
npm run build:web
```

| Verificação registrada em 02–04/10/2026 | Resultado |
| --- | --- |
| TypeScript | Aprovado |
| Regras de negócio | 12 testes aprovados |
| SQL, funções e RLS | 9 subcenários aprovados |
| Interface Chromium | 6 testes aprovados; venda e troca reexecutadas após alterações |
| Expo Doctor | 21/21 verificações aprovadas |
| Exportação web | Build gerado |
| Supabase real | Catálogo, carteira, favoritos, fotos privadas, venda, compra, troca e isolamento verificados |

Os testes de interface usam dados locais e porta isolada, normalmente 8082, configurável por `E2E_PORT`. Os testes SQL usam estruturas mínimas de Auth/Storage; a conexão remota foi verificada separadamente. `test:supabase` cria duas sessões e registros fictícios em um projeto de teste, que permanecem no banco.

Evidências: [galeria de testes com prints e vídeos](docs/evidence/index.html) e [resultado da integração Supabase](docs/evidence/12-supabase-integration.txt). As suítes de interface foram executadas no Windows/Chromium. Em 25/10/2026, a compilação Android pelo GitHub Actions foi concluída e o usuário apresentou a execução do APK no celular; isso não equivale à execução de toda a suíte em Android. iOS não foi validado.

### Roteiro manual de apresentação e teste

| Ação | Resultado esperado |
| --- | --- |
| Começar, buscar marca e abrir produto | Catálogo, filtro e detalhes coerentes |
| Favoritar e recarregar | Favorito permanece no Perfil |
| Enviar venda sem dados ou com menos de 4 fotos | Validação bloqueia envio |
| Preencher venda, escolher conservação e enviar 4 fotos | Estimativa e card persistido no Perfil |
| Abrir card de venda e selecionar miniaturas | Fotos e informações correspondentes |
| Solicitar troca e abrir card pelo programa/Perfil | Histórico, detalhes e retorno à origem |
| Solicitar novamente a mesma peça | Duplicata bloqueada |
| Comprar Chanel usando R$ 1.240 de crédito | Diferença R$ 7.660; saldo zero e pedido persistido |
| Comprar sem crédito | Preço integral; saldo preservado |
| Recarregar no mesmo endereço e navegador | Histórico permanece |
| Conferir tabelas e Storage | Registros e fotos persistidos |
| Usar duas sessões distintas | Dados privados isolados por usuário |

Para apresentar em 2–3 minutos: mostrar catálogo e produto, enviar uma venda com quatro fotos, abrir a galeria pelo Perfil, solicitar troca e abrir o histórico, demonstrar compra com crédito e recarregar. Finalizar com os registros no Supabase e evidências dos testes.

## Prints da versão final

Os 15 prints estão em `assets/evidencias/`. As capturas aparecem diretamente abaixo.

| Tela / evidência | Print |
| --- | --- |
| Splash | <img src="assets/evidencias/01-tela-inicial.png" alt="01-tela-inicial" width="300"> |
| Catálogo | <img src="assets/evidencias/02-catalogo.png" alt="02-catalogo" width="300"> |
| Detalhe do produto | <img src="assets/evidencias/03-detalhe-produto.png" alt="03-detalhe-produto" width="300"> |
| Formulário de venda | <img src="assets/evidencias/04-vender-bolsa.png" alt="04-vender-bolsa" width="300"> |
| Exchange & Trade-in | <img src="assets/evidencias/05-trade-in.png" alt="05-trade-in" width="300"> |
| Exchange Program | <img src="assets/evidencias/06-exchange-program.png" alt="06-exchange-program" width="300"> |
| Nova troca | <img src="assets/evidencias/07-nova-troca.png" alt="07-nova-troca" width="300"> |
| Checkout | <img src="assets/evidencias/08-checkout.png" alt="08-checkout" width="300"> |
| Perfil | <img src="assets/evidencias/09-perfil.png" alt="09-perfil" width="300"> |
| Detalhe da venda | <img src="assets/evidencias/10-detalhe-venda.png" alt="10-detalhe-venda" width="300"> |
| Detalhe da troca | <img src="assets/evidencias/11-detalhe-troca.png" alt="11-detalhe-troca" width="300"> |
| Produtos no Supabase | <img src="assets/evidencias/12-supabase-products.png" alt="12-supabase-products" width="300"> |
| Vendas no Supabase | <img src="assets/evidencias/13-supabase-sales.png" alt="13-supabase-sales" width="300"> |
| Trocas no Supabase | <img src="assets/evidencias/14-supabase-exchanges.png" alt="14-supabase-exchanges" width="300"> |
| Fotos no Storage | <img src="assets/evidencias/15-supabase-storage.png" alt="15-supabase-storage" width="300"> |

O formulário foi capturado antes do preenchimento e o checkout antes da compra, com crédito desativado. Os vídeos automatizados complementam esses prints. O Storage mostra quatro fotos de outro envio de teste; Perfil, detalhe de venda e tabela `sales` mostram a Prada apresentada.

## Identidade visual

Next Chapter representa o próximo capítulo de uma peça com outra pessoa. A tipografia implementada é **Inter**, nos pesos 400, 500, 700 e 900, empacotada no app. O logo em SVG foi reconstruído a partir das telas de referência. As seis telas do Figma orientaram a identidade; Perfil, Checkout e detalhes de venda/troca complementam os fluxos.

| Cor | Código | Aplicação |
| --- | --- | --- |
| Oliva | `#4B4D34` | Splash e cabeçalho |
| Rosa | `#E58DB3` | Botões e cards |
| Rosa claro | `#FFC5F1` | Símbolo da marca |
| Creme | `#F4E6DA` | Fundo das telas |
| Marrom | `#4B342B` | Texto e cabeçalhos |
| Areia | `#ACA077` | Elementos secundários |
| Rosa antigo | `#C67D97` | Trade-in |
| Verde | `#778653` | Selos e crédito |
| Rosa escuro | `#C6537D` | Preços |
| Branco | `#FFFFFF` | Fotos e campos |

## Fontes das fotos

As seis fotos são ilustrativas, empacotadas em `assets/products/`, sem links externos em tempo de execução. As versões `*-standard.png` foram editadas com IA para padronizar fundo branco, enquadramento e margens; os JPG originais foram preservados. As imagens não comprovam autenticidade ou conservação. Os direitos pertencem aos respectivos titulares; não há vínculo comercial com as marcas.

| Referência | Fonte |
| --- | --- |
| Chanel Classic | [CHANEL](https://www.chanel.com/us/fashion/p/A01112Y0129594305/classic-11-12-handbag-lambskin-gold-tone-metal/) |
| Louis Vuitton Neverfull MM | [Louis Vuitton](https://es.louisvuitton.com/esp-es/productos/bolso-neverfull-mm-monogram-nvprod5350101v/M46975) |
| Dior Lady Dior | [Dior](https://www.dior.com/en_us/fashion/products/M0565OGWH_M900) |
| Gucci Marmont Small | [Farfetch](https://www.farfetch.com/uk/shopping/women/gucci-small-gg-marmont-shoulder-bag-item-24099590.aspx) |
| Louis Vuitton Speedy 30 | [Fashionphile](https://www.fashionphile.com/products/louis-vuitton-monogram-speedy-30-571759) |
| Michael Kors Selma | [SPERA.de](https://www.spera.de), via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Michael_Kors_Selma_LG_TZ_Satchel_Handtasche_30T3MLMS7T_Kalbsleder_schwarz_-_grau_black_-_pearl_grey_(1)_(16399888809).jpg), [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/); fundo e enquadramento alterados com IA |

## Organização da entrega

| Material | Local |
| --- | --- |
| Apresentação, funcionalidades e decisões técnicas | Este README |
| Configuração detalhada do banco | [GUIA-SUPABASE.md](GUIA-SUPABASE.md) |
| Código do aplicativo | `App.tsx` e `src/` |
| Banco e dados de demonstração | `supabase/schema.sql` e `supabase/seed.sql` |
| Prints da apresentação | `assets/evidencias/` |
| Evidências de testes | `docs/evidence/` |
| Geração do APK — CP6 | [Workflow Android](.github/workflows/android-apk.yml) e artifacts das execuções verdes |

Os requisitos CP4/CP5 estão relacionados nas seções de proposta, identidade, funcionalidades, arquitetura, Supabase, testes e evidências. A evolução CP6 documenta a distribuição Android realizada até aqui.
