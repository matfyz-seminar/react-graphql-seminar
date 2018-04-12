import React from 'react';
import Head from 'next/head';
import { bindActionCreators } from 'redux';
import { Alert } from 'antd';

import HotelsList from '../components/HotelsList';
import SearchForm from '../components/SearchForm';
import withRedux from '../redux/withRedux';
import { initStore } from '../redux/store';
import {
  dismissError,
  loadHotels,
  setDestinationId,
  setDateRange,
} from '../redux/actions';

class Main extends React.Component {
  handleDestinationSelect = destinationId => {
    this.props.setDestinationId(destinationId);
  };

  handleRangeChange = (date, dateString) => {
    this.props.setDateRange(dateString);
  };

  handleSearch = async () => {
    this.props.loadHotels(
      this.props.destinationId,
      this.props.checkin,
      this.props.checkout,
    );
  };

  renderError = message => {
    if (!message) return null;
    return (
      <div className="error layout">
        <Alert
          message={message}
          type="error"
          closable
          showIcon
          onClose={this.props.dismissError}
        />
      </div>
    );
  };

  render() {
    return (
      <div>
        <Head>
          <title>NajdiHotel</title>
          <link rel="stylesheet" href="/static/antd.css" />
        </Head>
        <div className="layout">
          {this.renderError(this.props.error)}
          <h1 className="headline">NajdiHotel</h1>
          <SearchForm
            onDestinationSelect={this.handleDestinationSelect}
            onDateSelect={this.handleRangeChange}
            onSubmit={this.handleSearch}
            destinationId={this.props.destinationId}
            dateCheckin={this.props.checkin}
          />
          <div>
            <HotelsList availableHotels={this.props.hotels} />
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
            .error {
              position: absolute;
            }
          `}
        </style>
      </div>
    );
  }
}

const mapStateToProps = ({
  error,
  destinationId,
  checkin,
  checkout,
  hotels,
}) => ({
  error,
  destinationId,
  checkin,
  checkout,
  hotels,
});

const mapDispatchToProps = dispatch => {
  return {
    dismissError: bindActionCreators(dismissError, dispatch),
    loadHotels: bindActionCreators(loadHotels, dispatch),
    setDestinationId: bindActionCreators(setDestinationId, dispatch),
    setDateRange: bindActionCreators(setDateRange, dispatch),
  };
};

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Main);
