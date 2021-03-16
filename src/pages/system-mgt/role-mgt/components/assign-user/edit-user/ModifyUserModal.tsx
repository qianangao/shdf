import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import UserForm from './UserForm';

const ModifyUserModal = ({ dispatch, actionRef, loading }) => {
  const [form] = UserForm.useForm();
  const [detailData, setDetailData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = id => {
    setDetailData(id || null);
    updateData(id);
    setModalVisible(true);
  };

  const updateData = id => {
    if (id) {
      new Promise(resolve => {
        dispatch({
          type: 'smRoleMgt/getUserDetail',
          payload: id.toString(),
          resolve,
        });
      }).then(res => {
        if (res) form.setFieldsValue({ ...res });
      });
    }
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
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `smRoleMgt/${detailData ? 'updateUser' : 'addUser'}`,
            payload: {
              ...values,
              id: detailData && detailData.toString(),
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
      title={detailData ? '编辑工作人员信息' : '新增工作人员信息'}
      centered
      width="580px"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        padding: '30px 60px',
      }}
      visible={modalVisible}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <UserForm form={form} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.smDictionaryMgt,
}))(ModifyUserModal);
