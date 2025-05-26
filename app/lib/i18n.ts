export interface Translations {
  [key: string]: string | Translations
}

export class I18n {
  private static instance: I18n
  private currentLanguage = "en"
  private translations: Map<string, Translations> = new Map()
  private fallbackLanguage = "en"

  private constructor() {
    this.loadTranslations()
  }

  static getInstance(): I18n {
    if (!I18n.instance) {
      I18n.instance = new I18n()
    }
    return I18n.instance
  }

  private loadTranslations(): void {
    // English translations
    this.translations.set("en", {
      common: {
        loading: "Loading...",
        error: "An error occurred",
        save: "Save",
        cancel: "Cancel",
        delete: "Delete",
        edit: "Edit",
        view: "View",
      },
      auth: {
        login: "Login",
        logout: "Logout",
        signup: "Sign Up",
        email: "Email",
        password: "Password",
        username: "Username",
        forgotPassword: "Forgot Password?",
      },
      posts: {
        createPost: "Create Post",
        editPost: "Edit Post",
        deletePost: "Delete Post",
        likePost: "Like Post",
        sharePost: "Share Post",
        savePost: "Save Post",
      },
      writers: {
        writerOfTheWeek: "Writer of the Week",
        famousWriters: "Famous Writers",
        biography: "Biography",
        majorWorks: "Major Works",
        achievements: "Achievements",
      },
    })

    // Spanish translations
    this.translations.set("es", {
      common: {
        loading: "Cargando...",
        error: "Ocurrió un error",
        save: "Guardar",
        cancel: "Cancelar",
        delete: "Eliminar",
        edit: "Editar",
        view: "Ver",
      },
      auth: {
        login: "Iniciar Sesión",
        logout: "Cerrar Sesión",
        signup: "Registrarse",
        email: "Correo Electrónico",
        password: "Contraseña",
        username: "Nombre de Usuario",
        forgotPassword: "¿Olvidaste tu contraseña?",
      },
      posts: {
        createPost: "Crear Publicación",
        editPost: "Editar Publicación",
        deletePost: "Eliminar Publicación",
        likePost: "Me Gusta",
        sharePost: "Compartir",
        savePost: "Guardar",
      },
      writers: {
        writerOfTheWeek: "Escritor de la Semana",
        famousWriters: "Escritores Famosos",
        biography: "Biografía",
        majorWorks: "Obras Principales",
        achievements: "Logros",
      },
    })
  }

  setLanguage(language: string): void {
    if (this.translations.has(language)) {
      this.currentLanguage = language
      localStorage.setItem("preferred_language", language)
    }
  }

  getLanguage(): string {
    return this.currentLanguage
  }

  translate(key: string, params?: Record<string, string>): string {
    const keys = key.split(".")
    let translation: any = this.translations.get(this.currentLanguage)

    // Try current language
    for (const k of keys) {
      if (translation && typeof translation === "object" && k in translation) {
        translation = translation[k]
      } else {
        translation = null
        break
      }
    }

    // Fallback to default language
    if (!translation) {
      translation = this.translations.get(this.fallbackLanguage)
      for (const k of keys) {
        if (translation && typeof translation === "object" && k in translation) {
          translation = translation[k]
        } else {
          translation = key // Return key if no translation found
          break
        }
      }
    }

    // Replace parameters
    if (typeof translation === "string" && params) {
      Object.keys(params).forEach((param) => {
        translation = translation.replace(`{{${param}}}`, params[param])
      })
    }

    return typeof translation === "string" ? translation : key
  }
}

// React hook for translations
export const useTranslation = () => {
  const i18n = I18n.getInstance()

  return {
    t: (key: string, params?: Record<string, string>) => i18n.translate(key, params),
    language: i18n.getLanguage(),
    setLanguage: (lang: string) => i18n.setLanguage(lang),
  }
}
