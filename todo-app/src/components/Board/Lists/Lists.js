import React, { useState, useEffect } from 'react';
import './Lists.css';
import axios  from 'axios';
import ActionButtonList from '../ActionButtonList/ActionButtonList';
import List from './List'

export default function Lists () {
    const [listTitle, setListTitle] = useState('');
    // const [listId, setListId] = useState('')
    const [lists, setLists] = useState([]);
    const [isEditingList, setIsEditingList] = useState(false);
    const [cards, setCards] = useState([]);
    let listCards = []

    useEffect(() => {
        fetchList()
    }, [])

    function fetchList(){
        axios.get('/lists')
        .then(res => {
            if(res.data.length===0){
                return;
            }
            setLists(res.data);
        })
        .catch(err =>{
            console.log(err)
        });
    }

    useEffect(() => {
        fetchCard()
    }, []);

    function fetchCard (){
        axios.get('/cards')
        .then(res => {
            setCards(res.data)
        })
        .catch(err => {
            console.log(err);
        });
    }


    return(
        <div className='lists__container'>
            <header>
                <h3>Add your Lists and Cards</h3>
            </header>
            <div className='lists__allSingleLists'>
                {lists.map(list => {
                    listCards = cards.filter(card => card.listId === list._id)
                    return(
                        <div key={list._id} className='list__singleList'>
                            <List listId={list._id} listTitle={list.listTitle} lists={lists} fetchList={fetchList} fetchCard={fetchCard} listCards={listCards}/>
                        </div>
                    )
                })}
                <ActionButtonList isEditingList={isEditingList} setIsEditingList={setIsEditingList} listTitle={listTitle} setListTitle={setListTitle} fetchList={fetchList} fetchCard={fetchCard} />
            </div>
        </div>
    )
            
}