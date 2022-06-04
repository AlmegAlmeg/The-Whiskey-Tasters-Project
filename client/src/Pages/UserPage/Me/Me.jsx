import { getTextByAdminLevel } from "../../../Config/labels"
import './Me.scss'
import { DEFAULT_PROFILE } from '../../../Services/users'

const Me = ({ user: {userName, email, adminLevel, reviewer, warnings, profileImage } }) => {
    const levelText = getTextByAdminLevel(adminLevel, reviewer)
    return (
        <div className="me-section">
            <h3>{userName}'s Profile Details</h3>
            {/* <p>Profile photo:</p>
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
            </ul> */}
            <table>
                <tbody>
                    <tr>
                        <td>Profile image</td>
                        <td><img src={profileImage ? process.env.REACT_APP_UPLOADS_FOLDER + profileImage : DEFAULT_PROFILE} alt="Profile"/></td>
                    </tr>
                    <tr>
                        <td>Username</td>
                        <td>{userName}</td>
                    </tr>
                    <tr>

                        <td>Email</td>
                        <td>{email}</td>
                    </tr>
                    <tr>
                        <td>Rank</td>
                        <td>{levelText}</td>
                    </tr>
                    <tr>
                        <td>Warnings</td>
                        <td>{warnings.length === 0 ? 'Great! Seems like you don\'t have any warnings!' : 
                    warnings.map((item, index) => {
                        return <p className="warning-p" key={index}>{item}</p>
                    })
                }</td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}
 
export default Me

///1653721966088-profile.png