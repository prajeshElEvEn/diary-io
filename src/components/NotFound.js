import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className='not-container'>
            <div className='not'>
                <div className='error-text'>
                    404
                </div>
                <div className='not-text'>
                    Sorry, this page doesn't exist.
                </div>
                <div className='not-emoji'>
                    😢
                </div>
                <div className='tip'>
                    <div className='tip-text'>
                        <Link to='/'>
                            Return to Home ✨
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound
