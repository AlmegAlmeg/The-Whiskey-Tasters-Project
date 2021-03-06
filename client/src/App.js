import React from "react"
import { Routes, Route } from "react-router-dom"
import "./Styles/main.scss"

//Components
import Header from "./Components/Header/Header"
import Footer from "./Components/Footer/Footer"

//Pages
import Error404Page from "./Pages/Error404/Error404"
import About from './Pages/About/About'
import HomePage from "./Pages/HomePage/HomePage"
import LoginSignupPage from "./Pages/LoginSignupPage/LoginSignupPage"
import Logout from "./Pages/Logout/Logout"
import UserPage from "./Pages/UserPage/UserPage"
import ReviewsPage from "./Pages/Reviews/ReviewsPage"
import NewReview from "./Pages/NewReview/NewReview"
import EditReview from "./Pages/EditReview/EditReview"

import { getCurrentUser } from "./Services/users"
import ReviewDetails from "./Pages/ReviewDetails/ReviewDetails"

const currentUser = getCurrentUser()
export const UserContext = React.createContext(currentUser)

function App() {
  return (
    <div className="app-body">
      <Header />
      <main className="main-content routes-section">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          
          {/* Users routes */}
          <Route path="/user/*" element={<UserPage />} />
          <Route path="/login" element={<LoginSignupPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/reviews" element={<ReviewsPage />} />

          {/* Reviews routes */}
          <Route path="/reviews/new-review" element={<NewReview />}/>
          <Route path="/reviews/edit/:id" element={<EditReview />}/>
          <Route path="/reviews/:id" element={<ReviewDetails />}/>

          <Route path="*" element={<Error404Page />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
