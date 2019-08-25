import React from 'react';
import './DisplayImages.css';
import { Card, Col } from 'react-bootstrap';


// Display Images
const displayImages = (props) => {
    return (
        <Col
            xs={12}
            sm={6}
            md={4}
            xl={3}
            style={{ marginBottom: '15px' }}>
            <Card
                className={props.active}
                onClick={props.click}
                style={{
                    height: '100%',
                    cursor: 'pointer',
                    transform: props.active ? 'scale(1.1)' : '',
                    transition: 'all 300ms ease-out'
                }}>
                <Card.Img
                    style={{
                        height: '150px',
                        backgroundImage: 'url(' + props.imgurl + ')',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'top',
                        backgroundSize: 'cover'
                    }} />
                <Card.Body>
                    <Card.Text style={{ textAlign: 'center' }}>
                        {props.text}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default displayImages;