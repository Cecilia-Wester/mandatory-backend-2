import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import './ActionButtons.css';
import axios from 'axios';
import { TextareaAutosize } from '@material-ui/core';
import { Card } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import moment from 'moment';

export default function ActionButtons({  lists, listId, setListId, setCardTitle, cardTitle, cardDescription, setCardDescription, setCardText, fetchCard}) {
    const [isEditing, setIsEditing] = useState(false);

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
                time: moment().format('MMMM Do YYYY, h:mm:ss a'),
                cardDescription: null
            })
            .then(res => {
                fetchCard();
                setCardTitle('');
            })
            .catch(err =>{
                console.log(err);
            });
        }
        return;
    }


    if (isEditing){
        return(
            <div className='addCard'>
                <form onSubmit={(e) => onSubmitCard(e) } className='addCard__form'>
                    <Card className='addCard__card'>
                        <TextareaAutosize
                            className='addCard__input'
                            type='text'
                            value={cardTitle}
                            name='name'
                            onChange={(e) => setCardTitle(e.target.value)}
                            placeholder='Enter a title...'
                            autoFocus
                        />
                    </Card>
                    <div className='addCard__form__buttons'>
                        <Button 
                            type='submit'
                            >Add Card
                        </Button>
                        <CloseIcon className='addCard__closebtn' onClick={(e) => setIsEditing(false )}>Close</CloseIcon>
                    </div>
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


