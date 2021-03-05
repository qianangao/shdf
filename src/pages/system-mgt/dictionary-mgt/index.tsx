import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';
import Table from './components/Table';
import ModifyDictModal from './components/ModifyDictModal';
import FieldModal from './components/fields/FieldModal';

const DictionaryMgt = ({ dispatch }) => {
  const modifyDictRef = useRef({});

  const fieldRef = useRef({});

  useEffect(() => {
    dispatch({
      type: 'global/getEnums',
      payload: {
        names: [],
      },
    });
  }, []);

  const openModifyModal = item => {
    modifyDictRef.current.showModal(item);
  };

  const openMaintainModal = item => {
    fieldRef.current.showModal(item);
  };

  return (
    <>
      <Table openModifyModal={openModifyModal} openMaintainModal={openMaintainModal} />
      <ModifyDictModal actionRef={modifyDictRef} />
      <FieldModal actionRef={fieldRef} />
    </>
  );
};

export default connect(({ orgTree }) => ({
  orgTree,
}))(DictionaryMgt);
