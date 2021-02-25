import React from 'react';

class AllListings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            properties: []
        };
    }

    componentDidMount() {
        this.setState({ properties: this.props.properties });
    }

    render() {
        const { properties } = this.state;
        const { bookings } = properties;
        return (
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
                    { properties.map((property) => {
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
        )
    }
}

export default AllListings;