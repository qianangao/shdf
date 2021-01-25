import React, { useEffect } from 'react';
import { connect } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

const ReceivingMgt = ({ dispatch }) => {
  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: [],
      },
    });
  }, []);

  return <PageHeaderWrapper>收文管理</PageHeaderWrapper>;
};

export default connect(() => ({}))(ReceivingMgt);
