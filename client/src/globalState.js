import { getAllReviews } from "./Services/reviews"
import { getCurrentUser } from "./Services/users"

const getState = () => {
    const state = {
        reviews: null,
        currentUser: null,
    }
    getAllReviews().then(res => state.reviews = res.data)
    state.currentUser = getCurrentUser()
    return state
}

export default getState