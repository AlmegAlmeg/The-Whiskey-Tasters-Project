import axios from "axios"

axios.defaults.headers.common['auth-token'] = localStorage.getItem('auth-token')

const URL = process.env.REACT_APP_SERVER_URL 

export const getAllReviews = () => axios.get(`${URL}/reviews/all`)

export const createNewReview = body => axios.post(`${URL}/reviewers/new`, body)

export const getReviewDetails = id => axios.get(`${URL}/reviews/review/${id}`);

export const updateReview = (id, body) => axios.patch(`${URL}/reviewers/${id}`, body);

export const deleteReview = id => axios.delete(`${URL}/reviewers/${id}`)

export const likeReview = id => axios.patch(`${URL}/reviews/like/${id}`)