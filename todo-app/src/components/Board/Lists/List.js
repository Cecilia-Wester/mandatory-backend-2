import React, {useState, useEffect} from 'react';
import axios from 'axios'
import ActionButtons from '../ActionButtons/ActionButtons';
import Cards from '../Cards/Cards';


export default function List ({listId, listTitle, fetchList}){
    const [cardTitle, setCardTitle] = useState('')
    const [cards, setCards] = useState([]);

    
    useEffect(() => {
        fetchCard()
    }, [cardTitle]);

    function fetchCard (){
        axios.get('/cards')
        .then(res => {
            console.log(res.data)
            setCards(res.data);
        })
        .catch(error => {
        });
    }

    return(
        <div className='List__container'>
            <div className='list__render' >
                <h3>{listTitle}</h3>
                {cards.map((card) => {
                    console.log(card.listId)
                    if(listId === card.listId){
                        return(
                            <div key={card._id} className='list__singleList__card'>
                                <Cards cardTitle={card.cardTitle} />
                            </div>
                        )}
                    return;
                })}
                <ActionButtons listId={listId} cardTitle={cardTitle} setCardTitle={setCardTitle} cards={cards} fetchCard={fetchCard} />
            </div>

        </div>
    )
}