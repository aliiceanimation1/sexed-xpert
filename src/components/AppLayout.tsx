import { useEffect, useState } from 'react'
import {
  Bookmark,
  Globe,
  LayoutGrid,
  Lock,
  MapPin,
  Menu,
  MessageCircle,
  MessageSquarePlus,
  X,
} from 'lucide-react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import logoImg from '../assets/images/logo.png'
import { useAppStore } from '../store/useAppStore'
import { EmergencyHelp } from './EmergencyHelp'
import { LogoInline } from './Logo'

const NAV_ITEMS = [
  { to: '/app/chat', icon: MessageCircle, label: 'Chat' },
  { to: '/app/topics', icon: LayoutGrid, label: 'Topics' },
  { to: '/app/saved', icon: Bookmark, label: 'Saved' },
  { to: '/app/clinic', icon: MapPin, label: 'Find a clinic' },
]

export function AppLayout() {
  const startNewChat = useAppStore((s) => s.startNewChat)
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 992px)')

    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) setSidebarOpen(false)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div className="flex h-screen overflow-hidden chat-screen-wrapper">
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/30 min-[992px]:hidden"
          onClick={closeSidebar}
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`app-sidebar flex w-[280px] shrink-0 flex-col bg-transparent transition-transform duration-300 ease-in-out max-[991px]:fixed max-[991px]:inset-y-0 max-[991px]:left-0 max-[991px]:z-40 max-[991px]:shadow-xl min-[992px]:relative min-[992px]:translate-x-0 ${
          sidebarOpen ? 'max-[991px]:translate-x-0' : 'max-[991px]:-translate-x-full'
        }`}
      >
        <div className="p-5">
          <LogoInline />
        </div>

        <div className="p-3">
          <button
            type="button"
            onClick={() => {
              startNewChat()
              closeSidebar()
            }}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#FFFFFF]/29 border-1 border-[#FFFFFF] py-2.5 text-sm font-medium text-[#4C4C4C] transition hover:bg-[#634ffb]/15"
          >
            <MessageSquarePlus size={16} />
            New chat
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `sidebar-item flex items-center gap-3 px-3 py-2.5 text-sm ${isActive ? 'active' : 'text-[#4e4e4e]'
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3">
          <EmergencyHelp compact />
        </div>

        <div className="flex items-center justify-between border-t border-[#634ffb]/5 px-4 py-3 text-xs text-[#140D20]">
          <span className="flex items-center gap-1.5">
            <Lock size={12} />
            Anonymous session
          </span>
        </div>
      </aside>

      <div className="relative flex flex-1 flex-col bg-[#ffffff] shadow-lg overflow-hidden min-[992px]:rounded-tl-[24px] min-[992px]:rounded-bl-[24px]">
        <header className="flex flex-col gap-1.5 border-b border-[#E7D8EB]/60 px-3 py-2 min-[576px]:flex-row min-[576px]:items-center min-[576px]:justify-between min-[576px]:gap-2 min-[576px]:border-b-0 min-[576px]:px-4">
          <div className="flex items-center justify-between w-full gap-2">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <button
                type="button"
                onClick={() => setSidebarOpen((open) => !open)}
                className="flex min-[992px]:hidden shrink-0 items-center justify-center rounded-lg p-1.5 text-[#140D20] hover:bg-black/5 min-[576px]:p-2"
                aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={sidebarOpen}
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <img
                src={logoImg}
                alt="SexEdXpert"
                className="h-8 w-8 shrink-0 min-[576px]:h-10 min-[576px]:w-10"
              />
              <div className="min-w-0">
                <p className="m-0 truncate text-sm font-bold text-[#140D20]">SexEdXpert</p>
                <p className="m-0 hidden text-xs text-[#5F4E63] min-[576px]:block">
                  <span className="text-[#00C950]">•</span> Anonymous · End-to-end private
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                className="flex cursor-pointer items-center gap-1 rounded-full border-1 border-[#E7D8EB] bg-[#FFFFFF] px-2 py-1.5 text-xs font-medium text-[#140D20] hover:bg-black/5 min-[576px]:gap-1.5 min-[576px]:px-3"
                aria-label="Change language"
              >
                <Globe size={14} />
                <span className="hidden min-[576px]:inline">EN</span>
              </button>
              <button
                type="button"
                onClick={() => window.open('https://www.google.com', '_blank')}
                className="cursor-pointer rounded-full bg-[#EE0F1F]/10 px-2 py-1.5 text-[11px] font-medium text-[#EE0F1F] hover:bg-black/5 min-[576px]:px-3 min-[576px]:text-xs"
              >
                <span className="min-[576px]:hidden">Exit</span>
                <span className="hidden min-[576px]:inline">Panic exit</span>
              </button>
            </div>
          </div>

          <p className="m-0 pl-10 text-[11px] leading-tight text-[#5F4E63] min-[576px]:hidden">
            <span className="text-[#00C950]">•</span> Anonymous · End-to-end private
          </p>
        </header>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
