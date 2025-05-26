export const generateCSRFToken = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export const validateCSRFToken = (token: string): boolean => {
  const storedToken = sessionStorage.getItem("csrf_token")
  return token === storedToken
}

export const setCSRFToken = (): string => {
  const token = generateCSRFToken()
  sessionStorage.setItem("csrf_token", token)
  return token
}
