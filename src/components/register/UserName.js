import { onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../../config/config';

const UserName = () => {
    const [userName, setUserName] = useState('')
    const [users, setUsers] = useState([])
    const [userNameList, setUserNameList] = useState([])

    const nav = useNavigate()

    const saveUserName = async () => {
        if (userName) {
            if (userName.length < 12) {
                if (userNameList.includes(userName)) {
                    toast.warn('This name is already taken 🙈', {
                        theme: 'dark',
                        position: "bottom-right",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    localStorage.setItem('userName', userName)
                    nav('/password')
                }
            } else {
                toast.warn('I said less than 12 characters 😤', {
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
            toast.warn('Atleast give yourself a name 😒', {
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
        const getUsers = async () => {
            const userRef = ref(db, 'Users')
            await onValue(userRef, (snapshot) => {
                const data = snapshot.val()
                let users = []
                for (let key in data) {
                    users.push({ key, ...data[key] })
                }
                setUsers(users)
                let userNameList = []
                for (let key in users) {
                    userNameList.push(users[key].userName)
                }
                setUserNameList(userNameList)
                console.log(userNameList)
            })
        }
        getUsers()
    }, [])


    return (
        <div className='register-container'>
            <div className='register'>
                <div className='query'>
                    What should I call you?
                </div>
                <div className='answer'>
                    <div className='tip'>
                        <div className='tip-text'>
                            💡 Keep it not more than 12 characters.
                        </div>
                    </div>
                    <div className='input-box'>
                        <input type='text' placeholder='@username'
                            onChange={(e) => {
                                setUserName(e.target.value)
                            }}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    saveUserName()
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

export default UserName
