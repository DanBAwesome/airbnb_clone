import React from 'react';
import { Card, Form, InputGroup, Col, Button } from 'react-bootstrap';
import { handleErrors, safeCredentials } from '@utils/fetchHelper';
import Layout from '../../layout';

import './host.scss';

class Host extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            property: {
                image_url: null,
                title: "",
                description: "",
                city: "",
                country: "us",
                price_per_night: 0,
                max_guests: 0,
                property_type: "a property",
                bedrooms: 0,
                beds: 0,
                baths: 0
            },
            imagePreview: null
        };

        this.imageSelect = this.imageSelect.bind(this);
        this.updateInput = this.updateInput.bind(this);
        this.createProperty = this.createProperty.bind(this);
    }

    componentDidMount() {
        if (this.props.property_id) {
            fetch(`/api/host/${this.props.property_id}`)
                .then(handleErrors)
                .then(data => {
                    this.setState({ property: data.property, imagePreview: data.property.image_url });
                })
        }
    }

    createProperty() {
       

        if(this.props.property_id) {
            
        } else {
            fetch(`/api/properties`, safeCredentials({
                method: 'POST',
                body: JSON.stringify({
                    property: this.state.property
                })
            })).then(handleErrors)
        }
    }

    imageSelect(event) {
        let property = {...this.state.property};
        property.image_url = URL.createObjectURL(event.target.files[0]);
        this.setState({ property, imagePreview: URL.createObjectURL(event.target.files[0]) }, () => {
            console.log(this.state)
        });
    }

    updateInput(event) {
        const { property } = this.state;
        property[event.target.name] = event.target.value;
        this.setState({ ...this.state, [event.target.name]: event.target.value });
    }

    render() {
        const { imagePreview, property } = this.state;
        const {
            title,
            description,
            city,
            price_per_night,
            max_guests,
            bedrooms,
            beds,
            baths,
        } = property;
        return (
            <Layout>
                <div className="container py-4">
                    <div className="col-12 justify-content-start">
                        <div className="row justify-content-between">
                            <Card className="col-5 align-self-start">
                                <Card.Body>
                                    <input onChange={this.imageSelect}
                                        hidden
                                        type="file"
                                        id="imageUpload"
                                        accept="*/image"></input>
                                    <img id="propertyImage" src={imagePreview} />

                                    <label htmlFor="imageUpload"
                                        className="btn btn-primary col-12" id="addPropertyImage">
                                        {!imagePreview ? "Upload Image" : "Replace Image"}
                                    </label>
                                </Card.Body>
                            </Card>
                            <Card className="col-6 py-3 px-4 align-self-start">
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Property Name</Form.Label>
                                        <Form.Control required
                                            name="title"
                                            type="input"
                                            onChange={this.updateInput}
                                            value={title}
                                            placeholder="Property Name"></Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Descripton</Form.Label>
                                        <Form.Control required
                                            name="description"
                                            as="textarea"
                                            onChange={this.updateInput}
                                            value={description}
                                            placeholder="Description"></Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Location</Form.Label>
                                        <Form.Control required
                                            name="city"
                                            onChange={this.updateInput}
                                            value={city}
                                            type="input"
                                            placeholder="City"></Form.Control>
                                    </Form.Group>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>Cost Per Night</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text>
                                                        $
                                                </InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Form.Control required
                                                    name="price_per_night"
                                                    onChange={this.updateInput}
                                                    value={price_per_night}
                                                    type="number"
                                                    placeholder="Cost Per Night"></Form.Control>
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label>Max Guests</Form.Label>
                                            <Form.Control required
                                                name="max_guests"
                                                onChange={this.updateInput}
                                                value={max_guests}
                                                type="number"
                                                max="20"
                                                placeholder="Max Guests"></Form.Control>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>Bedrooms</Form.Label>
                                            <Form.Control required
                                                name="bedrooms"
                                                onChange={this.updateInput}
                                                value={bedrooms}
                                                type="number"
                                                max="20"
                                                placeholder="Bedrooms"></Form.Control>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label>Beds</Form.Label>
                                            <Form.Control required
                                                name="beds"
                                                onChange={this.updateInput}
                                                value={beds}
                                                type="number"
                                                max="20"
                                                placeholder="Beds"></Form.Control>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Group>
                                        <Form.Label>Baths</Form.Label>
                                        <Form.Control required
                                            name="baths"
                                            onChange={this.updateInput}
                                            value={baths}
                                            type="number"
                                            max="20"
                                            placeholder="Baths"></Form.Control>
                                    </Form.Group>
                                    <Button onClick={this.createProperty}>Save</Button>
                                </Form>
                            </Card>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default Host;