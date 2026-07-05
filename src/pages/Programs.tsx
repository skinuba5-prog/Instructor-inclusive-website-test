import { Link } from 'react-router-dom'
import MeshHeader from '../components/MeshHeader'
import ProgramCard from '../components/ProgramCard'
import { clients, programs } from '../data/instructor'

export default function Programs() {
  return (
    <div>
      <MeshHeader>
        <div className="reveal mx-auto max-w-[1200px] px-6 py-16 md:px-10 lg:py-20">
          <span className="pill-tag-soft micro-cap">강의 프로그램</span>
          <h1 className="page-title mt-5 max-w-[20ch] text-[var(--ink)]">
            기업 맞춤형 AI 교육 프로그램
          </h1>
          <p className="body-lg mt-4 max-w-[54ch] text-[var(--ink-secondary)]">
            실무자 기초부터 리더 대상 키노트까지, 조직의 상황에 맞춰 구성해
            진행합니다.
          </p>
        </div>
      </MeshHeader>

      <section className="bg-[var(--canvas)] px-6 py-16 md:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 sm:grid-cols-2">
          {programs.map((program, i) => (
            <ProgramCard key={program.title} index={i} program={program} />
          ))}
        </div>
      </section>

      <section className="bg-[var(--canvas-soft)] px-6 py-16 md:px-10 lg:py-20">
        <div className="mx-auto max-w-[1200px]">
          <p className="micro-cap text-[var(--ink-mute)]">출강 이력</p>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
            {clients.map((client) => (
              <li
                key={client.name}
                className="body-md text-[var(--ink-secondary)]"
              >
                {client.name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[var(--canvas)] px-6 py-16 text-center md:px-10 lg:py-20">
        <h2 className="display-md text-[var(--ink)]">
          우리 조직에 맞는 구성이 궁금하신가요?
        </h2>
        <div className="mt-6 flex justify-center">
          <Link to="/contact" className="btn btn-primary">
            강의 문의하기
          </Link>
        </div>
      </section>
    </div>
  )
}
