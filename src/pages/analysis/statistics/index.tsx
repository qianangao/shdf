import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Row } from 'antd';
import AddressBookForm from './components/AddThreadForm';

const Count = () => {
  useEffect(() => {}, []);
  return (
    <Row gutter={[16, 16]}>
      <AddressBookForm />
    </Row>
  );
};
export default connect(() => ({}))(Count);
