import React from 'react';
import { Col, Nav, Row, Tab, Tabs } from 'react-bootstrap';
import Layout from '../../layout';
import MyListings from './myListings';

class ListingDashboard extends React.Component {
    render() {
        return (
            <Layout>
                <div className="py-4">
                    <Tab.Container defaultActiveKey="myListings">
                        <Row>
                            <Col sm="3">
                                <Nav variant="pills" className="flex-column m-5">
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
                                    <Tab.Pane eventKey="allListings">

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