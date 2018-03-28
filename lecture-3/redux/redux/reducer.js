export const appInitialState = {
  error: null,
  destinationId: null,
  checkin: null,
  checkout: null,
  destinations: [
    {
      value: 'aG90ZWxDaXR5Oi0xMjY2OTM=',
      text: 'Rome',
    },
    {
      value: 'aG90ZWxDaXR5Oi0yNjAxODg5',
      text: 'London',
    },
    {
      value: 'aG90ZWxDaXR5Oi0yOTk2MzM4',
      text: 'Saint Petersburg',
    },
    {
      value: 'aG90ZWxDaXR5OjIwMDIyMDMx',
      text: 'Davenport',
    },
    {
      value: 'aG90ZWxDaXR5OjIwMDIyODUx',
      text: 'Kissimmee',
    },
    {
      value: 'aG90ZWxDaXR5Oi02NjY2MTA=',
      text: 'Rio de Janeiro',
    },
    {
      value: 'aG90ZWxDaXR5Oi0xNDU2OTI4',
      text: 'Paris',
    },
    {
      value: 'aG90ZWxDaXR5OjkwMDA0Nzk3NQ==',
      text: 'Tbilisi City',
    },
    {
      value: 'aG90ZWxDaXR5Oi0yOTYwNTYx',
      text: 'Moscow',
    },
    {
      value: 'aG90ZWxDaXR5Oi05NjQ5Mg==',
      text: 'Split',
    },
  ],
  hotels: [],
};

export const reducer = (state = appInitialState, action) => {
  switch (action.type) {
    case 'ERROR_DISMISS':
      return { ...state, error: null };
    case 'DESTINATION_ID_CHANGED':
      const { destinationId } = action;
      return { ...state, destinationId };
    case 'DATES_CHANGED':
      const { dateRange } = action;
      const checkin = dateRange[0];
      const checkout = dateRange[1];
      return { ...state, checkin, checkout };
    case 'DESTINATIONS_FETCH_END':
      const { destinations } = action;
      return { ...state, destinations };
    case 'DESTINATIONS_FETCH_ERROR':
      const { error } = action;
      return { ...state, error };
    case 'HOTELS_FETCH_END':
      const { hotels } = action;
      return { ...state, hotels };
    default:
      return state;
  }
};
