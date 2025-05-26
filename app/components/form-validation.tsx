export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: string) => string | null
}

export interface ValidationErrors {
  [key: string]: string
}

export const validateField = (value: string, rules: ValidationRule): string | null => {
  if (rules.required && (!value || value.trim() === "")) {
    return "This field is required"
  }

  if (value && rules.minLength && value.length < rules.minLength) {
    return `Must be at least ${rules.minLength} characters`
  }

  if (value && rules.maxLength && value.length > rules.maxLength) {
    return `Must be no more than ${rules.maxLength} characters`
  }

  if (value && rules.pattern && !rules.pattern.test(value)) {
    return "Invalid format"
  }

  if (value && rules.custom) {
    return rules.custom(value)
  }

  return null
}

export const validateForm = (data: Record<string, string>, rules: Record<string, ValidationRule>): ValidationErrors => {
  const errors: ValidationErrors = {}

  Object.keys(rules).forEach((field) => {
    const error = validateField(data[field] || "", rules[field])
    if (error) {
      errors[field] = error
    }
  })

  return errors
}

// Common validation rules
export const emailRule: ValidationRule = {
  required: true,
  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  custom: (value) => {
    if (value && !value.includes("@")) {
      return "Please enter a valid email address"
    }
    return null
  },
}

export const passwordRule: ValidationRule = {
  required: true,
  minLength: 8,
  custom: (value) => {
    if (value && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
      return "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    }
    return null
  },
}

export const usernameRule: ValidationRule = {
  required: true,
  minLength: 3,
  maxLength: 20,
  pattern: /^[a-zA-Z0-9_]+$/,
  custom: (value) => {
    if (value && /^[0-9]/.test(value)) {
      return "Username cannot start with a number"
    }
    return null
  },
}
