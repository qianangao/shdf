import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'umi';
import { Button, Modal } from 'antd';
import FieldTable from './FieldTable';
import FieldModifyModal from './FieldModifyModal';

const FieldModal = ({ actionRef }) => {
  const [modifyModalVisible, setModalVisible] = useState(false);
  const [dictData, setDictData] = useState({});

  const fieldRef = useRef({});

  const showModal = items => {
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

  return (
    <Modal
      title="维护"
      centered
      style={{ paddingBottom: 0 }}
      width="900px"
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
      <FieldTable dictData={dictData} openFieldModal={openFieldModal} />
      <FieldModifyModal actionRef={fieldRef} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.smDictionaryMgt,
}))(FieldModal);
