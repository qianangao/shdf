import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import TableRead from './TableRead';

const ReadListModal = ({ actionRef }) => {
  const [infoId] = useState('');
  const [ReadModalVisible, setModalVisible] = useState(false);

  const showModal = () => {
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
    // form.resetFields();
  };

  return (
    <Modal
      title="收文处理情况"
      centered
      width={580}
      style={{ paddingBottom: 0 }}
      visible={ReadModalVisible}
      destroyOnClose
      onCancel={hideModal}
      footer={[]}
    >
      <TableRead id={infoId} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  ReadModalVisible: false,
  loading: loading.models.oaVolunteerTeam,
}))(ReadListModal);
