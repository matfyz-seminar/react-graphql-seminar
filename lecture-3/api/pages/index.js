import React from 'react';
import Head from 'next/head';
import HotelsList from '../components/HotelsList';
import SearchForm from '../components/SearchForm';

export default class Main extends React.Component {
  state = {
    destinationId: null,
    dateRange: null,
    hotels: [],
  };

  handleRangeChange = (date, dateString) => {
    this.setState({
      dateRange: dateString,
    });
  };

  handleDestinationSelect = destinationId => {
    this.setState({ destinationId });
  };

  handleSearch = async () => {
    const query = `query findHotels($destinationId: String!, $checkin: Date!, $checkout: Date!) {
      allAvailableHotels(search: {cityId: $destinationId, checkin: $checkin, checkout: $checkout, roomsConfiguration: {adultsCount: 2}}, first: 10) {
        edges {
          node {
            id
            hotel {
              name
              address {
                street
                city
                zip
              }
              mainPhoto {
                highResUrl
              }
              rating {
                stars
                categoryName
              }
            }
          }
        }
      }
    }`;

    const variables = {
      destinationId: this.state.destinationId,
      checkin: this.state.dateRange[0],
      checkout: this.state.dateRange[1],
    };

    const response = await fetch('https://graphql.kiwi.com', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ query, variables }),
    });
    const items = await response.json();
    const hotels = items.data.allAvailableHotels.edges.map(edge => edge.node);

    this.setState({ hotels });
  };

  render() {
    return (
      <div>
        <Head>
          <title>NajdiHotel</title>
          <link rel="stylesheet" href="/static/antd.css" />
        </Head>
        <div className="layout">
          <h1 className="headline">NajdiHotel</h1>

          <SearchForm
            onDestinationSelect={this.handleDestinationSelect}
            onDateSelect={this.handleRangeChange}
            onSubmit={this.handleSearch}
            destinationId={this.state.destinationId}
            dateRange={this.state.dateRange}
          />

          <div>
            <HotelsList availableHotels={this.state.hotels} />
          </div>
        </div>
        <style jsx>
          {`
            .layout {
              width: 750px;
              margin: 0 auto;
            }
            .headline {
              padding: 50px 0 30px;
            }
          `}
        </style>
      </div>
    );
  }
}
