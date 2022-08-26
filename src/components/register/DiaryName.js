import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DiaryName = () => {
    const [diaryName, setDiaryName] = useState('')

    const nav = useNavigate()

    const saveDiaryName = async () => {
        if (diaryName) {
            if (diaryName.length < 16) {
                localStorage.clear()
                localStorage.setItem('diaryName', diaryName)
                nav('/username')
            } else {
                toast.warn('I said less than 16 characters 😤', {
                    theme: 'dark',
                    position: "bottom-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } else {
            toast.warn('Please give me a name 🥺', {
                theme: 'dark',
                position: "bottom-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
    return (
        <div className='register-container'>
            <div className='register'>
                <div className='query'>
                    What would you like to call me?
                </div>
                <div className='answer'>
                    <div className='tip'>
                        <div className='tip-text'>
                            💡 Keep it not more than 16 characters.
                        </div>
                    </div>
                    <div className='input-box'>
                        <input type='text' placeholder=''
                            onChange={(e) => {
                                setDiaryName(e.target.value)
                            }}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    saveDiaryName()
                                }
                            }}
                        />
                    </div>
                </div>
                <div className='login-text-container'>
                    <div className='login-text'>
                        Do you already have a diary?
                    </div>
                    <Link to='/login'>
                        Get in
                    </Link>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default DiaryName
