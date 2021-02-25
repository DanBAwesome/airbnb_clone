import React from 'react';

import './imageList.scss';

export const ImageList = (props) => {
    const { id, imageUrl, firstLine, secondLine, thirdLine, isEditable } = props;
    //const chargeComplete = booking.is_paid
    return (
        <React.Fragment>
            <div className="container image-list">
                <div className="row align-items-center">
                    <div className="img" style={imageUrl && { backgroundImage: `url(${imageUrl})` }}></div>
                    <div className="pl-3">
                        <div className="first-line text-uppercase">{firstLine}</div>
                        <div className="title font-weight-bold">{secondLine}</div>
                        {/* <div className="date">Booked From {booking.start_date} to {booking.end_date}</div> */}
                    </div>
                    <div className="ml-auto">
                        {
                            isEditable && <a className="item-edit" href={`/host/${id}`}></a>

                        }
                        {/* Status: {chargeComplete ? "Complete" : "Incomplete"}  */}
                    </div>
                </div>
            </div>
            <hr className="px-0" />
        </React.Fragment>
    )
}