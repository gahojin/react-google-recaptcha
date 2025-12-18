import { useContext } from 'react'
import { GoogleReCaptchaContext } from './context'
import type { GoogleReCaptchaContextType } from './types'

const useGoogleRecaptcha = (): GoogleReCaptchaContextType => {
  return useContext(GoogleReCaptchaContext)
}

export { useGoogleRecaptcha }
