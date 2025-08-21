import type { PropsWithChildren } from 'react'

type ScriptProps = {
  async?: boolean
  defer?: boolean
  nonce?: string
  trustedtypes?: boolean
}

type GoogleReCaptchaProviderProps = PropsWithChildren<{
  siteKey: string
  language?: string
  script?: ScriptProps
}>

type Grecaptcha = {
  execute: (siteKey: string, params: { action?: string }) => Promise<string>
}

type GoogleReCaptchaContextType = {
  isLoading: boolean
  error: string | null | undefined
  execute: (action?: string) => Promise<string>
}

export type { GoogleReCaptchaProviderProps, Grecaptcha, GoogleReCaptchaContextType }
