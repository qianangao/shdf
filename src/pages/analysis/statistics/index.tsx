import React, { Suspense, useEffect, useRef } from 'react';
import { connect } from 'umi';
import { Row } from 'antd';
import AddressBookForm from './components/AddThreadForm';

const Count = ({ dispatch }) => {
  const [form] = AddressBookForm.useForm();
  useEffect(() => {}, []);
  return (
    <Row gutter={[16, 16]}>
      <AddressBookForm form={form} />
    </Row>
  );
};
export default connect(() => ({}))(Count);
