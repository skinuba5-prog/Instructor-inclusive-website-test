import { Link } from 'react-router-dom'
import { positioning } from '../data/instructor'

export default function Hero() {
  return (
    <div className="reveal flex flex-col items-start justify-center px-6 py-16 md:px-10 lg:py-24">
      <span className="pill-tag-soft micro-cap">박지훈 · AI 교육 강사</span>

      <h1 className="hero-headline mt-5 text-[var(--ink)]">
        {positioning.headline}
      </h1>

      <p className="body-lg mt-6 max-w-[46ch] text-[var(--ink-secondary)]">
        {positioning.sub.join(' ')}
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Link to="/contact" className="btn btn-primary">
          강의 문의하기
        </Link>
        <Link to="/programs" className="btn btn-secondary">
          강의 프로그램 보기
        </Link>
      </div>
    </div>
  )
}
