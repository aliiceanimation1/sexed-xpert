import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { OnboardingFlow } from './pages/OnboardingFlow'
import { ChatPage } from './pages/ChatPage'
import { TopicsPage } from './pages/TopicsPage'
import { SavedPage } from './pages/SavedPage'
import { ClinicPage } from './pages/ClinicPage'
import { useAppStore } from './store/useAppStore'

function AppRoutes() {
  const onboardingComplete = useAppStore((s) => s.onboardingComplete)

  if (!onboardingComplete) {
    return <OnboardingFlow />
  }

  return (
    <Routes>
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<Navigate to="chat" replace />} />
        <Route path="chat" element={<ChatPage />} />
        <Route path="topics" element={<TopicsPage />} />
        <Route path="saved" element={<SavedPage />} />
        <Route path="clinic" element={<ClinicPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/app/chat" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
