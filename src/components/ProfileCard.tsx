import instructorPhoto from '../assets/instructor-photo.jpg'
import { badge, profile, stats } from '../data/instructor'

export default function ProfileCard() {
  return (
    <div className="reveal flex items-center justify-center px-6 py-16 md:px-10 lg:py-24">
      <div className="card-feature-light w-full max-w-[420px]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-4">
            <img
              src={instructorPhoto}
              alt="박지훈 강사 프로필 사진"
              className="h-16 w-16 rounded-full object-cover"
            />
            <div>
              <p className="micro-cap text-[var(--ink-mute)]">Name</p>
              <p className="heading-sm text-[var(--ink)]">{profile.name}</p>
            </div>
          </div>
          <span className="pill-tag-soft micro-cap shrink-0">{badge}</span>
        </div>

        <div className="mt-5 border-t border-[var(--hairline)] pt-5">
          <p className="micro-cap text-[var(--ink-mute)]">Role</p>
          <p className="body-md mt-1 text-[var(--ink)]">{profile.role}</p>
        </div>

        <ul className="mt-5 space-y-2.5 border-t border-[var(--hairline)] pt-5">
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

        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-[var(--hairline)] pt-5 sm:grid-cols-4">
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
