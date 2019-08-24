import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import RestoreIcon from '@material-ui/icons/Restore';
import { Container } from '@material-ui/core';

const displayOptions = (props) => {

    let deleteButton = (
        <BottomNavigationAction
            onClick={props.delete}
            style={{ color: 'white' }}
            label="Delete"
            icon={<DeleteIcon />} />
    )

    let restoreButton = (
        <BottomNavigationAction
            onClick={props.restore}
            style={{ color: 'white' }}
            label="Restore"
            icon={<RestoreIcon />} />
    )

    let downloadButton = (
        <BottomNavigationAction
            onClick={props.download}
            style={{ color: 'white' }}
            label="Download"
            icon={<CloudDownloadIcon />} />
    )

    if (props.optionSet === 'deletedImages') {
        deleteButton = null;
        downloadButton = null;
    } else {
        restoreButton = null;
    }

    const options = (
        <Container
            xs={12}
            md={12}
            xl={12}
            style={{
                position: 'fixed',
                bottom: '0',
                textAlign: 'center'
            }}>
            <BottomNavigation style={{ backgroundColor: '#4f587d' }} >
                {deleteButton}
                {downloadButton}
                {restoreButton}
            </BottomNavigation>
        </Container>
    )

    return (
        <div>
            {options}
        </div>
    )
}

export default displayOptions;