import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Spin } from 'antd';
import PersonForm from './PersonForm';

const ModifyModal = ({ dispatch, actionRef, loading }) => {
  const [form] = PersonForm.useForm();
  const [personId, setPersonId] = useState(undefined);
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = (id: any) => {
    setPersonId(id || undefined);
    setModalVisible(true);
  };

  useEffect(() => {
    if (personId) {
      getPersonDetail(personId);
    }
  }, [personId]);

  useEffect(() => {
    if (actionRef && typeof actionRef === 'function') {
      actionRef({ showModal });
    }

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { showModal };
    }
  }, []);

  const hideModal = () => {
    setPersonId(undefined);
    setModalVisible(false);
    form.resetFields();
  };

  const getPersonDetail = (id: any) => {
    new Promise(resolve => {
      dispatch({
        type: 'kdKeyPersonMgt/getKeyPersonDetail',
        payload: { personId: id },
        resolve,
      });
    })
      .then(data => {
        if (data) {
          form.setFieldsValue(data);
        }
      })
      .catch(_ => {});
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values: any) => {
        return new Promise(resolve => {
          dispatch({
            type: `kdKeyPersonMgt/${personId ? 'updateKeyPerson' : 'addKeyPerson'}`,
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
      .catch((info: any) => {
        console.error('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title={personId ? '重点人物编辑' : '重点人物录入'}
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
      <Spin spinning={loading}>
        <PersonForm form={form} />
      </Spin>
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.kdKeyPersonMgt,
}))(ModifyModal);
