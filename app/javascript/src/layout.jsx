import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import AirbnbImage from '@img/airbnb.svg';
import { safeCredentials, safeCredentialsForm, handleErrors } from '@utils/fetchHelper';

import './layout.scss';

const isMobile = window.innerWidth < 769;
class Layout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            authenticated: false,
            username: null,
            avatar: null
        };

        this.avatar = React.createRef();
        this.selectAvatar = this.selectAvatar.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        fetch('/api/authenticated')
            .then(handleErrors)
            .then(data => {
                this.setState({
                    authenticated: data.authenticated,
                    username: data.username,
                    avatar: data.avatar
                })
            })
    }

    selectAvatar(event) {
        let avatarForm = new FormData();
        let avatar = event.target.files[0]
        avatarForm.set('avatar', avatar)

        fetch('/api/user/update_avatar', safeCredentialsForm({
            method: 'PUT',
            body: avatarForm
        }))
            .then(handleErrors)
            .then(() => {
                this.setState({ avatar: URL.createObjectURL(avatar) })
            })
    }

    logout() {
        fetch('/api/sessions', safeCredentials({
            method: 'DELETE'
        }))
            .then(handleErrors)
            .then(() => {
                window.location = '/'
            })
    }

    render() {
        const { authenticated, avatar, username } = this.state;
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
                            <Nav.Item hidden={!authenticated}>
                                <Nav.Link href="/host">Host A Property</ Nav.Link>
                            </Nav.Item>
                            {
                                isMobile && (authenticated ? (
                                    <React.Fragment>
                                        <Nav.Item className="pt-1">
                                            <Nav.Link href="/user/listings">Hosted Properties</ Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link href="/bookings">Booked Properties</ Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link onClick={this.logout}>Logout</ Nav.Link>
                                        </Nav.Item>
                                    </React.Fragment>
                                ) : 
                                (
                                    <React.Fragment>
                                        <Nav.Item>
                                            <Nav.Link href="/login/?signup=1">Sign Up</ Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link href="/login">Login</ Nav.Link>
                                        </Nav.Item>
                                    </React.Fragment>
                                )) 
                            }
                            <NavDropdown alignRight
                                className="user-icon"
                                hidden={isMobile}
                                title=""
                                style={{ backgroundImage: (authenticated && avatar) ? `url(${avatar})` : `url(https://via.placeholder.com/150)` }}>
                                {
                                    authenticated ? (
                                        <React.Fragment>
                                            <NavDropdown.Header>Welcome, {username}</NavDropdown.Header>
                                            <NavDropdown.Item href="/user/listings">Hosted Properties</NavDropdown.Item>
                                            <NavDropdown.Item href="/bookings">Booked Properties</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item onClick={() => { this.avatar.current.click() }}>
                                                {!avatar ? 'Add Profile Picture' : 'Change Profile Picture'}
                                            </NavDropdown.Item>
                                            <NavDropdown.Item onClick={this.logout}>Logout</NavDropdown.Item>
                                        </React.Fragment>
                                    )
                                        : (
                                            <React.Fragment>
                                                <NavDropdown.Item href="/login/?signup=1">Sign Up</NavDropdown.Item>
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
                {authenticated && <input ref={this.avatar} id="avatarUpload" onChange={this.selectAvatar} type="file" hidden></input>}
            </React.Fragment>
        )
    }
}

export default Layout;