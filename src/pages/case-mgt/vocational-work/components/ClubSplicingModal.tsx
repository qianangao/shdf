import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import CaseHandleForm from './form/CaseHandleForm';

const ClubSplicingModal = ({ actionRef, dispatch }) => {
  const [infoId] = useState('');
  const [form] = CaseHandleForm.useForm();
  const [clubSplicingModalVisible, setModalVisible] = useState(false);

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
        values.engineeringIds = [values.engineeringIds];
        values.specialActionIds = [values.specialActionIds];
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
      visible={clubSplicingModalVisible}
      destroyOnClose
      onOk={handleOk}
      onCancel={hideModal}
      footer={[]}
    >
      <CaseHandleForm id={infoId} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.oaVolunteerTeam,
}))(ClubSplicingModal);
