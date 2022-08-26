import { push, ref } from 'firebase/database'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../config/config'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PassWord = () => {
    const [password, setPassword] = useState('')

    const nav = useNavigate()

    const savePassword = async () => {
        if (password) {
            if (password.length <= 12 && password.length >= 8) {
                localStorage.setItem('password', password)
                const userRef = ref(db, 'Users')
                const user = {
                    diaryName: localStorage.getItem('diaryName'),
                    userName: localStorage.getItem('userName'),
                    password: localStorage.getItem('password'),
                }
                await push(userRef, user)
                localStorage.removeItem('password')
                nav('/diary-io/home')
            } else {
                toast.warn('I said 8-12 characters 😤!', {
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
            toast.warn("You don't wanna secure me huh? 🤨", {
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
                    Secure me with a password.
                </div>
                <div className='answer'>
                    <div className='tip'>
                        <div className='tip-text'>
                            💡 Keep it 8-12 characters & make sure it's hard to guess.
                        </div>
                    </div>
                    <div className='input-box'>
                        <input type='password' placeholder=''
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    savePassword()
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default PassWord
