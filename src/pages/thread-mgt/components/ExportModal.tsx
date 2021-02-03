import { Modal, Form } from 'antd';
import React, { useState, useEffect } from 'react';
import { connect } from 'umi';

const ExportModal = ({ loading, actionRef }) => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
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
  const onResetModalCancel = () => {
    form.resetFields();
    setModalVisible(false);
  };
  return (
    <Modal
      title="导出文件"
      width={500}
      visible={modalVisible}
      confirmLoading={loading}
      onOk={() => {
        form.submit();
      }}
      onCancel={onResetModalCancel}
    />
  );
};
export default connect(({ loading }) => ({
  loading: loading.effects['soAnnouncementMgt/commitExamineAnnouncement'],
}))(ExportModal);
