import React from 'react';
import './DisplayImages.css';
import { Card, Col } from 'react-bootstrap';

const displayImages = (props) => {
    return (
        <Col
        xs={12}
        sm={6}
        md={4}
        xl={3}
        style={{ marginBottom: '15px' }}>
            <Card
            onClick={props.click}
            style={{
                height: '100%',
                cursor: 'pointer'
                }}>
                <Card.Img
                style={{ 
                    height: '150px',
                    backgroundImage: 'url(' + props.imgurl + ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'top',
                    backgroundSize: 'cover' }} />
                <Card.Body>
                    <Card.Text>
                        {props.text}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default displayImages;