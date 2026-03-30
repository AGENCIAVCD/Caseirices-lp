import { useEffect, useMemo, useState } from 'react'
import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  ChevronDown,
  Clock3,
  ExternalLink,
  Globe,
  Instagram,
  Leaf,
  MapPin,
  Navigation,
  Play,
  PhoneCall,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  X,
} from 'lucide-react'
import { SectionReveal } from './components/SectionReveal'
import { SequenceScroll } from './components/SequenceScroll'
import { flavors } from './data/flavors'

const SITE_LINK = 'https://caseirices.com.br'
const WHATSAPP_RESELLER_LINK =
  'https://wa.me/5511974884319?text=Olá!+Vi+a+Landing+Page+da+Caseirices+e+gostaria+de+receber+a+tabela+de+preços+para+revenda.'
const WHATSAPP_DISCOVERY_LINK =
  'https://api.whatsapp.com/send?phone=5511974884319&text=Eu%20gostaria%20de%20conhecer%20os%20produtos%20Caseirices'
const INSTAGRAM_LINK = 'https://www.instagram.com/caseiricesjundiai/'
const HERO_VIDEO_SRC = '/assets/hero/caseirices-hero-mar30.mp4'
const HERO_VIDEO_POSTER = '/assets/hero/caseirices-hero-mar30-poster.jpg'
const ELFSIGHT_SCRIPT_SRC = 'https://elfsightcdn.com/platform.js'
const ELFSIGHT_APP_CLASS = 'elfsight-app-3310dd00-0ae8-46b5-8738-849863f78bd5'
const MEDIA_FEATURES = [
  {
    eyebrow: 'YouTube',
    title: 'Rádio Bandeirantes',
    text: 'Participação no programa "Unidos pelo Pequeno, com Dennys Motta", exibido em 20 de dezembro de 2025.',
    href: 'https://www.youtube.com/live/2DBA4n1vT00?si=vxUbVqKhP_Wx9M-2',
    cta: 'Assistir participação',
    imageSrc: '/assets/media/radio-bandeirantes.png',
    imageAlt: 'Participação da Caseirices no programa Unidos pelo Pequeno, da Rádio Bandeirantes.',
    imageClassName: 'object-cover object-center',
  },
  {
    eyebrow: 'Instagram',
    title: 'Publicação especial da marca',
    text: 'Conteúdo no Instagram mostrando a presença da Caseirices, seus produtos e o universo artesanal da marca.',
    href: 'https://www.instagram.com/p/DPhl_mviWTy/?igsh=MTJpY204YzBtZjE3aw==',
    cta: 'Ver publicação',
    imageSrc: '/assets/media/folha-jundiaiense.jpeg',
    imageAlt: 'Imagem da Folha Jundiaiense com Fabio Kuhlmann e os molhos Caseirices.',
    imageClassName: 'object-cover object-top',
  },
]

const brandPillars = [
  {
    icon: Leaf,
    eyebrow: 'Ingredientes naturais',
    title: 'O molho que nasce do ingrediente, não do discurso.',
    text: 'Tomates maduros, colhidos pelas mãos da agricultura familiar, entram numa receita sem corantes, sem conservantes e sem gordura.',
  },
  {
    icon: Sparkles,
    eyebrow: 'Cozinha afetiva',
    title: 'Tradição em cada colher.',
    text: 'Produtos artesanais inspirados na cozinha tradicional, com o sabor caseiro de verdade e a praticidade de um molho pronto para a mesa.',
  },
  {
    icon: Clock3,
    eyebrow: 'Assinatura artesanal',
    title: 'Porque o melhor leva tempo.',
    text: 'Camadas de sabor construídas com fogo controlado, produção autoral e cuidado gastronômico em toda a cadeia.',
  },
]

const essentialItems = [
  {
    eyebrow: 'Só o Essencial',
    title: 'Tomate no auge',
    text: 'Tomate 100% natural, com sabor do próprio fruto e acidez equilibrada para um molho que nasce do ingrediente real.',
  },
  {
    eyebrow: 'Só o Essencial',
    title: 'Manjericão fresco',
    text: 'Um bouquet perfumado, verde e limpo, que levanta o molho sem roubar a cena do tomate.',
  },
  {
    eyebrow: 'Só o Essencial',
    title: 'Amor e tempo',
    text: 'Sabores construídos devagar, com memória de receita de família e respeito ao ponto certo de cada ingrediente.',
  },
  {
    eyebrow: 'Só o Essencial',
    title: 'Leveza e pureza',
    text: 'Receita sem óleo, com textura natural, sabor equilibrado e ingredientes frescos para uma escolha mais saudável.',
  },
]

const experienceMoments = [
  {
    title: 'Sabor que transforma qualquer receita',
    text: 'Das massas secas às recheadas, puro ou como base para diferentes preparos, Caseirices vai bem com tudo.',
  },
  {
    title: 'A cozinha de casa com toques de restaurante',
    text: 'Um molho pronto que sustenta pratos simples com presença, profundidade e textura natural.',
  },
  {
    title: 'Pronto para momentos especiais',
    text: 'Receber, cozinhar e servir fica mais fácil quando o ingrediente principal entrega verdade no paladar.',
  },
]

const greenSectionPoints = [
  {
    icon: Leaf,
    title: 'Tomate maduro e ingrediente real',
    text: 'Sabor do próprio fruto, acidez equilibrada e uma receita que começa na escolha certa do tomate.',
  },
  {
    icon: Sparkles,
    title: 'Sem excesso, sem artifício',
    text: 'Sem corantes. Sem conservantes. Sem gordura. Só o essencial para o molho ter identidade de verdade.',
  },
  {
    icon: ShieldCheck,
    title: 'Produção autoral com controle',
    text: 'Cozinha real, cuidado gastronômico e segurança alimentar para sustentar um produto premium.',
  },
]

