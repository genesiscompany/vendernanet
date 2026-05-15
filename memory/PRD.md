# PRD — Vender na Net | Landing Page Chinelos EVA Embossado

## Problema (original)
Landing page de produto único (chinelo babuche EVA) com seleção de cor, tamanho e quantidade.
Pedido enviado pelo WhatsApp (11) 94237-7344 com endereço, valor, forma de pagamento (PIX/cartão).
Frete grátis acima de R$ 100. Preço: 1un R$69,90 / 2un R$89,90. Loja: Vender na Net (vendernanet.com.br).
Estilo: moderno e chocante.

## Persona
Consumidor brasileiro mobile-first procurando chinelo confortável para praia/casa, e mini-atacadistas/revendedores.

## Arquitetura
- Pure frontend (sem backend de pedidos)
- React + Tailwind + shadcn/ui (Accordion, Sonner toasts) + lucide-react
- Fontes: Bebas Neue (display) + Manrope (body)
- Pedido via deeplink: `https://wa.me/5511942377344?text=<mensagem encoded>`

## Implementado (Dez/2025)
- Marquee superior + Header sticky + Hero brutalist com imagem lifestyle
- Configurador: 3 cores (bege/rosa/menta), 3 tamanhos (35-36/37-38/39-40), seletor de quantidade
- Lógica de preço dinâmico + banner de frete grátis (R$100)
- Formulário: nome, endereço, PIX/Cartão
- Geração de mensagem WhatsApp completa + toast de validação
- Seções: Benefícios bento, Depoimentos, Garantia, FAQ accordion (5 perguntas), Sobre a loja, CTA final, Footer
- 100% testes de frontend passaram (testing_agent_v3 iteration_1)

## Backlog
### P1
- Adicionar mais imagens reais (lifestyle) para Rosa e Menta
- Pixel tracking (Meta/GA4) para conversão WhatsApp
- Galeria com swipe touch mobile
### P2
- Modo "atacado" com tabela de preços por volume
- Captura de e-mail (newsletter) com cupom de desconto
- Integração com Stripe/MercadoPago para checkout direto
- Schema.org Product + reviews para SEO
