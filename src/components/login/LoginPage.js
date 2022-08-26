import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../config/config'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
    const [userName, setUserName] = useState('')
    const [passWord, setPassWord] = useState('')
    const [users, setUsers] = useState([])
    const [userCredentials, setUserCredentials] = useState([])
    const [log, setLog] = useState(0)

    const nav = useNavigate()

    const login = () => {
        if (userName && passWord) {
            const currentCredentials = userName + passWord
            for (let key in userCredentials) {
                if (userCredentials[key] === currentCredentials) {
                    localStorage.clear()
                    localStorage.setItem('userName', users[key].userName)
                    setLog(1)
                    nav('/home')
                }
            }
            if (log !== 1) {
                toast.error('Are you sure you are one of us? 🤨', {
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
            toast.warn("I said, Tell me your credentials! 😤", {
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

    useEffect(() => {
        const getUserData = async () => {
            const userRef = ref(db, 'Users')
            await onValue(userRef, (snapshot) => {
                const data = snapshot.val()
                let users = []
                for (let id in data) {
                    users.push({ id, ...data[id] })
                }
                setUsers(users)
                let userCredentials = []
                for (let id in users) {
                    userCredentials.push(users[id].userName + users[id].password)
                }
                setUserCredentials(userCredentials)
            })
        }
        getUserData()
    }, [])


    return (
        <div className='login-container'>
            <div className='login'>
                <div className='tip'>
                    <div className='tip-text'>
                        💡 Tell me your credentials 🙈
                    </div>
                </div>
                <div className='form-field'>
                    <input type='text' placeholder='@username'
                        onChange={(e) => {
                            setUserName(e.target.value)
                        }}
                    />
                </div>
                <div className='form-field'>
                    <input type='password' placeholder='password'
                        onChange={(e) => {
                            setPassWord(e.target.value)
                        }}
                    />
                </div>
                <div className='form-button'>
                    <input type='submit' value='Login'
                        onClick={() => {
                            login()
                        }}
                    />
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default LoginPage
