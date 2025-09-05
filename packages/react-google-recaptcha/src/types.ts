import type { PropsWithChildren } from 'react'

// grecaptcha APIを公式の定義に則って定義する
// https://developers.google.com/recaptcha/docs/invisible#js_api

export type Theme = 'light' | 'dark'
export type Type = 'image' | 'audio'
export type Size = 'normal' | 'compact' | 'invisible'
export type Badge = 'bottomright' | 'bottomleft' | 'inline'

export type Parameters = {
  sitekey: string
  badge?: Badge
  size?: Size
  theme?: Theme
  callback?: (token: string) => void
  'error-callback'?: (error?: Error) => void
}

export type GoogleReCaptchaProviderProps = PropsWithChildren<{
  readonly siteKey: string
  readonly language?: string | null
  readonly useRecaptchaNet?: boolean
  readonly useEnterprise?: boolean
  readonly container?: string | HTMLElement | null
  readonly badge?: Badge
  readonly theme?: Theme
}>

export type Action = {
  action: string
}

export type Grecaptcha = {
  ready: (onReady: () => void) => void
  render: (container: string | HTMLElement, params: Parameters) => string
  execute: (widgetId: string, params?: Action) => Promise<string | null>
  reset: (widgetId: string) => void
}

export type GoogleReCaptchaContextType = {
  readonly isLoading: boolean
  readonly error: Error | null
  execute: (action?: string) => Promise<string>
  reset: () => void
}

declare global {
  var grecaptcha: Grecaptcha & {
    enterprise: Grecaptcha
  }
}
