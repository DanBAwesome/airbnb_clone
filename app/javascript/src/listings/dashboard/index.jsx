import React from 'react';
import ReactDOM from 'react-dom';
import ListingDashboard from './listingDashboard';

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <ListingDashboard />,
        document.body.appendChild(document.createElement('div'))
    )
})