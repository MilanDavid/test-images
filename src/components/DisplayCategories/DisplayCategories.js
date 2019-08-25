import React from 'react';
import './DisplayCategories.css';
import { ButtonGroup, Button } from 'react-bootstrap';


// Display Categories buttons
const displayCategories = (props) => {
    return (
        <ButtonGroup
            style={{
                width: '245px',
                marginTop: '20px',
                marginBottom: '20px',
                marginRight: '15px'
            }}>
            <Button
                className={
                    props.show === 'activeImages' ?
                        'SelectActiveImages' :
                        'SelectDeletedImages'}
                onClick={() => props.toggle('activeImages')}>
                All
        </Button>
            <Button
                className={
                    props.show === 'deletedImages' ?
                        'SelectActiveImages' :
                        'SelectDeletedImages'}
                onClick={() => props.toggle('deletedImages')}>
                Deleted
        </Button>
        </ButtonGroup>
    )
}

export default displayCategories;