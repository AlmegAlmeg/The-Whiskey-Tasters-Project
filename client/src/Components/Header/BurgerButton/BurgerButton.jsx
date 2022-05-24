import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faX } from '@fortawesome/free-solid-svg-icons'
import './BurgerButton.scss'

const BurgerButton = ({ setToggleMenu, toggleMenu }) => {
    return (
        <div className="burger" onClick={()=>setToggleMenu(prevValue => !prevValue)}>
            {toggleMenu ? 
                <FontAwesomeIcon icon={faX} />:
                <FontAwesomeIcon icon={faBars} />
            }
        </div>
    )
}
 
export default BurgerButton