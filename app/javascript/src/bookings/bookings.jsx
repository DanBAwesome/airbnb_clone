import React from 'react';
import Layout from '../layout';

import { handleErrors } from '@utils/fetchHelper';
import './bookings.scss';

const Booking = (props) => {
    const { booking } = props;
    const chargeComplete = booking.is_paid
    return (
        <React.Fragment>
            <div className="container booking">
                <div className="row align-items-center">
                    <div className="booking-img" style={{ backgroundImage: `url(${booking.image_url})` }}></div>
                    <div className="pl-3">
                        <div className="location text-uppercase">{booking.property_city}</div>
                        <div className="title font-weight-bold">{booking.property_title}</div>
                        <div className="date">Booked From {booking.start_date} to {booking.end_date}</div>
                    </div>
                    <div className="ml-auto">
                        Status: {chargeComplete ? "Complete" : "Incomplete"} 
                    </div>
                </div>
            </div>
            <hr className="px-0" />
        </React.Fragment>
    )
}

class Bookings extends React.Component {
    constructor() {
        super();

        this.state = {
            bookings: []
        }
    }

    componentDidMount() {
        fetch('api/user/booked-properties')
            .then(handleErrors)
            .then(data => {
                console.log(data)
                this.setState({ bookings: data.bookings })
            })
    }

    render() {
        const { bookings } = this.state;

        return (
            <Layout>
                <div className="container pt-4">
                    <h4>Bookings</h4>
                </div>
                {
                    bookings.map(booking => {
                        return <Booking key={booking.id} booking={booking} />
                    })
                }
            </Layout>
        )
    }
}

export default Bookings;