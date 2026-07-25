import * as mockProvider from './mock_provider.js'
import * as provider from './provider.js'

export const MOCK_TOKEN: string = mockProvider.MOCK_TOKEN

export const GoogleReCaptchaProvider: (typeof provider)['GoogleReCaptchaProvider'] =
  process.env.NODE_ENV === 'test' ? mockProvider.MockGoogleReCaptchaProvider : provider.GoogleReCaptchaProvider

export { useGoogleRecaptcha } from './hooks.js'
export type { GoogleReCaptchaProviderProps } from './types.js'
