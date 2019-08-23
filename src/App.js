import React, { Component } from 'react';
import './App.css';
import DisplayImages from './DisplayImages/DisplayImages';
import { Jumbotron, Container, Row, ButtonGroup, Button } from 'react-bootstrap';
import DisplayOptions from './DisplayImages/DisplayOptions/DisplayOptions';

class App extends Component {

  state = {
    activeImages: [
      { id: '1', imgurl: './assets/Images/image-1.jpg', text: 'Who we are', name: 'image-1.jpg', selected: false },
      { id: '2', imgurl: './assets/Images/image-2.jpg', text: 'Partnership rationale', name: 'image-2.jpg', selected: false },
      { id: '3', imgurl: './assets/Images/image-3.jpg', text: 'Partnership rationale', name: 'image-3.jpg', selected: false },
      { id: '4', imgurl: './assets/Images/image-4.jpg', text: 'Our clubs', name: 'image-4.jpg', selected: false },
    ],
    deletedImages: [
      { id: '5', imgurl: './assets/Images/image-5.jpg', text: 'The opprotunity', name: 'image-5.jpg', selected: false }
    ],
    show: 'activeImages'
  };

  selectImageHandler = (imageId) => {
    console.log(imageId);
  }

  
  toggleButtonHandler = typeOfImagesToShow => {
    this.setState({
      show: typeOfImagesToShow
    })
  };

  render() {

    let images = (
      <Container fluid className="text-left">
        <Row>
          {this.state[this.state.show].map((image) => {
            return (
              <DisplayImages click={() => this.selectImageHandler(image.id)} key={image.id} imgurl={image.imgurl} alt={image.name} text={image.text} />
            )
          })
          }
        </Row>
      </Container>
    )

    const header = (
      <Jumbotron fluid style={{ backgroundColor: 'white' }}>
        <Container>
          <h1 className="text-left" style={{ color: '#4f587d' }}>My Library</h1>
        </Container>
      </Jumbotron>
    )

    const toggleButton = (
      <ButtonGroup style={{ width: '245px', marginTop: '20px', marginBottom: '20px', marginRight: '15px' }}>
        <Button style={{ backgroundColor: 'white', color: '#4f587d' }} onClick={() => this.toggleButtonHandler('activeImages')}>Active</Button>
        <Button style={{ backgroundColor: '#4f587d', color: 'white' }} onClick={() => this.toggleButtonHandler('deletedImages')}>Deleted</Button>
      </ButtonGroup>
    )

    return (
      <div className="App" style={{ backgroundColor: '#f3f4f8' }}>
        {header}
        <Container className="text-right">
          {toggleButton}
          {images}
        </Container>
        <DisplayOptions />
      </div>
    )
  }
}

export default App;
