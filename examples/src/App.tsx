import { GoogleReCaptchaProvider } from '@gahojin-inc/react-google-recaptcha'
import { useCallback, useId, useState } from 'react'
import Example from './Example'

const siteKey = process.env.VITE_SITE_KEY ?? ''

const App = () => {
  const [enable, setEnable] = useState(true)

  const clickToggle = useCallback(() => {
    setEnable((prev) => !prev)
  }, [])

  const containerId = useId()
  return (
    <>
      <button type="button" onClick={clickToggle}>
        {enable ? 'Disable' : 'Enable'}
      </button>
      {enable && (
        <GoogleReCaptchaProvider siteKey={siteKey} language="ja" container={containerId} badge="bottomleft" theme="dark" data-testid="provider">
          <div id={containerId} style={{ visibility: 'hidden' }} />
          <span>
            このサイトは reCAPTCHA によって保護されており、Google の<a href="https://policies.google.com/privacy">プライバシーポリシー</a>と
            <a href="https://policies.google.com/terms">利用規約</a>が適用されます。
          </span>
          <Example />
        </GoogleReCaptchaProvider>
      )}
    </>
  )
}

export default App
