import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import AddThreadForm from './AddThreadForm';

const ModifyModal = ({ dispatch, actionRef, loading, emClueManagement }) => {
  const { code } = emClueManagement;
  const [form] = AddThreadForm.useForm();
  const [detailData, setDetailData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = items => {
    setDetailData(items || null);
    if (items) {
      form.setFieldsValue({ ...items });
    } else {
      dispatch({
        type: `emClueManagement/getCode`,
      });
    }
    setModalVisible(true);
  };

  useEffect(() => {
    code && form.setFieldsValue({ clueNumber: `xs${code}` });
  }, [code]);

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
        const fileIds =
          values.files &&
          values.files.map((item: { uid: any }) => {
            return item.uid;
          });
        return new Promise(resolve => {
          dispatch({
            type: `emClueManagement/${detailData ? 'editClue' : 'addClues'}`,
            payload: {
              clueId: detailData.clueId,
              ...values,
              fileIds,
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
      title="线索录入"
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
      <AddThreadForm form={form} />
    </Modal>
  );
};
export default connect(({ loading, emClueManagement }) => ({
  loading: loading.models.emClueManagement,
  emClueManagement,
}))(ModifyModal);
