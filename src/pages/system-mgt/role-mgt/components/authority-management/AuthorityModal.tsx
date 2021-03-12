import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import { Modal, Tree } from 'antd';

const AuthorityModal = ({ ruleData, dispatch, actionRef, confirmLoading }) => {
  const [roleId, setRoleId] = useState('');
  const [ruleModalVisible, setModalVisible] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const showModal = id => {
    setRoleId(id);
    new Promise(resolve => {
      dispatch({
        type: `smRoleMgt/getRoleRules`,
        payload: {
          roleId: id,
        },
        resolve,
      });
    }).then(data => {
      setCheckedKeys([...data.aclIds]);
    });
    setModalVisible(true);
  };

  useEffect(() => {
    dispatch({
      type: `smRoleMgt/getAuthTree`,
    });

    if (actionRef && typeof actionRef === 'function') {
      actionRef({ showModal });
    }

    if (actionRef && typeof actionRef !== 'function') {
      actionRef.current = { showModal };
    }
  }, []);

  const hideModal = () => {
    setModalVisible(false);
  };

  const onCheckHandler = keys => {
    setCheckedKeys(keys);
  };

  const handleOk = () => {
    new Promise(resolve => {
      dispatch({
        type: `smRoleMgt/updateRoleRules`,
        payload: {
          roleId,
          aclIds: checkedKeys,
        },
        resolve,
      });
    }).then(_ => {
      hideModal();
      setCheckedKeys([]);
    });
  };

  return (
    <Modal
      title="配置角色权限"
      centered
      width="580px"
      style={{ paddingBottom: 0 }}
      bodyStyle={{
        padding: '20px',
        maxHeight: 'calc(95vh - 108px)',
        overflow: 'auto',
      }}
      visible={ruleModalVisible}
      onOk={handleOk}
      forceRender
      confirmLoading={confirmLoading}
      onCancel={hideModal}
    >
      <Tree checkable onCheck={onCheckHandler} checkedKeys={checkedKeys} treeData={ruleData} />
    </Modal>
  );
};

export default connect(({ smRoleMgt, loading }) => ({
  ruleData: smRoleMgt.ruleData,
  confirmLoading: loading.models.smDictionaryMgt,
}))(AuthorityModal);
