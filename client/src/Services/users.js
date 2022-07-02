import axios from "axios"
import JWTDecode from 'jwt-decode'

axios.defaults.headers.common['auth-token'] = localStorage.getItem('auth-token')

const URL = process.env.REACT_APP_SERVER_URL 

export const DEFAULT_PROFILE = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'

export const signup = (body) => axios.post(`${URL}/users/signup`, body)

export const login = async (body) => {
    const { data } = await axios.post(`${URL}/users/login`, body)
    localStorage.setItem('auth-token', data)
}

export const updateUser = async (body) => {
    const { data } = await axios.put(`${URL}/users/me/update`, body)
    localStorage.setItem('auth-token', data)
}

export const uploadProfilePhoto = (formData) => axios.patch(`${URL}/users/me/profile-photo`, formData)

export const getUserInfo = () => axios.get(`${URL}/users/me`)

export const getCurrentUser = () => {
    try {
        const token = localStorage.getItem("auth-token")
        return JWTDecode(token)
    } catch {
        return null
    }
}

export const getAllStaff = () => axios.get(`${URL}/users/get-staff`)