# Marca, identidade e pitch

## Nome e conceito
**Next Chapter**: a peça inicia um próximo capítulo com outra pessoa. A marca une moda circular, continuidade da história e uma linguagem visual editorial.

## Identidade
Referências: seis telas fornecidas pelo grupo em capturas do Figma. A identidade usa fundo oliva para a Splash e a assinatura, rosa para chamadas e cards de histórico, creme para conteúdo e marrom para contrastes. Em 04/10/2026, o grupo solicitou fotos ilustrativas padronizadas para os quatro produtos e as duas peças elegíveis, com fundo branco e enquadramento centralizado. As referências fotográficas foram editadas com IA; fontes e procedimento em [assets/products/README.md](../assets/products/README.md).

| Token | Cor | Aplicação |
| --- | --- | --- |
| olive | #4B4D34 | Splash, header do catálogo, estimativa |
| pink | #E58DB3 | Botões e assinatura |
| logo | #FFC5F1 | Símbolo da marca |
| cream | #F4E6DA | Fundo de conteúdo |
| brown | #4B342B | Texto e headers |
| sand | #ACA077 | Elementos secundários e borda de upload |
| white | #FFFFFF | Fundo das fotos e campos |
| rose | #C67D97 | Fundo Trade-in |
| badge | #778653 | Selos e indicação de crédito |
| price | #C6537D | Preços |

Tipografia implementada: **Inter**, nos pesos Regular 400, Medium 500, Bold 700 e Black 900. Arquivos da fonte são incluídos no bundle por @expo-google-fonts/inter, sem depender do Google Fonts em tempo de execução. A fonte exata do Figma não foi disponibilizada; Inter é uma aproximação visual.

O símbolo em `src/components/BrandMark.tsx` é uma reconstrução SVG a partir da captura, não o arquivo original. Para equivalência exata, substituí-lo pelo SVG/PNG exportado do Figma. A marca nominativa usa caixa alta e peso Black. As cores foram aproximadas visualmente a partir das capturas, que não fornecem tokens originais.

O programa de troca recebeu histórico na região originalmente vazia, controles de retorno e o botão Realizar uma nova troca. O ícone de duas setas é vetorial, rosa e centralizado no círculo oliva do cabeçalho. Perfil, checkout, detalhe de envio e detalhe de troca são telas complementares que reutilizam a identidade visual. Os cards rosas de vendas e trocas são clicáveis em toda a área.

## Pitch (aproximadamente 45 segundos)
A Next Chapter transforma bolsas de luxo sem uso em novas histórias. Quem compra encontra um catálogo de peças seminovas com conservação informada e uma proposta de curadoria e autenticação. Quem vende envia fotos, recebe uma estimativa e acompanha o pedido. Quem deseja renovar sua coleção pode solicitar a troca de uma peça elegível. Nosso modelo combina comissão sobre vendas e taxa administrativa nas trocas, oferecendo uma experiência de luxo circular em um único aplicativo. O protótipo demonstra compra simulada, envio para curadoria e solicitação de troca com dados fictícios e integração real com Supabase. A avaliação e a conclusão comercial são etapas futuras.

## Modelo de negócio proposto
- Acesso gratuito ao catálogo; receita principal por comissão sobre vendas concluídas.
- Hipótese inicial: comissão de 15%, a validar com custos e aceitação do público. Uma venda de R$ 5.400 geraria R$ 810 de receita bruta antes de curadoria, autenticação, suporte, logística e tributos.
- Taxa administrativa no Exchange para cobrir processamento e nova curadoria. Valor a definir e informar antes da confirmação; o protótipo não cobra taxas.
- Serviços futuros opcionais de venda assistida e curadoria. Assinatura, anúncios e freemium não são necessários para a hipótese inicial.

## Diferencial competitivo proposto
Marketplaces generalistas priorizam descoberta e negociação entre particulares. A proposta Next Chapter centraliza informações de conservação, venda assistida e circulação por crédito, com foco exclusivo em bolsas de luxo seminovas. A combinação de catálogo, curadoria e Exchange é o diferencial a validar; não se afirma que concorrentes não ofereçam funções semelhantes.

## Validação futura
Entrevistar compradores e vendedores; testar interesse em troca por crédito, confiança na curadoria e disposição para pagar comissão; medir conclusão de vendas, tempo de avaliação e recompra. O CP5 comprova o fluxo técnico, não valida o mercado ou a viabilidade financeira.
