import * as mockProvider from './mock_provider'
import * as provider from './provider'

export const MOCK_TOKEN: string = mockProvider.MOCK_TOKEN

export const GoogleReCaptchaProvider: (typeof provider)['GoogleReCaptchaProvider'] =
  process.env?.NODE_ENV === 'test' || import.meta.env?.MODE === 'test' ? mockProvider.MockGoogleReCaptchaProvider : provider.GoogleReCaptchaProvider

export { useGoogleRecaptcha } from './hooks'
export type { GoogleReCaptchaProviderProps } from './types'
