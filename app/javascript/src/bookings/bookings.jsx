import React from 'react';
import { Button } from 'react-bootstrap';

import Layout from '../layout';
import { handleErrors, safeCredentials } from '@utils/fetchHelper';
import './bookings.scss';

const Booking = (props) => {
    const { booking, completeBooking } = props;
    const chargeComplete = booking.is_paid

    return (
        <React.Fragment>
            <div className="container booking">
                <div className="row align-items-center mb-5">
                    <div className="booking-img" style={booking.image && { backgroundImage: `url(${booking.image})` }}></div>
                    <div className="pl-3">
                        <div className="location text-uppercase">{booking.property_city}</div>
                        <div className="title font-weight-bold">{booking.property_title}</div>
                        <div className="date">Booked From {booking.start_date} to {booking.end_date}</div>
                        <div className="font-weight-bold">Total: ${booking.total_price}</div>
                    </div>
                    <div className="ml-auto">
                        Status: {chargeComplete ? "Complete" : "Incomplete"}
                    </div>
                </div>
                <div hidden={chargeComplete} className="row justify-content-center">
                    <Button className="mx-3 w-25" onClick={() => completeBooking(booking.id)}>Complete Booking</Button>
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
        this.initiateStripeCheckout = this.initiateStripeCheckout.bind(this);
    }

    componentDidMount() {
        fetch('api/user/booked-properties')
            .then(handleErrors)
            .then(data => {
                this.setState({ bookings: data.bookings });
            })
    }

    initiateStripeCheckout = (booking_id) => {
        return fetch(`/api/charges?booking_id=${booking_id}&cancel_url=${window.location.pathname}`, safeCredentials({
            method: 'POST'
        }))
            .then(handleErrors)
            .then(response => {
                const stripe = Stripe(process.env.STRIPE_PUBLISHABLE_KEY);

                stripe.redirectToCheckout({
                    sessionId: response.charge.checkout_session_id
                }).then(result => {

                })
            }).catch(error => {
                console.log(error);
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
                    bookings.length > 0 ?
                        bookings.map(booking => {
                            return <Booking key={booking.id} booking={booking} completeBooking={this.initiateStripeCheckout} />
                        })
                        :
                        (
                            <React.Fragment>
                                <h5 className="text-center mx-auto">You Have Not Made Any Bookings</h5>
                                <h6 className="text-center mb-5 mx-auto">Find A Property To Book <a href="/">Here</a></h6>
                            </React.Fragment>
                        )
                }
            </Layout>
        )
    }
}

export default Bookings;