import { type Context, createContext } from 'react'
import type { GoogleReCaptchaContextType } from './types.js'

const GoogleReCaptchaContext: Context<GoogleReCaptchaContextType> = createContext<GoogleReCaptchaContextType>({
  isLoading: true,
  error: null,
  execute: () => Promise.reject('useGoogleRecaptcha must be used within an GoogleReCaptchaProvider'),
  reset: () => [],
})

export { GoogleReCaptchaContext }
