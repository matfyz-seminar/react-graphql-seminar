import fetch from 'isomorphic-unfetch';

export const setDestinationId = destinationId => dispatch =>
  dispatch({ type: 'DESTINATION_ID_CHANGED', destinationId });

export const setDateRange = dateRange => dispatch =>
  dispatch({ type: 'DATES_CHANGED', dateRange });

export const dismissError = () => dispatch =>
  dispatch({ type: 'ERROR_DISMISS' });

export const loadDestinations = prefix => async dispatch => {
  dispatch({ type: 'DESTINATIONS_FETCH_START', prefix });
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

  try {
    const response = await fetch('https://graphql.kiwi.com', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ query, variables: { prefix } }),
    });
    const items = await response.json();
    const destinations = items.data.hotelCities.edges.map(({ node }) => ({
      value: node.id,
      text: node.name,
    }));

    return dispatch({ type: 'DESTINATIONS_FETCH_END', prefix, destinations });
  } catch (error) {
    return dispatch({
      type: 'DESTINATIONS_FETCH_ERROR',
      prefix,
      error: error.message,
    });
  }
};

export const loadHotels = (
  destinationId,
  checkin,
  checkout,
) => async dispatch => {
  dispatch({ type: 'HOTELS_FETCH_START' });
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
    destinationId,
    checkin,
    checkout,
  };
  try {
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

    dispatch({ type: 'HOTELS_FETCH_END', hotels });
  } catch (error) {
    return dispatch({
      type: 'HOTELS_FETCH_ERROR',
      error: error.message,
    });
  }
};
