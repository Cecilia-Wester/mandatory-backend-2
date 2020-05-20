import React from 'react';
import { Card } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './Cards.css';

export default function Cards({cardTitle}) {
    return(
        <div className='cards__container'>
            <Card>
                <CardContent className='cards__cardContent'>
                    <Typography className='cards__typography' color="textSecondary" gutterBottom>
                        {cardTitle}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}
