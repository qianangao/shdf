import React, { useEffect } from 'react';
import { connect } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

const AddressBook = ({ dispatch }) => {
  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: [],
      },
    });
  }, []);

  return <PageHeaderWrapper>通讯录</PageHeaderWrapper>;
};

export default connect(() => ({}))(AddressBook);
