import React from 'react';

import { ImageList } from '@shared/imageList';
import { handleErrors } from '@utils/fetchHelper';
import { Pagination } from 'react-bootstrap';

class MyListings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            properties: [],
            current_page: 1,
            total_pages: 0,
            loaded: false
        };

        this.changePage = this.changePage.bind(this);
    }

    componentDidMount() {
        this.changePage();
    }

    changePage(page = 1) {
        this.setState({
            current_page: page,
            loaded: false
        }, () => {
            fetch(`/api/listings/my-listings?page=${page}`).then(handleErrors)
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

        return (
            <React.Fragment>
                {
                    properties.length > 0 ?
                        properties.map((property) => {
                            return (
                                <ImageList key={property.id}
                                    imageUrl={property.images[0]}
                                    firstLine={property.city}
                                    secondLine={property.title}
                                    isEditable={true}
                                    id={property.id} />

                            )
                        })
                        :
                        (
                            <div className="text-center">
                                <div>You Are Not Currently Hosting Any Properties</div>
                                <div><a href="/host">Click Here</a> To Create a New Listing</div>
                            </div>
                        )
                }
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

export default MyListings;