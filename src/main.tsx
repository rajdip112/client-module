import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

export const initialState = { first_name: '', last_name: '', favorite_color: '' }

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
)
