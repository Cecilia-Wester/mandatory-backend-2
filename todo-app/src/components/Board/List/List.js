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
            console.log(res.data);
            setLists(res.data);
            
        })
        .catch(err =>{
            console.log(err)
        });
    }

    function fetchCard (){
        axios.get('/cards')
        .then(res => {
            console.log(res.data)
            setCards(res.data);
        })
        .catch(error => {
        });
    }
    cards.map(card => {
        return(
            console.log(card)
        )
    })
    return(
        <div className='list__container'>
            <header>
                <h3>Add your Lists and Cards</h3>
            </header>
            {lists.map(list => {
                console.log(list)
                return(
                <div className='list__singleList'>
                    <div key={list._id} className='list__list'>
                        <div className='list__render' >
                            <h3>{list.listTitle}</h3>
                            {/* {cards.map((card) => {
                                console.log(card)
                                if(listId === listId){
                                    return(
                                        <div key={card._id} className='list__singleList__card'>
                                            <Cards cardTitle={card} />
                                        </div>
                                    )}
                            })} */}
                            <ActionButtons  listTitle={list.listTitle} cardTitle={cardTitle} setCardTitle={setCardTitle} cards={cards} isEditing={isEditing} setIsEditing={setIsEditing} fetchCard={fetchCard}/>

                        </div>
                    </div>
                    </div>
                )
            })}
            <ActionButtonList  isEditingList={isEditingList} setIsEditingList={setIsEditingList} listTitle={listTitle} setListTitle={setListTitle} fetchList={fetchList}/>
        </div>
    
        
    )
}