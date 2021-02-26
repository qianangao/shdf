import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import CaseHandleForm from './form/CaseHandleForm';

const CaseHandleModal = ({ actionRef, dispatch, id }) => {
  const [form] = CaseHandleForm.useForm();
  const [caseHandleModalVisible, setModalVisible] = useState(false);

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

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        values.id = id;
        let filesStr = '';
        if (values.transmitFiles && values.transmitFiles.length > 0) {
          const ids = values.transmitFiles.map(item => {
            return item.uid;
          });
          filesStr = ids.join(',');
          delete values.transmitFiles;
        }
        values.transmitFileIds = filesStr;
        return new Promise(resolve => {
          dispatch({
            type: `caseMgt/addCaseHandle`,
            payload: {
              ...values,
            },
            resolve,
          });
        });
      })
      .then(() => {
        hideModal();
      })
      .catch(info => {
        console.error('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="案件办理"
      centered
      width={580}
      style={{ paddingBottom: 0 }}
      visible={caseHandleModalVisible}
      destroyOnClose
      onOk={handleOk}
      onCancel={hideModal}
    >
      <CaseHandleForm form={form} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.oaVolunteerTeam,
}))(CaseHandleModal);
