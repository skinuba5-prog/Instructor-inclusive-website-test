import { useState } from 'react'
import type { ChangeEvent, FormEvent, ReactNode } from 'react'
import MeshHeader from '../components/MeshHeader'
import { contact } from '../data/instructor'

// Google Sheets에 문의 내용을 한 줄씩 쌓아주는 Apps Script 웹 앱 주소.
const SHEET_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbzwvVIyF_ZkjbGzys5IzpKa1a9U1Yo3CCN4Ue8FVK0pk96u0FZ1I0hJ3J-AUCwY_s5XyA/exec'

const initialForm = {
  organization: '',
  contactName: '',
  phone: '',
  audience: '',
  schedule: '',
  needs: '',
}

type FormState = typeof initialForm

const requiredFields: (keyof FormState)[] = [
  'organization',
  'contactName',
  'phone',
  'needs',
]

const fieldLabels: Record<keyof FormState, string> = {
  organization: '기관/회사명',
  contactName: '담당자 성함',
  phone: '연락처',
  audience: '교육 대상·인원',
  schedule: '희망 일정',
  needs: '어떤 교육이 필요한지',
}

function Field({
  label,
  required,
  error,
  className,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  className?: string
  children: ReactNode
}) {
  return (
    <label className={`block ${className ?? ''}`}>
      <span className="micro-cap text-[var(--ink-mute)]">
        {label}
        {required && <span className="text-[var(--primary)]"> *</span>}
      </span>
      <span className="mt-2 block">{children}</span>
      {error && (
        <span className="caption mt-1.5 block text-[var(--ruby)]">
          {error}
        </span>
      )}
    </label>
  )
}

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, boolean>>>(
    {},
  )
  const [submitted, setSubmitted] = useState(false)

  const update =
    (key: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }))
      setErrors((prev) => (prev[key] ? { ...prev, [key]: false } : prev))
    }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const nextErrors: Partial<Record<keyof FormState, boolean>> = {}
    for (const field of requiredFields) {
      if (!form[field].trim()) nextErrors[field] = true
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    const subject = `강의 문의 - ${form.organization} (${form.contactName})`
    const body = [
      `기관/회사명: ${form.organization}`,
      `담당자 성함: ${form.contactName}`,
      `연락처: ${form.phone}`,
      `교육 대상·인원: ${form.audience}`,
      `희망 일정: ${form.schedule}`,
      '',
      '어떤 교육이 필요한지:',
      form.needs,
    ].join('\n')

    // Google 시트 기록은 실패해도 문의 접수 흐름(메일 전송)을 막지 않도록
    // 조용히 시도만 한다.
    fetch(SHEET_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      body: new URLSearchParams(form),
    }).catch(() => {})

    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSubmitted(true)
  }

  return (
    <div>
      <MeshHeader>
        <div className="reveal mx-auto max-w-[1200px] px-6 py-16 md:px-10 lg:py-24">
          <span className="pill-tag-soft micro-cap">강의 문의</span>
          <h1 className="page-title mt-6 max-w-[20ch] text-[var(--ink)]">
            섭외 문의는 아래 내용으로 받고 있습니다
          </h1>
          <p className="body-lg mt-5 max-w-[54ch] text-[var(--ink-secondary)]">
            조직 규모, 대상 직무, 원하는 시간대를 알려주시면 빠르게
            답변드립니다.
          </p>
        </div>
      </MeshHeader>

      <section className="bg-[var(--canvas)] px-6 py-16 md:px-10 lg:py-24">
        {submitted ? (
          <div className="card-feature-light mx-auto max-w-[560px] text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--primary-bg-subdued-hover)]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 13l4 4L19 7"
                  stroke="var(--primary-deep)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h2 className="display-md mt-6 text-[var(--ink)]">
              문의가 접수되었어요
            </h2>
            <p className="body-lg mt-3 text-[var(--ink-secondary)]">
              1~2일 안에 연락드릴게요.
            </p>

            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="btn btn-secondary mt-8"
            >
              다시 작성하기
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="card-feature-light mx-auto max-w-[720px]"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Field
                label={fieldLabels.organization}
                required
                error={errors.organization ? '기관/회사명을 입력해주세요.' : undefined}
              >
                <input
                  type="text"
                  className={`text-input ${errors.organization ? 'text-input-error' : ''}`}
                  placeholder="예: 세인투"
                  value={form.organization}
                  onChange={update('organization')}
                />
              </Field>

              <Field
                label={fieldLabels.contactName}
                required
                error={errors.contactName ? '담당자 성함을 입력해주세요.' : undefined}
              >
                <input
                  type="text"
                  className={`text-input ${errors.contactName ? 'text-input-error' : ''}`}
                  placeholder="예: 홍길동"
                  value={form.contactName}
                  onChange={update('contactName')}
                />
              </Field>

              <Field
                label={fieldLabels.phone}
                required
                error={errors.phone ? '연락처를 입력해주세요.' : undefined}
              >
                <input
                  type="tel"
                  className={`text-input ${errors.phone ? 'text-input-error' : ''}`}
                  placeholder="010-0000-0000"
                  value={form.phone}
                  onChange={update('phone')}
                />
              </Field>

              <Field label={fieldLabels.audience}>
                <input
                  type="text"
                  className="text-input"
                  placeholder="예: 신입사원 30명"
                  value={form.audience}
                  onChange={update('audience')}
                />
              </Field>

              <Field label={fieldLabels.schedule} className="sm:col-span-2">
                <input
                  type="text"
                  className="text-input"
                  placeholder="예: 2026년 3월 중"
                  value={form.schedule}
                  onChange={update('schedule')}
                />
              </Field>

              <Field
                label={fieldLabels.needs}
                required
                className="sm:col-span-2"
                error={errors.needs ? '어떤 교육이 필요한지 적어주세요.' : undefined}
              >
                <textarea
                  rows={5}
                  className={`text-input resize-none ${errors.needs ? 'text-input-error' : ''}`}
                  placeholder="현재 상황과 원하시는 교육 방향을 자유롭게 적어주세요."
                  value={form.needs}
                  onChange={update('needs')}
                />
              </Field>
            </div>

            <button type="submit" className="btn btn-primary mt-8 w-full">
              문의 보내기
            </button>

            <p className="caption mt-3.5 text-[var(--ink-mute)]">
              보내기를 누르면 작성하신 내용이 담긴 이메일 앱이 열립니다.
              이메일 앱이 열리지 않으면 {contact.email} 로 직접 보내주세요.
            </p>
          </form>
        )}
      </section>
    </div>
  )
}
