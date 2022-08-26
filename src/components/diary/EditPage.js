import { useNavigate } from 'react-router-dom'
import { onValue, ref, set } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { db } from '../../config/config'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const EditPage = () => {
    const [currentDiaryName, setCurrentDiaryName] = useState('')
    const [currentEntryId, setCurrentEntryId] = useState('')
    const [currentUserId, setCurrentUserId] = useState('')
    const [entries, setEntries] = useState([])
    const [newEntry, setNewEntry] = useState('')
    const [currentEmoji, setCurrentEmoji] = useState('')
    const [emojiValue, setEmojiValue] = useState(0)

    const nav = useNavigate()

    const findEmoji = () => {
        if (emojiValue === 1) {
            return '😍'
        }
        else if (emojiValue === 2) {
            return '😊'
        }
        else if (emojiValue === 3) {
            return '😐'
        }
        else if (emojiValue === 4) {
            return '🙁'
        }
        else if (emojiValue === 5) {
            return '😫'
        }
    }
    const findEmojiNum = () => {
        if (emojiValue === 1) {
            return 1
        }
        else if (emojiValue === 2) {
            return 2
        }
        else if (emojiValue === 3) {
            return 3
        }
        else if (emojiValue === 4) {
            return 4
        }
        else if (emojiValue === 5) {
            return 5
        }
    }

    const editEntry = async () => {
        if (newEntry) {
            if (emojiValue) {
                const entryRef = ref(db, 'Users/' + currentUserId + '/entries/' + currentEntryId)
                const emoji = findEmoji()
                const emojiNum = findEmojiNum()
                const entry = {
                    date: new Date().toLocaleDateString(),
                    emoji: emoji,
                    emojiNum: emojiNum,
                    entry: newEntry
                }
                await set(entryRef, entry)
                nav('/diary-io/home')
            } else {
                toast.warn("You forgot the emoji 😭!", {
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
            toast.warn("You deleted everything? RESET & UPDATE 😤!", {
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

    const fetchEntry = () => {
        for (let key in entries) {
            if (entries[key].id === currentEntryId) {
                setNewEntry(entries[key].entry)
                setCurrentEmoji(entries[key].emoji)
            }
        }
    }

    useEffect(() => {
        setCurrentDiaryName(localStorage.getItem('currentDiaryName'))
        setCurrentEntryId(localStorage.getItem('currentEntryId'))
        setCurrentUserId(localStorage.getItem('currentUserId'))
        const getEntries = async () => {
            const entryRef = ref(db, 'Users/' + currentUserId + '/entries')
            await onValue(entryRef, (snapshot) => {
                const data = snapshot.val()
                let entries = []
                for (let id in data) {
                    entries.push({ id, ...data[id] })
                }
                setEntries(entries)
            })
        }
        getEntries()
    }, [currentUserId])


    return (
        <div className='diary-container'>
            <div className='diary-nav'>
                <div className='tip'>
                    <div className='tip-text'>
                        💡 Click on the reset button to load the previous data.
                    </div>
                </div>
                <div className='diary-nav-items'>
                    <div className='diary-emoji'
                        onClick={() => {
                            setEmojiValue(1)
                            toast.success('😍 selected!', {
                                theme: 'dark',
                                position: "bottom-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        }}
                    >
                        😍
                    </div>
                    <div className='diary-emoji'
                        onClick={() => {
                            setEmojiValue(2)
                            toast.success('😊 selected!', {
                                theme: 'dark',
                                position: "bottom-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        }}
                    >
                        😊
                    </div>
                    <div className='diary-emoji'
                        onClick={() => {
                            setEmojiValue(3)
                            toast.success('😐 selected!', {
                                theme: 'dark',
                                position: "bottom-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        }}
                    >
                        😐
                    </div>
                    <div className='diary-emoji'
                        onClick={() => {
                            setEmojiValue(4)
                            toast.success('🙁 selected!', {
                                theme: 'dark',
                                position: "bottom-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        }}
                    >
                        🙁
                    </div>
                    <div className='diary-emoji'
                        onClick={() => {
                            setEmojiValue(5)
                            toast.success('😫 selected!', {
                                theme: 'dark',
                                position: "bottom-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        }}
                    >
                        😫
                    </div>
                </div>
            </div>
            <div className='tip'>
                <div className='tip-text'>
                    💡 Make changes you like and don't forget to select an emoji.
                </div>
            </div>
            <div className='writeup-container'>
                <div className='writeup'>
                    <div className='writeup-header'>
                        <div className='writeup-header-left'>
                            <div className='writeup-header-title'>
                                Dear
                            </div>
                            <div className='diary-name'>
                                {
                                    currentDiaryName
                                }
                                <span>,</span>
                            </div>
                        </div>
                        <div className='writeup-header-right'>
                            <div className='current emoji'>
                                {
                                    currentEmoji
                                }
                            </div>
                            <div className='writeup-header-btn'
                                onClick={() => {
                                    fetchEntry()
                                }}
                            >
                                <svg width="24" height="24" fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 16c1.671 0 3-1.331 3-3s-1.329-3-3-3-3 1.331-3 3 1.329 3 3 3Z"></path>
                                    <path d="M20.817 11.186a8.94 8.94 0 0 0-1.355-3.219 9.053 9.053 0 0 0-2.43-2.43 8.95 8.95 0 0 0-5.057-1.535V2L8 5l3.975 3V6.002a6.961 6.961 0 0 1 3.937 1.193 7.004 7.004 0 0 1 1.894 9.718 7.028 7.028 0 0 1-4.394 2.946 7.13 7.13 0 0 1-2.822 0A7.002 7.002 0 0 1 5 13H3a9.02 9.02 0 0 0 1.539 5.034 9.096 9.096 0 0 0 2.428 2.428A8.95 8.95 0 0 0 12 22c.61 0 1.217-.061 1.814-.183a9.014 9.014 0 0 0 5.649-3.786A8.952 8.952 0 0 0 21 13c0-.61-.061-1.217-.183-1.814Z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className='writeup-content'>
                        <textarea rows='20' placeholder='Tell me how your day went...'
                            value={newEntry}
                            onChange={(e) => {
                                setNewEntry(e.target.value)
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className='tip'>
                <div className='tip-text'>
                    💡 Click on the Update button to update changes.
                </div>
            </div>
            <div className='save-btn'>
                <input type='submit' value='Update'
                    onClick={() => {
                        editEntry()
                    }}
                />
            </div>
            <ToastContainer />
        </div>
    )
}

export default EditPage
