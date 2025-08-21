import { useContext } from 'react'
import { GoogleReCaptchaContext, type GoogleReCaptchaContextType } from './context'

const useGoogleRecaptcha = (): GoogleReCaptchaContextType => {
  const context = useContext(GoogleReCaptchaContext)
  if (context === undefined) {
    throw new Error('useGoogleRecaptcha must be used within an GoogleReCaptchaProvider')
  }
  return context
}

export { useGoogleRecaptcha }
