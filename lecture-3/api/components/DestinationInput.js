import React from 'react';
import { AutoComplete } from 'antd';
import fetch from 'isomorphic-unfetch';

export default class Main extends React.Component {
  state = {
    dataSource: [],
  };

  handleSearch = async prefix => {
    const query = `query cities($prefix: String) {
      hotelCities(prefix: $prefix) {
        edges {
          node {
            id
            name
          }
        }
      }
    }`;

    const response = await fetch('https://graphql.kiwi.com', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ query, variables: { prefix } }),
    });
    const items = await response.json();
    const cities = items.data.hotelCities.edges.map(({ node }) => ({
      value: node.id,
      text: node.name,
    }));

    this.setState({
      dataSource: cities,
    });
  };

  render() {
    const { dataSource } = this.state;

    return (
      <AutoComplete
        dataSource={dataSource}
        onSelect={this.props.onSelect}
        onSearch={this.handleSearch}
        placeholder={this.props.placeholder}
      />
    );
  }
}
