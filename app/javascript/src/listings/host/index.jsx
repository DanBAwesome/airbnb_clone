import React from 'react';
import ReactDOM from 'react-dom';
import Host from './host';

document.addEventListener('DOMContentLoaded', () => {
    const node = document.getElementById('params');
    const data = node.getAttribute('data-params');
    let parsedData = null

    if(data) {
        parsedData = JSON.parse(data);
    }
    
    ReactDOM.render(
        <Host property_id={parsedData.property_id} />,
        document.body.appendChild(document.createElement('div'))
    )
})