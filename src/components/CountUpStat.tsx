import { useEffect, useRef, useState } from 'react'

function formatValue(value: number, decimals: number) {
  if (decimals > 0) return value.toFixed(decimals)
  return Math.round(value).toLocaleString('ko-KR')
}

export default function CountUpStat({
  target,
  decimals = 0,
  suffix = '',
  duration = 1400,
}: {
  target: number
  decimals?: number
  suffix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const animate = () => {
      if (started.current) return
      started.current = true

      const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      if (reduceMotion) {
        setValue(target)
        return
      }

      const start = performance.now()
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - (1 - progress) ** 3
        if (progress < 1) {
          setValue(target * eased)
          requestAnimationFrame(tick)
        } else {
          setValue(target)
        }
      }
      requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) animate()
      },
      { threshold: 0.4 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [target, duration])

  return (
    <span ref={ref}>
      {formatValue(value, decimals)}
      {suffix}
    </span>
  )
}
