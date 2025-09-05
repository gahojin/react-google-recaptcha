export const getRecaptchaScriptSrc = (
  render: string,
  language: string | null | undefined,
  useRecaptchaNet: boolean | undefined,
  useEnterprise: boolean | undefined,
): string => {
  const hostName = useRecaptchaNet ? 'recaptcha.net' : 'google.com'
  const script = useEnterprise ? 'enterprise.js' : 'api.js'

  return `https://${hostName}/recaptcha/${script}?render=${render}${language ? `&hl=${language}` : ''}`
}

export const injectScriptTag = (
  scriptId: string,
  language: string | null | undefined,
  useRecaptchaNet: boolean | undefined,
  useEnterprise: boolean | undefined,
  onLoad: () => void,
): (() => void) => {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.id = scriptId
  script.src = getRecaptchaScriptSrc('explicit', language, useRecaptchaNet, useEnterprise)
  script.async = true
  script.defer = true
  script.onload = onLoad

  document.head.appendChild(script)
  return () => {
    document.head.removeChild(script)
  }
}

export const removeScriptTag = (): void => {
  removeRecaptchBadge()

  const script = document.querySelector('script[src^="https://www.gstatic.com/recaptcha/releases"]')
  if (script) {
    script.remove()
  }
}

export const removeRecaptchBadge = (): void => {
  const nodeBadge = document.querySelector('.grecaptcha-badge')
  if (nodeBadge?.parentNode) {
    document.body.removeChild(nodeBadge.parentNode)
  }
}
