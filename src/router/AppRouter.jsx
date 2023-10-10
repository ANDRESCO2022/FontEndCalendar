import { Routes, Route, Navigate } from 'react-router-dom'
import { LoginPages } from '../auth'
import { CalendarPages } from '../calendar'
import { useAuthStore } from '../hooks'
import { useEffect } from 'react'
export const AppRouter = () => {
  // const authStatus = 'not-authenticated'
  const { checkAuthToken, status } = useAuthStore()
  useEffect(() => {
    checkAuthToken()
  }, [])

  if (status === 'checking') {
    return <h3>Cargando...</h3>
  }

  return (
    <Routes>
      {status === 'not-authenticated' ? (
        <>
          <Route path="/auth/*" element={<LoginPages />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<CalendarPages />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  )
}
