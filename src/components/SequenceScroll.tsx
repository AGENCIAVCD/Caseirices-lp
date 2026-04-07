import { useEffect, useMemo, useRef, useState } from 'react'
import { m, type MotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion'

const FRAME_COUNT = 120
const LAST_FRAME = FRAME_COUNT - 1
const SECTION_HEIGHT_DESKTOP = '420vh'
const SECTION_HEIGHT_MOBILE = '320vh'
const FRAME_SCROLL_GAIN = 1
const MIN_READY_FRAMES = 12
const WHATSAPP_CTA_LINK =
  'https://api.whatsapp.com/send?phone=5511974884319&text=Eu%20gostaria%20de%20conhecer%20os%20produtos%20Caseirices'

const narrativeBlocks = [
  {
    key: 'intro',
    title: 'Caseirices: o sabor que nos une.',
    subtitle: 'Nosso molho de tomate caseiro.',
    align: 'left' as const,
    top: '42%',
    desktopClassName: 'lg:left-10',
    start: 0,
    peakStart: 0.02,
    peakEnd: 0.09,
    end: 0.14,
  },
  {
    key: 'tradição',
    title: 'Nascido na tradição.',
    subtitle: 'Ingredientes frescos e selecionados.',
    align: 'right' as const,
    top: '34%',
    desktopClassName: 'lg:right-24 xl:right-28',
    start: 0.1,
    peakStart: 0.16,
    peakEnd: 0.37,
    end: 0.43,
  },
  {
    key: 'explosão',
    title: 'Explosão de sabor.',
    subtitle: 'Uma jornada sensorial do campo para sua mesa.',
    align: 'left' as const,
    top: '44%',
    desktopClassName: 'lg:left-10',
    start: 0.4,
    peakStart: 0.47,
    peakEnd: 0.67,
    end: 0.73,
  },
  {
    key: 'toque',
    title: 'O toque que fica.',
    subtitle: 'Para todas as suas receitas especiais.',
    align: 'center' as const,
    top: '72%',
    start: 0.7,
    peakStart: 0.76,
    peakEnd: 0.8,
    end: 0.84,
  },
] as const

function textAlignment(align: 'left' | 'right' | 'center') {
  if (align === 'right') return 'items-end text-right'
  if (align === 'center') return 'items-center text-center'
  return 'items-start text-left'
}

function cardPlacement(align: 'left' | 'right' | 'center') {
  if (align === 'right') return 'left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-8 lg:right-12'
  if (align === 'center') return 'left-1/2 -translate-x-1/2'
  return 'left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 lg:left-12'
}

function NarrativeBlock({
  block,
  progress,
  isMobile,
}: {
  block: (typeof narrativeBlocks)[number]
  progress: MotionValue<number>
  isMobile: boolean
}) {
  const opacity = useTransform(
    progress,
    [block.start, block.peakStart, block.peakEnd, block.end],
    [0, 1, 1, 0],
  )
  const y = useTransform(progress, [block.start, block.peakStart], [20, 0])
  const scale = useTransform(progress, [block.start, block.peakStart, block.end], [0.96, 1, 0.98])

  return (
    <m.div
      style={{ opacity, y, scale }}
      className={`pointer-events-none absolute ${
        isMobile
          ? 'left-4 right-4 w-auto max-w-none translate-x-0 items-center text-center'
          : `w-[calc(100%-2rem)] max-w-[34rem] sm:w-[32rem] ${cardPlacement(block.align)} ${block.desktopClassName ?? ''} ${textAlignment(block.align)}`
      }`}
      aria-hidden="true"
    >
      <m.div
        className="liquid-glass liquid-glass-strong relative rounded-3xl p-5 sm:p-7"
      >
        <h2 className="relative font-display text-3xl tracking-tight text-white/95 sm:text-5xl">{block.title}</h2>
        <p className="relative mt-3 font-body text-base leading-relaxed text-white/75 sm:text-lg">
          {block.subtitle}
        </p>
      </m.div>
    </m.div>
  )
}

export function SequenceScroll() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const hasMarkedReadyRef = useRef(false)
  const drawRafRef = useRef<number | null>(null)
  const pendingFrameRef = useRef(0)
  const frameSources = useMemo(
    () =>
      Array.from({ length: FRAME_COUNT }, (_, index) => ({
        primary: `/sequence/caseirices/frame_${index}.webp`,
        fallback: `/sequence/caseirices/frame_${index}.jpg`,
      })),
    [],
  )

  const [isReady, setIsReady] = useState(false)
  const [loadedCount, setLoadedCount] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [activeTick, setActiveTick] = useState(0)
  const lastVibrateAtRef = useRef(0)
  const lastTickRef = useRef(-1)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 190,
    damping: 32,
  })

  const acceleratedProgress = useTransform(smoothProgress, (value) => {
    return Math.max(0, Math.min(1, value * FRAME_SCROLL_GAIN))
  })

  const frameIndex = useTransform(acceleratedProgress, (value) => {
    const nextFrame = Math.floor(value * LAST_FRAME)
    return Math.max(0, Math.min(LAST_FRAME, nextFrame))
  })

  const ctaOpacity = useTransform(acceleratedProgress, [0.87, 0.91, 0.98, 1], [0, 1, 1, 0])
  const ctaY = useTransform(acceleratedProgress, [0.87, 0.91, 1], [28, 0, -8])
  const ctaScale = useTransform(acceleratedProgress, [0.87, 0.91, 1], [0.95, 1, 0.98])
  const hintOpacity = useTransform(acceleratedProgress, isMobile ? [0, 0.07, 0.12] : [0, 0.16, 0.26], [1, 1, 0])
  const hintY = useTransform(acceleratedProgress, isMobile ? [0, 0.12] : [0, 0.26], [0, -22])
  const hintScale = useTransform(acceleratedProgress, [0, 0.08], [0.98, 1])

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)')
    const onChange = () => setIsMobile(media.matches)
    onChange()
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  useMotionValueEvent(acceleratedProgress, 'change', (latest) => {
    const steps = 18
    const nextTick = Math.round(latest * (steps - 1))
    setActiveTick(nextTick)
  })

  useEffect(() => {
    const canVibrate = typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function'
    const progress = scrollYProgress.get()
    const isInsideSection = progress > 0 && progress < 1
    const now = Date.now()
    const shouldPulse = now - lastVibrateAtRef.current > 100
    if (canVibrate && isInsideSection && activeTick !== lastTickRef.current && shouldPulse) {
      navigator.vibrate(8)
      lastVibrateAtRef.current = now
    }
    lastTickRef.current = activeTick
  }, [activeTick, scrollYProgress])

  useEffect(() => {
    let isMounted = true
    let completed = 0
    const priorityCount = isMobile ? 24 : 36

    const loadedImages: HTMLImageElement[] = []
    const timers: number[] = []

    const loadFrame = ({ primary, fallback }: { primary: string; fallback: string }, index: number) => {
      if (!isMounted) return
      const image = new Image()
      image.decoding = 'async'
      image.src = primary
      image.onload = () => {
        completed += 1
        loadedImages[index] = image
        if (isMounted) {
          imagesRef.current = loadedImages
          setLoadedCount(completed)
          if (!hasMarkedReadyRef.current && completed >= MIN_READY_FRAMES) {
            hasMarkedReadyRef.current = true
            setIsReady(true)
          }
          if (completed === FRAME_COUNT) setIsReady(true)
        }
      }
      image.onerror = () => {
        if (!image.src.endsWith('.jpg')) {
          image.src = fallback
          return
        }
        completed += 1
        if (isMounted) {
          setLoadedCount(completed)
          if (!hasMarkedReadyRef.current && completed >= MIN_READY_FRAMES) {
            hasMarkedReadyRef.current = true
            setIsReady(true)
          }
          if (completed === FRAME_COUNT) setIsReady(true)
        }
      }
    }

    frameSources.slice(0, priorityCount).forEach((frame, index) => {
      loadFrame(frame, index)
    })
    frameSources.slice(priorityCount).forEach((frame, offset) => {
      const index = offset + priorityCount
      const timer = window.setTimeout(() => loadFrame(frame, index), 40 + offset * 8)
      timers.push(timer)
    })

    return () => {
      isMounted = false
      timers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [frameSources, isMobile])

  useEffect(() => {
    if (!isReady) return

    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d', { alpha: false })
    if (!context) return

    context.imageSmoothingEnabled = true
    context.imageSmoothingQuality = 'high'

    const drawFrame = (index: number) => {
      let image = imagesRef.current[index]
      if (!image) {
        for (let offset = 1; offset <= LAST_FRAME; offset += 1) {
          image = imagesRef.current[index - offset] ?? imagesRef.current[index + offset]
          if (image) break
        }
      }
      if (!image) return

      const rawDpr = window.devicePixelRatio || 1
      const dpr = isMobile ? Math.min(rawDpr, 1.35) : Math.min(rawDpr, 2)
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      if (canvas.width !== Math.floor(viewportWidth * dpr) || canvas.height !== Math.floor(viewportHeight * dpr)) {
        canvas.width = Math.floor(viewportWidth * dpr)
        canvas.height = Math.floor(viewportHeight * dpr)
        canvas.style.width = `${viewportWidth}px`
        canvas.style.height = `${viewportHeight}px`
      }

      const frameWidth = canvas.width
      const frameHeight = canvas.height

      context.setTransform(1, 0, 0, 1, 0, 0)
      context.fillStyle = '#000000'
      context.fillRect(0, 0, frameWidth, frameHeight)

      const scale = Math.max(frameWidth / image.width, frameHeight / image.height)
      const drawWidth = image.width * scale
      const drawHeight = image.height * scale
      const drawX = (frameWidth - drawWidth) / 2
      const drawY = (frameHeight - drawHeight) / 2

      context.drawImage(image, drawX, drawY, drawWidth, drawHeight)
    }

    const scheduleDraw = (index: number) => {
      pendingFrameRef.current = index
      if (drawRafRef.current !== null) return
      drawRafRef.current = window.requestAnimationFrame(() => {
        drawRafRef.current = null
        drawFrame(pendingFrameRef.current)
      })
    }

    const onResize = () => {
      scheduleDraw(frameIndex.get())
    }

    window.addEventListener('resize', onResize)
    scheduleDraw(0)

    const unsubscribe = frameIndex.on('change', (latest) => {
      scheduleDraw(latest)
    })

    return () => {
      if (drawRafRef.current !== null) {
        window.cancelAnimationFrame(drawRafRef.current)
      }
      window.removeEventListener('resize', onResize)
      unsubscribe()
    }
  }, [frameIndex, isMobile, isReady])

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black"
      style={{ height: isMobile ? SECTION_HEIGHT_MOBILE : SECTION_HEIGHT_DESKTOP }}
      aria-label="Animação de produto Caseirices"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-black md:h-screen">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        <div className="pointer-events-none absolute left-0 right-0 top-[max(0.35rem,env(safe-area-inset-top))] z-10 px-3 sm:px-5">
          <div className="h-1.5 w-full overflow-hidden rounded-full border border-white/20 bg-black/22 backdrop-blur-sm">
            <m.div
              style={{ scaleX: acceleratedProgress, transformOrigin: 'left center' }}
              className="h-full w-full bg-[linear-gradient(90deg,#f59e0b,#ef4444)]"
            />
          </div>
        </div>

        {!isReady ? (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/96 text-white/75">
            <p className="text-xs uppercase tracking-[0.26em] text-white/65">Carregando experiência</p>
            <p className="mt-3 text-sm text-white/55">{Math.min(100, Math.round((loadedCount / FRAME_COUNT) * 100))}%</p>
          </div>
        ) : null}

        <div className="relative z-10 h-full w-full">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-2 top-1/2 z-30 -translate-y-1/2 sm:right-3 lg:right-5"
          >
            <div className="relative flex h-36 w-8 items-center justify-center rounded-[24px] border border-white/15 bg-white/6 shadow-[0_10px_20px_rgba(0,0,0,0.22)] backdrop-blur-xl lg:h-40 lg:w-9">
              <div className="flex h-[74%] flex-col items-center justify-between">
                {Array.from({ length: 18 }).map((_, index) => {
                  const distance = Math.abs(activeTick - index)
                  const isActive = distance === 0
                  const width = isActive ? 16 : Math.max(6, 16 - distance * 3)
                  const alpha = isActive ? 0.96 : Math.max(0.18, 0.9 - distance * 0.2)
                  return (
                    <span
                      key={`ruler-tick-${index}`}
                      className="block h-[2px] rounded-full transition-all duration-150"
                      style={{
                        width: `${width}px`,
                        backgroundColor: isActive ? 'rgba(193,18,31,0.96)' : `rgba(255,255,255,${alpha})`,
                        boxShadow: isActive ? '0 0 10px rgba(193,18,31,0.7)' : 'none',
                      }}
                    />
                  )
                })}
              </div>
            </div>
          </div>

          <m.div
            style={{ opacity: hintOpacity, y: hintY, scale: hintScale, x: '-50%' }}
            className={`pointer-events-none absolute left-1/2 z-30 flex flex-col items-center gap-3 ${isMobile ? 'top-[15px]' : 'top-[88px] lg:top-[108px]'}`}
          >
            <m.div
              animate={{ boxShadow: ['0 0 0 rgba(255,255,255,0)', '0 0 60px rgba(255,255,255,0.22)', '0 0 0 rgba(255,255,255,0)'] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className="liquid-glass liquid-glass-strong relative w-[calc(100%-2rem)] max-w-[740px] rounded-[20px] px-4 py-3 text-center sm:rounded-[26px] sm:px-8 sm:py-5"
            >
              <p className="text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-white/85 sm:text-[0.72rem] sm:tracking-[0.24em]">Experiência imersiva</p>
              <p className="mt-1 font-display text-[1.52rem] leading-none tracking-tight text-white sm:text-5xl">
                Role e se surpreenda
              </p>
            </m.div>
            <m.div
              className="hidden h-12 w-7 rounded-full border border-white/45 bg-white/10 p-1.5 shadow-[0_12px_30px_rgba(0,0,0,0.32)] backdrop-blur-md sm:block sm:h-14 sm:w-8"
            >
              <m.span
                animate={{ y: [0, 14, 0], opacity: [1, 0.82, 1] }}
                transition={{ duration: 1.35, repeat: Infinity, ease: 'easeInOut' }}
                className="mx-auto block h-2.5 w-2.5 rounded-full bg-white/90 sm:h-3 sm:w-3"
              />
            </m.div>
          </m.div>

          {narrativeBlocks.map((block) => {
            const mobilePlacement =
              block.key === 'intro' || block.key === 'tradição'
                ? 'top-[20%]'
                : block.key === 'explosão'
                  ? 'bottom-[21%]'
                  : 'bottom-[19%]'
            return (
              <div
                key={block.key}
                className={`absolute inset-x-0 ${isMobile ? mobilePlacement : ''}`}
                style={{ top: isMobile ? undefined : block.top }}
              >
                <NarrativeBlock block={block} progress={acceleratedProgress} isMobile={isMobile} />
              </div>
            )
          })}

          <m.div
            style={{ opacity: ctaOpacity, y: ctaY, scale: ctaScale, x: '-50%' }}
            className={`absolute left-1/2 flex w-[calc(100%-2.25rem)] max-w-[34rem] flex-col items-center gap-3 text-center sm:w-[calc(100%-2rem)] sm:max-w-[38rem] ${
              isMobile ? 'bottom-[max(1rem,env(safe-area-inset-bottom))] top-auto' : 'top-[74%]'
            }`}
          >
            <div className="liquid-glass liquid-glass-strong w-full rounded-[22px] px-3.5 py-4 sm:rounded-[24px] sm:px-6 sm:py-6">
              <h3 className="font-display text-[1.45rem] leading-[0.98] tracking-tight text-white/95 sm:text-[2.8rem]">
                CONHEÇA O SABOR CASEIRICES.
              </h3>
              <div className="mt-3 flex w-full justify-center sm:mt-4">
                <m.a
                  href={WHATSAPP_CTA_LINK}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                  className="rounded-full border border-[#FFB3BC]/70 bg-[linear-gradient(180deg,#E11D40,#B80F2A)] px-7 py-2.5 text-[0.9rem] font-bold uppercase tracking-[0.14em] text-white shadow-[0_14px_30px_rgba(200,16,46,0.5)] transition sm:px-10 sm:py-3.5 sm:text-sm"
                >
                  Comprar agora
                </m.a>
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  )
}
