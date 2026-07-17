import { useState } from 'react'
import { accentHues } from '../data/instructor'

export default function ProgramCard({
  index,
  program,
}: {
  index: number
  program: {
    title: string
    subtitle: string
    intro: string
    details: string[]
    outcome: string
    audience: string
    duration: string
  }
}) {
  const [open, setOpen] = useState(false)
  const accent = accentHues[index % accentHues.length]

  return (
    <div className="card-feature-light flex h-full flex-col">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`program-detail-${index}`}
        className="group flex w-full items-start justify-between gap-4 text-left"
      >
        <div>
          <span className="micro-cap">
            <span style={{ color: accent }}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="text-[var(--ink-mute)]"> · {program.subtitle}</span>
          </span>
          <h2 className="heading-md mt-4 text-[var(--ink)]">
            {program.title}
          </h2>
          <p className="body-md mt-4 text-[var(--ink-secondary)]">
            {program.intro}
          </p>
        </div>

        <span
          aria-hidden="true"
          className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--hairline-input)] text-[var(--ink)] transition-[transform,color,border-color] duration-300 ease-out group-hover:border-[var(--primary)] group-hover:text-[var(--primary)]"
          style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 1v12M1 7h12"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>

      <div
        id={`program-detail-${index}`}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="mt-6 border-t border-[var(--hairline)] pt-6">
            <p className="micro-cap text-[var(--ink-mute)]">세부 항목</p>
            <ul className="mt-3 space-y-2">
              {program.details.map((detail) => (
                <li key={detail} className="flex gap-2.5">
                  <span
                    className="mt-2 block h-1 w-1 shrink-0 rounded-full"
                    style={{ backgroundColor: accent }}
                    aria-hidden="true"
                  />
                  <span className="body-md text-[var(--ink-secondary)]">
                    {detail}
                  </span>
                </li>
              ))}
            </ul>

            <p className="micro-cap mt-6 text-[var(--ink-mute)]">결과물</p>
            <p className="body-md mt-1.5 text-[var(--ink-secondary)]">
              {program.outcome}
            </p>

            <div className="mt-6 border-t border-[var(--hairline)] pt-5">
              <p className="micro-cap text-[var(--ink-mute)]">대상 · 시간</p>
              <p className="body-tabular mt-1.5 text-[var(--ink)]">
                {program.audience} · {program.duration}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
