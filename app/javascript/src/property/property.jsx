import React, { useEffect, useState } from 'react';
import { Modal, Carousel } from 'react-bootstrap';

import BookingWidget from './bookingWidget';
import { getCountryNameByCode } from '@utils/countries';
import { handleErrors } from '@utils/fetchHelper';
import Layout from '../layout';
import { CarouselProvider, Slider, Slide, ButtonNext, ButtonBack, Image } from 'pure-react-carousel';

import './property.scss';
import 'pure-react-carousel/dist/react-carousel.es.css';

const ImageModal = (props) => {
    const { show, images, onHide, currentImageIndex } = props;

    const [index, setIndex] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        setIndex(currentImageIndex);
        setCurrentIndex(currentImageIndex);
    }, [currentImageIndex])

    function changeSlide(index, direction = 1) {
        setCurrentIndex(index + direction)
        console.log(index)
    }

    return (
        <Modal show={show}
            onHide={onHide}
            dialogClassName="position-absolute modal-large"
            contentClassName="content-large">

            <Modal.Body>
                <div className="h-100 d-flex flex-column">
                    <div className="d-flex">
                        <button className="btn btn-secondary"
                            onClick={() => { onHide() }}>Close</button>
                        <span className="m-auto">Image {currentIndex + 1} of {images.length}</span>
                    </div>
                    <CarouselProvider
                        className="d-flex align-items-center justify-content-between h-100"
                        naturalSlideHeight={50}
                        naturalSlideWidth={50}
                        isIntrinsicHeight={true}
                        currentSlide={index ? index : 0}
                        hasMasterSpinner={true}
                        totalSlides={images.length}>
                        <ButtonBack
                            onClick={() => { changeSlide(currentIndex, -1) }}
                            className="btn btn-light rounded-circle carousel-control d-none d-md-block">
                            <span>&lang;</span>
                        </ButtonBack>
                        <Slider classNameTray="align-items-center">
                            {
                                images && images.map((image, i) => {
                                    return (
                                        <Slide id={`Slide${i}`} key={i} index={i}><Image className="property-image-modal mx-auto slide" src={image} /></Slide>
                                    )
                                })
                            }
                        </Slider>
                        <ButtonNext
                            onClick={() => { changeSlide(currentIndex) }}
                            className="btn btn-light rounded-circle carousel-control d-none d-md-block">
                            <span>&rang;</span>
                        </ButtonNext>
                    </CarouselProvider>
                </div>
            </Modal.Body>
        </Modal>
    )
}

class Property extends React.Component {
    state = {
        property: {},
        loading: true,
        modal: {
            modalShow: false,
            modalIndex: 0
        }

    };

    componentDidMount() {
        fetch(`/api/properties/${this.props.property_id}`)
            .then(handleErrors)
            .then(data => {
                this.setState({
                    property: data.property,
                    loading: false
                });
            })

        this.modalDisplay = this.modalDisplay.bind(this);
    }

    modalDisplay(index) {
        let modal = this.state.modal;
        modal.modalShow = !this.state.modal.modalShow;

        if (index !== undefined) {
            modal.modalIndex = index;
        }
        this.setState({
            modal
        });
    }

    render() {
        const { property, loading, modal } = this.state;
        if (loading) {
            return <p>loading...</p>
        }

        const {
            id,
            title,
            description,
            city,
            country,
            property_type,
            price_per_night,
            max_guests,
            bedrooms,
            beds,
            baths,
            images,
            user
        } = property;

        return (
            <Layout>
                <div className="property-header-img d-md-none">
                    <div onClick={() => { this.modalDisplay() }}
                        style={{ backgroundImage: `url(${images[0]})` }}></div>
                    <div className="btn btn-light" onClick={() => { this.modalDisplay() }}>
                        View All Images
                    </div>
                </div>
                <div className="container mt-3">
                    <div className="row">
                        <div className="info col-12">
                            <div className="mb-3">
                                <h3 className="mb-0">
                                    {title}
                                </h3>
                                <p className="mb-0 text-secondary">
                                    <small>{city}, {getCountryNameByCode(country)}</small>
                                </p>
                            </div>

                            <div className="property-images mb-5">
                                {
                                    [...Array(5)].map((x, i) => {
                                        return images[i] ?
                                            (
                                                <div key={i}
                                                    className="property-image"
                                                    onClick={() => { this.modalDisplay(i) }}
                                                    style={{ backgroundImage: `url(${images[i]})`, cursor: 'pointer' }}>
                                                </div>
                                            ) :
                                            (
                                                <div key={i}
                                                    className="property-image"
                                                    style={{ backgroundColor: '#e1e1e1' }}>
                                                </div>
                                            )

                                    })
                                }
                                <div className="btn btn-light" hidden={images.length === 0} onClick={() => { this.modalDisplay() }}>
                                    View All Images
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-8 property-info">
                                    <div className="row px-3">
                                        <div>
                                            <p className="mb-0 text-capitalize"
                                                style={{ fontSize: "1.4em", fontWeight: "600" }}>
                                                {property_type} Hosted By {user.username}
                                            </p>
                                            <p>
                                                <span>{max_guests} guests ·</span>
                                                <span> {bedrooms} bedrooms ·</span>
                                                <span> {beds} beds ·</span>
                                                <span> {baths} baths</span>
                                            </p>
                                        </div>
                                        <span className="user-icon float-right ml-auto my-auto"
                                            style={{ backgroundImage: `url(${user.avatar})` }} />
                                    </div>
                                    <hr />
                                    <p>{description}</p>
                                </div>
                                <div className="col-12 col-lg-4">
                                    <BookingWidget property_id={id} price_per_night={price_per_night} />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <ImageModal show={modal.modalShow} images={images} onHide={this.modalDisplay} currentImageIndex={modal.modalIndex} />
            </Layout>
        )
    }
}

export default Property;