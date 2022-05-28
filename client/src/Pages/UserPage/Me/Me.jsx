import { getTextByAdminLevel } from "../../../Config/labels"
import './Me.scss'
import { DEFAULT_PROFILE } from '../../../Services/users'

const Me = ({ user: {userName, email, adminLevel, reviewer, warnings, profileImage } }) => {
    const levelText = getTextByAdminLevel(adminLevel, reviewer)
    return (
        <div className="me-section">
            <h3>{userName}'s Profile Details</h3>
            <p>Profile photo:</p>
            <img src={profileImage ? process.env.REACT_APP_UPLOADS_FOLDER + profileImage : DEFAULT_PROFILE} alt="Profile"/>
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

///1653721966088-profile.png