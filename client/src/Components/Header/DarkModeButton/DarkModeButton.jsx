import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun } from '@fortawesome/free-solid-svg-icons'

import "./DarkModeButton.scss"

const DarkModeButton = () => {
    let darkMode = false
    
    setTimeout(()=>{
        const appBody = document.querySelector('.app-body')
        let lsItem = localStorage.getItem('dark-mode-on')
        darkMode = lsItem
        if(darkMode) appBody.classList.add('dark')
        else appBody.classList.remove('dark')
    }, 10)

    const toggleDarkMode = () => {
        darkMode = !darkMode
        const appBody = document.querySelector('.app-body')
        if(!darkMode){
            appBody.classList.remove('dark')
            localStorage.removeItem('dark-mode-on')
        } 
        else{
            localStorage.setItem('dark-mode-on', darkMode)
            appBody.classList.add('dark')
        }
    }
    return (
        <li>
            <button className='dark-mode-button' title='Toggle dark mode' onClick={toggleDarkMode}>
                    <FontAwesomeIcon icon={faSun} />
            </button>
        </li>
    )
}
 
export default DarkModeButton