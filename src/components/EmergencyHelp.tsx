import { Phone, AlertTriangle } from 'lucide-react'

interface EmergencyHelpProps {
  compact?: boolean
}

export function EmergencyHelp({ compact = false }: EmergencyHelpProps) {
  return (
    <div
      className={'emergency-card'}
    >
      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[#140D20]">
        <AlertTriangle size={14} />
        <span>Need immediate help?</span>
      </div>
      <a
        href="tel:911"
        className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-all disabled:opacity-50 btn-gradient rounded-full text-white"
      >
        <Phone size={12} />
        911
      </a>
      <p className="mb-3 mt-2 text-xs text-[#140D20]/70">
        Contact your local emergency service.
      </p>
      {!compact && (
        <p className="mt-3 max-w-[250px] text-[11px] text-[#140D20]">
          <strong>Disclaimer:</strong> SexEdXpert provides educational information and is not a
          replacement for medical care or emergency services.
        </p>
      )}
    </div>
  )
}

export function Disclaimer() {
  return (
    <p className="text-center text-[11px] text-[#140D20]">
      Disclaimer: SexEdXpert provides educational information and is not a
      replacement for medical care or emergency services.
    </p>
  )
}
