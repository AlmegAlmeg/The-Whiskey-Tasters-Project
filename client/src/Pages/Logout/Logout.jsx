const Logout = () => {
    localStorage.removeItem('auth-token')
    window.location = '/'
}

export default Logout