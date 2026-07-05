import { credentialTicker } from '../data/instructor'

export default function CredentialTicker() {
  return (
    <div className="ticker">
      <span className="sr-only">{credentialTicker.join(' · ')}</span>

      <div className="ticker-track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center">
            {credentialTicker.map((item) => (
              <span key={`${copy}-${item}`} className="ticker-item">
                {item}
                <span className="ticker-dot" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
