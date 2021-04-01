import React from 'react';
import { Card } from 'react-bootstrap';

import { handleErrors } from '@utils/fetchHelper';
import { convertDate } from '@utils/months';

import './bookingSuccess.scss'

class BookingSuccess extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            booking: {
                images: []
            },
            loading: true
        };
    }

    componentDidMount() {
        fetch(`/api/bookings/${this.props.booking_id}`)
            .then(handleErrors)
            .then((data) => {
                this.setState({
                    booking: data.booking,
                    loading: false
                })
            })
    }

    render() {
        const { booking, loading } = this.state;

        if (loading) {
            return <div>Loading...</div>
        }

        const image = booking && booking.images[0];

        return (
            <div className="container mt-5">
                <Card>
                    <Card.Header>
                        <h4>Thank You!</h4>
                    </Card.Header>
                    <Card.Body>
                        <div className="row">
                            <div hidden={!image} className="property-image mx-3 align-self-center"
                                style={{ backgroundImage: `url(${image})` }} />
                            <div>
                                <p>Your booking for <b>{booking.title}</b> is successful.</p>
                                <h5>Details:</h5>
                                Name:
                                <h6>{booking.title}</h6>
                                Dates:
                                <h6>{convertDate(booking.start_date)} to {convertDate(booking.end_date)}</h6>
                                Location:
                                <h6>{booking.city}, {booking.country.toUpperCase()}</h6>
                            </div>
                            <div className="ml-auto pr-3 align-self-end">
                                <h5>Total: ${booking.total_price}</h5>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
                <div className="text-center mt-3 mb-4">
                    <a className="btn btn-primary" href="/">Return To Homepage</a>
                </div>
            </div>
        )
    }
}

export default BookingSuccess;