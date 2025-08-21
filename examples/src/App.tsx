import { GoogleReCaptchaProvider } from '@gahojin-inc/react-google-recaptcha'
import { useCallback, useState } from 'react'
import Example from './Example'

const siteKey = process.env.VITE_SITE_KEY ?? ''

const App = () => {
  const [enable, setEnable] = useState(true)

  const clickToggle = useCallback(() => {
    setEnable((prev) => !prev)
  }, [])

  return (
    <>
      <button type="button" onClick={clickToggle}>
        {enable ? 'Disable' : 'Enable'}
      </button>
      {enable && (
        <GoogleReCaptchaProvider siteKey={siteKey} language="ja">
          <Example />
        </GoogleReCaptchaProvider>
      )}
    </>
  )
}

export default App
