export type ValidationResult = {
  isValid: boolean
  errors: string[]
}

export class Validator {
  static email(email: string): ValidationResult {
    const errors: string[] = []

    if (!email) {
      errors.push("Email is required")
    } else {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push("Invalid email format")
      }
      if (email.length > 254) {
        errors.push("Email is too long")
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  static password(password: string): ValidationResult {
    const errors: string[] = []

    if (!password) {
      errors.push("Password is required")
    } else {
      if (password.length < 8) {
        errors.push("Password must be at least 8 characters long")
      }
      if (!/(?=.*[a-z])/.test(password)) {
        errors.push("Password must contain at least one lowercase letter")
      }
      if (!/(?=.*[A-Z])/.test(password)) {
        errors.push("Password must contain at least one uppercase letter")
      }
      if (!/(?=.*\d)/.test(password)) {
        errors.push("Password must contain at least one number")
      }
      if (!/(?=.*[@$!%*?&])/.test(password)) {
        errors.push("Password must contain at least one special character")
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  static username(username: string): ValidationResult {
    const errors: string[] = []

    if (!username) {
      errors.push("Username is required")
    } else {
      if (username.length < 3) {
        errors.push("Username must be at least 3 characters long")
      }
      if (username.length > 20) {
        errors.push("Username must be no more than 20 characters long")
      }
      if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        errors.push("Username can only contain letters, numbers, and underscores")
      }
      if (/^[0-9]/.test(username)) {
        errors.push("Username cannot start with a number")
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  static postContent(content: string[]): ValidationResult {
    const errors: string[] = []

    if (!content || content.length === 0) {
      errors.push("Post content is required")
    } else {
      const totalLength = content.join("").length
      if (totalLength > 5000) {
        errors.push("Post content is too long (maximum 5000 characters)")
      }
      if (totalLength < 10) {
        errors.push("Post content is too short (minimum 10 characters)")
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }
}
