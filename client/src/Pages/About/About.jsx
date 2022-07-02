import WhatIsWhiskey from '../../Components/About/WhatIsWhiskey/WhatIsWhiskey'
import OwnerSays from '../../Components/About/OwnerSays/OwnerSays'
import './About.scss'
import OurStaff from '../../Components/About/OurStaff/OurStaff'

const About = () => {
    return (
        <div className="about-page">
            <section className="logo">
                <img src="/assets/images/logo.jpg" alt="logo" />
            </section>
            <WhatIsWhiskey />
            <OwnerSays />
            <OurStaff />
        </div>
    )
}

export default About