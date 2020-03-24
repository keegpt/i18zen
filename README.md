# I18zen

Extreme simple and lightweight i18n for react projects

## Install
```sh
npm install @keegpt/i18zen --save
```

## Load
```js
import React from 'react';
import ReactDOM from 'react-dom';

import { useI18Zen, I18ZenProvider } from 'react-i18zen';

// we can use local files
import en from './locales/en.json';
import pt from './locales/pt.json';

// or we can use remote files
const remoteLocales = [
  { locale: 'en', url: 'http://localhost:3000/locales/en.json' },
  { locale: 'pt', url: 'http://localhost:3000/locales/pt.json' }
];
```

## Usage Example

```jsx
function App() {
  const { __, changeLocale } = useI18Zen();
  return (
    <div>
        <span>{__('hello', { name: 'José' })}</span>
        <button onClick={(_e) => changeLocale('en') }>Change Locale</button>
    </div>
  );
}

ReactDOM.render(
    <I18ZenProvider 
        locales={{ pt, en }}
        remoteLocales={remoteLocales}
        errorCallback={console.error}
        initialLocale="pt"
        fallbackLocale="pt"
    >
        <App />
    </I18ZenProvider>
    , document.getElementById('root'));
```

## Locale Example

```js
{
    "hello": "Hello, {{name}}."
}
```