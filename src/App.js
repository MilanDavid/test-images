import React, { Component } from 'react';
import './App.css';
import { Container, Row } from 'react-bootstrap';
import { saveAs } from 'file-saver';
import { Card, Col } from 'react-bootstrap';
import AddPhotoAlternate from '@material-ui/icons/AddPhotoAlternate';

import DisplayTitle from './components/DisplayTitle/DisplayTitle';
import DisplayCategories from './components/DisplayCategories/DisplayCategories';
import DisplayImages from './components/DisplayImages/DisplayImages';
import DisplayConfirmation from './components/DisplayConfirmation/DisplayConfirmation';
import DisplayOptions from './components/DisplayOptions/DisplayOptions';

class App extends Component {

  // initial state
  state = {
    activeImages: [
      {
        id: '1',
        imgurl: './assets/Images/image-1.jpg',
        text: 'Who we are',
        name: 'image-1.jpg'
      },
      {
        id: '2',
        imgurl: './assets/Images/image-2.jpg',
        text: 'Partnership rationale',
        name: 'image-2.jpg'
      },
      {
        id: '3',
        imgurl: './assets/Images/image-3.jpg',
        text: 'Partnership rationale',
        name: 'image-3.jpg'
      },
      {
        id: '4',
        imgurl: './assets/Images/image-4.jpg',
        text: 'Our clubs',
        name: 'image-4.jpg'
      }
    ],
    deletedImages: [
      {
        id: '5',
        imgurl: './assets/Images/image-5.jpg',
        text: 'The opprotunity',
        name: 'image-5.jpg'
      }
    ],
    show: 'activeImages',
    selectedImage: null,
    open: false
  };

  // toggle between All an Deleted category handler
  toggleButtonHandler = typeOfImagesToShow => {
    if (this.state.selectedImage !== null) {
      this.setState({
        selectedImage: null,
        show: typeOfImagesToShow
      })
    } else {
      this.setState({
        show: typeOfImagesToShow
      })
    }
  };

  // select image handler
  selectDeselectImageHandler = id => {
    if (this.state.selectedImage === id) {
      this.setState({
        selectedImage: null
      })
    } else {
      this.setState({
        selectedImage: id
      })
    }
  }

  // deselect image handler
  deselectImagesHandler = () => {
    this.setState({
      selectedImage: null
    })
  }

  // download image button handler
  downloadImageHandler = id => {
    let fileIndex = this.state.activeImages.findIndex(image => {
      return image.id === id
    })
    let fileLink = this.state.activeImages[fileIndex].imgurl;
    let fileName = this.state.activeImages[fileIndex].name;

    saveAs(fileLink, fileName);
  }

  // restore image button handler
  restoreImageHandler = id => {
    let newActiveImages = [...this.state.activeImages];
    let newDeletedImages = [...this.state.deletedImages];
    let imageIndex = newDeletedImages.findIndex(img => {
      return img.id === id;
    });;
    let imageToRestore = newDeletedImages[imageIndex];
    newActiveImages.push(imageToRestore);
    newDeletedImages.splice(imageIndex, 1);
    if (newDeletedImages.length === 0) {
      this.setState({
        activeImages: newActiveImages,
        deletedImages: newDeletedImages,
        show: 'activeImages',
        selectedImage: null,
        disableDeleted: true,
        disableActive: false
      })
    } else {
      this.setState({
        activeImages: newActiveImages,
        deletedImages: newDeletedImages,
        disableActive: false,
        selectedImage: null
      })
    }
  }

  // delete confirmation dialog handler
  confirmationDialogHandler = () => {
    this.setState({
      open: true
    })
  }

  // handle confirmation close
  handleClose = (event) => {
    let id = this.state.selectedImage;
    if (event === true) {
      let newActiveImages = [...this.state.activeImages];
      let newDeletedImages = [...this.state.deletedImages];
      let imageIndex = newActiveImages.findIndex(img => {
        return img.id === id;
      });;
      let imageToDelete = newActiveImages[imageIndex];
      newDeletedImages.push(imageToDelete);
      newActiveImages.splice(imageIndex, 1);
      if (newActiveImages.length === 0) {
        this.setState({
          activeImages: newActiveImages,
          deletedImages: newDeletedImages,
          show: 'deletedImages',
          selectedImage: null,
          disableActive: true,
          disableDeleted: false,
          open: false
        })
      } else {
        this.setState({
          activeImages: newActiveImages,
          deletedImages: newDeletedImages,
          selectedImage: null,
          open: false
        })
      }
    } else {
      this.setState({
        open: false
      })
    }
  }

  // adding new image from url
  fileSelectedHandler = (event) => {
    let newImage = event.target.value;
    let nameSplit = newImage.split('/');
    let name = nameSplit[nameSplit.length - 1];
    let newActiveImages = [...this.state.activeImages]
    let id = Math.floor(Math.random() * 1000)
    newActiveImages.push({ id: id, imgurl: newImage, name: name, text: name })
    this.setState({
      activeImages: newActiveImages
    })
    event.target.value = null;
  }

  render() {

    // select image logic
    let selectedImageOption = null;

    if (this.state.selectedImage) {
      selectedImageOption = (
        <DisplayOptions
          optionSet={this.state.show}
          download={() => this.downloadImageHandler(this.state.selectedImage)}
          restore={() => this.restoreImageHandler(this.state.selectedImage)}
          delete={() => this.confirmationDialogHandler(this.state.selectedImage)} />
      )
    }

    // add image card template
    let addImage = null;

    if (this.state.show === 'activeImages') {
      addImage = (
        <Col
          xs={12}
          sm={6}
          md={4}
          xl={3}
          style={{ marginBottom: '15px' }}>
          <Card
            style={{
              height: '220px'
            }}>
            <Card.Body>
              <Card.Text style={{ textAlign: 'center', marginTop: '25px' }}>
                Image URL
                <input type="url" onChange={this.fileSelectedHandler} />
                <AddPhotoAlternate style={{ fontSize: '60' }} />
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      )
    }

    // display images template
    let images = (
      <Row>
        {this.state[this.state.show].map((image) => {
          return (
            <DisplayImages
              download={() => this.downloadImageHandler(image.id)}
              click={() => this.selectDeselectImageHandler(image.id)}
              key={image.id}
              imgurl={image.imgurl}
              alt={image.name}
              text={image.name}
              active={this.state.selectedImage === image.id ? 'shadow-lg' : ''} />
          )
        })}
        {addImage}
      </Row>
    )

    return (
      <div
        className="App">
        <DisplayTitle />
        <Container
          className="text-right">
          <DisplayCategories
            show={this.state.show}
            toggle={this.toggleButtonHandler} />
          <Container
            fluid
            className="text-left">
            {images}
          </Container>
        </Container>
        {selectedImageOption}
        <DisplayConfirmation
          open={this.state.open}
          handleClose={this.handleClose} />
      </div>
    )

  }
}

export default App;
