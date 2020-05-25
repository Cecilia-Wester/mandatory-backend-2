import React, { useState } from 'react';
import { Card, Button } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './Cards.css';
import CardModal from '../CardModal/CardModal';

export default function Cards({cardTitle, setCardTitle, cardId, cardDescription, listId, setListId, time, setCardDescription, fetchCard, lists, fetchList}) {
    const [cardModal, setCardModal] = useState(false);
    return(
        <div className='cards__container'>
            <Card>
                <CardContent className='cards__cardContent'>
                    <Typography className='cards__typography' color="textSecondary" gutterBottom>
                        <span className='cards__typography__cardTitle'>{cardTitle}</span><br />
                        <span className='cards__typography__cardDescription'>{cardDescription}</span><br />
                        <Button onClick={(e) => setCardModal(true)}>Edit</Button>
                    </Typography>
                </CardContent>
            </Card>
            {cardModal && <CardModal setCardModal={setCardModal} cardTitle={cardTitle} setCardTitle={setCardTitle} cardId={cardId} time={time} cardDescription={cardDescription} setCardDescription={setCardDescription} listId={listId} setListId={setListId} fetchCard={fetchCard} lists={lists} fetchList={fetchList} />}
        </div>
    )
}
