import instructorPhoto from '../assets/instructor-photo.jpg'
import { badge, profile, stats } from '../data/instructor'

export default function ProfileCard() {
  return (
    <div className="reveal flex items-center justify-center px-6 py-16 md:px-10 lg:py-28">
      <div className="card-feature-light card-feature-floating w-full max-w-[420px]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-4">
            <img
              src={instructorPhoto}
              alt="박지훈 강사 프로필 사진"
              className="h-16 w-16 rounded-full object-cover ring-2 ring-[var(--canvas)] ring-offset-2 ring-offset-[var(--primary-bg-subdued-hover)]"
            />
            <div>
              <p className="micro-cap text-[var(--ink-mute)]">Name</p>
              <p className="heading-sm text-[var(--ink)]">{profile.name}</p>
            </div>
          </div>
          <span className="pill-tag-soft micro-cap shrink-0">{badge}</span>
        </div>

        <div className="mt-6 border-t border-[var(--hairline)] pt-6">
          <p className="micro-cap text-[var(--ink-mute)]">Role</p>
          <p className="body-md mt-1.5 text-[var(--ink)]">{profile.role}</p>
        </div>

        <ul className="mt-6 space-y-3 border-t border-[var(--hairline)] pt-6">
          {profile.points.map((point) => (
            <li key={point} className="flex gap-2.5">
              <span
                className="mt-2 block h-1 w-1 shrink-0 rounded-full bg-[var(--primary)]"
                aria-hidden="true"
              />
              <span className="body-md text-[var(--ink-secondary)]">
                {point}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-6 border-t border-[var(--hairline)] pt-6 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="body-tabular font-medium text-[var(--ink)]">
                {stat.value}
              </p>
              <p className="micro mt-0.5 text-[var(--ink-mute)]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
