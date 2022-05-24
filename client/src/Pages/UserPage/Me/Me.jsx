import { getTextByAdminLevel } from "../../../Config/labels"
import './Me.scss'

const Me = ({ user: {userName, email, adminLevel, reviewer, warnings} }) => {
    const levelText = getTextByAdminLevel(adminLevel, reviewer)
    return (
        <div className="me-section">
            <h3>{userName}'s Profile Details</h3>
            <p>Profile photo:</p>
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="Profile"/>
            <h4>Overview:</h4>
            <ul>
                <li>Username: {userName}</li>
                <li>Email: {email}</li>
                <li>Rank: {levelText}</li>
            </ul>
            <h4>Warnings:</h4>
            <ul>
                {warnings.length === 0 ? 'Great! Seems like you don\'t have any warnings!' : 
                    warnings.map((item, index) => {
                        return <li key={index}>{item}</li>
                    })
                }
            </ul>

        </div>
    )
}
 
export default Me