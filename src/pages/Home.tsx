import CountUpStat from '../components/CountUpStat'
import Hero from '../components/Hero'
import MeshHeader from '../components/MeshHeader'
import ProfileCard from '../components/ProfileCard'
import { accentHues, clients, trustStats } from '../data/instructor'

export default function Home() {
  return (
    <div>
      <MeshHeader>
        <main className="mx-auto grid max-w-[1200px] grid-cols-1 md:grid-cols-2">
          <Hero />
          <ProfileCard />
        </main>
      </MeshHeader>

      <section className="bg-[var(--brand-dark-900)] px-6 py-16 md:px-10 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <span className="pill-tag-soft micro-cap">숫자로 보는 신뢰</span>

          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {trustStats.map((stat, i) => (
              <div key={stat.label}>
                <span
                  className="stat-accent"
                  style={{ backgroundColor: accentHues[i % accentHues.length] }}
                  aria-hidden="true"
                />
                <p className="stat-number mt-3 text-[var(--on-primary)]">
                  <CountUpStat
                    target={stat.target}
                    decimals={stat.decimals}
                    suffix={stat.suffix}
                  />
                </p>
                <p className="micro-cap mt-2 text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--canvas-soft)] px-6 py-16 md:px-10 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <span className="pill-tag-soft micro-cap">출강 이력</span>
          <h2 className="display-lg mt-5 text-[var(--ink)]">출강한 곳</h2>

          <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {clients.map((client, i) => (
              <div key={client.name} className="client-card">
                <span
                  className="logo-badge"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${accentHues[i % accentHues.length]} 16%, white)`,
                    color: accentHues[i % accentHues.length],
                  }}
                >
                  {client.initial}
                </span>
                <p className="body-md mt-3 text-[var(--ink-secondary)]">
                  {client.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
