import { useContext } from 'react'
import { GoogleReCaptchaContext } from './context.js'
import type { GoogleReCaptchaContextType } from './types.js'

const useGoogleRecaptcha = (): GoogleReCaptchaContextType => {
  return useContext(GoogleReCaptchaContext)
}

export { useGoogleRecaptcha }