const commercialArguments = [
  'Um produto incrível e exclusivo para sua prateleira.',
  'Diferente de qualquer outro tipo de molho de tomate.',
  'O produto que realmente faz a diferença para o consumidor exigente.',
  'Molho artesanal com história, qualidade e verdade.',
  '16 sabores, dos clássicos aos criativos.',
]

const videoTestimonials = [
  {
    title: 'Depoimento real de cliente',
    location: 'Jundiaí/SP',
    summary: 'Um relato espontâneo sobre sabor, textura e a diferença do molho na rotina.',
    videoSrc: '/assets/testimonials/depoimento-01.mp4',
    poster: '/assets/testimonials/depoimento-01-poster.jpg',
    duration: '0:50',
  },
  {
    title: 'Mais um depoimento em vídeo',
    location: 'São Paulo/SP',
    summary: 'Percepções reais de quem provou e quis registrar a experiência com a Caseirices.',
    videoSrc: '/assets/testimonials/depoimento-02.mp4',
    poster: '/assets/testimonials/depoimento-02-poster.jpg',
    duration: '1:20',
  },
]

const originFacts = [
  'Fornecedores exclusivos em todos os itens, do tomate à embalagem.',
  'Produzido no interior de São Paulo, em Jundiaí.',
  'Cozinha e showroom abertos para visitas.',
  'Processos e normas exigidos pela vigilância sanitária para máxima excelência e segurança alimentar.',
]

const flavorFilters = [
  { id: 'all', label: 'Todos' },
  { id: 'classicos', label: 'Clássicos' },
  { id: 'criativos', label: 'Criativos' },
  { id: 'premium', label: 'Premium' },
  { id: 'defumados', label: 'Defumados' },
  { id: 'apimentados', label: 'Apimentados' },
]

function BrandLockup({ frameClassName = 'h-[82%] w-[82%]' }) {
  return (
    <div className={`relative inline-flex items-center justify-center ${frameClassName}`}>
      <img
        src="/assets/brand/caseirices-logo-hero.webp"
        alt="Logo da marca Caseirices"
        className="h-full w-full object-contain drop-shadow-[0_18px_36px_rgba(24,13,9,0.24)]"
      />
    </div>
  )
}

function PrimaryButton({ href, children, className = '' }) {
  const shouldReduceMotion = useReducedMotion()
  const MotionLink = m.a
  return (
    <MotionLink
      href={href}
      target="_blank"
      rel="noreferrer"
      whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
      className={`inline-flex items-center justify-center gap-2 rounded-[14px] border border-brand-red-dark bg-brand-red px-5 py-3 text-sm font-bold uppercase tracking-[0.06em] text-white shadow-[0_16px_36px_rgba(139,0,0,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-red-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cream focus-visible:ring-offset-2 focus-visible:ring-offset-brand-red ${className}`}
    >
      {children}
    </MotionLink>
  )
}

function SecondaryButton({ href, children, dark = false, className = '' }) {
  const shouldReduceMotion = useReducedMotion()
  const MotionLink = m.a
  const base = dark
    ? 'border-white/35 bg-white/12 text-white hover:bg-white/20 focus-visible:ring-white/80 focus-visible:ring-offset-[#2A130C]'
    : 'border-brand-earth/20 bg-white/85 text-brand-ink hover:bg-white focus-visible:ring-brand-wine/55 focus-visible:ring-offset-brand-cream'

  return (
    <MotionLink
      href={href}
      target="_blank"
      rel="noreferrer"
      whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
      className={`inline-flex items-center justify-center gap-2 rounded-[14px] border px-5 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${base} ${className}`}
    >
      {children}
    </MotionLink>
  )
}


