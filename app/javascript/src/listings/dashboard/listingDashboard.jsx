import React from 'react';
import { Col, Nav, Row, Tab } from 'react-bootstrap';

import Layout from '../../layout';
import AllListings from './allListings';
import MyListings from './myListings';
import { handleErrors } from '@utils/fetchHelper';

class ListingDashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bookings: [],
            properties: [],
            loaded: false
        };
    }

    componentDidMount() {
        fetch('/api/listings/my-listings').then(handleErrors)
            .then(data => {
                this.setState(
                    {
                        properties: data.properties,
                        bookings: data.properties.filter((property) => property.bookings.length > 0),
                        loaded: true
                    }
                )
            })
    }

    render() {
        const { properties, loaded, bookings } = this.state;

        return (
            <Layout>
                <div className="py-4 col-12">
                    <Tab.Container defaultActiveKey="myListings">
                        <Row>
                            <Col sm="3">
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link eventKey="myListings">
                                            My Listings
                                    </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link disabled={bookings.length === 0} eventKey="allListings">
                                            All Listings
                                    </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm="9">
                                <Tab.Content>
                                    <Tab.Pane eventKey="myListings">
                                        <MyListings key={loaded} properties={properties} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="allListings">
                                        <AllListings key={loaded} properties={bookings} />
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </div>
            </Layout>
        )
    }
}

export default ListingDashboard;