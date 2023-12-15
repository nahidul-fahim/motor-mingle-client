import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/router'
import './index.css'
import ContentProvider from './Context/ContentContext/ContentProvider'
import AuthProvider from './Context/AuthContext/AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


// query client for tanstack
const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ContentProvider>
          <RouterProvider router={router} />
        </ContentProvider>
      </AuthProvider>
    </QueryClientProvider>

  </React.StrictMode>,
)