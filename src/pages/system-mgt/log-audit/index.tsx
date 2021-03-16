import React, { Suspense, useEffect, useRef } from 'react';
import { connect } from 'umi';
import Table from './components/Table';
import DetailModal from './components/DetailModal';

const DictionaryMgt = ({ dispatch }) => {
  const detailRef = useRef({});

  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: [],
      },
    });
  }, []);

  const openDetailModal = item => {
    detailRef.current.showModal(item);
  };

  return (
    <>
      <Table openDetailModal={openDetailModal} />
      <Suspense fallback={null}>
        <DetailModal actionRef={detailRef} />
      </Suspense>
    </>
  );
};

export default connect(({ orgTree }) => ({
  orgTree,
}))(DictionaryMgt);
