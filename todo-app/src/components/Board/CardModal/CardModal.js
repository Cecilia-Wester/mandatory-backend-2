import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import './CardModal.css';
import { TextareaAutosize, Select, InputLabel, MenuItem, ListItem } from '@material-ui/core';
import Lists from '../Lists/Lists';

export default function CardModal({setCardModal, cardTitle, cardDescription, setCardDescription, setCardTitle, cardId, listId, listTitle, time, fetchCard, lists}){
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newListId, setNewListId] = useState('');
    const buttonRef = ({
        listTitle: listTitle,
        listId: listId
    })

    function cardUpdate(e, id) {
        e.preventDefault()
        setCardModal(false)
        console.log(cardTitle);
        console.log(newTitle)

        if(!newTitle ){
            setNewTitle(cardTitle) 
        }
        Axios.patch(`/cards/${id}`, {
            
            cardTitle: newTitle,
            cardDescription: newDescription,
            ListId: newListId
        })
        .then(res => {
            setCardTitle(cardTitle)
            setCardDescription(cardDescription)
            setCardModal(false)
            fetchCard()
        })
        .catch(err => {
            console.log(err);
        });
        
    }

    function cardDelete(e, id) {
        e.preventDefault()
        Axios.delete(`/cards/${id}`)
        .then(res => {
            console.log(res);
            setCardModal(false);
            fetchCard()
        })
        .catch(err => {
            console.log(err);
        });
    }

    function onChangeCardDescription(e){
        e.preventDefault();
        setNewDescription(e.target.value);
    }

    function onChangeCardTitle(e){
        e.preventDefault();
        setNewTitle(e.target.value);
    }

    function onClickList(e){
        e.preventDefault();
        setNewListId(e.target.value)
    }

    return ReactDOM.createPortal((
        <div className='cardModal__container'>
            <h4>Edit Card</h4>
            <form type='submit'>
                <div className='cardModal__cardTitle'>
                    <label htmlFor='cardTitle'>
                        Title:
                        <input 
                            className='cardModal__cardTitle__input'
                            id='cardTitle'
                            name='cardTitle'
                            type='text'
                            onChange={(e) => onChangeCardTitle(e)}
                            minLength='1'
                            maxLength='50'
                            required
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor='cardDescription' >
                        Description:
                        <TextareaAutosize
                            className='cardModal__cardTitle__input'
                            id='cardDescription'
                            rendervalue={cardDescription}
                            name='cardDescription'
                            type='text'
                            onChange={(e) => onChangeCardDescription(e)}
                            placeholder='add a description...'
                            minLength='0'
                            maxLength='300'
                        />
                    </label>
                </div>
                <div className='cardList'>
                    {/* <InputLabel id="label">List</InputLabel> */}
                    
                    {/* <Select labelId="label" id="select" onChange={(e) => onChangeList(e)}> */}
                        {lists.map((list, i) => {
                            return(<div className="radio">
                        <label>
                            <input 
                                key={list._id} 
                                type="radio" 
                                useref={buttonRef} 
                                value={list.listTitle} 
                                className='list' 
                                onChange ={(e) => onClickList(e)} />
                            {list.listTitle}
                        </label>
                    </div>
                                // <button type='radio' key={list._id} onChange={(e) => onClickList(e)}>{list.listTitle}</button>
                            // <MenuItem useref={list._id} key={list._id} className='cardList__listItem'>{list.listTitle}</MenuItem>
                            )
                        })}

                    {/* </Select> */}
                </div>
                <div className='cardModal__buttons'>
                    <p>Created: {time} </p>
                    <Button onClick={(e) => cardDelete(e, cardId)}>Delete card</Button>
                    <Button onClick={(e) => cardUpdate(e, cardId, listId)}>Update card</Button>
                </div>
            </form>
            <CloseIcon className='cardModal__closebtn' onClick={(e) => setCardModal(false)}>Close</CloseIcon>

        </div>
    ), document.body)
    
}