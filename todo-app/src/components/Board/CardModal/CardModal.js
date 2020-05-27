import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import './CardModal.css';
import { TextareaAutosize } from '@material-ui/core';

export default function CardModal({setCardModal, cardTitle, cardDescription, setCardDescription, setCardTitle, cardId, listId, listTitle, time, fetchCard, lists, fetchList}){
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newListId, setNewListId] = useState('');

    function cardUpdate(e, id) {
        e.preventDefault()
        let listIdValue=newListId;
        let titleValue=newTitle;
        setCardModal(false)
        console.log(listId)
        console.log(newListId)
        if(!newListId){
            listIdValue=listId
        }
        if(!newTitle){
            titleValue=cardTitle;
        }
        Axios.patch(`/cards/${id}`, {
            cardTitle: titleValue,
            cardDescription: newDescription,
            listId: listIdValue
        })
        .then(res => { 
            fetchList()
            fetchCard();
            setCardModal(false)
            console.log(res)
        })
        .catch(err => {
            console.log(err);
        });
    }

    function cardDelete(e, id) {
        e.preventDefault()
        Axios.delete(`/cards/${id}`)
        .then(res => {
            setCardModal(false);
            fetchCard();
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

    function onChangeList(e){
        e.preventDefault();
        setNewListId(e.target.value)
    }

    return ReactDOM.createPortal((
        <div className='cardModal__container'>
            <header className='cardModal__header'>
                <h4>Edit Card</h4>
                <CloseIcon className='cardModal__closebtn' onClick={(e) => setCardModal(false)}>Close</CloseIcon>
            </header>
            <form type='submit'>
                <div className='cardModal__cardTitle'>
                    <label htmlFor='cardTitle'>
                        Title:
                        <TextareaAutosize 
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
                <div className='cardModal__cardDescription'>
                    <label htmlFor='cardDescription' >
                        Description:
                        <TextareaAutosize
                            className='cardModal__cardTitle__input'
                            id='cardDescription'
                            text={cardDescription}
                            name='cardDescription'
                            type='text'
                            onChange={(e) => onChangeCardDescription(e)}
                            placeholder='add a description...'
                            minLength='0'
                            maxLength='300'
                        />
                    </label>
                </div>
                <div className='cardModal__cardList'>
                    <select id="select" onClick={(e) => onChangeList(e)}>
                        {lists.map((list, index) => {
                            return(
                                <option value={list._id} key={index}>{list.listTitle}</option> 
                            )
                        })}
                    </select>                    
                </div>
                <div className='cardModal__buttons'>
                    <p>Created: {time} </p>
                    <Button onClick={(e) => cardDelete(e, cardId)}>Delete card</Button>
                    <Button onClick={(e) => cardUpdate(e, cardId, listId)}>Update card</Button>
                </div>
            </form>
            
        </div>
    ), document.body)
    
}