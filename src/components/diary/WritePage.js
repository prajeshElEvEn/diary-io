import { push, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../config/config'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WritePage = () => {
    const [diaryEntry, setDiaryEntry] = useState('')
    const [userId, setUserId] = useState('')
    const [diaryName, setDiaryName] = useState('')
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

    const saveEntry = async () => {
        if (diaryEntry) {
            if (emojiValue) {
                const entryRef = ref(db, 'Users/' + userId + '/entries')
                const emoji = findEmoji()
                const emojiNum = findEmojiNum()
                const entry = {
                    date: new Date().toLocaleDateString(),
                    entry: diaryEntry,
                    emoji: emoji,
                    emojiNum: emojiNum
                }
                await push(entryRef, entry)
                setDiaryEntry('')
                nav('/home')
            } else {
                toast.warn("You didn't select an emoji, did you? 😪", {
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
            toast.warn("Oh c'mon! Write SOMETHING 😑!", {
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
        setUserId(localStorage.getItem('currentUserId'))
        setDiaryName(localStorage.getItem('currentDiaryName'))
    }, [])


    return (
        <div className='diary-container'>
            <div className='diary-nav'>
                <div className='tip'>
                    <div className='tip-text'>
                        💡 Rate your day by selecting an emoji below.
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
            <div className='writeup-container'>
                <div className='writeup'>
                    <div className='writeup-header'>
                        <div className='writeup-header-left'>
                            <div className='writeup-header-title'>
                                Dear
                            </div>
                            <div className='diary-name'>
                                {
                                    diaryName
                                }
                                <span>,</span>
                            </div>
                        </div>
                    </div>
                    <div className='writeup-content'>
                        <textarea rows='20' placeholder='Tell me how your day went...'
                            onChange={(e) => {
                                setDiaryEntry(e.target.value)
                            }}
                        ></textarea>
                    </div>
                </div>
            </div>
            <div className='tip'>
                <div className='tip-text'>
                    💡 Don't forget to save your work by clicking on the save button below.
                </div>
            </div>
            <div className='save-btn'>
                <input type='submit' value='Save'
                    onClick={() => {
                        saveEntry()
                    }}
                />
            </div>
            <ToastContainer />
        </div>
    )
}

export default WritePage
