import React from 'react';
import ReactDOM from 'react-dom';
import { Carousel } from 'react-bootstrap';

import Layout from './layout';
import { handleErrors } from '@utils/fetchHelper';

import './home.scss';

class Home extends React.Component {
  state = {
    properties: [],
    total_pages: null,
    next_page: null,
    loading: true
  }

  componentDidMount() {
    fetch('/api/properties?page=1').then(handleErrors)
      .then(data => {
        this.setState({
          properties: data.properties,
          total_pages: data.total_pages,
          next_page: data.next_page,
          loading: false
        })
      })
  }

  loadMore = () => {
    if (this.state.next_page === null) {
      return;
    }

    this.setState({ loading: true });

    fetch(`/api/properties?page=${this.state.next_page}`)
      .then(handleErrors).then(data => {
        this.setState({
          properties: this.state.properties.concat(data.properties),
          total_pages: data.total_pages,
          next_page: data.next_page,
          loading: false
        })
      })
  }

  render() {
    const { properties, next_page, loading } = this.state;
    return (
      <Layout>
        <div className="container py-4">
          <h4>Top-rated places to stay</h4>
          <p className="text-secondary mb-3">
            Explore some of the best places in the world
          </p>
          <div className="row">
            {properties.length > 0 ? properties.map(property => {
              return (
                <div key={property.id} className="col-sm-6 col-xs-12 col-lg-4 property mb-4">
                  <Carousel indicators={property.images.length > 1}
                    controls={property.images.length > 1}>
                    {
                      property.images.map((image, i) => {
                        return <Carousel.Item key={i} onClick={() => { window.location = `/property/${property.id}` }}>
                          <div className="rounded property-image" style={{ backgroundImage: `url(${image})` }} />
                        </Carousel.Item>
                      })
                    }
                  </Carousel>
                  <a href={`/property/${property.id}`}
                    className="text-body text-decoration-none">
                    <p className="text-uppercase mb-0 text-secondary"><small><b>{property.city}</b></small></p>
                    <h6 className="mb-0">{property.title}</h6>
                    <p className="mb-0"><small>${property.price_per_night} USD/night</small></p>
                  </a>
                </div>
              )
            }) :
              (<h6 hidden={loading} className="mx-auto">There are no properties available</h6>)}
          </div>
          {loading && <p className="text-center">loading...</p>}
          {(loading || next_page === null) ||
            <div className="text-center">
              <button className="btn btn-light mb-4"
                onClick={this.loadMore}>Load More</button>
            </div>}
        </div>
      </Layout>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )
})
