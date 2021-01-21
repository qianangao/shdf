import React, { useEffect, useRef } from 'react';
import { connect } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
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

  const openAddDictModal = () => {
    modifyDictRef.current.showModal();
  };

  const openMaintainModal = item => {
    fieldRef.current.showModal(item);
  };

  return (
    <PageHeaderWrapper>
      <Table openAddDictModal={openAddDictModal} openMaintainModal={openMaintainModal} />
      <ModifyDictModal actionRef={modifyDictRef} />
      <FieldModal actionRef={fieldRef} />
    </PageHeaderWrapper>
  );
};

export default connect(({ orgTree }) => ({
  orgTree,
}))(DictionaryMgt);
