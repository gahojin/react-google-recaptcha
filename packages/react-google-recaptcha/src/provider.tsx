import { type JSX, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { GoogleReCaptchaContext } from './context.tsx'
import type { GoogleReCaptchaContextType, GoogleReCaptchaProviderProps, Grecaptcha } from './types.ts'
import { injectScriptTag, removeScriptTag } from './utils.ts'

type State = {
  isLoading: boolean
  error?: Error | null
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
  const [state, setState] = useState<State>({ isLoading: true })

  const widgetId = useRef<string>(siteKey)
  const grecaptcha = useRef<Grecaptcha>(null)
  const scriptLoaded = useRef(false)
  const successHandler = useRef<(token: string) => void>(null)
  const errorHandler = useRef<(error: Error | undefined) => void>(null)

  const handleSuccess = useCallback((token: string) => {
    if (successHandler.current) {
      successHandler.current?.(token)
      // トークンを再度取得できるよう、リセットする
      grecaptcha.current?.reset(widgetId.current)
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
    const instance = window.grecaptcha?.enterprise ?? window.grecaptcha
    if (!instance) {
      setState({
        isLoading: false,
        error: new Error('reCaptcha is not available'),
      })
      return
    }

    // 二重にrender実行されることを抑止
    if (scriptLoaded.current) {
      return
    }
    scriptLoaded.current = true

    instance.ready(() => {
      widgetId.current = instance.render(containerId, {
        sitekey: siteKey,
        badge,
        theme,
        size: 'invisible',
        callback: handleSuccess,
        'error-callback': handleError,
      })
      grecaptcha.current = instance
      setState({
        error: null,
        isLoading: false,
      })
    })
  }, [siteKey, containerId, badge, theme, handleSuccess, handleError])

  const reset = useCallback(() => {
    grecaptcha.current?.reset(widgetId.current)
  }, [])

  const execute = useCallback(
    (action?: string) => {
      const instance = grecaptcha.current
      if (instance?.execute) {
        const promise = new Promise<string>((resolve, reject) => {
          successHandler.current = resolve
          errorHandler.current = reject
        })
        return Promise.resolve(instance.execute(widgetId.current, action ? { action } : undefined)).then((token) => {
          if (token) {
            handleSuccess(token)
          }
          // token = nullの場合、v2動作
          return promise
        })
      }
      return Promise.reject('ReCaptcha is not available')
    },
    [handleSuccess],
  )

  // scriptタグを追加/削除する
  useEffect(() => {
    const removeScript = injectScriptTag(id, language, useRecaptchaNet, useEnterprise, onLoad)
    return () => {
      removeScript()
      removeScriptTag()
      scriptLoaded.current = false
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

export { GoogleReCaptchaProvider }
