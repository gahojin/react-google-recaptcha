import { useGoogleRecaptcha } from '@gahojin-inc/react-google-recaptcha'
import { useCallback, useState, useTransition } from 'react'

const Example = () => {
  const { isLoading, execute, reset: clickReset } = useGoogleRecaptcha()
  const [token, setToken] = useState<string>()
  const [action, setAction] = useState<string>()
  const [isTransition, setTransition] = useTransition()

  const changeAction = useCallback((text: string) => {
    setAction(text)
  }, [])

  const clickVerify = useCallback(() => {
    setTransition(() => {
      return execute(action)
        .then((token) => setToken(token))
        .catch((error) => setToken(`error: ${error}`))
    })
  }, [action, execute])

  return (
    <div>
      {isLoading ? (
        'loading...'
      ) : (
        <>
          <input type="text" onChange={(e) => changeAction(e.target.value)} value={action} />
          <button type="button" onClick={clickVerify}>
            Verify
          </button>
          <button type="button" onClick={clickReset}>
            Reset
          </button>
          <hr />
          {isTransition ? 'loading...' : token && <p style={{ fontSize: 'small' }}>{token}</p>}
        </>
      )}
    </div>
  )
}

export default Example
