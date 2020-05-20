import React from 'react';
import Button from '@material-ui/core/Button';
import AssignmentIcon from '@material-ui/icons/Assignment';
import './Buttons.css';

export default function BoardButtons({Boards}) {  
    return (
        <div className='boardButtons__container'>
            <Button
                variant="contained"
                color='primary'
                size='larger'
                className='boardButtons__button'
                startIcon={<AssignmentIcon />}
            >
                Boards name
                {Boards}
            </Button>
        </div>
    )
}