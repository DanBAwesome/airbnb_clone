import React from 'react';

import { ImageList } from '@shared/imageList'

class MyListings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            properties: []
        };
    }

    componentDidMount() {
        this.setState({ properties: this.props.properties })
    }

    render() {
        const { properties } = this.state;

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
                        }) :
                        (
                            <div className="text-center">
                                <div>You Are Not Currently Hosting Any Properties</div>
                                <div><a href="/host">Click Here</a> To Create a New Listing</div>
                            </div>
                        )
                }
            </React.Fragment>
        )
    }
}

export default MyListings;