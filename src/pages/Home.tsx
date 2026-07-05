import CountUpStat from '../components/CountUpStat'
import Hero from '../components/Hero'
import MeshHeader from '../components/MeshHeader'
import ProfileCard from '../components/ProfileCard'
import { clients, trustStats } from '../data/instructor'

export default function Home() {
  return (
    <div>
      <MeshHeader className="min-h-svh">
        <main className="mx-auto grid max-w-[1200px] grid-cols-1 lg:grid-cols-2">
          <Hero />
          <ProfileCard />
        </main>
      </MeshHeader>

      <section className="bg-[var(--brand-dark-900)] px-6 py-16 md:px-10 lg:py-20">
        <div className="mx-auto max-w-[1200px]">
          <span className="pill-tag-soft micro-cap">숫자로 보는 신뢰</span>

          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {trustStats.map((stat) => (
              <div key={stat.label}>
                <p className="stat-number text-[var(--on-primary)]">
                  <CountUpStat
                    target={stat.target}
                    decimals={stat.decimals}
                    suffix={stat.suffix}
                  />
                </p>
                <p className="body-md mt-2 text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--canvas-soft)] px-6 py-16 md:px-10 lg:py-20">
        <div className="mx-auto max-w-[1200px]">
          <span className="pill-tag-soft micro-cap">출강 이력</span>
          <h2 className="display-md mt-4 text-[var(--ink)]">출강한 곳</h2>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {clients.map((client) => (
              <div key={client.name} className="client-card">
                <span className="logo-badge">{client.initial}</span>
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
