import { type Context, createContext, type JSX, useCallback, useEffect, useMemo, useState } from 'react'
import type { GoogleReCaptchaContextType, GoogleReCaptchaProviderProps, Grecaptcha } from './types'

const GoogleReCaptchaContext: Context<GoogleReCaptchaContextType | undefined> = createContext<GoogleReCaptchaContextType | undefined>(undefined)

type State = {
  isLoading: boolean
  error?: string | null
  grecaptcha?: Grecaptcha | null
}

const GoogleReCaptchaProvider = ({ siteKey, language, script, children }: GoogleReCaptchaProviderProps): JSX.Element => {
  const [state, setState] = useState<State>({ isLoading: true })

  // loaded script
  const onLoad = useCallback(() => {
    if (!window || !(window as any).grecaptcha) {
      setState({
        isLoading: false,
        error: 'ReCaptcha is not available',
      })
      return
    }
    const tmp = (window as any).grecaptcha
    tmp.ready(() => {
      setState({
        grecaptcha: tmp,
        error: null,
        isLoading: false,
      })
    })
  }, [])

  const execute = useCallback(
    async (action?: string) => {
      const grecaptcha = state?.grecaptcha
      if (grecaptcha?.execute) {
        return await grecaptcha.execute(siteKey, { action })
      }
      throw new Error('aaaReCaptcha is not available')
    },
    [siteKey, state.grecaptcha],
  )

  useEffect(() => {
    if (!isScriptInjected(siteKey)) {
      injectScriptTag(siteKey, language, script?.async ?? true, script?.defer ?? true, script?.nonce, script?.trustedtypes ?? false, onLoad)
    }

    return () => {
      removeScriptTag(siteKey)
    }
  }, [onLoad, siteKey, language, script])

  const value: GoogleReCaptchaContextType = useMemo(
    () => ({
      isLoading: state.isLoading,
      error: state.error,
      execute,
    }),
    [state, execute],
  )

  return <GoogleReCaptchaContext.Provider value={value}>{children}</GoogleReCaptchaContext.Provider>
}

const isScriptInjected = (siteKey: string) => {
  return !!document.getElementById(siteKey)
}

const injectScriptTag = (
  siteKey: string,
  language: string | undefined,
  async: boolean,
  defer: boolean,
  nonce: string | undefined,
  trustedtypes: boolean,
  onLoad: () => void,
) => {
  const script = document.createElement('script')
  script.id = siteKey
  script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}${language ? '&hl=${language}' : ''}${trustedtypes ? '&trustedtypes=true' : ''}`
  script.async = async
  script.defer = defer
  if (nonce) {
    script.nonce = nonce
  }
  script.type = 'text/javascript'
  script.onload = onLoad

  const head = document.getElementsByTagName('head')[0]
  head.appendChild(script)
}

const removeScriptTag = (siteKey: string) => {
  if (!document) {
    return
  }

  removeRecaptchBadge()

  let script = document.getElementById(siteKey)
  if (script) {
    script.remove()
  }

  script = document.querySelector('script[src^="https://www.gstatic.com/recaptcha/releases"]')
  if (script) {
    script.remove()
  }
}

const removeRecaptchBadge = () => {
  const nodeBadge = document.querySelector('.grecaptcha-badge')
  if (nodeBadge && nodeBadge.parentNode) {
    document.body.removeChild(nodeBadge.parentNode)
  }
}

export { GoogleReCaptchaProvider, GoogleReCaptchaContext }
export type { GoogleReCaptchaContextType, GoogleReCaptchaProviderProps }
