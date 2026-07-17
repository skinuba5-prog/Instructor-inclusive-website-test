import { Link } from 'react-router-dom'
import { positioning } from '../data/instructor'

export default function Hero() {
  return (
    <div className="reveal flex flex-col items-start justify-start px-6 py-16 md:px-10 lg:py-28">
      <span className="pill-tag-soft micro-cap">박지훈 · AI 교육 강사</span>

      <h1 className="hero-headline mt-6 text-[var(--ink)]">
        {positioning.headline}
      </h1>

      <p className="body-lg mt-7 max-w-[46ch] text-[var(--ink-secondary)]">
        {positioning.sub.join(' ')}
      </p>

      <div className="mt-11 flex flex-wrap items-center gap-6">
        <Link to="/contact" className="btn btn-primary">
          강의 문의하기
        </Link>
        <Link to="/programs" className="link-on-light">
          강의 프로그램 보기
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M3.5 8h9M8.5 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  )
}
