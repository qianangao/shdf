import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Row } from 'antd';
import AddressBookForm from './components/AddThreadForm';
import BarStacked from '@/components/Charts/BarStacked/index';

const Count = ({}) => {
  useEffect(() => {}, []);
  return (
    <Row gutter={[16, 16]}>
      <AddressBookForm />
      <BarStacked />
    </Row>
  );
};
export default connect(() => ({}))(Count);
