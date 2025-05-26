"use client"

import React from "react"

export interface SEOData {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: "website" | "article" | "profile"
  author?: string
  publishedTime?: string
  modifiedTime?: string
}

export class SEOManager {
  private static instance: SEOManager

  private constructor() {}

  static getInstance(): SEOManager {
    if (!SEOManager.instance) {
      SEOManager.instance = new SEOManager()
    }
    return SEOManager.instance
  }

  updateMetaTags(seoData: SEOData): void {
    if (typeof window === "undefined") return

    // Update title
    document.title = seoData.title

    // Update or create meta tags
    this.updateMetaTag("description", seoData.description)

    if (seoData.keywords) {
      this.updateMetaTag("keywords", seoData.keywords.join(", "))
    }

    // Open Graph tags
    this.updateMetaTag("og:title", seoData.title, "property")
    this.updateMetaTag("og:description", seoData.description, "property")
    this.updateMetaTag("og:type", seoData.type || "website", "property")

    if (seoData.image) {
      this.updateMetaTag("og:image", seoData.image, "property")
    }

    if (seoData.url) {
      this.updateMetaTag("og:url", seoData.url, "property")
    }

    // Twitter Card tags
    this.updateMetaTag("twitter:card", "summary_large_image", "name")
    this.updateMetaTag("twitter:title", seoData.title, "name")
    this.updateMetaTag("twitter:description", seoData.description, "name")

    if (seoData.image) {
      this.updateMetaTag("twitter:image", seoData.image, "name")
    }

    // Article specific tags
    if (seoData.type === "article") {
      if (seoData.author) {
        this.updateMetaTag("article:author", seoData.author, "property")
      }
      if (seoData.publishedTime) {
        this.updateMetaTag("article:published_time", seoData.publishedTime, "property")
      }
      if (seoData.modifiedTime) {
        this.updateMetaTag("article:modified_time", seoData.modifiedTime, "property")
      }
    }
  }

  private updateMetaTag(name: string, content: string, attribute: "name" | "property" = "name"): void {
    let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement

    if (!element) {
      element = document.createElement("meta")
      element.setAttribute(attribute, name)
      document.head.appendChild(element)
    }

    element.setAttribute("content", content)
  }

  generateStructuredData(type: "Article" | "Person" | "Organization", data: any): void {
    if (typeof window === "undefined") return

    const structuredData = {
      "@context": "https://schema.org",
      "@type": type,
      ...data,
    }

    let script = document.querySelector('script[type="application/ld+json"]')
    if (!script) {
      script = document.createElement("script")
      script.type = "application/ld+json"
      document.head.appendChild(script)
    }

    script.textContent = JSON.stringify(structuredData)
  }
}

// React hook for SEO
export const useSEO = (seoData: SEOData) => {
  React.useEffect(() => {
    const seoManager = SEOManager.getInstance()
    seoManager.updateMetaTags(seoData)
  }, [seoData])
}
