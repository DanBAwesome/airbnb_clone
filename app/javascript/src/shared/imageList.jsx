import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import './imageList.scss';

export const ImageList = (props) => {
    const { id, imageUrl, firstLine, secondLine, thirdLine, isEditable } = props;
    return (
        <React.Fragment>
            <div className="container image-list">
                <div className="d-flex align-items-center">
                    <div className="img" style={imageUrl && { backgroundImage: `url(${imageUrl})` }}></div>
                    <div className="pl-3">
                        <div className="first-line text-uppercase">{firstLine}</div>
                        <div className="title font-weight-bold">{secondLine}</div>
                    </div>
                    <div className="ml-auto">
                        {
                            isEditable && <a className="btn btn-primary" href={`/host/${id}`}><FontAwesomeIcon icon={faEdit} /></a>

                        }
                    </div>
                </div>
            </div>
            <hr className="px-0" />
        </React.Fragment>
    )
}