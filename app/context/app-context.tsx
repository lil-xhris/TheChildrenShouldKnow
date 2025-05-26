"use client"

import type React from "react"

import { createContext, useContext, useReducer, type ReactNode } from "react"

interface AppState {
  theme: "light" | "dark"
  language: string
  notifications: boolean
  accessibility: {
    highContrast: boolean
    fontSize: string
    reducedMotion: boolean
  }
  user: any
  loading: boolean
  error: string | null
}

type AppAction =
  | { type: "SET_THEME"; payload: "light" | "dark" }
  | { type: "SET_LANGUAGE"; payload: string }
  | { type: "TOGGLE_NOTIFICATIONS" }
  | { type: "SET_ACCESSIBILITY"; payload: Partial<AppState["accessibility"]> }
  | { type: "SET_USER"; payload: any }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "CLEAR_ERROR" }

const initialState: AppState = {
  theme: "light",
  language: "en",
  notifications: true,
  accessibility: {
    highContrast: false,
    fontSize: "normal",
    reducedMotion: false,
  },
  user: null,
  loading: false,
  error: null,
}

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "SET_THEME":
      return { ...state, theme: action.payload }
    case "SET_LANGUAGE":
      return { ...state, language: action.payload }
    case "TOGGLE_NOTIFICATIONS":
      return { ...state, notifications: !state.notifications }
    case "SET_ACCESSIBILITY":
      return {
        ...state,
        accessibility: { ...state.accessibility, ...action.payload },
      }
    case "SET_USER":
      return { ...state, user: action.payload }
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "SET_ERROR":
      return { ...state, error: action.payload }
    case "CLEAR_ERROR":
      return { ...state, error: null }
    default:
      return state
  }
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
