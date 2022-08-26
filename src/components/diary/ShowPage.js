import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { db } from '../../config/config'

const ShowPage = () => {
    const [currentDiaryName, setCurrentDiaryName] = useState('')
    const [currentEntryId, setCurrentEntryId] = useState('')
    const [currentUserId, setCurrentUserId] = useState('')
    const [entries, setEntries] = useState([])
    const [newEntry, setNewEntry] = useState('')
    const [currentEmoji, setCurrentEmoji] = useState('')

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
                for (let key in entries) {
                    if (entries[key].id === currentEntryId) {
                        setNewEntry(entries[key].entry)
                        setCurrentEmoji(entries[key].emoji)
                    }
                }
            })
        }
        getEntries()
    }, [currentUserId, currentEntryId])

    return (
        <div className='diary-container'>
            <div className='diary-nav'>
                <div className='tip'>
                    <div className='tip-text'>
                        💡 Memories bring back memories bring back you.
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
                        </div>
                    </div>
                    <div className='writeup-content'>
                        <div className='content'>
                            {
                                newEntry
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowPage
