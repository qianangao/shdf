import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'umi';
import { Button, Modal } from 'antd';
import FieldTable from './FieldTable';
import FieldModifyModal from './FieldModifyModal';
import FieldAddModifyModal from './FieldAddModifyModal';

const FieldModal = ({ actionRef }) => {
  const [modifyModalVisible, setModalVisible] = useState(false);
  const [dictData, setDictData] = useState({});

  const fieldRef = useRef({});
  const fieldAddRef = useRef({});

  const showModal = (items: React.SetStateAction<{}>) => {
    setDictData(items);
    setModalVisible(true);
  };

  useEffect(() => {
    if (actionRef && typeof actionRef === 'function') {
      actionRef({ showModal });
    }

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { showModal };
    }
  }, []);

  const hideModal = () => {
    setModalVisible(false);
    setDictData({});
  };

  const openFieldModal = item => {
    fieldRef.current.showModal(item);
  };

  const openAddFieldModal = item => {
    fieldAddRef.current.showModal(item);
  };

  return (
    <Modal
      title="维护"
      centered
      style={{ paddingBottom: 0 }}
      width="90vw"
      bodyStyle={{
        height: 'calc(75vh - 108px)',
        overflow: 'auto',
      }}
      destroyOnClose
      visible={modifyModalVisible}
      footer={[
        <Button type="primary" onClick={() => hideModal()}>
          确定
        </Button>,
      ]}
      onCancel={hideModal}
    >
      <FieldTable
        dictData={dictData}
        openFieldModal={openFieldModal}
        openAddFieldModal={openAddFieldModal}
      />
      <FieldModifyModal actionRef={fieldRef} />
      <FieldAddModifyModal actionRef={fieldAddRef} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.smDictionaryMgt,
}))(FieldModal);
