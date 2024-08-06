import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
{/* e We import the txprovider and then wrap our entire application with this txprovider*/ }
{/* e Now the entire app is gonna have access to the data that we pass into the txprovider*/ }
import { TransactionProvider } from './context/TransactionContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <TransactionProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </TransactionProvider>
)
