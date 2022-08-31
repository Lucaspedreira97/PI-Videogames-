import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import getByName from '../Redux/actions';
import "../styles/Search.css"

export default function Search({setPagina}) {
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    function handleinputChange(e) {
        // e.preventDefault()
        setName(e.target.value)
        console.log(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getByName(name)) 
        setPagina(1)
        setName('') 
    }

    return (
        <div>
            <input className='searchInput' onChange={(e) => handleinputChange(e)} value={name} type='text' placeholder='Search game..'/>
            <button className='searchBtn' onClick={(e) => handleSubmit(e)} type='submit'>Search</button>
        </div>
    )
}