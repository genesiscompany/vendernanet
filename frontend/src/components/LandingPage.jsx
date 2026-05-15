import React, { useState, useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Toaster, toast } from "sonner";
import {
  ShoppingBag,
  Truck,
  ShieldCheck,
  Waves,
  Sparkles,
  CreditCard,
  MapPin,
  Phone,
  Minus,
  Plus,
  Star,
  ArrowDown,
  Check,
  Smartphone,
  Download,
} from "lucide-react";

const WHATSAPP_NUMBER = "5511942377344"; // +55 (11) 94237-7344
const STORE_NAME = "Vender na Net";
const STORE_URL = "vendernanet.com.br";

const COLORS = [
  {
    id: "bege",
    label: "Bege Areia",
    hex: "#D4C7B8",
    studio:
      "https://customer-assets.emergentagent.com/job_44d84243-0a37-4ed6-9aef-3d66d47ecb25/artifacts/622mnwkw_huwj4828w1k8gb8n5sfy689pcfyg_1024_1024.webp",
    lifestyle: [
      "https://customer-assets.emergentagent.com/job_44d84243-0a37-4ed6-9aef-3d66d47ecb25/artifacts/p13v85ak_42g754qwfw4evw5tfr3ndvvdbeq5_original.webp",
      "https://customer-assets.emergentagent.com/job_44d84243-0a37-4ed6-9aef-3d66d47ecb25/artifacts/niogyqnl_g1usgnxu3mbt603fm5h7g357t2hf_original.webp",
    ],
  },
  {
    id: "rosa",
    label: "Rosa Pétala",
    hex: "#F4C4C4",
    studio:
      "https://customer-assets.emergentagent.com/job_44d84243-0a37-4ed6-9aef-3d66d47ecb25/artifacts/fz129y61_mmnp6ybft8t77rr7y6y25zx08ry9_1024_1024.webp",
    lifestyle: [],
  },
  {
    id: "menta",
    label: "Verde Menta",
    hex: "#A8DADC",
    studio:
      "https://customer-assets.emergentagent.com/job_chinelo-atacado/artifacts/afuq1v6g_mskug2h7y3tvwr5cb9ksk3ktv3er_original.webp",
    lifestyle: [],
  },
  {
    id: "marinho",
    label: "Azul Marinho",
    hex: "#1E3A5F",
    studio:
      "https://customer-assets.emergentagent.com/job_chinelo-atacado/artifacts/7nc244jh_hn9y3xc6p5gc57cbxpmrsh7dbrbf_original.webp",
    lifestyle: [],
  },
];

const SIZES = ["35-36", "37-38", "39-40"];

const TESTIMONIALS = [
  {
    name: "Carla M.",
    city: "São Paulo, SP",
    text: "Macio demais! Parece que tô andando em nuvem. Comprei pra mim e pra minha mãe.",
    avatar:
      "https://images.unsplash.com/photo-1712876610564-3b5a629388e2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTF8MHwxfHNlYXJjaHwzfHxicmF6aWxpYW4lMjBwZXJzb24lMjBwb3J0cmFpdCUyMHNtaWxlfGVufDB8fHx8MTc3ODg2NTczMHww&ixlib=rb-4.1.0&q=85",
  },
  {
    name: "Rafael S.",
    city: "Rio de Janeiro, RJ",
    text: "Uso da praia pro trabalho em casa. Solado grosso, não escorrega, e o desenho é lindo.",
    avatar:
      "https://images.unsplash.com/photo-1536548665027-b96d34a005ae?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTF8MHwxfHNlYXJjaHwyfHxicmF6aWxpYW4lMjBwZXJzb24lMjBwb3J0cmFpdCUyMHNtaWxlfGVufDB8fHx8MTc3ODg2NTczMHww&ixlib=rb-4.1.0&q=85",
  },
  {
    name: "João P.",
    city: "Belo Horizonte, MG",
    text: "Atendimento rápido pelo WhatsApp, chegou em 3 dias. Acabei pedindo mais 2 pares.",
    avatar:
      "https://images.unsplash.com/photo-1535643302794-19c3804b874b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTF8MHwxfHNlYXJjaHwxfHxicmF6aWxpYW4lMjBwZXJzb24lMjBwb3J0cmFpdCUyMHNtaWxlfGVufDB8fHx8MTc3ODg2NTczMHww&ixlib=rb-4.1.0&q=85",
  },
];

const formatBRL = (v) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const calcPrice = (qty) => {
  if (qty <= 0) return 0;
  if (qty === 1) return 69.9;
  if (qty === 2) return 89.9;
  // bundle ratio: every extra pair after 2 adds R$44,95
  return 89.9 + (qty - 2) * 44.95;
};

const Pill = ({ children, className = "", testId }) => (
  <span
    data-testid={testId}
    className={`inline-flex items-center gap-2 border-2 border-black bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] ${className}`}
  >
    {children}
  </span>
);

export default function LandingPage() {
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedSize, setSelectedSize] = useState(SIZES[1]);
  const [quantity, setQuantity] = useState(1);
  const [imageIdx, setImageIdx] = useState(0);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("pix");

  const gallery = useMemo(() => {
    const arr = [selectedColor.studio, ...selectedColor.lifestyle].filter(
      Boolean
    );
    return arr.length ? arr : [selectedColor.studio];
  }, [selectedColor]);

  const total = useMemo(() => calcPrice(quantity), [quantity]);
  const freeShipping = total >= 100;

  const handleColorChange = (c) => {
    setSelectedColor(c);
    setImageIdx(0);
  };

  const handleSendWhatsApp = (e) => {
    e?.preventDefault();
    if (!name.trim()) {
      toast.error("Por favor, informe seu nome.");
      return;
    }
    if (!address.trim()) {
      toast.error("Informe o endereço completo para entrega.");
      return;
    }

    const lines = [
      `*PEDIDO — ${STORE_NAME}*`,
      "",
      `*Produto:* Chinelo Babuche EVA Embossado`,
      `*Cor:* ${selectedColor.label}`,
      `*Tamanho:* ${selectedSize}`,
      `*Quantidade:* ${quantity} ${quantity > 1 ? "pares" : "par"}`,
      `*Valor:* ${formatBRL(total)}`,
      `*Frete:* ${freeShipping ? "GRÁTIS" : "A calcular"}`,
      "",
      `*Cliente:* ${name}`,
      `*Endereço:* ${address}`,
      `*Pagamento:* ${payment === "pix" ? "PIX" : "Cartão"}`,
      "",
      `Olá! Quero finalizar este pedido. 🛍️`,
    ];
    const msg = encodeURIComponent(lines.join("\n"));
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success("Abrindo WhatsApp para finalizar...");
  };

  const scrollToBuy = () => {
    document.getElementById("comprar")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="App min-h-screen bg-[#FDFBF7] text-black font-body" data-testid="landing-root">
      <Toaster position="top-center" richColors />

      {/* Marquee */}
      <div className="bg-black text-white border-b-2 border-black overflow-hidden py-3" data-testid="marquee-bar">
        <div className="marquee-track text-sm md:text-base font-bold uppercase tracking-[0.3em]">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="inline-flex items-center gap-8 pr-8">
              <span>FRETE GRÁTIS ACIMA DE R$ 100</span>
              <span className="text-[#FDE047]">●</span>
              <span>DIRETO DA FÁBRICA</span>
              <span className="text-[#FDE047]">●</span>
              <span>2 PARES POR R$ 89,90</span>
              <span className="text-[#FDE047]">●</span>
              <span>ENVIO IMEDIATO</span>
              <span className="text-[#FDE047]">●</span>
              <span>PEDIDOS PELO WHATSAPP</span>
              <span className="text-[#FDE047]">●</span>
            </span>
          ))}
        </div>
      </div>

      {/* Header */}
      <header
        className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b-2 border-black"
        data-testid="site-header"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-4">
          <a href="#top" className="flex items-center gap-2" data-testid="logo-link">
            <div className="w-9 h-9 bg-black text-white flex items-center justify-center font-display text-2xl leading-none">V</div>
            <span className="font-display text-2xl md:text-3xl leading-none">{STORE_NAME.toUpperCase()}</span>
          </a>
          <button
            data-testid="header-cta-button"
            onClick={scrollToBuy}
            className="btn-brutal hidden sm:inline-flex items-center gap-2 bg-[#25D366] text-black border-2 border-black px-5 py-3 font-bold uppercase tracking-wider text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#1DA851] hover:text-white"
          >
            <ShoppingBag className="w-4 h-4" /> Comprar Agora
          </button>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="border-b-2 border-black bg-grain" data-testid="hero-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[88vh]">
          <div className="flex flex-col justify-center p-6 md:p-12 lg:p-16 border-b-2 lg:border-b-0 lg:border-r-2 border-black relative">
            <div className="flex items-center gap-3 mb-6 animate-fade-up">
              <Pill testId="hero-pill-factory"><Sparkles className="w-3 h-3" /> Direto da Fábrica</Pill>
              <Pill testId="hero-pill-shipping" className="bg-[#FDE047]"><Truck className="w-3 h-3" /> Frete Grátis +R$100</Pill>
            </div>
            <h1
              className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] leading-[0.82] uppercase animate-fade-up"
              data-testid="hero-headline"
            >
              O luxo<br />
              do <span className="bg-black text-[#FDE047] px-2">conforto</span><br />
              no seu pé.
            </h1>
            <p
              className="mt-8 text-lg md:text-xl max-w-xl text-neutral-800 animate-fade-up"
              data-testid="hero-subtext"
            >
              Chinelo Babuche EVA Embossado. Solado grosso, antiderrapante, leve como
              nuvem — pronto pra praia, casa e tudo entre elas.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-up">
              <button
                data-testid="hero-buy-button"
                onClick={scrollToBuy}
                className="btn-brutal inline-flex items-center justify-center gap-3 bg-[#25D366] text-black border-2 border-black px-8 py-5 font-bold uppercase tracking-wider text-base md:text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-[#1DA851] hover:text-white"
              >
                Quero o meu <ArrowDown className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3 bg-white border-2 border-black px-5 py-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-600">A partir de</p>
                  <p className="font-display text-3xl md:text-4xl leading-none">R$ 69,90</p>
                </div>
                <div className="h-10 w-px bg-black mx-2" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-600">2 pares</p>
                  <p className="font-display text-3xl md:text-4xl leading-none">R$ 89,90</p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-4 text-sm text-neutral-700 animate-fade-up">
              <div className="flex">
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-black text-black" />
                ))}
              </div>
              <span className="font-bold">+2.300 clientes felizes</span>
            </div>
          </div>

          <div className="relative w-full h-[60vh] lg:h-auto overflow-hidden bg-[#F0EDE7]">
            <img
              src="https://customer-assets.emergentagent.com/job_44d84243-0a37-4ed6-9aef-3d66d47ecb25/artifacts/niogyqnl_g1usgnxu3mbt603fm5h7g357t2hf_original.webp"
              alt="Chinelos EVA Embossado bege"
              className="w-full h-full object-cover"
              data-testid="hero-image"
            />
            <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-auto bg-white border-2 border-black p-4 md:p-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-sm">
              <p className="font-display text-2xl md:text-3xl leading-none uppercase">Coleção Embossed</p>
              <p className="text-sm mt-1 text-neutral-700">Textura monograma 3D · EVA premium</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT CONFIGURATOR */}
      <section id="comprar" className="py-16 md:py-24 px-4 md:px-8" data-testid="configurator-section">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px flex-1 bg-black" />
            <Pill testId="config-pill"><ShoppingBag className="w-3 h-3" /> Monte seu pedido</Pill>
            <span className="h-px flex-1 bg-black" />
          </div>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.85] uppercase text-center mb-12">
            Escolha. Pague. <br />
            <span className="bg-[#25D366] px-3 border-2 border-black inline-block">Receba.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 border-2 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden">
            {/* Gallery */}
            <div className="border-b-2 lg:border-b-0 lg:border-r-2 border-black bg-[#F4F4F4] p-6 md:p-10 flex flex-col">
              <div className="relative w-full aspect-square bg-white border-2 border-black overflow-hidden">
                <img
                  src={gallery[imageIdx] || selectedColor.studio}
                  alt={`Chinelo ${selectedColor.label}`}
                  className="w-full h-full object-cover transition-opacity duration-300"
                  data-testid="product-main-image"
                />
                <div className="absolute top-3 left-3 bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-[0.2em]">
                  {selectedColor.label}
                </div>
              </div>
              {gallery.length > 1 && (
                <div className="mt-4 grid grid-cols-4 gap-3" data-testid="thumb-row">
                  {gallery.map((src, i) => (
                    <button
                      key={i}
                      data-testid={`thumb-${i}`}
                      onClick={() => setImageIdx(i)}
                      className={`aspect-square border-2 border-black overflow-hidden transition-transform ${imageIdx === i ? "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]" : "opacity-70 hover:opacity-100"}`}
                    >
                      <img src={src} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Form side */}
            <form
              onSubmit={handleSendWhatsApp}
              className="p-6 md:p-10 flex flex-col gap-6"
              data-testid="order-form"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-600">Chinelo Babuche</p>
                <h3 className="font-display text-4xl md:text-5xl leading-none uppercase mt-1">EVA Embossado</h3>
                <div className="flex items-baseline gap-3 mt-3">
                  <p className="font-display text-4xl">{formatBRL(total)}</p>
                  {quantity >= 2 && (
                    <span className="text-sm font-bold text-[#1DA851]">Combo aplicado!</span>
                  )}
                </div>
                {freeShipping ? (
                  <p className="text-sm font-bold text-[#1DA851] mt-1 flex items-center gap-1">
                    <Check className="w-4 h-4" /> Você ganhou FRETE GRÁTIS
                  </p>
                ) : (
                  <p className="text-sm text-neutral-600 mt-1">
                    Faltam <span className="font-bold">{formatBRL(100 - total)}</span> para frete grátis.
                  </p>
                )}
              </div>

              {/* Color */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold uppercase tracking-[0.2em]">Cor</p>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-600">{selectedColor.label}</p>
                </div>
                <div className="flex gap-3" data-testid="color-picker">
                  {COLORS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      data-testid={`color-swatch-${c.id}`}
                      onClick={() => handleColorChange(c)}
                      aria-label={c.label}
                      className={`relative w-12 h-12 rounded-full border-2 border-black transition-transform hover:scale-110 ${selectedColor.id === c.id ? "shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -translate-y-0.5" : ""}`}
                      style={{ backgroundColor: c.hex }}
                    >
                      {selectedColor.id === c.id && (
                        <Check className="w-5 h-5 text-black absolute inset-0 m-auto" strokeWidth={3} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3">Tamanho</p>
                <div className="grid grid-cols-3 gap-3" data-testid="size-picker">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      data-testid={`size-option-${s}`}
                      onClick={() => setSelectedSize(s)}
                      className={`border-2 border-black py-3 font-bold tracking-wider transition-all ${selectedSize === s ? "bg-black text-white" : "bg-white hover:bg-neutral-100"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3">Quantidade</p>
                <div className="flex items-center gap-3" data-testid="quantity-picker">
                  <button
                    type="button"
                    data-testid="qty-minus"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-12 h-12 border-2 border-black bg-white hover:bg-neutral-100 flex items-center justify-center"
                    aria-label="Diminuir"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div
                    className="w-16 h-12 border-2 border-black flex items-center justify-center font-display text-2xl bg-white"
                    data-testid="qty-display"
                  >
                    {quantity}
                  </div>
                  <button
                    type="button"
                    data-testid="qty-plus"
                    onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                    className="w-12 h-12 border-2 border-black bg-white hover:bg-neutral-100 flex items-center justify-center"
                    aria-label="Aumentar"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <span className="text-sm text-neutral-600 ml-2">
                    {quantity === 1 && "1 par = R$ 69,90"}
                    {quantity === 2 && "2 pares = R$ 89,90 🔥"}
                    {quantity > 2 && `+ R$ 44,95/par extra`}
                  </span>
                </div>
              </div>

              {/* Customer details */}
              <div className="grid grid-cols-1 gap-3 pt-2 border-t-2 border-black">
                <p className="text-xs font-bold uppercase tracking-[0.2em] mt-4">Seus dados</p>
                <input
                  type="text"
                  placeholder="Nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  data-testid="input-name"
                  className="border-2 border-black bg-white px-4 py-4 text-base focus:outline-none focus:bg-[#FDFBF7] placeholder:text-neutral-500 rounded-none"
                />
                <textarea
                  rows={3}
                  placeholder="Endereço completo (rua, nº, bairro, cidade/UF, CEP)"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  data-testid="input-address"
                  className="border-2 border-black bg-white px-4 py-4 text-base focus:outline-none focus:bg-[#FDFBF7] placeholder:text-neutral-500 rounded-none resize-none"
                />

                <p className="text-xs font-bold uppercase tracking-[0.2em] mt-2">Forma de pagamento</p>
                <div className="grid grid-cols-2 gap-3" data-testid="payment-picker">
                  <button
                    type="button"
                    data-testid="payment-pix"
                    onClick={() => setPayment("pix")}
                    className={`flex items-center justify-center gap-2 border-2 border-black py-3 font-bold uppercase tracking-wider ${payment === "pix" ? "bg-black text-white" : "bg-white hover:bg-neutral-100"}`}
                  >
                    <Sparkles className="w-4 h-4" /> PIX
                  </button>
                  <button
                    type="button"
                    data-testid="payment-card"
                    onClick={() => setPayment("cartao")}
                    className={`flex items-center justify-center gap-2 border-2 border-black py-3 font-bold uppercase tracking-wider ${payment === "cartao" ? "bg-black text-white" : "bg-white hover:bg-neutral-100"}`}
                  >
                    <CreditCard className="w-4 h-4" /> Cartão
                  </button>
                </div>
              </div>

              <button
                type="submit"
                data-testid="send-whatsapp-button"
                className="btn-brutal bg-[#25D366] text-black hover:bg-[#1DA851] hover:text-white border-2 border-black px-6 py-5 font-bold uppercase tracking-wider text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-3 w-full mt-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-6 h-6 fill-current">
                  <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 01-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 01-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.612 3.41 4.554 4.34.515.246 1.39.687 1.963.687.272 0 .487-.018.659-.052.831-.167 1.946-.928 2.149-1.747.046-.224.046-.31.046-.5.045-.244-.057-.466-.243-.61z"/>
                  <path d="M16.135 0C7.235 0 0 7.235 0 16.135c0 2.808.748 5.612 2.18 8.04L.244 31.61c-.157.575.39 1.09.957.92l7.745-2.05a16.06 16.06 0 007.19 1.72c8.9 0 16.135-7.235 16.135-16.135S25.035 0 16.135 0zm9.51 22.515a4.748 4.748 0 01-3.337 2.305c-.872.115-2.034.13-3.265-.215a25.34 25.34 0 01-2.92-1.075c-4.825-2.105-7.93-7.04-8.16-7.36-.243-.343-1.962-2.65-1.962-5.06s1.246-3.564 1.69-4.063a1.83 1.83 0 011.318-.6c.33 0 .658 0 .945.015.314.014.73-.115 1.146.872.43 1.018 1.46 3.51 1.59 3.766.13.243.215.53.04.86-.157.343-.243.544-.487.832-.243.286-.515.63-.73.844-.243.244-.5.516-.215 1.018.286.515 1.247 2.064 2.679 3.337 1.846 1.646 3.4 2.165 3.9 2.408.488.243.788.214 1.075-.115.286-.343 1.246-1.45 1.575-1.95.33-.5.659-.413 1.117-.243.458.157 2.92 1.375 3.41 1.633.5.243.831.36.946.55.114.215.114 1.247-.258 2.494z"/>
                </svg>
                Enviar pedido pelo WhatsApp
              </button>
              <p className="text-xs text-center text-neutral-500">
                Você será redirecionado ao WhatsApp da loja com sua mensagem pronta.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* BENEFITS BENTO */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-t-2 border-black bg-grain" data-testid="benefits-section">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.85] uppercase">
              Por que <br />é o melhor?
            </h2>
            <p className="max-w-md text-neutral-700 text-lg">
              Cada par é projetado para entregar conforto absoluto. Sem mistério, sem firula.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-black text-white border-2 border-black p-8 md:p-10 flex flex-col justify-between min-h-[280px]" data-testid="benefit-solado">
              <Waves className="w-10 h-10" />
              <div>
                <h3 className="font-display text-4xl md:text-5xl leading-none uppercase">Solado Grosso</h3>
                <p className="mt-3 text-neutral-300">Amortecimento real para o pé descansar. Cada passo vira nuvem.</p>
              </div>
            </div>

            <div className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] min-h-[280px] flex flex-col justify-between" data-testid="benefit-antiderrapante">
              <ShieldCheck className="w-10 h-10" />
              <div>
                <h3 className="font-display text-3xl md:text-4xl leading-none uppercase">Antiderrapante</h3>
                <p className="mt-3 text-neutral-700">Tração de verdade em piso molhado. Banheiro, beira da piscina, no jato.</p>
              </div>
            </div>

            <div className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] min-h-[280px] flex flex-col justify-between" data-testid="benefit-leveza">
              <Sparkles className="w-10 h-10" />
              <div>
                <h3 className="font-display text-3xl md:text-4xl leading-none uppercase">EVA Premium</h3>
                <p className="mt-3 text-neutral-700">Leveza absoluta. Pesa menos que sua bermuda preferida.</p>
              </div>
            </div>

            <div className="md:col-span-2 bg-[#FDE047] border-2 border-black p-8 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] min-h-[280px] flex flex-col justify-between" data-testid="benefit-praia-casa">
              <Truck className="w-10 h-10" />
              <div>
                <h3 className="font-display text-4xl md:text-5xl leading-none uppercase">Praia e Casa</h3>
                <p className="mt-3 text-neutral-900">Da areia ao tapete da sala — um chinelo, todos os cenários. Frete grátis acima de R$ 100.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-black text-white py-20 md:py-28 px-4 md:px-8 border-y-2 border-black" data-testid="testimonials-section">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px flex-1 bg-white/30" />
            <Pill testId="testi-pill" className="bg-[#FDE047] border-[#FDE047]">Aprovado</Pill>
            <span className="h-px flex-1 bg-white/30" />
          </div>
          <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.85] mb-12 text-center">
            O que dizem<br />
            <span className="text-[#FDE047]">nossos clientes</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="bg-[#FDFBF7] text-black border-2 border-[#FDE047] p-6 md:p-8 shadow-[8px_8px_0px_0px_#FDE047]"
                data-testid={`testimonial-${i}`}
              >
                <div className="flex mb-4">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-black text-black" />
                  ))}
                </div>
                <p className="text-base md:text-lg leading-relaxed">"{t.text}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-black object-cover" />
                  <div>
                    <p className="font-bold">{t.name}</p>
                    <p className="text-xs text-neutral-600 uppercase tracking-wider">{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="py-16 md:py-20 px-4 md:px-8 border-b-2 border-black" data-testid="guarantee-section">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-2 bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <ShieldCheck className="w-10 h-10" />
            <h3 className="font-display text-3xl md:text-4xl uppercase mt-4">Garantia da Fábrica</h3>
            <p className="mt-3 text-neutral-700">Recebeu e não amou? Devolução simples em até 7 dias. Sem letrinha miúda, sem enrolação.</p>
          </div>
          <div className="bg-[#25D366] text-black border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <Truck className="w-10 h-10" />
            <h3 className="font-display text-2xl uppercase mt-4">Frete Grátis</h3>
            <p className="mt-2 text-sm font-bold">Em pedidos acima de R$ 100,00 para todo o Brasil.</p>
          </div>
          <div className="bg-black text-white border-2 border-black p-8">
            <CreditCard className="w-10 h-10" />
            <h3 className="font-display text-2xl uppercase mt-4">PIX ou Cartão</h3>
            <p className="mt-2 text-sm text-neutral-300">Pagamento simples e seguro confirmado pelo WhatsApp.</p>
          </div>
        </div>
      </section>

      {/* APP SECTION — QR Code */}
      <section className="bg-black text-white border-b-2 border-black py-20 md:py-28 px-4 md:px-8 relative overflow-hidden" data-testid="app-section">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage: 'radial-gradient(circle, #25D366 1px, transparent 1px)', backgroundSize: '24px 24px'}} />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center relative">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#25D366] text-black border-2 border-[#25D366] px-3 py-1 text-xs font-bold uppercase tracking-[0.2em]">
              <Smartphone className="w-3 h-3" /> Novidade
            </div>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.85] mt-5">
              Você também<br />
              pode fazer<br />
              o pedido pelo<br />
              <span className="bg-[#25D366] text-black px-3 inline-block">nosso app</span>
            </h2>
            <p className="mt-6 text-lg md:text-xl text-neutral-300 max-w-lg">
              Baixe gratuitamente, faça seus pedidos em segundos e acompanhe entregas direto do celular.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="https://play.google.com/store/apps/details?id=br.gotaxi.app"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="app-playstore-button"
                className="btn-brutal inline-flex items-center gap-3 bg-[#25D366] text-black hover:bg-[#1DA851] hover:text-white border-2 border-[#25D366] px-6 py-4 font-bold uppercase tracking-wider text-sm shadow-[6px_6px_0px_0px_#FDE047]"
              >
                <Download className="w-5 h-5" /> Baixar na Play Store
              </a>
              <div className="flex items-center gap-3 border-2 border-white/30 px-4 py-3">
                <Smartphone className="w-5 h-5 text-[#FDE047]" />
                <p className="text-sm">
                  <span className="text-[#FDE047] font-bold uppercase tracking-wider">Aponte a câmera</span><br />
                  <span className="text-neutral-400 text-xs">e escaneie o QR ao lado</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-3 bg-[#25D366] -z-0" />
              <div className="relative bg-white border-2 border-black p-4 md:p-6 shadow-[12px_12px_0px_0px_#FDE047]">
                <img
                  src="https://customer-assets.emergentagent.com/job_chinelo-atacado/artifacts/qzw254y8_qrcode-play.png"
                  alt="QR Code para baixar o app na Play Store"
                  className="w-64 h-64 md:w-80 md:h-80 object-contain block"
                  data-testid="app-qrcode"
                />
                <p className="mt-3 text-center text-black font-bold uppercase tracking-[0.2em] text-xs border-t-2 border-black pt-3">
                  Aponte • Escaneie • Baixe
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 px-4 md:px-8" data-testid="faq-section">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-5xl md:text-7xl uppercase leading-[0.85] mb-10">
            Dúvidas <br />frequentes
          </h2>
          <Accordion type="single" collapsible className="w-full" data-testid="faq-accordion">
            <AccordionItem value="q1" className="border-b-2 border-black">
              <AccordionTrigger className="text-left text-lg md:text-xl font-bold py-6 hover:no-underline" data-testid="faq-q1">
                Como funciona o pedido pelo WhatsApp?
              </AccordionTrigger>
              <AccordionContent className="text-base text-neutral-700 pb-6">
                Você escolhe cor, tamanho e quantidade aqui no site, preenche seus dados e o
                botão abre seu WhatsApp com a mensagem pronta. A loja confirma estoque, frete e
                envia o link de pagamento (PIX ou cartão).
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2" className="border-b-2 border-black">
              <AccordionTrigger className="text-left text-lg md:text-xl font-bold py-6 hover:no-underline" data-testid="faq-q2">
                Quanto tempo demora a entrega?
              </AccordionTrigger>
              <AccordionContent className="text-base text-neutral-700 pb-6">
                Despacho em até 24h úteis após confirmação do pagamento. Prazo de 3 a 8 dias úteis
                conforme sua região.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3" className="border-b-2 border-black">
              <AccordionTrigger className="text-left text-lg md:text-xl font-bold py-6 hover:no-underline" data-testid="faq-q3">
                Quando o frete é grátis?
              </AccordionTrigger>
              <AccordionContent className="text-base text-neutral-700 pb-6">
                Em pedidos acima de R$ 100,00 (basta levar 2 pares 🤝). Abaixo disso, o frete é
                calculado pelo CEP no WhatsApp.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q4" className="border-b-2 border-black">
              <AccordionTrigger className="text-left text-lg md:text-xl font-bold py-6 hover:no-underline" data-testid="faq-q4">
                Posso comprar atacado / revender?
              </AccordionTrigger>
              <AccordionContent className="text-base text-neutral-700 pb-6">
                Sim! Trabalhamos direto da fábrica. Para pedidos acima de 10 pares, fale no
                WhatsApp para condições especiais.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q5" className="border-b-2 border-black">
              <AccordionTrigger className="text-left text-lg md:text-xl font-bold py-6 hover:no-underline" data-testid="faq-q5">
                Tem garantia de troca?
              </AccordionTrigger>
              <AccordionContent className="text-base text-neutral-700 pb-6">
                Sim. Você tem 7 dias após o recebimento para solicitar troca ou devolução,
                conforme o Código de Defesa do Consumidor.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-[#FDE047] border-y-2 border-black py-20 md:py-28 px-4 md:px-8" data-testid="about-section">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <Pill testId="about-pill" className="bg-white">Sobre a loja</Pill>
            <h2 className="font-display text-5xl md:text-7xl uppercase mt-4 leading-[0.85]">
              {STORE_NAME}.<br /> Direto pra você.
            </h2>
            <p className="mt-6 text-base md:text-lg text-neutral-900 max-w-xl">
              Somos a {STORE_NAME} — uma loja online que conecta a fábrica ao seu pé sem
              intermediários. Menos custo, mais conforto, atendimento humano via WhatsApp e
              produtos que aguentam a rotina brasileira.
            </p>
            <p className="mt-4 font-bold uppercase tracking-[0.2em] text-sm">{STORE_URL}</p>
          </div>
          <div className="bg-black text-[#FDE047] border-2 border-black p-8 md:p-10 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
            <Phone className="w-10 h-10" />
            <p className="font-display text-3xl md:text-4xl uppercase mt-4 leading-none text-white">
              Fale com a loja
            </p>
            <p className="mt-3 text-neutral-300">Atendimento rápido pelo WhatsApp oficial.</p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Tenho uma dúvida sobre os chinelos EVA.")}`}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="about-whatsapp-link"
              className="btn-brutal mt-6 inline-flex items-center gap-3 bg-[#25D366] text-black border-2 border-[#FDE047] px-6 py-4 font-bold uppercase tracking-wider text-sm shadow-[6px_6px_0px_0px_#FDE047]"
            >
              (11) 94237-7344
            </a>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 md:py-28 px-4 md:px-8 text-center" data-testid="final-cta-section">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-6xl md:text-8xl lg:text-9xl uppercase leading-[0.82]">
            Não fica<br />
            <span className="bg-black text-[#FDE047] px-3 inline-block">pisando feio.</span>
          </h2>
          <p className="mt-6 text-lg text-neutral-700">Garanta o seu agora. Estoque limitado da coleção embossed.</p>
          <button
            data-testid="final-cta-button"
            onClick={scrollToBuy}
            className="btn-brutal mt-8 inline-flex items-center gap-3 bg-[#25D366] text-black hover:bg-[#1DA851] hover:text-white border-2 border-black px-10 py-6 font-bold uppercase tracking-wider text-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            <ShoppingBag className="w-5 h-5" /> Comprar agora
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-[#FDFBF7] py-16 px-4 md:px-8 border-t-2 border-black" data-testid="site-footer">
        <div className="max-w-7xl mx-auto">
          <p className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.85] uppercase break-words">
            {STORE_NAME}.
          </p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="text-[#FDE047] font-bold uppercase tracking-[0.2em] mb-2">Loja</p>
              <p className="text-neutral-300">{STORE_URL}</p>
              <p className="text-neutral-300 mt-1">Atendimento via WhatsApp</p>
            </div>
            <div>
              <p className="text-[#FDE047] font-bold uppercase tracking-[0.2em] mb-2">Contato</p>
              <p className="text-neutral-300 flex items-center gap-2"><Phone className="w-4 h-4" /> (11) 94237-7344</p>
              <p className="text-neutral-300 flex items-center gap-2 mt-1"><MapPin className="w-4 h-4" /> Brasil</p>
            </div>
            <div>
              <p className="text-[#FDE047] font-bold uppercase tracking-[0.2em] mb-2">Produto</p>
              <p className="text-neutral-300">Chinelo Babuche EVA Embossado</p>
              <p className="text-neutral-300 mt-1">Tamanhos 35-36, 37-38, 39-40</p>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-neutral-800 flex items-center justify-between flex-wrap gap-3 text-xs text-neutral-500">
            <p>© {new Date().getFullYear()} {STORE_NAME}. Todos os direitos reservados.</p>
            <p className="uppercase tracking-[0.2em]">Direto da fábrica</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
