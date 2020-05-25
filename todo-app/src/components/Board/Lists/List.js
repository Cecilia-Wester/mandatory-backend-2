import React, {useState, useEffect} from 'react';
import axios from 'axios'
import ActionButtons from '../ActionButtons/ActionButtons';
import Cards from '../Cards/Cards';
import { Button } from '@material-ui/core';

export default function List ({listId, listTitle, fetchList, lists}){
    const [cardTitle, setCardTitle] = useState('')
    const [cards, setCards] = useState([]);
    const [cardDescription, setCardDescription] = useState('');

    useEffect(() => {
        fetchCard()
    }, [cardTitle]);

    function fetchCard (){
        axios.get('/cards')
        .then(res => {
            setCards(res.data);
        })
        .catch(error => {
            console.log(error);
        });
    }

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
        <div className='List__container'>
            <div className='list__render' >
                <h3>{listTitle}</h3>
                <Button className='deleteList' onClick={(e) => listDelete(e, listId)}>Delete</Button>
                {cards.map((card) => {
                    if(listId === card.listId){
                        return(
                            <div key={card._id} className='list__singleList__card'>
                                <Cards cardTitle={card.cardTitle} setCardTitle={setCardTitle} cardId={card._id} cardDescription={card.cardDescription} setCardDescription={setCardDescription} listId={card.listId} time={card.time} lists={lists}/>
                            </div>
                        )}
                    return;
                })}
                <ActionButtons listId={listId} cardTitle={cardTitle} setCardTitle={setCardTitle} cards={cards} fetchCard={fetchCard} />
            </div>

        </div>
    )
}