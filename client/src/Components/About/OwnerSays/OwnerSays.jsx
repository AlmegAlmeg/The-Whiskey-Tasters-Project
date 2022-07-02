import { Link } from 'react-router-dom'
import ROUTES from '../../../Config/routes'
import './OwnerSays.scss'

const OwnerSays = () => {
    return (
        <div className="owner-says">
            <h3>Website owner says:</h3>
            <p>
                "All started with someone told me: 'I hate whiskey - ALL OF THEM'
            </p>
            <p>
                Hating all whiskies is a strong say, and to me it's not true. I belive that you might tasted the wrong whiskey. There are so many types of whiskeis around the world: smoked, spiced, fruity, sweet and so many more - do you hate them all?
            </p>
            <p>
                So I've decided to create this site, to help us out find and explore the massive veriaty of the liquid gold around the world, share our thoughts, and much more! I've collected some professional reviewers just for you! I want to make sure you'll find the perfect whiskies for you and hear some expert's opinions about what you might tasted.
            </p>
            <h5>
                Be aware! 
            </h5>
            <p>
                This website is completley opinions based! There is no place for insulting or hurting. Freedom of speech is the main motive here, so even if you disagree it's still fine.
            </p>
            <p>
                So let's go explore <Link to={ROUTES.REVIEWS}>our reviews</Link>"
            </p>
        </div>
    )
}

export default OwnerSays