"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { apiService } from "../services/api"

const AuthContext = createContext(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
      apiService.setAuthToken(storedToken)
    }
    setIsLoading(false)
  }, [])

  const login = async (email, password) => {
    const response = await apiService.login(email, password)
    const { user: userData, token: userToken } = response.data

    setUser(userData)
    setToken(userToken)
    localStorage.setItem("token", userToken)
    localStorage.setItem("user", JSON.stringify(userData))
    apiService.setAuthToken(userToken)
  }

  const signup = async (email, password) => {
    const response = await apiService.signup(email, password)
    const { user: userData, token: userToken } = response.data

    setUser(userData)
    setToken(userToken)
    localStorage.setItem("token", userToken)
    localStorage.setItem("user", JSON.stringify(userData))
    apiService.setAuthToken(userToken)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    apiService.setAuthToken(null)
  }

  const value = {
    user,
    token,
    login,
    signup,
    logout,
    isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
