import React, { useState, useEffect } from 'react';
import './Lists.css';
import  axios  from 'axios';
import ActionButtonList from '../ActionButtonList/ActionButtonList';
import List from './List'

export default function Lists () {
    const [listTitle, setListTitle] = useState('');
    const [listId, setListId] = useState('')
    const [lists, setLists] = useState([]);
    const [isEditingList, setIsEditingList] = useState(false);

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

    return(
        <div className='list__container'>
            <header>
                <h3>Add your Lists and Cards</h3>
            </header>
            {lists.map(list => {
                return(
                    <div key={list._id} className='list__singleList'>
                        <List listId={list._id} listTitle={list.listTitle} />
                    </div>
                    
                )
            })}
            <ActionButtonList  isEditingList={isEditingList} setIsEditingList={setIsEditingList} listTitle={listTitle} setListTitle={setListTitle} fetchList={fetchList}/>
        </div>
    
        
    )
}