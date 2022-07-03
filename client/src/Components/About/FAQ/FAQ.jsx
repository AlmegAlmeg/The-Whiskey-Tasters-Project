import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import './FAQ.scss'

const FAQ = () => {

    const faqArr = [
        {
            question: 'Who are the reviewers?',
            answer: 'All our reviewers are private people that likes whiskey and tasted many types of them.'
        },
        {
            question: 'Can I be a reviewer?',
            answer: 'Sure you can! Very soon we\'ll start new recruitement for reviewers and you could apply to be one.'
        },
        {
            question: 'Will there be new features later?',
            answer: 'Our website developers, as long with the site owner, are working behind the scenes for new features like adding comments to review, Top10 section to read, whiskey of the week and many many more!'
        },
        {
            question: 'I\'ve found a bug or incorrect detail, where can I report it?',
            answer: 'For now, you can contact us on gmail.'
        },
        {
            question: 'Does reviewers get paid for reviews?',
            answer: 'Absolutly no. The Whiskey Tasters is a non-profit website, and based completley on subjective opinions. More then that - while recruiting new reviewers we make sure they have no financial interests of one kind or another. Any reviewer with different interest will be banned immediately'
        },
    ]

    return (
        <div className="faq-section">
            <h3>Frequently Asked Questions</h3>
            {faqArr.map((faq, i) => {
                return <SingleFaq key={i} faq={faq}/>
            })}
        </div>
    )
}

export default FAQ

const SingleFaq = ({ faq }) => {

    const [isOpen, setIsOpen] = useState(false)

    return <div className='single-faq' onClick={() => setIsOpen(prevValue => !prevValue)}>
        <div>
            <h4>{ faq.question }</h4>
            <FontAwesomeIcon className={`icon ${isOpen ? 'open' : null}`} icon={faAngleRight} />
        </div>
        {isOpen && <p>{ faq.answer }</p>}
    </div>
}