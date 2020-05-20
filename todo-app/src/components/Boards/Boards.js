import React, { useState, useEffect } from 'react';
import './Boards.css';
import Buttons from './Buttons/Buttons';
import axios from 'axios';

export default function Boards (){
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        fetchBoards()
    }, [])

    function fetchBoards(){
        axios.get('/boards')
        .then(res => {
            console.log(res);
            setBoards(res);
        })
        .catch(error => {
            console.log(error);
        });
    }

    return(
        <div className='boards__container'>
            <h1>Boards</h1>
            {/* {boards.map(board => {
                <Buttons>{board.name}</Buttons>
            })} */}
        </div>
    )
}