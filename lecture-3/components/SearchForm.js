import React from 'react';
import { Select, DatePicker, Button, Spin } from 'antd';
import DestinationInput from './DestinationInput';

const { RangePicker } = DatePicker;

export default ({
  onDestinationSelect,
  onDateSelect,
  onSubmit,
  destinationId,
  dateRange,
}) => (
  <div className="flexbox">
    <div className="field-box">
      <DestinationInput
        placeholder="Vyberte destinaci"
        onSelect={onDestinationSelect}
      />
    </div>
    <div className="field-box">
      <RangePicker onChange={onDateSelect} disabled={!destinationId} />
    </div>
    <div className="field-box">
      <Button onClick={onSubmit} type="primary" disabled={!dateRange}>
        Vyhledat
      </Button>
    </div>
    <style jsx>
      {`
        .flexbox {
          display: flex;
        }
        .field-box {
          margin-right: 8px;
        }
      `}
    </style>
  </div>
);
