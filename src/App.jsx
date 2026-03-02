import { useMemo, useState } from 'react'
import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  BadgePercent,
  Boxes,
  Factory,
  Handshake,
  Instagram,
  Leaf,
  MapPin,
  Megaphone,
  PackageCheck,
  PhoneCall,
  Store,
  TrendingUp,
} from 'lucide-react'
import { SectionReveal } from './components/SectionReveal'
import { flavors, instagramImages } from './data/flavors'

const WHATSAPP_LINK =
  'https://wa.me/5511974884319?text=Olá!+Vi+a+Landing+Page+da+Caseirices+e+gostaria+de+receber+a+tabela+de+preços+para+revenda.'
const INSTAGRAM_LINK = 'https://www.instagram.com/caseiricesjundiai/'

const benefits = [
  {
    icon: BadgePercent,
    title: 'Margem de Lucro Alta',
    text: 'Produtos premium com posicionamento de valor que sustenta precificacao forte na gôndola.',
  },
  {
    icon: TrendingUp,
    title: 'Giro Rápido de Estoque',
    text: 'Mix de 16 sabores com recompra recorrente e alta aceitacao entre consumidores exigentes.',
  },
  {
    icon: Leaf,
    title: 'Qualidade 100% Natural',
    text: 'Sem conservantes, sabor caseiro premium e padrao de producao com controle rigoroso.',
  },
  {
    icon: Handshake,
    title: 'Producao em Jundiai + Suporte',
    text: 'Atendimento direto com material comercial pronto para acelerar sell-out no PDV.',
  },
]

const supportItems = [
  {
    icon: Store,
    title: 'Kit PDV de conversao',
    text: 'Wobblers, tags de gôndola e materiais de destaque para ponto quente.',
  },
  {
    icon: Megaphone,
    title: 'Conteudo pronto para redes',
    text: 'Pacotes de fotos e posts prontos para supermercados, emporios e restaurantes.',
  },
  {
    icon: PackageCheck,
    title: 'Campanhas conjuntas',
    text: 'Acoes promocionais para aumentar giro e fortalecer marca local premium.',
  },
]

function formatMoney(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0)
}

