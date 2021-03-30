import React from 'react';
import { Col, Nav, Row, Tab } from 'react-bootstrap';

import Layout from '../../layout';
import AllListings from './allListings';
import MyListings from './myListings';
import { handleErrors } from '@utils/fetchHelper';

class ListingDashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <Layout>
                <div className="py-4 col-12">
                    <Tab.Container defaultActiveKey="myListings">
                        <Row>
                            <Col sm="3">
                                <Nav variant="pills" className="flex-column mb-5 mb-md-0">
                                    <Nav.Item>
                                        <Nav.Link eventKey="myListings">
                                            My Listings
                                    </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="allListings">
                                            All Listings
                                    </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm="9">
                                <Tab.Content>
                                    <Tab.Pane eventKey="myListings">
                                        <MyListings />
                                    </Tab.Pane>
                                    <Tab.Pane style={{maxWidth: "100%", overflow: "scroll"}} eventKey="allListings">
                                        <AllListings />
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