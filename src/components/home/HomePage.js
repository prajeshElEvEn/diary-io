import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../config/config'

const HomePage = () => {
    const [currentUserName, setCurrentUserName] = useState('')
    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState({})
    const [entries, setEntries] = useState([])
    const nav = useNavigate()

    const showEntry = (entryId) => {
        localStorage.setItem('currentEntryId', entryId)
        nav('/show')
    }

    const editEntry = (entryId) => {
        localStorage.setItem('currentEntryId', entryId)
        nav('/edit')
    }

    const addEntry = () => {
        nav('/diary')
    }

    const logout = () => {
        localStorage.clear()
        nav('/')
    }

    useEffect(() => {
        const getUser = async () => {
            setCurrentUserName(localStorage.getItem('userName'))
            const userRef = ref(db, 'Users')
            await onValue(userRef, (snapshot) => {
                const data = snapshot.val()
                let users = []
                for (let id in data) {
                    users.push({ id, ...data[id] })
                }
                setUsers(users)
                let currentUser = {}
                for (let id in users) {
                    if (users[id].userName === currentUserName) {
                        currentUser = users[id]
                    }
                }
                setCurrentUser(currentUser)
                localStorage.setItem('currentUserId', currentUser.id)
                localStorage.setItem('currentDiaryName', currentUser.diaryName)
            })
        }

        const getEntries = async () => {
            const entryRef = ref(db, 'Users/' + currentUser.id + '/entries')
            await onValue(entryRef, (snapshot) => {
                const data = snapshot.val()
                let entries = []
                for (let id in data) {
                    entries.push({ id, ...data[id] })
                }
                setEntries(entries)
            })
        }
        getUser()
        getEntries()
    }, [currentUser.id, currentUserName])


    return (
        <div className='home-container'>
            <div className='navbar-container'>
                <div className='navbar'>
                    <div className='navbar-greet'>
                        <div className='greeting'>
                            welcome
                        </div>
                        <div className='user-title'>
                            <span>@</span>
                            {
                                currentUser.userName
                            }
                        </div>
                    </div>
                    <div className='navbar-right'>
                        <div className='navbar-date'>
                            {new Date().toLocaleDateString()}
                        </div>
                        <div className='navbar-logout'
                            onClick={() => {
                                logout()
                            }}
                        >
                            <svg width="28" height="28" fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="m2 12 5 4v-3h9v-2H7V8l-5 4Z"></path>
                                <path d="M13 3a8.938 8.938 0 0 0-6.363 2.637L8.05 7.051A6.955 6.955 0 0 1 13 5c1.87 0 3.628.729 4.95 2.051a6.955 6.955 0 0 1 2.05 4.95c0 1.87-.728 3.628-2.05 4.95A6.955 6.955 0 0 1 13 19.002a6.955 6.955 0 0 1-4.95-2.051l-1.414 1.414A8.938 8.938 0 0 0 13 21.002a8.938 8.938 0 0 0 6.364-2.637 8.938 8.938 0 0 0 2.637-6.364 8.938 8.938 0 0 0-2.637-6.364A8.938 8.938 0 0 0 13 3Z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className='entries-container'>
                <div className='tip'>
                    <div className='tip-text'>
                        💡 This is your dashboard. You can add and edit entries here. Logout by clicking the logout button on the top-right corner. Happy writing ❤️!
                    </div>
                </div>
                <div className='entries'>
                    <div className='add-card'
                        onClick={() => {
                            addEntry()
                        }}
                    >
                        <div className='add-box'>
                            <div className='add-icon'>
                                <svg width="28" height="28" fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 2.016H9v6.987H2v6h7v6.987h6v-6.987h7v-6h-7V2.016Z"></path>
                                </svg>
                            </div>
                            <div className='add-text'>
                                Make a new entry.
                            </div>
                        </div>
                    </div>
                    {
                        entries.map((entry) => {
                            return (
                                <div className='entry-card' key={entry.id}>
                                    <div className='entry'>
                                        <div className='card-left'
                                            onClick={() => {
                                                showEntry(entry.id)
                                            }}
                                        >
                                            <div className='card-icon'>
                                                <svg width="24" height="24" fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M6.012 18H21V4a2 2 0 0 0-2-2H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3h15v-2H6.012C5.55 19.988 5 19.805 5 19c0-.805.55-.988 1.012-1ZM8 6h9v2H8V6Z"></path>
                                                </svg>
                                            </div>
                                            <div className='card-date'>
                                                {
                                                    entry.date
                                                }
                                            </div>
                                            <div className='card-emoji'>
                                                {
                                                    entry.emoji
                                                }
                                            </div>

                                        </div>
                                        <div className='card-right'>
                                            <div className='card-info'>
                                                {
                                                    entry.entry.split(' ').slice(0, 10).join(' ')
                                                }
                                                <span>...</span>
                                            </div>
                                            <div className='card-edit'
                                                onClick={() => {
                                                    editEntry(entry.id)
                                                }}
                                            >
                                                <svg width="24" height="24" fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="m16 2.016 3 3-2.287 2.288-3-3L16 2.016ZM4 14.004v3h3l8.299-8.287-3-3L4 14.004Zm0 6h16v2H4v-2Z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default HomePage
