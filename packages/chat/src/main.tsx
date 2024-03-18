import React, { Suspense } from 'react'
import Provider from 'providers/browser/index.tsx'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<>loading</>}>
      <Provider App={App} />
    </Suspense>
  </React.StrictMode>,
)
