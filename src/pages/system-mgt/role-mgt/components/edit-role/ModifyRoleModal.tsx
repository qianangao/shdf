import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import RoleForm from './RoleForm';

const ModifyRoleModal = ({ dispatch, actionRef, loading }) => {
  const [form] = RoleForm.useForm();
  const [detailData, setDetailData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [publicRole, setPublicRole] = useState('1');
  // const [orgIds, setOrgIds] = useState([]);

  useEffect(() => {
    dispatch({
      type: 'smRoleMgt/getRoleTree',
    });
  }, []);

  const updateData = roleId => {
    new Promise(resolve => {
      dispatch({
        type: 'smRoleMgt/getRoleDetail',
        payload: { roleId },
        resolve,
      });
    }).then(res => {
      setPublicRole(res.publicRole);
      // setOrgIds([...res.orgIds]);
      if (res) form.setFieldsValue({ ...res });
    });
  };

  const showModal = id => {
    if (id) {
      updateData(id);
      setDetailData(id);
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
    setDetailData(null);
    setPublicRole('');
    // setOrgIds([]);
  };

  // const onChange = keys => {
  //   setOrgIds([...keys]);
  //   form.setFieldsValue({ orgIds: [...keys] });
  // };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        // values.orgIds =
        //   values.orgIds &&
        //   values.orgIds.map(item => {
        //     return item.id;
        //   });
        // if (values.publicRole === '1') {
        //   values.orgIds = [];
        // } else {
        //   values.orgIds = [...orgIds];
        // }
        return new Promise(resolve => {
          dispatch({
            type: `smRoleMgt/${detailData ? 'updateRole' : 'addRole'}`,
            payload: {
              ...values,
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
      <RoleForm
        form={form}
        // roleTree={roleTree}
        publicRole={publicRole}
        // orgIds={orgIds}
        // onTreeChange={onChange}
      />
    </Modal>
  );
};

export default connect(({ loading }) => ({
  loading: loading.models.smDictionaryMgt,
  // roleTree: smRoleMgt.roleTree,
}))(ModifyRoleModal);
