import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ROUTES from '../../Config/routes'
import './HomePage.scss'

const HomePage = () => {

    useEffect(()=> {

        const infoSections = document.querySelectorAll('.info-section')
        setTimeout(()=> {

            const obs = new IntersectionObserver(itemsArr => {
                itemsArr.forEach(item => {
                    item.target.classList.toggle('show', item.isIntersecting)
                    if(item.isIntersecting) obs.unobserve(item.target)
                })
            }, { threshold: 1 })
            
            infoSections.forEach(section => obs.observe(section))
        }, 1000)
    })
    
    return (
        <div className="home-page">
            <section className="logo">
                <img src="/assets/images/logo.jpg" alt="logo" />
            </section>

            <section className="info-section rtl">
                <div className='info'>
                    <p>We are:</p>
                    <h2 className='section-title'>The Whiskey Tasters</h2>
                </div>
                <img src="/assets/images/home-image1.jpg" alt="whiskey in a glass" />
            </section>

            <section className="info-section ltr">
                <div className="info">
                    <h2>More then just "Alcohol"</h2>
                    <p>For us, whiskey is more then just alcohol to drink - Whiskey is ART! We invite you to experience a huge variety of whiskeys</p>
                </div>
                <img src="/assets/images/home-image2.jpg" alt="drinking together" />
            </section>

            <section className="info-section rtl">
                <div className='info'>
                    <h2 className='section-title'>Experiment with us!</h2>
                    <p>Our staff is highly experienced, from smelling to tasing and from the tongue to the aftertaste. With deep dive into the whiskey we write a honest and professional review for you.</p>
                    <Link className='g-btn info-btn' to={ROUTES.ABOUT_STAFF}>Our Staff</Link>
                </div>
                <img src="/assets/images/home-image5.jpg" alt="taster with a glass" />
            </section>

            <section className="info-section ltr">
                <div className="info">
                    <h2>Liquid gold, around the world</h2>
                    <p>Why limit ourselves to only one country? The whiskey comes from many countries that give it a different hue, taste, smell and character</p>
                </div>
                <img src="/assets/images/home-image3.jpg" alt="many whiskies" />
            </section>

            <section className="info-section rtl">
                <div className="info">
                    <h2>Whiskey for everyone</h2>
                    <p>Explore all kind of whiskies with us! We believe everyone can like at least one whiskey - Have you found yours?</p>
                    <Link className='g-btn info-btn' to={ROUTES.REVIEWS}>Read Our Reviews</Link>
                </div>
                <img src="/assets/images/home-image4.jpg" alt="johnnie walkers" />
            </section>

            <section className='info-section go-to-about'>
                <img src="/assets/images/logo2.jpg" alt="logo" />
                    <h2>Want to know more?</h2>
                    <Link className='g-btn info-btn' to={ROUTES.ABOUT}>About Us</Link>
            </section>
        </div>
    )
}
 
export default HomePage