import React from 'react';
import './ActionButtonList.css';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import { TextareaAutosize } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'

export default function ActionButtonList({ isEditingList, setIsEditingList, listTitle, setListTitle, fetchList }){
    
    function onSubmitList(e){
        e.preventDefault();
        setIsEditingList(false);
        if(listTitle){
            axios.post('/lists', {
                listTitle: listTitle,
            })
            .then(res => {
                console.log(res)
                setListTitle(listTitle);
                fetchList();
            })
            .catch(err =>{
                console.log(err)
            });
        }
        return;
    }

    if (isEditingList){
        return(
            <div className='addList__container' >
                <form onSubmit={(e) => onSubmitList(e) } className='addList__form'>
                    <TextareaAutosize
                        className='addList__input'
                        type='text'
                        text={listTitle}
                        name='list'
                        onChange={(e) => setListTitle(e.target.value)}
                        placeholder='Enter a title...'
                        autoFocus
                        //onBlur={setIsEditing(false)}
                    />
                    <Button 
                        type='submit'
                        >Add List
                    </Button>
                    <CloseIcon className='addCard__closebtn' onClick={(e) => setIsEditingList(false)}>Close</CloseIcon>
                </form>
            </div>
        )
        } else {
            return(
                <div className='actionButton__container'>
                    <Button
                        size='large'
                        className='actionButtons__button'
                        startIcon={<AddIcon />}
                        border='none'
                        onClick={(e) => setIsEditingList(true)}
                    >
                        Add another list
                    </Button>
                </div>
            )
        }
    }
