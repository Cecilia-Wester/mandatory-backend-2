import React, { useState, useEffect } from 'react';
import './List.css';
import Cards from '../Cards/Cards';
import  axios  from 'axios';
import ActionButtons from '../ActionButtons/ActionButtons';
import ActionButtonList from '../ActionButtonList/ActionButtonList';

export default function List () {
    const [cardTitle, setCardTitle] = useState('')
    const [listTitle, setListTitle] = useState('');
    const [listId, setListId] = useState('')
    const [isEditing, setIsEditing] =useState(false);
    const [lists, setLists] = useState([]);
    const [cards, setCards] = useState([]);
    const [isEditingList, setIsEditingList] = useState(false);

    useEffect(() => {
        fetchCard()
    }, [cardTitle]);

    useEffect(() => {
        fetchList()
    }, [])

    function fetchList(){
        axios.get('/lists')
        .then(res => {
            console.log(res.data)
            setListId(res.data)
            //  setLists(lists => [...res.data.map((lists, index) => key={index}, lists.listTitle)])
        })
        .catch(err =>{
            console.log(err)
        });
    }

    function fetchCard (){
        axios.get('/cards')
        .then(res => {
            console.log(res.data)
            setCards( cards => [...res.data.map((cards) => cards.cardTitle)]);
        })
        .catch(error => {
        });
    }

    console.log(cards)
    console.log(lists)
    return(
        <div className='list__container'>
            <header>
                <h3>Add your Lists and Cards</h3>
            </header>
            <div className='list__singleList'>
            {lists.map(list => {
                setListId(list.listId)
                console.log(list)
                return(
                    <div key={list._id} classname='list__list'>
                        <div className='list__render' >
                            <h3>{listTitle}</h3>
                            {cards.map((card) => {
                                console.log(card)
                                if(list.listId === card.listId){
                                    return(
                                        <div key={card._id} className='list__singleList__card'>
                                            <Cards cardTitle={card} />
                                        </div>
                                    )}
                            })}
                        </div>
                        <ActionButtons  listTitle={listTitle} cardTitle={cardTitle} setCardTitle={setCardTitle} cards={cards} isEditing={isEditing} setIsEditing={setIsEditing} fetchCard={fetchCard}/>
                    </div>
                )
            })}
            <ActionButtonList  isEditingList={isEditingList} setIsEditingList={setIsEditingList} listTitle={listTitle} setListTitle={setListTitle} fetchList={fetchList}/>
        </div>
    
        </div>
    )
}