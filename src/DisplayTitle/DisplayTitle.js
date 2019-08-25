import React from 'react';
import './DisplayTitle.css';
import { Jumbotron, Container } from 'react-bootstrap';


// Display Title
const displayTitle = (props) => {
    return (
        
      <Jumbotron
      fluid
      style={{ backgroundColor: 'white' }}>
      <Container>
        <h1
          className="text-left"
          style={{ color: '#4f587d' }}>
          My Library
        </h1>
      </Container>
    </Jumbotron>
    )
}

export default displayTitle;