import React from 'react';
import { Card, Form, InputGroup, Col, Button, Alert } from 'react-bootstrap';

import { handleErrors, safeCredentialsForm } from '@utils/fetchHelper';
import { countries } from '@utils/countries';
import Layout from '../../layout';

import './host.scss';

class Host extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            property: {
                images: [],
                title: "",
                description: "",
                city: "",
                country: "us",
                price_per_night: 0,
                max_guests: 0,
                property_type: "",
                bedrooms: 0,
                beds: 0,
                baths: 0
            },
            imagePreviews: [],
            addedImages: [],
            alertVisible: false
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
                    this.setState({ property: data.property, imagePreviews: data.property.images });
                })
        }
    }

    alertTimeout() {
        this.setState({ alertVisible: true }, () => {
            let timeout = window.setTimeout(() => {
                window.clearInterval(timeout);
                window.location = '/';
            }, 2000)
        })
    }

    createProperty(event) {
        event.preventDefault();
        const { property, addedImages } = this.state;
        let propertyForm = new FormData();

        for(var i = 0; i < addedImages.length; i++) {
            propertyForm.append('property[images][]', addedImages[i]);
        }
      

        propertyForm.set('property[title]', property.title);
        propertyForm.set('property[description]', property.description);
        propertyForm.set('property[city]', property.city);
        propertyForm.set('property[country]', property.country);
        propertyForm.set('property[price_per_night]', property.price_per_night);
        propertyForm.set('property[max_guests]', property.max_guests);
        propertyForm.set('property[property_type]', property.property_type);
        propertyForm.set('property[bedrooms]', property.bedrooms);
        propertyForm.set('property[beds]', property.beds);
        propertyForm.set('property[baths]', property.baths);

        if (this.props.property_id) {
            fetch(`/api/properties/${this.props.property_id}`, safeCredentialsForm({
                method: 'PUT',
                body: propertyForm
            })).then(handleErrors).then(() => {
                this.alertTimeout();
            })
        } else {
            fetch(`/api/properties`, safeCredentialsForm({
                method: 'POST',
                body: propertyForm
            })).then(handleErrors).then(() => {
                window.location = "/"
            })
        }
    }

    imageSelect(event) {
        let addedImages = this.state.addedImages;
        let imageURLs = this.state.imagePreviews;

        for (var i = 0; i < event.target.files.length; i++) {
            imageURLs.push(URL.createObjectURL(event.target.files[i]));
            addedImages.push(event.target.files[i]);
        }

        this.setState({ addedImages: addedImages, imagePreviews: imageURLs });
    }

    updateInput(event) {
        const { property } = this.state;
        property[event.target.name] = event.target.value;
        this.setState({ ...this.state, [event.target.name]: event.target.value });
    }

    render() {
        const { property_id } = this.props;
        const { imagePreviews, property, alertVisible } = this.state;
        const {
            title,
            description,
            property_type,
            city,
            country,
            price_per_night,
            max_guests,
            bedrooms,
            beds,
            baths,
        } = property;
        return (
            <Layout>
                <Alert id="saveAlert" show={alertVisible} dismissible variant="success">Successfully {property_id ? "Saved" : "Created"} Property</Alert>
                <div className="container py-4">
                    <div className="col-12 justify-content-start">
                        <div className="row justify-content-between">
                            <Card className="col-5 align-self-start">
                                <Card.Body>
                                    <input onChange={this.imageSelect}
                                        hidden
                                        type="file"
                                        id="imageUpload"
                                        accept="image/*"
                                        multiple></input>
                                    <div id="imageList">
                                        {
                                            imagePreviews.map((image, i) => {
                                                return <img key={i}
                                                    className="property-image"
                                                    src={image} />
                                            })
                                        }
                                        {
                                            imagePreviews.length > 0 ?
                                                <label htmlFor="imageUpload"
                                                    id="addPropertyImage">+</label>
                                                :
                                                <label className="btn btn-primary w-100"
                                                    htmlFor="imageUpload">Add Images</label>
                                        }
                                        <div className="splitter"></div>
                                    </div>
                                </Card.Body>
                            </Card>
                            <Card className="col-6 py-3 px-4 align-self-start">
                                <Form onSubmit={this.createProperty} name="PropertyForm">
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
                                        <Form.Label>Property Type</Form.Label>
                                        <Form.Control required
                                            type="input"
                                            name="property_type"
                                            onChange={this.updateInput}
                                            value={property_type}
                                            placeholder="Description"></Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Location</Form.Label>
                                        <Form.Control className="mb-2" required
                                            onChange={this.updateInput}
                                            as="select" value={country || "us"}
                                            name="country">
                                            {
                                                countries.map((country, i) => {
                                                    return (<option key={i} value={country.code.toLowerCase()}>{country.name}</option>)
                                                })
                                            }
                                        </Form.Control>
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
                                    <Button type="submit">{"Save"}</Button>
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