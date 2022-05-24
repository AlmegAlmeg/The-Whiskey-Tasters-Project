import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { getCurrentUser } from './Services/users'
import './Styles/main.scss'

//Components
import Header from './Components/Header/Header'

//Pages
import Error404Page from './Pages/Error404/Error404'
import HomePage from './Pages/HomePage/HomePage'
import LoginSignupPage from './Pages/LoginSignupPage/LoginSignupPage'
import Logout from './Pages/Logout/Logout'
import UserPage from './Pages/UserPage/UserPage'

const user = getCurrentUser()
export const UserContext = React.createContext(user)

function App() {
  return (
    <div className='app-body'>
        <Header/>
          <main className='main-content routes-section'>
            <Routes>
              <Route path='/' element={<HomePage/>} />
              {/* Users routes */}
              <Route path='/user/*' element={<UserPage />} />
              <Route path='/login' element={<LoginSignupPage />} />
              <Route path='/logout' element={<Logout />} />
              
              <Route path='*' element={<Error404Page />}/>
            </Routes>
          </main>
    </div>
  )
}

export default App
