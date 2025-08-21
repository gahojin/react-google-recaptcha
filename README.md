# react-google-recaptcha

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![NPM Version](https://img.shields.io/npm/v/%40gahojin-inc%2Freact-google-recaptcha?activeTab=versions)](https://www.npmjs.com/package/@gahojin-inc/react-google-recaptcha)

Google ReCaptcha V3をReact Hooksとして提供するライブラリ

## 使い方

```javascript
import { GoogleReCaptchaProvider } from '@gahojin-inc/react-google-recaptcha'

const App = () => {
  return (
    <GoogleReCaptchaProvider siteKey={siteKey} language="ja">
      <Example />
    </GoogleReCaptchaProvider>
  )
}
```

```javascript
import { useGoogleRecaptcha } from '@gahojin-inc/react-google-recaptcha'

const Example = () => {
  const { isLoading, execute } = useGoogleRecaptcha()

  const handleClick = useCallback(async () => {
    const token = await execute('action')
    console.log(token)
  }, [execute])
}
```


## ライセンス

[Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)

```
Copyright 2025, GAHOJIN, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```