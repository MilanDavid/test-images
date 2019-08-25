import React from 'react';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import RestoreIcon from '@material-ui/icons/Restore';
import Paper from '@material-ui/core/Paper';


// Display Options after select of images
const displayOptions = (props) => {

    // delete button
    let deleteButton = (
        <BottomNavigationAction
            onClick={props.delete}
            style={{ color: 'white' }}
            label="Delete"
            icon={<DeleteIcon />} />
    )

    // restore button
    let restoreButton = (
        <BottomNavigationAction
            onClick={props.restore}
            style={{ color: 'white' }}
            label="Restore"
            icon={<RestoreIcon />} />
    )

    // delete button
    let downloadButton = (
        <BottomNavigationAction
            onClick={props.download}
            style={{ color: 'white' }}
            label="Download"
            icon={<CloudDownloadIcon />} />
    )

    // check what buttons to show, depends on category
    if (props.optionSet === 'deletedImages') {
        deleteButton = null;
        downloadButton = null;
    } else {
        restoreButton = null;
    }

    // returns element with appropriate buttons
    const options = (
        <Paper style={{
            backgroundColor: '#4f587d',
            bottom: '0',
            textAlign: 'center',
            position: 'fixed',
            width: '70%',
            marginLeft: '15%'
        }} >
            {deleteButton}
            {downloadButton}
            {restoreButton}
        </Paper>
    )

    return (
        <div>
            {options}
        </div>
    )
}

export default displayOptions;