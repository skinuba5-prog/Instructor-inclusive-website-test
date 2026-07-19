import { useEffect, useState } from 'react'
import type { ChangeEvent, FormEvent, ReactNode } from 'react'

// Contact.tsx와 동일한 Apps Script 웹 앱 주소 (문의 목록 조회·수정용으로도 사용).
const SHEET_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbzwvVIyF_ZkjbGzys5IzpKa1a9U1Yo3CCN4Ue8FVK0pk96u0FZ1I0hJ3J-AUCwY_s5XyA/exec'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD
const ADMIN_API_KEY = import.meta.env.VITE_ADMIN_API_KEY
const SESSION_KEY = 'admin_authenticated'

type Status = '신규 문의' | '연락 중' | '답변 완료' | '보류'

const STATUS_OPTIONS: Status[] = ['신규 문의', '연락 중', '답변 완료', '보류']

interface Inquiry {
  id: number
  organization: string
  contactName: string
  phone: string
  email: string
  schedule: string
  needs: string
  memo: string
  status: Status
  receivedAt: string
}

const statusStyles: Record<Status, string> = {
  '신규 문의': 'bg-[var(--primary-bg-subdued-hover)] text-[var(--primary-deep)]',
  '연락 중': 'bg-amber-100 text-amber-700',
  '답변 완료': 'bg-emerald-100 text-emerald-700',
  '보류': 'bg-slate-100 text-slate-500',
}

function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  )
}

function TotalIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 6h16M4 12h16M4 18h10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function NewIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2a6 6 0 00-6 6v3.586l-1.707 1.707A1 1 0 005 15h14a1 1 0 00.707-1.707L18 11.586V8a6 6 0 00-6-6z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M9 18a3 3 0 006 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function DoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 13l4 4L19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function StatCard({
  icon,
  value,
  label,
  className,
}: {
  icon: ReactNode
  value: number
  label: string
  className: string
}) {
  return (
    <div className={`rounded-[var(--radius-lg)] p-6 ${className}`}>
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70">
        {icon}
      </div>
      <p className="display-lg mt-4">{value}</p>
      <p className="body-md mt-1 opacity-80">{label}</p>
    </div>
  )
}

function formatReceivedAt(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="micro-cap text-[var(--ink-mute)]">{label}</dt>
      <dd className="body-md mt-1 text-[var(--ink)]">{value || '-'}</dd>
    </div>
  )
}

