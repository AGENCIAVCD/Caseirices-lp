import { m, useReducedMotion } from 'framer-motion'

export function SectionReveal({ as = 'section', className = '', delay = 0, children, ...props }) {
  const shouldReduceMotion = useReducedMotion()
  const MotionTag = m[as] ?? m.section

  const variants = shouldReduceMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 },
      }
    : {
        hidden: { opacity: 0, y: 32 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.55,
            ease: [0.2, 0.65, 0.3, 0.9],
            delay,
          },
        },
      }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.15, once: true }}
      variants={variants}
      {...props}
    >
      {children}
    </MotionTag>
  )
}
