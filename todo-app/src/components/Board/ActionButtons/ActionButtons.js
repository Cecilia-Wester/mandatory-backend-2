import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import './ActionButtons.css';
import axios from 'axios';
import { TextareaAutosize } from '@material-ui/core';
import { Card } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import moment from 'moment';

export default function ActionButtons({  lists, listId, setListId, cardTitle, setCardTitle, cardText, isEditing, setIsEditing, setCardText, fetchCard}) {
    function onClickCard (e){
        e.preventDefault();
        setIsEditing(true);
    }

    function onSubmitCard(e){
        e.preventDefault();
        setIsEditing(false);
        if(cardTitle){
            axios.post('/cards', {
                cardTitle: cardTitle,
                listId: listId,
                time: moment().format('MMMM Do YYYY, h:mm:ss a')
            })
            .then(res => {
                console.log(res)
                setCardText(cardText)
                fetchCard();
            })
            .catch(err =>{
                console.log(err);
            });
        }
        return;
    }


    if (isEditing){
        return(
            <div classname='addCard'>
                <form onSubmit={(e) => onSubmitCard(e) } className='addCard__form'>
                    <Card className='addCard__card'>
                        <TextareaAutosize
                            className='addCard__input'
                            type='text'
                            text={cardTitle}
                            name='name'
                            onChange={(e) => setCardTitle(e.target.value)}
                            placeholder='Enter a title...'
                            autoFocus
                            //onBlur={setIsEditing(false)}
                        />
                    </Card>
                    <Button 
                        type='submit'
                        >Add Card
                    </Button>
                    <CloseIcon className='addCard__closebtn' onClick={(e) => setIsEditing(false )}>Close</CloseIcon>
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
                    onClick={(e) => onClickCard(e)}
                >
                    Add another card
                </Button>
            </div>
        )
    }
}


