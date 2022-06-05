import axios from "axios"

axios.defaults.headers.common['auth-token'] = localStorage.getItem('auth-token')

const URL = process.env.REACT_APP_SERVER_URL 

export const getAllReviews = () => axios.get(`${URL}/reviews/all`)

export const createNewReview = body => axios.post(`${URL}/reviewers/new`, body)