import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'umi';
import { Drawer } from 'antd';
import Table from './components/Table';
import FieldTable from './components/fields/FieldTable';
import ModifyDictModal from './components/ModifyDictModal';
import FieldModifyModal from './components/fields/FieldModifyModal';

const DictionaryMgt = ({ dispatch }) => {
  const modifyTypeRef = useRef({});
  const [dictTypeId, setDictTypeId] = useState(null);
  const modifyDictRef = useRef({});
  const [visible, setVisible] = useState(false);

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

  const openDictModifyModal = item => {
    modifyDictRef.current.showModal(item);
  };

  const changeTypeId = typeId => {
    // fieldRef.current.showModal(item);
    dispatch({
      type: 'smDictionaryMgt/reFishDictTable',
    });
    setDictTypeId(typeId);
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Table openModifyModal={openModifyModal} changeTypeId={changeTypeId} />
      <Drawer
        title="字段信息"
        placement="right"
        closable={false}
        width={580}
        zIndex={100}
        onClose={onClose}
        visible={visible}
      >
        <FieldTable openDictModifyModal={openDictModifyModal} dictTypeId={dictTypeId} />
      </Drawer>
      <ModifyDictModal actionRef={modifyTypeRef} />
      <FieldModifyModal actionRef={modifyDictRef} dictTypeId={dictTypeId} />
    </>
  );
};

export default connect(({ orgTree }) => ({
  orgTree,
}))(DictionaryMgt);
