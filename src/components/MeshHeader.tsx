import type { ReactNode } from 'react'
import CredentialTicker from './CredentialTicker'
import NavBar from './NavBar'

export default function MeshHeader({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <>
      <CredentialTicker />
      <div className={`relative overflow-hidden ${className}`}>
        <div className="gradient-mesh" />
        <div className="relative z-10">
          <NavBar />
          {children}
        </div>
      </div>
    </>
  )
}
