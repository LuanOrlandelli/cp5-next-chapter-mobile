# Decisões técnicas

## Base
React Native + Expo SDK 57 + TypeScript, com suporte Android/iOS e web por React Native Web. A instalação é fixada por package-lock.json. Node 24 foi usado na validação; recomenda-se Node 24 LTS. A pasta recebida tinha README e diretórios vazios, sem o código descrito; a base foi criada nesta entrega.

## Arquitetura
`App.tsx` coordena navegação e estado de sessão. `src/screens` contém telas; `src/components`, elementos reutilizáveis; `src/theme.ts`, tokens; `src/domain/rules.ts`, regras puras; `src/data/products.json`, fixtures; `src/services`, acesso e persistência.

A navegação é uma pilha simples de dez telas em memória: seis telas de referência, Perfil, Checkout, detalhe de peça enviada e detalhe de troca. Abrir um card guarda a origem; Voltar retorna ao Perfil ou ao Exchange Program conforme o caminho usado. Não implementa deep links ou sincronização da URL do navegador. O navegador exibe uma coluna mobile de até 390 px; no aparelho utiliza a largura disponível.

## Bibliotecas
| Biblioteca | Motivo |
| --- | --- |
| expo / react-native | Ambiente universal e componentes nativos |
| react-native-web / react-dom / @expo/metro-runtime | Simulação em navegador Windows |
| expo-image-picker | Seleção de fotos real da galeria/arquivo |
| @react-native-async-storage/async-storage | Persistência local e sessão Supabase |
| @supabase/supabase-js | Postgres, autenticação anônima e Storage |
| react-native-safe-area-context | Respeitar recortes e áreas seguras do aparelho |
| @electric-sql/pglite | Validar SQL/RLS em PostgreSQL embarcado |
| react-native-svg | Logo reconstruído e ícone de troca centralizado no círculo oliva |
| expo-font / @expo-google-fonts/inter | Fontes empacotadas |
| tsx / node:test | Testes de regras de negócio |
| @playwright/test | Testes reais no navegador, screenshots, vídeo e rastros |

## Dois modos de dados
Sem variáveis Supabase: JSON local para produtos e AsyncStorage para carteira, favoritos, curadorias, pedidos e trocas. O estado é serializado com versão; mutações locais são sequenciadas para evitar gravações concorrentes. Fotos locais são persistidas como data URI quando base64 está disponível. Quota de armazenamento pode limitar imagens; falhas são apresentadas ao usuário, sem confirmar um envio não gravado.

Com URL e chave pública: catálogo e dados são consultados no Supabase, sessão anônima persistida identifica o usuário e fotos vão para bucket privado. Falhas do remoto são exibidas; não há fallback silencioso. Uma sessão anônima perdida não é recuperável em outro aparelho. Em produção, implementar cadastro, login e recuperação.

O comando de uso do app fixa `localhost:8081`. O armazenamento web depende da origem, incluindo host e porta: outra porta ou navegador pode iniciar outro usuário anônimo, sem excluir o registro anterior do banco. `--clear` limpa o cache do Expo, não o armazenamento do site. Os testes Playwright usam outra porta, por padrão 8082, configurável por `E2E_PORT`, com variáveis Supabase vazias e contextos isolados.

## Fotos, cards e histórico
`ProductPhoto` exibe os assets locais pela identificação do produto ou da peça elegível. São seis referências ilustrativas padronizadas com IA; o catálogo do banco não contém esses arquivos ou links externos. `ExchangeCard` reutiliza o card rosa no Perfil e no histórico do programa.

O detalhe de venda carrega os caminhos de `sales.photos`. Em modo Supabase, `loadSalePhotos` gera URLs assinadas de uma hora, usando a sessão atual e as políticas do bucket privado. Reabrir a tela ou tentar novamente renova os links. A galeria permite escolher uma miniatura para ampliar a foto e apresenta carregamento, erro e nova tentativa. No modo Local, usa as fotos persistidas no navegador.

O histórico do programa separa solicitações e registros com status Realizada na interface. O schema e a função atuais só gravam Solicitada: a curadoria administrativa, a conclusão e a concessão de novo crédito não estão implementadas. Por isso, a seção de trocas realizadas está vazia no protótipo; não se simula uma aprovação inexistente.

## Banco e regras
Produtos, carteiras, peças elegíveis, favoritos, curadorias, pedidos e trocas. RLS isola as linhas por `auth.uid()`. O catálogo é público; fotos usam pasta do usuário no bucket privado. Carteira, pedidos e trocas não recebem escritas diretas do cliente: funções SQL executam as operações. Compra bloqueia a carteira, calcula preços no servidor e usa chave idempotente. Troca possui unicidade por usuário/peça. O banco recalcula estimativas de curadoria por trigger.

O crédito inicial é concedido apenas na criação da carteira. Reabrir o app não recompõe o saldo. Solicitar troca não concede crédito. Dados e compras são simulações acadêmicas; não existe inventário de estoque ou pagamento comercial.

## Testes e comprovação
Regras financeiras e validação usam testes automatizados independentes da interface. Playwright exercita as telas no Chromium em viewport mobile, inclusive upload, persistência, galeria de envio, cards de troca, histórico, favoritos e saldo. Um roteiro manual cobre também permissões e conexão real Supabase. A integração remota foi verificada em 04/10/2026, inclusive o envio pela interface e a consulta das fotos privadas; Android/iOS não foram executados. As evidências finais precisam acompanhar as últimas alterações visuais.

## Referências oficiais
- [Expo SDK](https://docs.expo.dev/versions/latest/)
- [ImagePicker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)
- [Supabase com Expo](https://supabase.com/docs/guides/getting-started/quickstarts/expo-react-native)
- [Sessões anônimas](https://supabase.com/docs/guides/auth/auth-anonymous)
- [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
