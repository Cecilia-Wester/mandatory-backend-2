import React, {useState} from 'react';
import axios from 'axios'
import ActionButtons from '../ActionButtons/ActionButtons';
import Cards from '../Cards/Cards';
import { Button } from '@material-ui/core';
import './List.css';

export default function List ({listId, listTitle, fetchList, lists, listCards, fetchCard}){
    const [cardDescription, setCardDescription] = useState('');
    const [cardTitle, setCardTitle] = useState('')
    console.log(listCards)

    function listDelete(e, id){
        e.preventDefault()
        axios.delete(`/lists/${id}`)
        .then(res => {
            console.log(res);
            fetchList()
        })
        .catch(err => {
            console.log(err);
        });
    }

    return(
        <div className='list__container'>
            <header>
                <h3>{listTitle}</h3>
                <Button className='deleteList' onClick={(e) => listDelete(e, listId)}>Delete</Button>
            </header>
            {listCards.map((card) => {
                return(
                    <div key={card._id} className='list__singleList__card'>
                        <Cards cardTitle={card.cardTitle} setCardTitle={setCardTitle} cardId={card._id} cardDescription={card.cardDescription} setCardDescription={setCardDescription} listId={card.listId} time={card.time} lists={lists} fetchCard={fetchCard} fetchList={fetchList} />
                    </div>
                ) 
            })}
            <ActionButtons listId={listId} cardTitle={cardTitle} setCardTitle={setCardTitle}  fetchCard={fetchCard} />
        </div>
    )
}