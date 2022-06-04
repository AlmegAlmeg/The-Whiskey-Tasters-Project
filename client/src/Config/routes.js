import { getCurrentUser } from "../Services/users"

const user = getCurrentUser()

const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    LOGOUT: '/logout',
    ABOUT: '/about',
    PAGE_NOT_FOUND: '*',
    // reviews routes
    REVIEWS: '/reviews',
    NEW_REVIEW: '/reviews/new-review',
    // user routes
    USER: '/user',
    USER_ME: `/user/me/${user?.userName}`,
    USER_LIKED_REVIEWS: `/user/${user?.userName}/liked-reviews`,
    USER_MY_REVIEWS: `/user/${user?.userName}/reviews`,
    USER_ME_UPDATE: `/user/update/${user?.userName}`,
    // admin routes
    ADMIN_OVERVIEW: '/admin/overview'
}

export default ROUTES