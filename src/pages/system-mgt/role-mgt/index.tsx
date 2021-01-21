import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import Table from './components/Table';
import ModifyModal from './components/ModifyModal';

const RoleMgt = () => {
  const modifyModelRef = useRef({});
  useEffect(() => {}, []);

  const openModifyModal = item => {
    modifyModelRef.current.showModal(item);
  };

  return (
    <PageHeaderWrapper>
      <Table openModifyModal={openModifyModal} />
      <ModifyModal actionRef={modifyModelRef} />
    </PageHeaderWrapper>
  );
};

export default connect(({ roleMgt }) => ({
  roleMgt,
}))(RoleMgt);
