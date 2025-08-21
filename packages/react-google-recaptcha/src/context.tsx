import { type Context, createContext, type JSX, useCallback, useEffect, useId, useMemo, useState } from 'react'
import type { GoogleReCaptchaContextType, GoogleReCaptchaProviderProps, Grecaptcha } from './types'
import { injectScriptTag, removeScriptTag } from './utils.ts'

const GoogleReCaptchaContext: Context<GoogleReCaptchaContextType> = createContext<GoogleReCaptchaContextType>({
  isLoading: true,
  error: null,
  execute: () => Promise.reject('useGoogleRecaptcha must be used within an GoogleReCaptchaProvider'),
  reset: () => [],
})

type State = {
  isLoading: boolean
  error?: Error | null
  widgetId: string
  grecaptcha?: Grecaptcha | null
}

const GoogleReCaptchaProvider = ({
  siteKey,
  language,
  useRecaptchaNet,
  useEnterprise,
  container,
  badge,
  theme,
  children,
}: GoogleReCaptchaProviderProps): JSX.Element => {
  const id = useId()
  const containerId = useMemo(() => (container ? container : `${id}-container`), [id, container])
  const [state, setState] = useState<State>({ isLoading: true, widgetId: siteKey })

  // ReCaptcha初期化
  const onLoad = useCallback(() => {
    const grecaptcha = window.grecaptcha?.enterprise ?? window.grecaptcha
    if (!grecaptcha) {
      setState({
        isLoading: false,
        widgetId: siteKey,
        error: new Error('ReCaptcha is not available'),
      })
      return
    }
    grecaptcha.ready(() => {
      const widgetId = grecaptcha.render(containerId, {
        sitekey: siteKey,
        badge,
        theme,
        size: 'invisible',
      })
      setState({
        widgetId,
        grecaptcha,
        error: null,
        isLoading: false,
      })
    })
  }, [siteKey, containerId, badge, theme])

  const execute = useCallback(
    async (action?: string) => {
      const grecaptcha = state?.grecaptcha
      if (grecaptcha?.execute) {
        return await grecaptcha.execute(state.widgetId, action ? { action } : undefined)
      }
      throw new Error('ReCaptcha is not available')
    },
    [state],
  )

  const reset = useCallback(() => {
    state?.grecaptcha?.reset(state.widgetId)
  }, [state])

  // scriptタグを追加/削除する
  useEffect(() => {
    const removeScript = injectScriptTag(id, language, useRecaptchaNet, useEnterprise, onLoad)
    return () => {
      removeScript?.remove()
      removeScriptTag()
    }
  }, [id, language, useRecaptchaNet, useEnterprise, onLoad])

  const value: GoogleReCaptchaContextType = useMemo(
    () => ({
      isLoading: state.isLoading,
      error: state.error ?? null,
      execute,
      reset,
    }),
    [state, execute, reset],
  )

  return (
    <GoogleReCaptchaContext.Provider value={value}>
      {children}
      {container ? null : <div id={`${id}-container`} />}
    </GoogleReCaptchaContext.Provider>
  )
}

export { GoogleReCaptchaProvider, GoogleReCaptchaContext }
export type { GoogleReCaptchaContextType, GoogleReCaptchaProviderProps }
