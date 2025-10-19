import React from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = React.createContext(null)
const AUTH_KEY = 'ambara_auth'

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [user, setUser] = React.useState(() => {
    const raw = localStorage.getItem(AUTH_KEY)
    return raw ? JSON.parse(raw) : null
  })

  const login = (userObj) => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(userObj))
    setUser(userObj)
    if (userObj.role === 'admin') navigate('/admin/dashboard', { replace: true })
    else navigate('/user/dashboard', { replace: true })
  }

  const logout = () => {
    localStorage.removeItem(AUTH_KEY)
    setUser(null)
    navigate('/login', { replace: true })
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return React.useContext(AuthContext)
}
