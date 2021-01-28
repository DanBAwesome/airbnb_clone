import React from 'react';
import AirbnbImage from '@img/airbnb.svg';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import './layout.scss';

class Layout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            authenticated: false,
            image_url: null
        };
    }

    componentDidMount() {
        fetch('/api/authenticated')
            .then(handleErrors)
            .then(data => {
                this.setState({
                    authenticated: data.authenticated,
                    image_url: data.image_url
                })
            })
    }

    render() {
        const { authenticated, image_url } = this.state;
        return (
            <React.Fragment>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/">
                        <img width="30" height="30" src={AirbnbImage}></img>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="airbnbNav" />
                    <Navbar.Collapse id="airbnbNav" className="justify-content-end">
                        <Nav>
                            <Nav.Item>
                                <Nav.Link href="/">Properties</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/host">Host A Property</ Nav.Link>
                            </Nav.Item>
                            <NavDropdown alignRight className="user-icon" title="" style={{ backgroundImage: (authenticated && image_url ) ? `url(${image_url})` : `url(https://via.placeholder.com/150)` }}>
                                {
                                    authenticated ? (
                                        <React.Fragment>
                                            <NavDropdown.Item href="/user/listings">Hosted Properties</NavDropdown.Item>
                                            <NavDropdown.Item href="/bookings">Booked Properties</NavDropdown.Item>
                                            <NavDropdown.Item href="/">Logout</NavDropdown.Item>
                                        </React.Fragment>
                                    )
                                        : (
                                            <React.Fragment>
                                                <NavDropdown.Item href="/">Sign Up</NavDropdown.Item>
                                                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                                            </React.Fragment>
                                        )
                                }
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                {this.props.children}
                <footer className="p-3 bg-light">
                    <div>
                        <p className="mr-3 mb-0 text-secondary">Airbnb Clone</p>
                    </div>
                </footer>
            </React.Fragment>
        )
    }
}

export default Layout;