function DetailPanel({
  inquiry,
  onSaved,
}: {
  inquiry: Inquiry | null
  onSaved: () => void
}) {
  const [memoText, setMemoText] = useState(inquiry?.memo ?? '')
  const [statusSaving, setStatusSaving] = useState(false)
  const [memoSaving, setMemoSaving] = useState(false)
  const [saveError, setSaveError] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [replySending, setReplySending] = useState(false)
  const [replySuccess, setReplySuccess] = useState(false)
  const [replyError, setReplyError] = useState(false)

  useEffect(() => {
    setMemoText(inquiry?.memo ?? '')
    setSaveError(false)
    setReplyText('')
    setReplySuccess(false)
    setReplyError(false)
  }, [inquiry?.id])

  async function saveUpdate(patch: { status?: string; memo?: string }) {
    if (!inquiry) return
    setSaveError(false)
    try {
      const body = new URLSearchParams({
        action: 'update',
        key: ADMIN_API_KEY,
        id: String(inquiry.id),
        ...patch,
      })
      const res = await fetch(SHEET_ENDPOINT, { method: 'POST', body })
      const json = await res.json()
      if (json.result !== 'success') throw new Error(json.error)
      onSaved()
    } catch {
      setSaveError(true)
    }
  }

  const handleStatusChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    setStatusSaving(true)
    await saveUpdate({ status: e.target.value })
    setStatusSaving(false)
  }

  const handleMemoSave = async () => {
    setMemoSaving(true)
    await saveUpdate({ memo: memoText })
    setMemoSaving(false)
  }

  const handleSendReply = async () => {
    if (!inquiry || !replyText.trim()) return
    setReplySending(true)
    setReplySuccess(false)
    setReplyError(false)
    try {
      const body = new URLSearchParams({
        action: 'reply',
        key: ADMIN_API_KEY,
        id: String(inquiry.id),
        message: replyText,
      })
      const res = await fetch(SHEET_ENDPOINT, { method: 'POST', body })
      const json = await res.json()
      if (json.result !== 'success') throw new Error(json.error)
      setReplySuccess(true)
      setReplyText('')
      onSaved()
    } catch {
      setReplyError(true)
    } finally {
      setReplySending(false)
    }
  }

  if (!inquiry) {
    return (
      <div className="card-feature-light flex min-h-[240px] items-center justify-center text-center">
        <p className="body-lg text-[var(--ink-mute)]">
          왼쪽 목록에서 문의를 선택해주세요.
        </p>
      </div>
    )
  }

  return (
    <div className="card-feature-light h-fit">
      <h2 className="heading-lg text-[var(--ink)]">{inquiry.organization}</h2>

      <dl className="mt-6 space-y-4">
        <DetailRow label="담당자명" value={inquiry.contactName} />
        <DetailRow label="연락처" value={inquiry.phone} />
        <DetailRow label="이메일" value={inquiry.email} />
        <DetailRow label="희망 일정" value={inquiry.schedule} />
        <DetailRow
          label="접수 시각"
          value={formatReceivedAt(inquiry.receivedAt)}
        />
        <div>
          <dt className="micro-cap text-[var(--ink-mute)]">문의 내용</dt>
          <dd className="body-md mt-1.5 whitespace-pre-wrap text-[var(--ink)]">
            {inquiry.needs || '-'}
          </dd>
        </div>
      </dl>

      <div className="mt-6 border-t border-[var(--hairline)] pt-6">
        <label className="block">
          <span className="micro-cap text-[var(--ink-mute)]">상태</span>
          <select
            className="text-input mt-2"
            value={inquiry.status}
            disabled={statusSaving}
            onChange={handleStatusChange}
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        {statusSaving && (
          <p className="caption mt-1.5 text-[var(--ink-mute)]">저장 중...</p>
        )}
      </div>

      <div className="mt-6">
        <label className="block">
          <span className="micro-cap text-[var(--ink-mute)]">관리자 메모</span>
          <textarea
            rows={4}
            className="text-input mt-2 resize-none"
            value={memoText}
            onChange={(e) => setMemoText(e.target.value)}
          />
        </label>
        <button
          type="button"
          onClick={handleMemoSave}
          disabled={memoSaving}
          className="btn btn-secondary mt-3 w-full"
        >
          {memoSaving ? '저장 중...' : '메모 저장'}
        </button>
      </div>

      {saveError && (
        <p className="caption mt-3 text-[var(--ruby)]">
          저장에 실패했습니다. 다시 시도해주세요.
        </p>
      )}

      <div className="mt-6 border-t border-[var(--hairline)] pt-6">
        <h3 className="heading-sm text-[var(--ink)]">답장 보내기</h3>

        {inquiry.email ? (
          <>
            <textarea
              rows={5}
              className="text-input mt-3 resize-none"
              placeholder="답장 내용을 입력해주세요."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              disabled={replySending}
            />
            <button
              type="button"
              onClick={handleSendReply}
              disabled={replySending || !replyText.trim()}
              className="btn btn-primary mt-3 w-full"
            >
              {replySending ? '보내는 중...' : '답장 보내기'}
            </button>

            {replySuccess && (
              <p className="caption mt-2 text-[var(--primary-deep)]">
                답장을 성공적으로 보냈습니다.
              </p>
            )}
            {replyError && (
              <p className="caption mt-2 text-[var(--ruby)]">
                답장 발송에 실패했습니다. 다시 시도해주세요.
              </p>
            )}
          </>
        ) : (
          <p className="caption mt-2 text-[var(--ink-mute)]">
            신청자 이메일 정보가 없어 답장을 보낼 수 없습니다.
          </p>
        )}
      </div>
    </div>
  )
}

