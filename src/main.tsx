import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from 'src/App'
import 'src/i18n/i18n'
import { AppProvider } from './contexts/app.context'
import './index.css'

//setup Stanstack query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
})

console.log('.env ', import.meta.env.VITE_API_URL)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* Route la cao nhat */}
    <BrowserRouter>
      {/* Stanstack store */}
      <QueryClientProvider client={queryClient}>
        {/* Context API */}
        <AppProvider>
          <App />
        </AppProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
