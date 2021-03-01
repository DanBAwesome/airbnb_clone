import React from 'react';
import { Pagination } from 'react-bootstrap';

import { handleErrors } from '@utils/fetchHelper';

class AllListings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            properties: [],
            current_page: 1,
            total_pages: 0,
            loaded: false
        };
    }

    componentDidMount() {
        this.changePage();
    }

    changePage(page = 1) {
        this.setState({
            current_page: page,
            loaded: false
        }, () => {
            fetch(`/api/listings/booked-listings?page=${page}`).then(handleErrors)
                .then(data => {
                    this.setState(
                        {
                            properties: data.properties,
                            total_pages: data.total_pages,
                            loaded: true
                        }
                    )
                })
        })
    }

    render() {
        const { properties, total_pages, current_page } = this.state;
        const { bookings } = properties;
        return (
            <React.Fragment>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>
                                Name
                        </th>
                            <th>
                                Location
                        </th>
                            <th>
                                Total Price
                        </th>
                            <th>
                                User
                        </th>
                            <th>
                                Date From
                        </th>
                            <th>
                                Date To
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {properties.map((property) => {
                            return property.bookings.map((booking, i) => {
                                return (
                                    <tr key={i}>
                                        <td>
                                            <a href={`/host/${property.id}`}>{property.title}</a>
                                        </td>
                                        <td>
                                            {property.city}, {property.country.toUpperCase()}
                                        </td>
                                        <td>
                                            ${booking.total_price}
                                        </td>
                                        <td>
                                            {booking.username}
                                        </td>
                                        <td>
                                            {booking.start_date}
                                        </td>
                                        <td>
                                            {booking.end_date}
                                        </td>
                                    </tr>
                                )
                            })
                        })}
                    </tbody>
                </table>
                <Pagination className="justify-content-center" hidden={total_pages <= 1}>
                    {
                        Array.from({ length: total_pages }, (_, i) => i + 1).map((page, i) => {
                            return <Pagination.Item key={i} active={current_page === page} onClick={() => this.changePage(page)}>{page}</Pagination.Item>
                        })
                    }
                </Pagination>
            </React.Fragment>
        )
    }
}

export default AllListings;