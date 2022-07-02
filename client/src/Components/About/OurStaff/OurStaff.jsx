import { useEffect, useState } from 'react'
import { getAllStaff } from '../../../Services/users'
import { getTextByAdminLevel } from '../../../util/labels'
import './OurStaff.scss'

const OurStaff = () => {

    const [staffArr, setStaffArr] = useState(null)

    useEffect(() => {
        getAllStaff().then(res => setStaffArr(res.data))
    }, [])

    return (
        <div className="our-staff">
            <h3>Our Staff</h3>
            {!staffArr ? <p>Loading...</p> :
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Rank</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staffArr.map((user, i) => {
                            return <tr key={i}>
                                <td>{user.userName}</td>
                                <td>{getTextByAdminLevel(user.adminLevel, user.reviewer)}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
                
            }
        </div>
    )
}

export default OurStaff