import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import TransferClueForm from './TransferClueForm';

const ModifyModal = ({ dispatch, actionRef, loading }) => {
  const [form] = TransferClueForm.useForm();
  const [detailData, setDetailData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = items => {
    setDetailData(items || null);
    if (items) {
      form.setFieldsValue({ ...items });
    }
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
    form.resetFields();
  };
  const handleOk = () => {
    form
      .validateFields()
      .then((values: any) => {
        return new Promise(resolve => {
          dispatch({
            type: `emClueManagement/transferAssociation`,
            payload: {
              ...values,
              circulationId: detailData.sourceClueId,
              clueId: detailData.clueId,
            },
            resolve,
          });
        });
      })
      .then(() => {
        hideModal();
      })
      .catch((info: any) => {
        console.error('Validate Failed:', info);
      });
  };
  return (
    <Modal
      title="线索转办"
      centered
      width="90vw"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        padding: '30px 60px',
        height: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={modalVisible}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <TransferClueForm form={form} />
    </Modal>
  );
};
export default connect(({ loading, emClueManagement }) => ({
  loading: loading.models.emClueManagement,
  emClueManagement,
}))(ModifyModal);
