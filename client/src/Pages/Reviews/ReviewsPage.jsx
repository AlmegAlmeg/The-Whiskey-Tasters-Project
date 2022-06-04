import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../../App"
import ROUTES from "../../Config/routes"
import "./ReviewsPage.scss"

const ReviewsPage = () => {
  const currentUser = useContext(UserContext)

  return (
    <div className="reviews-page">
      <div className="reviews-header">
        <h3>Whiskey reviews</h3>
        {currentUser && currentUser.reviewer && (
          <Link className="g-btn" to={ROUTES.NEW_REVIEW}>Add a review</Link>
        )}
      </div>
      <hr />
      <div className="view-and-filtering">

      </div>

    </div>
  )
}

export default ReviewsPage
