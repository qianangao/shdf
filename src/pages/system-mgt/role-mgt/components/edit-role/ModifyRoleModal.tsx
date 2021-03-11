import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import RoleForm from './RoleForm';

const ModifyRoleModal = ({ dispatch, actionRef, loading, roleTree }) => {
  const [form] = RoleForm.useForm();
  const [detailData, setDetailData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = id => {
    if (id) {
      updateData(id);
      setDetailData(id);
    }
    setModalVisible(true);
  };

  const updateData = roleId => {
    new Promise(resolve => {
      dispatch({
        type: 'smRoleMgt/getRoleDetail',
        payload: { roleId },
        resolve,
      });
    }).then(res => {
      if (res) form.setFieldsValue({ ...res });
    });
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
        // const orgIds = form.getFieldsValue('orgIds')
        return new Promise(resolve => {
          dispatch({
            type: `smRoleMgt/${detailData ? 'updateRole' : 'addRole'}`,
            payload: {
              ...values,
              // orgIds,
              roleId: detailData && detailData.toString(),
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
      title={detailData ? '编辑角色' : '新增角色'}
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
      <RoleForm form={form} roleTree={roleTree} />
    </Modal>
  );
};

export default connect(({ loading, smRoleMgt }) => ({
  loading: loading.models.smDictionaryMgt,
  roleTree: smRoleMgt.roleTree,
}))(ModifyRoleModal);
