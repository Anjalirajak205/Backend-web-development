import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import SignUp from './SignUp.jsx'
import LogIn from './Login.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <SignUp></SignUp> */}
    <LogIn></LogIn>
  </StrictMode>,
)
