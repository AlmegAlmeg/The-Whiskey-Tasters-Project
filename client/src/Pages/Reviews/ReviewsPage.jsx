import { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../../App"
import MiniLoader from "../../Components/Shared/Loader/MiniLoader"
import SingleReview from "../../Components/Shared/SingleReview/SingleReview"
import ROUTES from "../../Config/routes"
import { getAllReviews } from "../../Services/reviews"
import "./ReviewsPage.scss"

const ReviewsPage = () => {

  const sortingOptions = [
    { text: 'None', value: ''},
    { text: 'A-Z', value: 'atz'},
    { text: 'Highest rating to lowest', value: 'htl'},
    { text: 'Lowest rating to highest', value: 'lth'},
  ]

  const [reviews, setReviews] = useState(null)
  const [filteredArr, setFilteredArr] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFound, setIsFound] = useState(true)

  useEffect(() => {
    getAllReviews().then(res => {
      setReviews(res.data)
      setFilteredArr(res.data)
      setIsLoading(false)
    })
  }, [])

  const currentUser = useContext(UserContext)

  const handleChange = e => {
    setFilteredArr(reviews)
    setIsFound(true)
    const text = e.target.value.toLocaleLowerCase()
    if(text === '') return
    setFilteredArr(reviews.filter(review => review.title.toLocaleLowerCase().includes(text)))
    if(filteredArr.length === 0) setIsFound(false)
  }

  // const sort = (e) => {
  //   const { value } = e.target
  //   let sortedArr
  //   switch (value){
  //     case sortingOptions[1].value:
  //       sortedArr = reviews.sort((a,b) => a.title < b.title)
  //       setFilteredArr(sortedArr)
  //       break 
  //     case sortingOptions[2].value:
  //        sortedArr = reviews.sort((a,b) => a.rating < b.rating)
  //       setFilteredArr(sortedArr)
  //       break
  //     case sortingOptions[3].value:
  //        sortedArr = reviews.sort((a,b) => a.rating > b.rating)
  //       setFilteredArr(sortedArr)
  //       break
  //     default:
  //       setFilteredArr(sortedArr)
  //       break
  //   }
  // }

  return (
    <div className="reviews-page">
      <img className="logo-img" src="assets/images/logo.jpg" alt="logo" />
      <div className="reviews-header">
        <h3>Whiskey reviews</h3>
        {currentUser && (currentUser.reviewer  || currentUser.adminLevel > 0) && (
          <Link className="g-btn" to={ROUTES.NEW_REVIEW}>Add a review</Link>
        )}
      </div>
      <hr />
      <div className="sort-and-search">
          <div className="search-input">
            <input type="text" placeholder="Search for a review" onChange={handleChange}/>
          </div>
          {/* <div className="sort-select">
            <label htmlFor="sort">Sort Review By:</label>
            <select name="sort" onChange={sort}>
              {sortingOptions.map((option, i) => {
                return <option key={i} value={option.value}>{ option.text }</option>
              })}
            </select>
          </div> */}
      </div>
      <section className="reviews-grid">
        {isLoading && <MiniLoader />}
        {filteredArr && filteredArr.map((item, i) => {
          return <SingleReview review={item} key={i} />
        })}
        {!isFound && <h3>No review found under your search...</h3>}
      </section>
    </div>
  )

}

export default ReviewsPage
