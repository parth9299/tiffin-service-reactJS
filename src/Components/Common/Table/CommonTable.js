import React from 'react';
import Table from 'rc-table';

const DataView = ({columns, data}) => {
  return <Table columns={columns} data={data}  className='overflow-auto'/>;
};

export default DataView;
