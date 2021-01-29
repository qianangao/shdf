import React, { Suspense, useEffect, useRef } from 'react';
import { connect } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import Table from './components/Table';

const ModifyModal = React.lazy(() => import('./components/ModifyModal'));
const AddModal = React.lazy(() => import('./components/AddModal'));
const ReadListModal = React.lazy(() => import('./components/ReadListModal'));
const DetailModal = React.lazy(() => import('./components/DetailModal'));
const DistributeModal = React.lazy(() => import('./components/DistributeModal'));

const ReceivingMgt = ({ dispatch }) => {
  const modifyRef = useRef({});
  const addRef = useRef({});
  const readListRef = useRef({});
  const detailRef = useRef({});
  const distributeRef = useRef({});

  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: [],
      },
    });
  }, []);

  const openModifyModal = item => {
    modifyRef.current.showModal(item);
  };

  const openAddModal = item => {
    addRef.current.showModal(item);
  };

  const openReadListModal = item => {
    readListRef.current.showModal(item);
  };

  const openDetailModal = item => {
    detailRef.current.showModal(item);
  };

  const openDistributeModal = item => {
    distributeRef.current.showModal(item);
  };

  return (
    <PageHeaderWrapper>
      <Table
        openModifyModal={openModifyModal}
        openAddModal={openAddModal}
        openReadListModal={openReadListModal}
        openDetailModal={openDetailModal}
        openDistributeModal={openDistributeModal}
      />
      <Suspense fallback={null}>
        <ModifyModal actionRef={modifyRef} />
        <AddModal actionRef={addRef} />
        <ReadListModal actionRef={readListRef} />
        <DetailModal actionRef={detailRef} />
        <DistributeModal actionRef={distributeRef} />
      </Suspense>
    </PageHeaderWrapper>
  );
};

export default connect(() => ({}))(ReceivingMgt);
