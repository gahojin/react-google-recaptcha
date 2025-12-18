import { MOCK_TOKEN } from '@gahojin-inc/react-google-recaptcha'
import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'
import App from './App'

test('mock token check', async () => {
  const screen = await render(<App />)

  await screen.getByRole('button', { name: 'Verify' }).click()

  await expect.element(screen.getByText(MOCK_TOKEN)).toBeVisible()
})