function App() {
  const shouldReduceMotion = useReducedMotion()
  const MotionAnchor = m.a
  const MotionDiv = m.div
  const MotionArticle = m.article
  const [boxesPerWeek, setBoxesPerWeek] = useState(10)
  const [unitMargin, setUnitMargin] = useState(7)
  const [firstOrder, setFirstOrder] = useState(2800)

  const metrics = useMemo(() => {
    const unitsPerBox = 12
    const monthlyProfit = boxesPerWeek * unitsPerBox * unitMargin * 4.33
    const paybackMonths = firstOrder > 0 ? firstOrder / monthlyProfit : 0
    const annualRoi = firstOrder > 0 ? ((monthlyProfit * 12 - firstOrder) / firstOrder) * 100 : 0

    return {
      monthlyProfit,
      paybackMonths,
      annualRoi,
    }
  }, [boxesPerWeek, unitMargin, firstOrder])

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-brand-cream text-brand-ink antialiased">
      <main className="pb-28">
        <SectionReveal className="relative overflow-hidden border-b border-brand-earth/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(178,34,34,0.12),transparent_55%)]" />
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-20">
            <div className="relative z-10">
              <span className="mb-5 inline-flex items-center gap-2 border border-brand-green/40 bg-brand-green/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
                Revenda B2B em Jundiai e Regiao
              </span>
              <h1 className="text-balance font-display text-3xl leading-tight text-brand-wine sm:text-4xl lg:text-5xl">
                Leve o Sabor Artesanal Autentico de Jundiai para sua Prateleira
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-base text-brand-ink/85 sm:text-lg">
                Molhos 100% naturais, 16 sabores, margem premium e giro garantido. Nao ter
                Caseirices na prateleira significa cliente insatisfeito e venda perdida para a
                concorrencia.
              </p>
              <MotionAnchor
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                className="mt-7 inline-flex w-full items-center justify-center gap-2 border border-brand-red-dark bg-brand-red px-5 py-4 text-center text-sm font-bold uppercase tracking-[0.06em] text-white shadow-[0_12px_30px_rgba(139,0,0,0.28)] transition hover:bg-brand-red-dark sm:w-auto"
              >
                Quero Tabela de Atacado e Condicoes de Revenda
                <ArrowRight className="h-4 w-4" />
              </MotionAnchor>
              <div className="mt-7 flex flex-wrap gap-5 text-sm font-medium text-brand-ink/85">
                <div className="inline-flex items-center gap-2">
                  <Factory className="h-4 w-4 text-brand-green" />
                  Producao propria desde 2017
                </div>
                <div className="inline-flex items-center gap-2">
                  <Boxes className="h-4 w-4 text-brand-green" />
                  Mix com 16 sabores
                </div>
              </div>
            </div>
            <MotionDiv
              initial={shouldReduceMotion ? false : { opacity: 0, x: 40 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
              transition={shouldReduceMotion ? undefined : { duration: 0.7, ease: 'easeOut' }}
              className="relative z-10 border border-brand-earth/40 bg-white p-3 shadow-[0_25px_50px_rgba(55,27,16,0.16)]"
            >
              <img
                src="/assets/brand/hero-production.svg"
                alt="Linha de frascos Caseirices em ambiente de producao artesanal"
                className="h-full w-full object-cover"
              />
            </MotionDiv>
          </div>
        </SectionReveal>

        <SectionReveal className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="font-display text-2xl text-brand-wine sm:text-3xl">Beneficios B2B</h2>
            <span className="hidden text-sm font-semibold uppercase tracking-[0.14em] text-brand-green sm:block">
              parceria que gera lucro
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((item) => {
              const IconComponent = item.icon

              return (
                <article
                  key={item.title}
                  className="border border-brand-earth/35 bg-white p-5 shadow-[0_10px_25px_rgba(55,27,16,0.08)]"
                >
                  <IconComponent className="h-6 w-6 text-brand-green" />
                  <h3 className="mt-4 font-display text-xl text-brand-wine">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-ink/85">{item.text}</p>
                </article>
              )
            })}
          </div>
        </SectionReveal>

        <SectionReveal className="border-y border-brand-earth/20 bg-white/70 py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
            <h2 className="font-display text-2xl text-brand-wine sm:text-3xl">Vitrine de Produtos</h2>
            <p className="mt-2 max-w-3xl text-sm text-brand-ink/80 sm:text-base">
              Linha completa com 16 sabores para ampliar sortimento, elevar ticket medio e manter
              consistencia visual premium no ponto de venda.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {flavors.map((item, index) => (
                <MotionArticle
                  key={item.name}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={
                    shouldReduceMotion
                      ? undefined
                      : { duration: 0.4, ease: 'easeOut', delay: index * 0.02 }
                  }
                  whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                  className="group border border-brand-earth/30 bg-brand-cream p-3 shadow-[0_8px_22px_rgba(55,27,16,0.06)]"
                >
                  <div className="aspect-[4/5] overflow-hidden border border-brand-earth/25 bg-white">
                    <img
                      src={item.image}
                      alt={`Frasco do sabor ${item.name} da Caseirices`}
                      className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.02]"
                      onError={(event) => {
                        if (item.fallbackImage) {
                          event.currentTarget.onerror = null
                          event.currentTarget.src = item.fallbackImage
                        }
                      }}
                    />
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-brand-wine sm:text-base">{item.name}</h3>
                  <p className="mt-1 text-xs text-brand-ink/80 sm:text-sm">{item.profile}</p>
                </MotionArticle>
              ))}
            </div>
          </div>
        </SectionReveal>

        <SectionReveal className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-10 lg:py-20">
          <article className="border border-brand-earth/35 bg-white p-6 shadow-[0_12px_30px_rgba(55,27,16,0.1)] sm:p-8">
            <h2 className="font-display text-2xl text-brand-wine sm:text-3xl">Por que Caseirices?</h2>
            <p className="mt-4 text-sm leading-relaxed text-brand-ink/85 sm:text-base">
              Desde 2017, dois amigos transformaram receitas artesanais em uma operacao local
              premium com loja-fabrica propria em Jundiai. Isso garante padrao, rastreabilidade e
              velocidade para atender supermercados, emporios gourmet, restaurantes, hoteis e pontos
              de venda especializados.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-brand-ink/85 sm:text-base">
              Com logistica eficiente e suporte comercial proximo, sua equipe recebe orientacao para
              acelerar entrada, exposicao e recompra. Parceria de verdade: produto forte + estrategia
              de sell-out.
            </p>
          </article>

          <article className="border border-brand-earth/35 bg-brand-wine p-6 text-brand-cream shadow-[0_12px_30px_rgba(55,27,16,0.16)] sm:p-8">
            <h2 className="font-display text-2xl sm:text-3xl">Simulador de Retorno</h2>
            <p className="mt-3 text-sm text-brand-cream/90 sm:text-base">
              Projete o potencial da sua operacao com revenda Caseirices.
            </p>

            <div className="mt-6 space-y-4">
              <label className="block text-sm font-semibold">
                Caixas por semana
                <input
                  type="number"
                  min="1"
                  value={boxesPerWeek}
                  onChange={(event) => setBoxesPerWeek(Number(event.target.value) || 0)}
                  className="mt-1 w-full border border-brand-cream/35 bg-brand-wine-dark px-3 py-2 text-brand-cream outline-none transition focus:border-brand-green"
                />
              </label>
              <label className="block text-sm font-semibold">
                Margem unitaria media (R$)
                <input
                  type="number"
                  min="1"
                  value={unitMargin}
                  onChange={(event) => setUnitMargin(Number(event.target.value) || 0)}
                  className="mt-1 w-full border border-brand-cream/35 bg-brand-wine-dark px-3 py-2 text-brand-cream outline-none transition focus:border-brand-green"
                />
              </label>
              <label className="block text-sm font-semibold">
                Valor do 1º pedido (R$)
                <input
                  type="number"
                  min="1"
                  value={firstOrder}
                  onChange={(event) => setFirstOrder(Number(event.target.value) || 0)}
                  className="mt-1 w-full border border-brand-cream/35 bg-brand-wine-dark px-3 py-2 text-brand-cream outline-none transition focus:border-brand-green"
                />
              </label>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="border border-brand-cream/35 bg-brand-wine-dark p-3">
                <p className="text-xs uppercase tracking-[0.08em] text-brand-cream/80">Lucro mensal</p>
                <p className="mt-1 font-display text-xl text-brand-green">{formatMoney(metrics.monthlyProfit)}</p>
              </div>
              <div className="border border-brand-cream/35 bg-brand-wine-dark p-3">
                <p className="text-xs uppercase tracking-[0.08em] text-brand-cream/80">Payback</p>
                <p className="mt-1 font-display text-xl text-brand-green">
                  {Number.isFinite(metrics.paybackMonths) ? `${metrics.paybackMonths.toFixed(1)} meses` : '-'}
                </p>
              </div>
              <div className="border border-brand-cream/35 bg-brand-wine-dark p-3">
                <p className="text-xs uppercase tracking-[0.08em] text-brand-cream/80">ROI anual</p>
                <p className="mt-1 font-display text-xl text-brand-green">{metrics.annualRoi.toFixed(0)}%</p>
              </div>
            </div>
          </article>
        </SectionReveal>

        <SectionReveal className="border-y border-brand-earth/20 bg-white/70 py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
            <h2 className="font-display text-2xl text-brand-wine sm:text-3xl">
              Materiais de Apoio para Revendedores
            </h2>
            <p className="mt-2 max-w-3xl text-sm text-brand-ink/80 sm:text-base">
              Estrutura pronta para acelerar sua venda desde a primeira semana.
            </p>
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {supportItems.map((item) => {
                const IconComponent = item.icon

                return (
                  <article key={item.title} className="border border-brand-earth/35 bg-white p-5">
                    <IconComponent className="h-6 w-6 text-brand-green" />
                    <h3 className="mt-4 font-display text-xl text-brand-wine">{item.title}</h3>
                    <p className="mt-2 text-sm text-brand-ink/85">{item.text}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </SectionReveal>

        <SectionReveal className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl text-brand-wine sm:text-3xl">Instagram da Marca</h2>
              <p className="mt-2 text-sm text-brand-ink/80 sm:text-base">
                Conteudo visual da producao e dos produtos da @caseiricesjundiai.
              </p>
            </div>
            <a
              href={INSTAGRAM_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green transition hover:text-brand-wine"
            >
              <Instagram className="h-4 w-4" /> @caseiricesjundiai
            </a>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {instagramImages.map((image, index) => (
              <MotionAnchor
                key={image}
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noreferrer"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={shouldReduceMotion ? undefined : { duration: 0.35, delay: index * 0.04 }}
                className="aspect-square overflow-hidden border border-brand-earth/35 bg-white"
              >
                <img
                  src={image}
                  alt={`Publicacao ${index + 1} do Instagram da Caseirices`}
                  className="h-full w-full object-cover"
                />
              </MotionAnchor>
            ))}
          </div>
        </SectionReveal>
      </main>

      <footer className="border-t border-brand-earth/25 bg-brand-wine px-4 py-8 text-brand-cream sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h3 className="font-display text-2xl">Caseirices Molhos Artesanais</h3>
            <p className="mt-3 text-sm leading-relaxed text-brand-cream/90">
              Rua Atilio Vianello, 409 - Vila Vianelo, Jundiai - SP, CEP 13207-130
            </p>
            <p className="mt-1 text-sm text-brand-cream/90">CNPJ: 28.150.452/0001-79</p>
          </div>
          <div className="flex flex-col gap-2 text-sm font-medium">
            <a
              href={INSTAGRAM_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 transition hover:text-brand-green"
            >
              <Instagram className="h-4 w-4" /> Instagram oficial
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 transition hover:text-brand-green"
            >
              <PhoneCall className="h-4 w-4" /> WhatsApp comercial
            </a>
            <span className="inline-flex items-center gap-2 text-brand-cream/80">
              <MapPin className="h-4 w-4" /> Jundiai-SP
            </span>
          </div>
        </div>
      </footer>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-4 pb-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="pointer-events-auto mx-auto w-full border border-brand-red-dark bg-brand-red p-3 text-center text-white shadow-[0_16px_40px_rgba(139,0,0,0.4)] lg:ml-auto lg:mr-0 lg:max-w-md">
            <p className="text-xs font-semibold uppercase tracking-[0.09em] text-white/85">
              Revenda Caseirices
            </p>
            <MotionAnchor
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 border border-white/35 bg-brand-red-dark px-4 py-3 text-sm font-bold uppercase tracking-[0.06em] text-white transition hover:bg-[#6c1010]"
            >
              Quero tabela e condicoes
              <ArrowRight className="h-4 w-4" />
            </MotionAnchor>
          </div>
        </div>
      </div>
      </div>
    </LazyMotion>
  )
}

export default App