function Dashboard() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const loadInquiries = async () => {
    setLoading(true)
    setError(false)
    try {
      const res = await fetch(
        `${SHEET_ENDPOINT}?key=${encodeURIComponent(ADMIN_API_KEY)}`,
      )
      const json = await res.json()
      if (json.result !== 'success') throw new Error(json.error)
      setInquiries(json.data)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadInquiries()
  }, [])

  const selectedInquiry =
    inquiries.find((item) => item.id === selectedId) ?? null

  return (
    <div className="min-h-screen bg-[var(--canvas-soft)] px-6 py-16 md:px-10">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="display-md text-[var(--ink)]">관리자 대시보드</h1>
            <p className="body-lg mt-2 text-[var(--ink-secondary)]">
              접수된 강의 문의 목록입니다.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              sessionStorage.removeItem(SESSION_KEY)
              window.location.reload()
            }}
            className="btn btn-secondary"
          >
            로그아웃
          </button>
        </div>

        {!loading && !error && (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <StatCard
              icon={<TotalIcon />}
              value={inquiries.length}
              label="전체 문의"
              className="bg-slate-100 text-slate-700"
            />
            <StatCard
              icon={<NewIcon />}
              value={
                inquiries.filter((item) => item.status === '신규 문의').length
              }
              label="신규 문의"
              className="bg-[var(--primary-bg-subdued-hover)] text-[var(--primary-deep)]"
            />
            <StatCard
              icon={<DoneIcon />}
              value={
                inquiries.filter((item) => item.status === '답변 완료').length
              }
              label="답변 완료"
              className="bg-emerald-100 text-emerald-700"
            />
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
          <div className="card-feature-light overflow-x-auto">
            {loading ? (
              <p className="body-lg text-[var(--ink-secondary)]">
                불러오는 중...
              </p>
            ) : error ? (
              <p className="body-lg text-[var(--ruby)]">
                문의 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
              </p>
            ) : inquiries.length === 0 ? (
              <p className="body-lg text-[var(--ink-secondary)]">
                아직 접수된 문의가 없습니다.
              </p>
            ) : (
              <table className="w-full min-w-[560px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-[var(--hairline)]">
                    <th className="micro-cap px-3 py-3 text-[var(--ink-mute)]">
                      회사명
                    </th>
                    <th className="micro-cap px-3 py-3 text-[var(--ink-mute)]">
                      담당자명
                    </th>
                    <th className="micro-cap px-3 py-3 text-[var(--ink-mute)]">
                      상태
                    </th>
                    <th className="micro-cap px-3 py-3 text-[var(--ink-mute)]">
                      접수일시
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => setSelectedId(item.id)}
                      className={`cursor-pointer border-b border-l-4 border-[var(--hairline)] transition-colors last:border-0 hover:bg-[var(--canvas-soft)] ${
                        item.id === selectedId
                          ? 'border-l-[var(--primary)] bg-[var(--canvas-soft)]'
                          : 'border-l-transparent'
                      }`}
                    >
                      <td className="body-md px-3 py-3.5 text-[var(--ink)]">
                        {item.organization}
                      </td>
                      <td className="body-md px-3 py-3.5 text-[var(--ink)]">
                        {item.contactName}
                      </td>
                      <td className="px-3 py-3.5">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="body-md px-3 py-3.5 text-[var(--ink-secondary)]">
                        {formatReceivedAt(item.receivedAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <DetailPanel inquiry={selectedInquiry} onSaved={loadInquiries} />
        </div>
      </div>
    </div>
  )
}

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === 'true') {
      setAuthenticated(true)
    }
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'true')
      setAuthenticated(true)
      setError(false)
    } else {
      setError(true)
    }
  }

  if (authenticated) {
    return <Dashboard />
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--canvas-soft)] px-6">
      <form
        onSubmit={handleSubmit}
        className="card-feature-light w-full max-w-[380px]"
      >
        <span className="pill-tag-soft micro-cap">관리자</span>
        <h1 className="display-md mt-4 text-[var(--ink)]">
          비밀번호를 입력해주세요
        </h1>

        <label className="mt-8 block">
          <span className="micro-cap text-[var(--ink-mute)]">비밀번호</span>
          <input
            type="password"
            autoFocus
            className={`text-input mt-2 ${error ? 'text-input-error' : ''}`}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              if (error) setError(false)
            }}
          />
          {error && (
            <span className="caption mt-1.5 block text-[var(--ruby)]">
              비밀번호가 올바르지 않습니다.
            </span>
          )}
        </label>

        <button type="submit" className="btn btn-primary mt-6 w-full">
          입장하기
        </button>
      </form>
    </div>
  )
}
