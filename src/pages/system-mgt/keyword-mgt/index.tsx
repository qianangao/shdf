import React, { Suspense, useEffect, useRef } from 'react';
import { connect } from 'umi';
import Table from './components/Table';
import DetailModal from './components/DetailModal';
import ModifyModal from './components/ModifyModal';

const DictionaryMgt = ({ dispatch }) => {
  const detailRef = useRef({});
  const modifyRef = useRef({});
  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: [],
      },
    });
  }, []);

  // const openDetailModal = item => {
  //   detailRef.current.showModal(item);
  // };
  const openModifyModal = item => {
    modifyRef.current.showModal(item);
  };

  return (
    <>
      <Table openModifyModal={openModifyModal} />
      <Suspense fallback={null}>
        <DetailModal actionRef={detailRef} />
        <ModifyModal actionRef={modifyRef} />
      </Suspense>
    </>
  );
};

export default connect(({ orgTree }) => ({
  orgTree,
}))(DictionaryMgt);
