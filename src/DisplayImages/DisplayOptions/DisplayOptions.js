import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { Container } from '@material-ui/core';

const displayOptions = (props) => {
    const options = (
        <Container xs={12} md={12} xl={12} style={{ position: 'fixed', bottom: '0', textAlign: 'center' }}>
            <BottomNavigation style={{ backgroundColor: '#4f587d' }} >
                <BottomNavigationAction style={{ color: 'white' }} label="Delete" icon={<DeleteIcon />} />
                <BottomNavigationAction style={{ color: 'white' }} label="CloudDownload" icon={<CloudDownloadIcon />} />
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