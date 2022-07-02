import { getTextByAdminLevel } from '../../../util/labels'
import './CreatedByCard.scss'

const CreatedByCard = ({ user }) => {
    return (
        <div className="created-by-card">
            <img src={`/assets/uploads/${user.profileImage}`} alt={`${user.userName}'s profile`} />
            <h5>{user.userName}</h5>
            <p>{getTextByAdminLevel(user.adminLevel, user.reviewer)}</p>
        </div>
    )
}

export default CreatedByCard