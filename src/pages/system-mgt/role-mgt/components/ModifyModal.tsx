import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import RoleForm from './RoleForm';

const ModifyModal = ({ dispatch, actionRef, loading }) => {
  const [form] = RoleForm.useForm();
  const [roleData, setRoleData] = useState(null);
  const [modifyModalVisible, setModalVisible] = useState(false);

  const showModal = items => {
    setRoleData(items || null);
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
    setRoleData(null);
    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        return new Promise(resolve => {
          dispatch({
            type: `smRoleMgt/${roleData ? 'updateRole' : 'addRole'}`,
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
      title={roleData ? '编辑角色信息' : '新增角色'}
      centered
      width={500}
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        padding: '30px 60px',
      }}
      visible={modifyModalVisible}
      onOk={handleOk}
      forceRender
      confirmLoading={loading}
      onCancel={hideModal}
    >
      <RoleForm form={form} roleData={roleData} />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.smRoleMgt,
}))(ModifyModal);
