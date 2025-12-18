import { type JSX, useId } from 'react'
import { GoogleReCaptchaContext } from './context.tsx'
import type { GoogleReCaptchaProviderProps } from './types.ts'

const MOCK_TOKEN: string = 'mock-JspVRfSqeamw4CKN3kc7nL_p_MTzWSeE'

const MockGoogleReCaptchaProvider = ({ container, children }: GoogleReCaptchaProviderProps): JSX.Element => {
  const id = useId()
  return (
    <GoogleReCaptchaContext.Provider value={{ isLoading: false, error: null, execute: () => Promise.resolve(MOCK_TOKEN), reset: () => {} }}>
      {children}
      {container ? null : <div id={`${id}-container`} />}
    </GoogleReCaptchaContext.Provider>
  )
}

export { MOCK_TOKEN, MockGoogleReCaptchaProvider }
