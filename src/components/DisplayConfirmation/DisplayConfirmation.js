import React from 'react';
import './DisplayConfirmation.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Button } from 'react-bootstrap';


// Display Confirmation dialog
const displayConfirmation = (props) => {
    return (
        <div>
        <Dialog
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You are about to delete this image, proceed?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => props.handleClose(true)} style={{ backgroundColor: '#4f587d' }}>
              Proceed
            </Button>
            <Button onClick={() => props.handleClose(false)} style={{ backgroundColor: '#4f587d' }} autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
}

export default displayConfirmation;