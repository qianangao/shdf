import React, { Suspense, useEffect, useRef } from 'react';
import { connect } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Table from './components/Table';

const ModifyModal = React.lazy(() => import('./components/ModifyModal'));

const OrganizationMgt = ({ dispatch }) => {
  const modifyRef = useRef({});

  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: ['dictOrganizationType'],
      },
    });
  }, []);

  const openModifyModal = item => {
    modifyRef.current.showModal(item);
  };

  return (
    <PageHeaderWrapper>
      <Table openModifyModal={openModifyModal} />
      <Suspense fallback={null}>
        <ModifyModal actionRef={modifyRef} />
      </Suspense>
    </PageHeaderWrapper>
  );
};

export default connect(({ orgTree }) => ({
  orgTree,
}))(OrganizationMgt);
