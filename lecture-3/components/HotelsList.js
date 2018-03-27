import React from 'react';
import { Card, Rate } from 'antd';

export default ({ availableHotels }) => (
  <React.Fragment>
    {availableHotels.map(({ hotel, id }) => (
      <div className="list-view-item flexbox" key={id}>
        <div className="flexbox flex flex-direction-column">
          <h2>{hotel.name}</h2>
          <Rate value={hotel.rating.stars} />
        </div>
        <Card
          style={{ width: 260 }}
          cover={<img src={hotel.mainPhoto.highResUrl} />}
        >
          <p>
            {hotel.address.street}
            <br />
            {hotel.address.city}
            <br />
            {hotel.address.zip}
            <br />
          </p>
        </Card>
      </div>
    ))}
    <style jsx>
      {`
        .flexbox {
          display: flex;
        }
        .flex-direction-column {
          flex-direction: column;
        }
        .flex {
          flex: 1;
        }
        .list-view-item {
          margin: 20px 0;
        }
      `}
    </style>
  </React.Fragment>
);
