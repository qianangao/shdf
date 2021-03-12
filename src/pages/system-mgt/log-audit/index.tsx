import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';
import Table from './components/Table';

const DictionaryMgt = ({ dispatch }) => {
  const modifyTypeRef = useRef({});

  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: [],
      },
    });
  }, []);

  const openModifyModal = item => {
    modifyTypeRef.current.showModal(item);
  };

  const changeTypeId = () => {
    // fieldRef.current.showModal(item);
    dispatch({
      type: 'smDictionaryMgt/reFishDictTable',
    });
  };

  return (
    <>
      <Table openModifyModal={openModifyModal} changeTypeId={changeTypeId} />
    </>
  );
};

export default connect(({ orgTree }) => ({
  orgTree,
}))(DictionaryMgt);
