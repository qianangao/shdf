import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'umi';
import { Layout } from 'antd';
import Table from './components/Table';
import FieldTable from './components/fields/FieldTable';
import ModifyDictModal from './components/ModifyDictModal';
import FieldModifyModal from './components/fields/FieldModifyModal';

const { Sider, Content } = Layout;

const DictionaryMgt = ({ dispatch }) => {
  const modifyTypeRef = useRef({});
  const [dictTypeId, setDictTypeId] = useState(null);
  const modifyDictRef = useRef({});

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
  };

  return (
    <>
      <Layout>
        <Sider width="60%" style={{ marginRight: 10 }} theme="light">
          <Table openModifyModal={openModifyModal} changeTypeId={changeTypeId} />
        </Sider>
        <Content>
          <FieldTable openDictModifyModal={openDictModifyModal} dictTypeId={dictTypeId} />
        </Content>
      </Layout>

      <ModifyDictModal actionRef={modifyTypeRef} />
      <FieldModifyModal actionRef={modifyDictRef} dictTypeId={dictTypeId} />
    </>
  );
};

export default connect(({ orgTree }) => ({
  orgTree,
}))(DictionaryMgt);
