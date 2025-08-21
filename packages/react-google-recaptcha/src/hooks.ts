import { useContext } from 'react'
import { GoogleReCaptchaContext, type GoogleReCaptchaContextType } from './context'

const useGoogleRecaptcha = (): GoogleReCaptchaContextType => {
  return useContext(GoogleReCaptchaContext)
}

export { useGoogleRecaptcha }
