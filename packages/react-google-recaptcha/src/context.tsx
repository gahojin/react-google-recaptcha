import { type Context, createContext, type JSX, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
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
  const successHandler = useRef<(token: string) => void>(null)
  const errorHandler = useRef<(error: Error | undefined) => void>(null)

  const handleSuccess = useCallback((token: string) => {
    if (successHandler.current) {
      successHandler.current?.(token)
      successHandler.current = null
      errorHandler.current = null
    }
  }, [])

  const handleError = useCallback((error: Error | undefined) => {
    if (errorHandler.current) {
      errorHandler.current?.(error)
      successHandler.current = null
      errorHandler.current = null
    }
  }, [])

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
        callback: (token) => handleSuccess(token),
        'error-callback': (error) => handleError(error),
      })
      setState({
        widgetId,
        grecaptcha,
        error: null,
        isLoading: false,
      })
    })
  }, [siteKey, containerId, badge, theme, handleSuccess, handleError])

  const execute = useCallback(
    (action?: string) => {
      const grecaptcha = state?.grecaptcha
      if (grecaptcha?.execute) {
        const promise = new Promise<string>((resolve, reject) => {
          successHandler.current = resolve
          errorHandler.current = reject
        })
        return grecaptcha.execute(state.widgetId, action ? { action } : undefined).then((token) => {
          if (token) {
            handleSuccess(token)
          }
          // token = nullの場合、v2動作
          return promise
        })
      }
      return Promise.reject('ReCaptcha is not available')
    },
    [state, handleSuccess],
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
