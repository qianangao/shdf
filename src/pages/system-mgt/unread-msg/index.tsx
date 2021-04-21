import React, { Suspense, useEffect, useRef } from 'react';
import { connect } from 'umi';
import Table from './components/Table';
import DetailModal from './components/DetailModal';

const UnReadMsg = ({ dispatch }) => {
  const detailRef = useRef({});

  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: ['reading_state', 'un_read_type'],
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
}))(UnReadMsg);
