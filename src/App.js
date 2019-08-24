import React, { Component } from 'react';
import './App.css';
import DisplayImages from './DisplayImages/DisplayImages';
import { Jumbotron, Container, Row, ButtonGroup, Button } from 'react-bootstrap';
import DisplayOptions from './DisplayImages/DisplayOptions/DisplayOptions';
import { saveAs } from 'file-saver';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

class App extends Component {

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
    disableDeleted: false,
    disableActive: false,
    open: false
  };

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

  deselectImagesHandler = () => {
    this.setState({
      selectedImage: null
    })
  }

  downloadImageHandler = id => {
    let fileIndex = this.state.activeImages.findIndex(image => {
      return image.id === id
    })
    let fileLink = this.state.activeImages[fileIndex].imgurl;
    let fileName = this.state.activeImages[fileIndex].name;

    saveAs(fileLink, fileName);
  }

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

  confirmationDialogHandler = () => {
    this.setState({
      open: true
    })
  }

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

  render() {

    let confirmDialog = (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You are about to delete this image, proceed?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose(true)} style={{ backgroundColor: '#4f587d' }}>
              Proceed
            </Button>
            <Button onClick={() => this.handleClose(false)} style={{ backgroundColor: '#4f587d' }} autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )

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

    let images = (
      <Container
        fluid
        className="text-left">
        <Row>
          {this.state[this.state.show].map((image) => {
            return (
              <DisplayImages
                download={() => this.downloadImageHandler(image.id)}
                click={() => this.selectDeselectImageHandler(image.id)}
                key={image.id}
                imgurl={image.imgurl}
                alt={image.name}
                text={image.text} />
            )
          })}
        </Row>
      </Container>
    )

    const header = (
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

    const toggleButton = (
      <ButtonGroup
        style={{
          width: '245px',
          marginTop: '20px',
          marginBottom: '20px',
          marginRight: '15px'
        }}>
        <Button
          className={
            this.state.show === 'activeImages' ?
              'SelectActiveImages' :
              'SelectDeletedImages'}
          onClick={() => this.toggleButtonHandler('activeImages')}
          disabled={this.state.disableActive}>
          All
        </Button>
        <Button
          className={
            this.state.show === 'deletedImages' ?
              'SelectActiveImages' :
              'SelectDeletedImages'}
          onClick={() => this.toggleButtonHandler('deletedImages')}
          disabled={this.state.disableDeleted}>
          Deleted
        </Button>
      </ButtonGroup>
    )

    return (
      <div
        className="App"
        style={{ backgroundColor: '#f3f4f8' }}>
        {header}
        <Container
          className="text-right">
          {toggleButton}
          {images}
        </Container>
        {selectedImageOption}
        {confirmDialog}
      </div>
    )

  }
}

export default App;
