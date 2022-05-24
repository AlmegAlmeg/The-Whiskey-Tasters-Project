import axios from "axios"
import JWTDecode from 'jwt-decode'

axios.defaults.headers.common['auth-token'] = localStorage.getItem('auth-token')

const URL = process.env.REACT_APP_SERVER_URL 

export const signup = (body) => axios.post(`${URL}/users/signup`, body)

export const login = async (body) => {
    const { data } = await axios.post(`${URL}/users/login`, body)
    localStorage.setItem('auth-token', data)
}

export const getCurrentUser = () => {
    try {
        const token = localStorage.getItem("auth-token")
        return JWTDecode(token)
    } catch {
        return null
    }
}

// export const updateUser = (formData) => axios({
//     method: "PUT",
//     url: `${URL}/users/me/update`,
//     data: formData
// })

export const uploadProfilePhoto = (formData) => axios.patch(`${URL}/users/me/profile-photo`, formData)

export const getUserInfo = () => axios.get(`${URL}/users/me`)