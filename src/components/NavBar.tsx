import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import instructorPhoto from '../assets/instructor-photo.jpg'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `body-md transition-colors hover:text-[var(--ink)] ${
    isActive ? 'text-[var(--ink)]' : 'text-[var(--ink-mute)]'
  }`

export default function NavBar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="nav-bar-on-mesh sticky top-0 z-20">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src={instructorPhoto}
            alt=""
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="heading-sm text-[var(--ink)]">찰리남</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/" end className={navLinkClass}>
            소개
          </NavLink>
          <NavLink to="/programs" className={navLinkClass}>
            강의 프로그램
          </NavLink>
          <NavLink to="/contact" className="btn btn-primary">
            강의 문의
          </NavLink>
        </nav>

        <button
          type="button"
          aria-label="메뉴 열기"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] text-[var(--ink)] md:hidden"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            {open ? (
              <path
                d="M4 4l12 12M16 4L4 16"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M3 5.5h14M3 10h14M3 14.5h14"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="flex flex-col gap-4 border-t border-[var(--hairline)] bg-[var(--canvas)] px-6 py-5 md:hidden"
        >
          <NavLink
            to="/"
            end
            className={navLinkClass}
            onClick={() => setOpen(false)}
          >
            소개
          </NavLink>
          <NavLink
            to="/programs"
            className={navLinkClass}
            onClick={() => setOpen(false)}
          >
            강의 프로그램
          </NavLink>
          <NavLink
            to="/contact"
            className="btn btn-primary w-full"
            onClick={() => setOpen(false)}
          >
            강의 문의
          </NavLink>
        </div>
      )}
    </header>
  )
}
