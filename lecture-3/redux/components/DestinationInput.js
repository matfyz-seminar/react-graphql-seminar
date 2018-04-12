import React from 'react';
import { AutoComplete } from 'antd';
import fetch from 'isomorphic-unfetch';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { loadDestinations } from '../redux/actions';

class DestinationInput extends React.Component {
  render() {
    return (
      <AutoComplete
        dataSource={this.props.destinations}
        onSelect={this.props.onSelect}
        onSearch={this.props.loadDestinations}
        placeholder={this.props.placeholder}
      />
    );
  }
}

const mapStateToProps = ({ destinations }) => ({ destinations });

const mapDispatchToProps = dispatch => {
  return {
    loadDestinations: bindActionCreators(loadDestinations, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DestinationInput);
