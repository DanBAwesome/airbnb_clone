import React from 'react';
import { handleErrors } from '@utils/fetchHelper';
import { ImageList } from '@shared/imageList'

class MyListings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            properties: []
        };
    }

    componentDidMount() {
        fetch('/api/listings/my-listings').then(handleErrors)
            .then(data => {
                this.setState({ properties: data.properties })
            })
    }

    render() {
        const { properties } = this.state;

        return (
            <React.Fragment>
                {
                    properties.map((property) => {
                        return (
                            <ImageList key={property.id}
                                imageUrl={property.image_url}
                                firstLine={property.city}
                                secondLine={property.title}
                                isEditable={true}
                                id={property.id} />

                        )
                    })
                }
            </React.Fragment>
        )
    }
}

export default MyListings;