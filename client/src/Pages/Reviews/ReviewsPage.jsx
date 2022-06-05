import { faList, faTable, faTableColumns } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../../App"
import MiniLoader from "../../Components/Shared/Loader/MiniLoader"
import ROUTES from "../../Config/routes"
import { getAllReviews } from "../../Services/reviews"
import ListView from '../../Components/ReviewsViews/ListView'
import GridView from '../../Components/ReviewsViews/GridView'
import TableView from '../../Components/ReviewsViews/TableView'
import "./ReviewsPage.scss"

const ReviewsPage = () => {
  const [reviews, setReviews] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  // const [filteredArr, setFilteredArr] = useState([])
  const [view, setView] = useState(0)
  const buttonsArr = [
    { title: "Table view", icon: faTable },
    { title: "List view", icon: faList },
    { title: "Grid view", icon: faTableColumns }
  ]

  useEffect(() => {
    setIsLoading(true)
    getAllReviews().then(res => setReviews(res.data))
    // setFilteredArr(reviews)
    setIsLoading(false)
  }, [])

  const currentUser = useContext(UserContext)

  const createViewSection = () => {
    switch (view){
      case 0: 
        return <TableView arr={reviews}  />
      case 1: 
        return <ListView arr={reviews} />
      case 2: 
        return <GridView arr={reviews} />
      default:
        return <TableView arr={reviews}  />
    }
  }

  return (
    <div className="reviews-page">
      <img className="logo-img" src="assets/images/logo.jpg" alt="logo" />
      <div className="reviews-header">
        <h3>Whiskey reviews</h3>
        {currentUser && currentUser.reviewer && (
          <Link className="g-btn" to={ROUTES.NEW_REVIEW}>Add a review</Link>
        )}
      </div>
      <hr />
      <div className="view-and-filtering">
          <div className="views-btns">
            {buttonsArr.map((btn, i) => {
              return <button key={i} className={view === i ? 'g-btn-active' : 'g-btn'} title={btn.title} onClick={() => setView(i)}><FontAwesomeIcon icon={btn.icon}/></button>
            })}
          </div>
          <div className="search-input">
            <input type="text" placeholder="Search for a review"/>
          </div>
      </div>
      <section className="views">
        {isLoading && <MiniLoader />}
        {createViewSection()}
      </section>
    </div>
  )

}

export default ReviewsPage