function App() {
  const shouldReduceMotion = useReducedMotion()
  const MotionImage = m.img
  const MotionDiv = m.div
  const MotionArticle = m.article
  const [activeFlavorFilter, setActiveFlavorFilter] = useState('all')
  const [showAllFlavors, setShowAllFlavors] = useState(false)
  const [heroVideoFailed, setHeroVideoFailed] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(null)

  useEffect(() => {
    if (document.querySelector(`script[src="${ELFSIGHT_SCRIPT_SRC}"]`)) return

    const script = document.createElement('script')
    script.src = ELFSIGHT_SCRIPT_SRC
    script.async = true
    document.body.appendChild(script)
  }, [])

  useEffect(() => {
    if (!activeTestimonial) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveTestimonial(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeTestimonial])

  const filteredFlavors = useMemo(() => {
    if (activeFlavorFilter === 'all') return flavors
    return flavors.filter((item) => item.group === activeFlavorFilter)
  }, [activeFlavorFilter])

  const defaultVisibleCount = activeFlavorFilter === 'all' ? 4 : 4

  const visibleFlavors = useMemo(() => {
    if (showAllFlavors) return filteredFlavors
    const baseFlavors =
      activeFlavorFilter === 'all' ? filteredFlavors.filter((item) => item.isReal) : filteredFlavors
    return baseFlavors.slice(0, defaultVisibleCount)
  }, [activeFlavorFilter, defaultVisibleCount, filteredFlavors, showAllFlavors])

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen overflow-x-clip bg-brand-cream text-brand-ink antialiased">
        <main className="pb-24">
          <SectionReveal className="relative h-[100dvh] min-h-[100dvh] overflow-hidden border-b border-brand-earth/14 bg-black">
            <div className="absolute inset-0 bg-black">
              <img
                src={HERO_VIDEO_POSTER}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full scale-[1.22] object-cover object-center sm:scale-100"
              />
              <video
                className={`h-full w-full scale-[1.22] object-cover object-center saturate-[1.05] brightness-[0.96] sm:scale-100 ${
                  heroVideoFailed ? 'opacity-0' : 'opacity-100'
                }`}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={HERO_VIDEO_POSTER}
                onError={() => setHeroVideoFailed(true)}
                aria-hidden="true"
              >
                <source src={HERO_VIDEO_SRC} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(200,16,46,0.08),transparent_34%),radial-gradient(circle_at_85%_14%,rgba(255,204,102,0.06),transparent_32%),linear-gradient(to_bottom,rgba(17,7,6,0.2),rgba(17,7,6,0.34))]" />
            </div>

            <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
              <div className="mb-4 flex flex-col items-center gap-3 lg:mb-5">
                <BrandLockup frameClassName="h-[114px] w-[114px] sm:h-[130px] sm:w-[130px]" />
                <span className="inline-flex items-center rounded-[14px] border border-[#ffd9a0]/55 bg-[linear-gradient(135deg,rgba(180,19,34,0.9),rgba(110,13,24,0.9))] px-5 py-2.5 text-[12px] font-extrabold uppercase tracking-[0.16em] text-[#fff5e7] shadow-[0_14px_28px_rgba(85,7,15,0.36)]">
                  Molhos de Tomate Caseirices
                </span>
              </div>

              <div className="relative flex-1">
                <div className="absolute bottom-[40px] left-1/2 w-[min(92vw,760px)] -translate-x-1/2 rounded-[24px] border border-white/24 bg-black/34 p-4 text-white shadow-[0_24px_64px_rgba(0,0,0,0.28)] backdrop-blur-[4.6px] sm:p-6">
                  <m.h1
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                    transition={shouldReduceMotion ? undefined : { duration: 0.5, delay: 0.16 }}
                    className="mt-1 text-center font-display text-[clamp(2rem,5.2vw,3.5rem)] leading-[0.94] text-white"
                  >
                    O sabor de verdade começa aqui.
                  </m.h1>

                  <m.p
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                    transition={shouldReduceMotion ? undefined : { duration: 0.45, delay: 0.24 }}
                    className="mx-auto mt-4 max-w-3xl text-center text-base leading-relaxed text-white/92 sm:text-lg"
                  >
                    O molho que nasce do ingrediente, não do discurso. Receitas caseiras com
                    textura natural, aroma fresco e paladar equilibrado para transformar pratos
                    cotidianos em momentos especiais.
                  </m.p>

                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    {['Ingredientes naturais', '16 sabores', 'Feito em Jundiaí'].map((item) => (
                      <span
                        key={item}
                        className="rounded-[999px] border border-white/25 bg-white/12 px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-white/90"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <MotionDiv
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                    transition={shouldReduceMotion ? undefined : { duration: 0.45, delay: 0.3 }}
                    className="mt-6 flex flex-wrap justify-center gap-3"
                  >
                    <PrimaryButton href={WHATSAPP_DISCOVERY_LINK} className="w-full sm:w-auto">
                      Conhecer os sabores
                      <ArrowRight className="h-4 w-4" />
                    </PrimaryButton>
                  </MotionDiv>
                </div>

                <m.div
                  animate={{ y: [0, 10, 0], opacity: [0.75, 1, 0.75] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 text-white/90"
                  aria-hidden="true"
                >
                  <ChevronDown className="h-7 w-7 drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)]" />
                </m.div>

              </div>

            </div>
          </SectionReveal>

          <SequenceScroll />

          <SectionReveal
            id="quem-somos"
            className="relative overflow-hidden border-y border-brand-earth/14"
          >
            <div className="absolute inset-0 bg-[url('/assets/hero/fundador-caseirices.jpg')] bg-cover bg-center" aria-hidden="true" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(34,139,34,0.12),transparent_30%),radial-gradient(circle_at_80%_18%,rgba(200,16,46,0.14),transparent_28%),linear-gradient(110deg,rgba(12,8,6,0.84)_0%,rgba(12,8,6,0.68)_42%,rgba(12,8,6,0.8)_100%)]" />
            <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
              <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
                <m.div
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
                  whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={shouldReduceMotion ? undefined : { duration: 0.65, ease: 'easeOut' }}
                  className="max-w-3xl rounded-[24px] border border-white/16 bg-black/34 p-5 text-white shadow-[0_20px_44px_rgba(0,0,0,0.3)] backdrop-blur-sm sm:p-7"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8FE08F]">
                    Sobre a marca
                  </p>
                  <h2 className="mt-3 font-display text-4xl leading-[0.95] text-white sm:text-5xl lg:text-[4.3rem]">
                    Uma estética premium construída na cozinha real.
                  </h2>
                  <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/88 sm:text-lg">
                    Caseirices combina memória afetiva, ingredientes selecionados e produção autoral
                    para criar um molho gastronômico, mas fiel à cozinha caseira: com respeito aos
                    ingredientes, ao tempo e ao calor da cozinha de casa.
                  </p>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/76 sm:text-base">
                    Criado pelas mãos de um publicitário apaixonado por comida e por cozinhar, o
                    molho resgata a lembrança da panela de tomate da avó e leva essa história para
                    uma cozinha de produção artesanal em Jundiaí.
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    {['Produção autoral', 'Agricultura familiar', 'Showroom aberto', 'Jundiaí - SP'].map((item) => (
                      <span
                        key={item}
                        className="rounded-[999px] border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/92 backdrop-blur"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </m.div>

                <m.div
                  initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
                  whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={shouldReduceMotion ? undefined : { duration: 0.6, delay: 0.12, ease: 'easeOut' }}
                  className="grid gap-3"
                >
                  {[
                    {
                      title: 'Da origem ao prato',
                      text: 'Um molho que nasce do ingrediente real e chega à mesa com textura natural, aroma fresco e assinatura artesanal.',
                    },
                    {
                      title: 'Aroma, fogo e tempo',
                      text: 'Cada receita carrega a presença da cozinha viva, com camadas de sabor construídas devagar e com cuidado.',
                    },
                    {
                      title: 'Presença de marca',
                      text: 'Menos bloco claro e mais impacto visual para sustentar o discurso premium logo no início da navegação.',
                    },
                  ].map((item) => (
                    <m.article
                      key={item.title}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={shouldReduceMotion ? undefined : { duration: 0.5, ease: 'easeOut' }}
                      className="rounded-[24px] border border-white/22 bg-[linear-gradient(180deg,rgba(0,0,0,0.44)_0%,rgba(0,0,0,0.34)_100%)] p-5 text-white shadow-[0_20px_40px_rgba(0,0,0,0.3)] backdrop-blur-md"
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#B7F0BF]">
                        Essência da marca
                      </p>
                      <h3 className="mt-2 font-display text-2xl leading-tight text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/80">{item.text}</p>
                    </m.article>
                  ))}
                </m.div>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
            <div className="mb-7 max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-green">Assinatura Caseirices</p>
              <h2 className="mt-3 font-display text-3xl leading-tight text-brand-wine sm:text-4xl">
                Receitas caseiras, que respeitam o tempo e o sabor.
              </h2>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {brandPillars.map((item) => {
                const Icon = item.icon
                return (
                  <article
                    key={item.title}
                    className="group relative rounded-[24px] border border-brand-earth/16 bg-white/88 p-6 shadow-[0_14px_36px_rgba(55,27,16,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_rgba(55,27,16,0.12)]"
                  >
                    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-green/10 blur-2xl transition group-hover:bg-brand-red/10" />
                    <Icon className="relative h-6 w-6 text-brand-green" />
                    <p className="relative mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-earth/70">
                      {item.eyebrow}
                    </p>
                    <h3 className="relative mt-2 font-display text-2xl leading-tight text-brand-wine">
                      {item.title}
                    </h3>
                    <p className="relative mt-3 text-sm leading-relaxed text-brand-ink/82">{item.text}</p>
                  </article>
                )
              })}
            </div>
          </SectionReveal>

          <SectionReveal className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10 lg:py-16">
            <div className="relative overflow-hidden rounded-[30px] border border-[#2f7d46]/35 bg-[radial-gradient(circle_at_16%_14%,rgba(143,224,143,0.18),transparent_24%),radial-gradient(circle_at_84%_18%,rgba(200,16,46,0.14),transparent_26%),linear-gradient(135deg,#143B29_0%,#1B5637_52%,#10281D_100%)] p-6 text-brand-cream shadow-[0_28px_64px_rgba(16,40,29,0.28)] sm:p-8 lg:p-10">
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0)_36%,rgba(255,255,255,0.05)_100%)]" />
              <div className="relative">
                <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div className="max-w-3xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9BE3A8]">Caseirices na mídia</p>
                    <h2 className="mt-3 font-display text-3xl leading-[1.04] text-brand-cream sm:text-4xl lg:text-[3.15rem]">
                      A marca aparecendo em canais que valorizam pequenos negócios e produtos autorais.
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-cream/84 sm:text-base">
                      Conteúdos e aparições que ampliam a presença da Caseirices e ajudam a contar a força de uma marca artesanal feita com verdade.
                    </p>
                  </div>
                  <SecondaryButton
                    href={INSTAGRAM_LINK}
                    dark
                    className="border-white/20 bg-white/10 text-white hover:bg-white/18"
                  >
                    <Instagram className="h-4 w-4" />
                    Seguir @caseiricesjundiai
                  </SecondaryButton>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  {MEDIA_FEATURES.map((item) => (
                    <article
                      key={item.href}
                      className="overflow-hidden rounded-[24px] border border-white/14 bg-[linear-gradient(180deg,rgba(255,248,240,0.13)_0%,rgba(255,248,240,0.07)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-black/20">
                        <img
                          src={item.imageSrc}
                          alt={item.imageAlt}
                          className={`h-full w-full ${item.imageClassName}`}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(7,23,15,0.28),rgba(7,23,15,0.04)_48%,transparent)]" />
                      </div>

                      <div className="p-6">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#A7E8B3]">
                          {item.eyebrow}
                        </p>
                        <h3 className="mt-3 font-display text-2xl leading-tight text-brand-cream">
                          {item.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-brand-cream/82 sm:text-base">
                          {item.text}
                        </p>
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-5 inline-flex items-center gap-2 rounded-[12px] border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/18"
                        >
                          {item.cta}
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10 lg:py-12">
            <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
              <article className="rounded-[26px] border border-brand-earth/16 bg-white/88 p-7 shadow-[0_16px_38px_rgba(55,27,16,0.1)] lg:p-9">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-green">Caseirices na mídia</p>
                <h2 className="mt-3 font-display text-3xl leading-tight text-brand-wine sm:text-4xl">
                  Acompanhe os últimos conteúdos da Caseirices no Instagram.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-brand-ink/85 sm:text-base">
                  Um espaço para acompanhar bastidores, lançamentos, presença em eventos e tudo que reforça a força da marca fora da prateleira.
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    'Bastidores da produção artesanal e rotina da marca.',
                    'Novidades, lançamentos e conteúdos publicados no perfil oficial.',
                    'Uma vitrine social viva para reforçar confiança e presença da Caseirices.',
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-[16px] border border-brand-earth/14 bg-brand-cream/70 p-4 text-sm leading-relaxed text-brand-ink/82"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <SecondaryButton href={INSTAGRAM_LINK} className="mt-6">
                  <Instagram className="h-4 w-4 text-brand-green" />
                  Seguir @caseiricesjundiai
                </SecondaryButton>
              </article>

              <article className="relative overflow-hidden rounded-[26px] border border-brand-earth/20 bg-brand-wine p-5 text-brand-cream shadow-[0_20px_46px_rgba(55,27,16,0.3)] lg:max-h-[800px] lg:p-7">
                <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-brand-red/35 blur-2xl" />
                <div className="absolute -bottom-16 -left-12 h-44 w-44 rounded-full bg-brand-green/22 blur-2xl" />
                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#FFD9AA]">Instagram oficial</p>
                  <h3 className="mt-3 font-display text-3xl leading-tight text-white sm:text-4xl">
                    A presença da marca em tempo real.
                  </h3>

                  <div className="mt-6 rounded-[22px] border border-white/16 bg-[#f6efe5] p-3 shadow-[0_18px_36px_rgba(7,24,16,0.22)] sm:p-4">
                    <div className="media-widget-shell rounded-[18px] bg-[#f6efe5]">
                      <div
                        className={ELFSIGHT_APP_CLASS}
                        data-elfsight-app-lazy=""
                      />
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </SectionReveal>

          <SectionReveal className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
            <div className="relative overflow-hidden rounded-[32px] border border-[#2f7d46]/35 bg-[radial-gradient(circle_at_18%_18%,rgba(143,224,143,0.18),transparent_26%),radial-gradient(circle_at_82%_12%,rgba(200,16,46,0.16),transparent_28%),linear-gradient(135deg,#143B29_0%,#1B5637_50%,#10281D_100%)] p-6 text-brand-cream shadow-[0_26px_64px_rgba(16,40,29,0.34)] sm:p-8 lg:p-10">
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0)_35%,rgba(255,255,255,0.04)_100%)]" />
              <div className="relative grid gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9BE3A8]">
                    Verde de verdade
                  </p>
                  <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight text-brand-cream sm:text-4xl lg:text-[3.1rem]">
                    Do campo para a cozinha real.
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-brand-cream/84 sm:text-base">
                    A identidade de Caseirices nasce de ingredientes naturais, tempo de preparo e
                    uma cozinha que respeita o alimento antes de pensar no discurso. Aqui, o verde
                    não entra como detalhe decorativo. Ele representa frescor, origem e verdade.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <span className="rounded-[999px] border border-white/18 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#E9F7E9]">
                      Agricultura familiar
                    </span>
                    <span className="rounded-[999px] border border-white/18 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#E9F7E9]">
                      Frescor e pureza
                    </span>
                    <span className="rounded-[999px] border border-white/18 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#E9F7E9]">
                      Cozinha artesanal
                    </span>
                  </div>
                </div>

                <div className="grid gap-3">
                  {greenSectionPoints.map((item) => {
                    const Icon = item.icon
                    return (
                      <article
                        key={item.title}
                        className="rounded-[22px] border border-white/14 bg-[linear-gradient(180deg,rgba(255,248,240,0.13)_0%,rgba(255,248,240,0.07)_100%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur"
                      >
                        <Icon className="h-5 w-5 text-[#8FE08F]" />
                        <h3 className="mt-3 font-display text-2xl leading-tight text-brand-cream">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-brand-cream/82">{item.text}</p>
                      </article>
                    )
                  })}
                </div>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal className="border-y border-[#2a5c3f]/20 bg-[radial-gradient(circle_at_20%_0%,rgba(96,171,109,0.2),transparent_22%),linear-gradient(180deg,#0E2A1D_0%,#123323_100%)] py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div className="max-w-3xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8FE08F]">Só o Essencial</p>
                  <h2 className="mt-3 font-display text-3xl text-[#F8F1E7] sm:text-4xl">
                    Porque só o essencial tem o sabor que faz a diferença.
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#F0E9DE] sm:text-base">
                    Uma receita que respeita o ingrediente, evita excessos e entrega leveza, pureza e
                    memória afetiva em cada colher.
                  </p>
                </div>
                <span className="rounded-[999px] border border-white/18 bg-white/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#FFF8F0] shadow-[0_10px_24px_rgba(5,16,11,0.18)]">
                  Sem corantes. Sem conservantes. Sem gordura.
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {essentialItems.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-[24px] border border-[#F4EBDD]/70 bg-[linear-gradient(180deg,#FFF8F0_0%,#F6EEDF_100%)] p-5 shadow-[0_22px_42px_rgba(7,20,14,0.24)]"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2F7D46]">
                      {item.eyebrow}
                    </p>
                    <h3 className="mt-3 font-display text-2xl leading-tight text-brand-wine">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-brand-ink/85">{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </SectionReveal>

          <SectionReveal className="border-y border-brand-earth/14 bg-white/70 py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-green">Sabores Caseirices</p>
                  <h2 className="mt-3 font-display text-3xl text-brand-wine sm:text-4xl">15 sabores, dos clássicos aos criativos</h2>
                  <p className="mt-2 max-w-2xl text-sm text-brand-ink/82 sm:text-base">
                    Um produto diferente de qualquer outro tipo de molho de tomate, criado para
                    impressionar no prato e também na prateleira.
                  </p>
                </div>
              </div>

              <div className="mb-5 flex flex-wrap gap-2">
                {flavorFilters.map((filter) => {
                  const active = activeFlavorFilter === filter.id
                  return (
                    <button
                      key={filter.id}
                      type="button"
                      onClick={() => {
                        setActiveFlavorFilter(filter.id)
                        setShowAllFlavors(false)
                      }}
                      className={`rounded-[10px] border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition ${
                        active
                          ? 'border-brand-red-dark bg-brand-red text-white shadow-[0_8px_20px_rgba(139,0,0,0.24)]'
                          : 'border-brand-earth/20 bg-white text-brand-earth hover:bg-brand-cream'
                      }`}
                    >
                      {filter.label}
                    </button>
                  )
                })}
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {visibleFlavors.map((item, index) => (
                  <MotionArticle
                    key={item.name}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.12 }}
                    transition={shouldReduceMotion ? undefined : { duration: 0.38, delay: index * 0.02 }}
                    whileHover={shouldReduceMotion ? undefined : { y: -5 }}
                    className="group overflow-hidden rounded-[22px] border border-brand-earth/16 bg-white shadow-[0_10px_28px_rgba(49,24,12,0.09)]"
                  >
                    <div className="relative aspect-square overflow-hidden bg-brand-cream">
                      <img
                        src={item.image}
                        alt={`Frasco do sabor ${item.name}`}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        onError={(event) => {
                          if (item.fallbackImage) {
                            event.currentTarget.onerror = null
                            event.currentTarget.src = item.fallbackImage
                            event.currentTarget.className =
                              'h-full w-full object-contain p-5 transition duration-500 group-hover:scale-105'
                          }
                        }}
                      />
                      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/55 to-transparent" />
                      <p className="absolute bottom-3 left-3 right-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/90">
                        Sabor artesanal de verdade
                      </p>
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-bold text-brand-wine sm:text-base">{item.name}</h3>
                      <p className="mt-1 text-xs text-brand-ink/75 sm:text-sm">{item.profile}</p>
                    </div>
                  </MotionArticle>
                ))}
              </div>

              {(activeFlavorFilter === 'all'
                ? filteredFlavors.filter((item) => item.isReal).length
                : filteredFlavors.length) > defaultVisibleCount ? (
                <div className="mt-5 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setShowAllFlavors((current) => !current)}
                    className="rounded-[12px] border border-brand-earth/18 bg-white px-4 py-2 text-sm font-semibold text-brand-wine transition hover:bg-brand-cream"
                  >
                    {showAllFlavors ? 'Mostrar menos' : 'Ver mais sabores'}
                  </button>
                </div>
              ) : null}
            </div>
          </SectionReveal>

          <SectionReveal className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-[0.98fr_1.02fr] lg:px-10 lg:py-20">
            <article className="rounded-[26px] border border-brand-earth/16 bg-white/88 p-7 shadow-[0_16px_38px_rgba(55,27,16,0.1)] lg:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-green">O prazer de receber e cozinhar</p>
              <h2 className="mt-3 font-display text-3xl leading-tight text-brand-wine sm:text-4xl">
                A cozinha de casa com toques de restaurante.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-brand-ink/85 sm:text-base">
                Produtos artesanais, inspirados na cozinha tradicional, prontos para acompanhar a
                mesa de todas as famílias. Um molho pronto que transforma receitas simples em pratos
                com presença de restaurante.
              </p>

              <div className="mt-6 space-y-3">
                {experienceMoments.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[16px] border border-brand-earth/14 bg-brand-cream/70 p-4"
                  >
                    <p className="text-sm font-bold text-brand-wine">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-brand-ink/80">{item.text}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="relative overflow-hidden rounded-[26px] border border-brand-earth/20 bg-brand-wine p-7 text-brand-cream shadow-[0_20px_46px_rgba(55,27,16,0.3)] lg:p-9">
              <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-brand-red/35 blur-2xl" />
              <div className="absolute -bottom-16 -left-12 h-44 w-44 rounded-full bg-brand-green/22 blur-2xl" />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#FFD9AA]">Argumentos comerciais</p>
                <h2 className="mt-3 font-display text-3xl sm:text-4xl">O produto que faz a diferença na prateleira.</h2>
                <p className="mt-3 text-sm text-brand-cream/88 sm:text-base">
                  Caseirices conversa com o consumidor exigente que valoriza qualidade, procedência e
                  a história de um produto artesanal feito com verdade.
                </p>

                <div className="mt-7 space-y-3">
                  {commercialArguments.map((item) => (
                    <div
                      key={item}
                      className="rounded-[16px] border border-brand-cream/26 bg-[#2d0808]/55 px-4 py-3 text-sm text-brand-cream/92 backdrop-blur"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <PrimaryButton
                  href={WHATSAPP_RESELLER_LINK}
                  className="mt-7 w-full rounded-[14px] border-white/28 bg-brand-red-dark hover:bg-[#6c1010] focus-visible:ring-offset-brand-red"
                >
                  Quero vender Caseirices
                  <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
              </div>
            </article>
          </SectionReveal>

          <SectionReveal className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
            <div className="rounded-[28px] border border-brand-red-dark/60 bg-[linear-gradient(160deg,#8B0000_0%,#A30F21_48%,#6A0914_100%)] p-5 text-white shadow-[0_20px_44px_rgba(72,7,10,0.35)] sm:p-6 lg:p-7">
              <div className="mx-auto max-w-4xl">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 rounded-[12px] border border-white/25 bg-white/10 px-3 py-1.5">
                    <span className="text-lg font-bold leading-none text-[#FFD76A]">4,9</span>
                    <span className="flex items-center gap-1" aria-label="Nota média 4,9 de 5 estrelas">
                      {[...Array(5)].map((_, index) => (
                        <Star key={`hero-rating-${index}`} className="h-3.5 w-3.5 fill-[#FFD76A] text-[#FFD76A]" />
                      ))}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.11em] text-white/85 sm:text-xs">
                      Avaliação dos clientes
                    </span>
                  </div>
                  <h2 className="mx-auto mt-4 max-w-3xl font-display text-[2.1rem] leading-[0.94] text-white sm:text-[2.6rem] lg:text-[3rem]">
                    Depoimentos reais em video de quem provou e aprovou.
                  </h2>
                  <p className="mx-auto mt-2 max-w-2xl text-sm leading-snug text-white/88 sm:text-[15px]">
                    Quando o cliente grava e envia o próprio relato, a qualidade deixa de ser só
                    promessa. Vira prova social viva, espontânea e impossível de fabricar.
                  </p>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {videoTestimonials.map((item) => (
                    <button
                      key={item.videoSrc}
                      type="button"
                      onClick={() => setActiveTestimonial(item)}
                      className="group relative mx-auto w-full max-w-[290px] overflow-hidden rounded-[22px] border border-white/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0.08)_100%)] text-left shadow-[0_18px_40px_rgba(44,5,9,0.24)] transition duration-300 hover:-translate-y-1 hover:border-white/28 hover:shadow-[0_22px_48px_rgba(44,5,9,0.3)]"
                    >
                      <div className="relative aspect-square overflow-hidden bg-black">
                        <img
                          src={item.poster}
                          alt={item.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,7,6,0.1)_0%,rgba(18,7,6,0.18)_38%,rgba(18,7,6,0.78)_100%)]" />
                        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-3">
                          <span className="rounded-full border border-white/22 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/88 backdrop-blur-sm">
                            Video real
                          </span>
                          <span className="rounded-full border border-white/22 bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-white/88 backdrop-blur-sm">
                            {item.duration}
                          </span>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 p-4">
                          <div className="flex items-end justify-between gap-3">
                            <div>
                              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FFD1D9]">
                                {item.location}
                              </p>
                              <h3 className="mt-2 font-display text-[1.8rem] leading-[0.95] text-white">
                                {item.title}
                              </h3>
                            </div>
                            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/22 bg-white/12 text-white backdrop-blur-md transition duration-300 group-hover:scale-105 group-hover:bg-white/18">
                              <Play className="h-5 w-5 fill-current" />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-sm leading-relaxed text-white/82">{item.summary}</p>
                        <span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#FFD9AA]">
                          Assistir depoimento
                          <Play className="h-3.5 w-3.5 fill-current" />
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </SectionReveal>

          {activeTestimonial ? (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(16,8,7,0.82)] px-4 py-6 backdrop-blur-md"
              onClick={() => setActiveTestimonial(null)}
            >
              <div
                className="relative w-full max-w-4xl overflow-hidden rounded-[28px] border border-white/14 bg-[#160706] shadow-[0_28px_80px_rgba(0,0,0,0.45)]"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setActiveTestimonial(null)}
                  className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/16 bg-black/30 text-white/88 backdrop-blur transition hover:bg-black/45"
                  aria-label="Fechar depoimento"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="grid bg-[linear-gradient(135deg,rgba(139,0,0,0.28),rgba(17,7,6,0.12))] lg:grid-cols-[minmax(0,0.72fr)_minmax(0,0.28fr)]">
                  <div className="bg-black">
                    <video
                      key={activeTestimonial.videoSrc}
                      className="max-h-[78vh] w-full bg-black object-contain"
                      controls
                      autoPlay
                      preload="metadata"
                      playsInline
                      poster={activeTestimonial.poster}
                    >
                      <source src={activeTestimonial.videoSrc} type="video/mp4" />
                      Seu navegador nao suporta video HTML5.
                    </video>
                  </div>

                  <div className="flex flex-col justify-between p-5 text-white lg:p-6">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FFD1D9]">
                        {activeTestimonial.location}
                      </p>
                      <h3 className="mt-2 font-display text-3xl leading-[0.94] text-white">
                        {activeTestimonial.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-white/78">
                        {activeTestimonial.summary}
                      </p>
                    </div>

                    <div className="mt-6 rounded-[18px] border border-white/14 bg-white/6 p-4 text-sm leading-relaxed text-white/74">
                      Depoimento em tela cheia para manter a seção mais leve e deixar o video ganhar
                      destaque so quando a pessoa quiser assistir.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <SectionReveal className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-10 lg:pb-20">
            <div className="rounded-[26px] border border-brand-earth/16 bg-[linear-gradient(145deg,#fff8f0_0%,#fff0e4_100%)] p-5 shadow-[0_16px_34px_rgba(55,27,16,0.09)] sm:p-7">
              <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-green">Molho de Origem</p>
                  <h2 className="mt-3 font-display text-3xl text-brand-wine sm:text-4xl">
                    Sabor de verdade, com procedência e segurança alimentar.
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-brand-ink/82 sm:text-base">
                    Fornecedores exclusivos, cozinha real, showroom aberto e um espaço que segue
                    todas as normas e processos exigidos pela vigilância sanitária para entregar um
                    produto de máxima excelência.
                  </p>
                </div>

                <div className="grid gap-3">
                  {originFacts.map((item, index) => {
                    const Icon = index === originFacts.length - 1 ? ShieldCheck : Store
                    return (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-[16px] border border-brand-earth/14 bg-white/78 p-4"
                      >
                        {index === 1 ? (
                          <>
                            <img
                              src="/assets/hero/fundador-caseirices.jpg"
                              alt="Dono da Caseirices com os molhos da marca"
                              className="h-44 w-full rounded-[12px] object-cover object-top lg:hidden"
                              loading="lazy"
                            />
                            <Icon className="mt-0.5 hidden h-5 w-5 shrink-0 text-brand-green lg:block" />
                            <p className="hidden text-sm leading-relaxed text-brand-ink/84 lg:block">{item}</p>
                          </>
                        ) : (
                          <>
                            <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
                            <p className="text-sm leading-relaxed text-brand-ink/84">{item}</p>
                          </>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </SectionReveal>

        </main>

        <footer className="border-t border-brand-earth/20 bg-brand-wine px-4 py-8 text-brand-cream sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-[22px] border border-white/20 bg-[#5a0a0a]/55 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.22)] sm:p-7">
              <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
                <div>
                  <BrandLockup frameClassName="h-[128px] w-[128px] sm:h-[150px] sm:w-[150px]" />
                  <h3 className="mt-3 font-display text-3xl leading-tight text-white sm:text-4xl">
                    Experimente Caseirices. O molho que faz a diferença.
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-cream/88 sm:text-base">
                    Sabor de verdade, memória de cozinha de casa e uma assinatura artesanal que
                    transforma qualquer receita.
                  </p>

                  <div className="mt-4 inline-flex items-center gap-2 rounded-[12px] border border-white/25 bg-white/10 px-3 py-2">
                    <span className="inline-flex items-center gap-1 text-[#F8D66D]">
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                    </span>
                    <span className="text-sm font-semibold text-white">5,0</span>
                    <span className="text-sm text-brand-cream/90">Sabor caseiro que fideliza</span>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <a
                      href={SITE_LINK}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-[12px] border border-white/24 bg-white/10 px-3 py-2 text-sm font-medium transition hover:bg-white/18"
                    >
                      <Globe className="h-4 w-4" />
                      Site
                    </a>
                    <a
                      href="https://maps.google.com/?q=Rua+Atílio+Vianello,+409,+Jundiaí+-+SP,+13207-130"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-[12px] border border-white/24 bg-white/10 px-3 py-2 text-sm font-medium transition hover:bg-white/18"
                    >
                      <Navigation className="h-4 w-4" />
                      Rotas
                    </a>
                    <a
                      href={WHATSAPP_DISCOVERY_LINK}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-[12px] border border-white/24 bg-white/10 px-3 py-2 text-sm font-medium transition hover:bg-white/18"
                    >
                      <Share2 className="h-4 w-4" />
                      WhatsApp
                    </a>
                  </div>
                </div>

                <div className="rounded-[16px] border border-white/18 bg-black/20 p-4 sm:p-5">
                  <ul className="space-y-3 text-sm sm:text-base">
                    <li className="inline-flex w-full items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                      <span>Rua Atílio Vianello, 409 - Vila Vianelo, Jundiaí - SP, CEP 13207-130</span>
                    </li>
                    <li className="inline-flex w-full items-start gap-2">
                      <PhoneCall className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                      <span>(11) 97488-4319</span>
                    </li>
                    <li className="inline-flex w-full items-start gap-2">
                      <Store className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                      <span>Cozinha de produção e showroom abertos para visitas</span>
                    </li>
                    <li className="inline-flex w-full items-start gap-2">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                      <span>Segurança alimentar e processos conforme as exigências sanitárias</span>
                    </li>
                    <li className="inline-flex w-full items-start gap-2">
                      <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                      <span>CNPJ: 28.150.452/0001-79</span>
                    </li>
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-3 text-sm font-medium">
                    <a
                      href={INSTAGRAM_LINK}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 transition hover:text-brand-green"
                    >
                      <Instagram className="h-4 w-4" /> Instagram oficial
                    </a>
                    <a
                      href={WHATSAPP_RESELLER_LINK}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 transition hover:text-brand-green"
                    >
                      <PhoneCall className="h-4 w-4" /> Canal comercial
                    </a>
                  </div>

                  <div className="mt-5 rounded-[14px] border border-white/16 bg-white/8 p-3.5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FFD9AA]">
                      Atendimento
                    </p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-cream/70">
                          Comercial
                        </p>
                        <p className="mt-1 text-sm text-white">Seg a Sex, das 9h às 18h</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-cream/70">
                          Visitas
                        </p>
                        <p className="mt-1 text-sm text-white">Agendamento via WhatsApp</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>

        <a
          href={WHATSAPP_DISCOVERY_LINK}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp fixo Caseirices"
          className="group fixed bottom-4 left-4 z-50 inline-flex items-center gap-2 rounded-full border border-white/55 bg-[linear-gradient(135deg,#2fe678,#18b457)] px-3.5 py-2.5 text-white shadow-[0_16px_34px_rgba(12,74,36,0.46)] transition hover:scale-[1.05] hover:shadow-[0_20px_44px_rgba(12,74,36,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#25D366] sm:bottom-6 sm:left-5 sm:gap-3 sm:px-5 sm:py-3.5 sm:shadow-[0_24px_52px_rgba(12,74,36,0.55)]"
        >
          <span className="absolute -inset-2 -z-10 rounded-full bg-[#25D366]/45 blur-lg transition group-hover:bg-[#25D366]/60" />
          <span className="absolute -inset-3 -z-20 hidden rounded-full border border-[#8ef6b8]/40 animate-pulse sm:block" />
          <PhoneCall className="h-5 w-5 sm:h-7 sm:w-7" />
          <span className="hidden text-sm font-bold uppercase tracking-[0.08em] sm:inline">WhatsApp</span>
        </a>
      </div>
    </LazyMotion>
  )
}

export default App
